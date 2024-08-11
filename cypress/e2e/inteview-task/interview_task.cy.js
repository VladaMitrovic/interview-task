import HomePage from '../pages/homePage';
import RegistrationPage from '../pages/registrationPage';
import ProductDetailsPage from '../pages/productDetailsPage';
import ShippingPage from '../pages/shippingPage';
import CommonPage from '../pages/commonPage';
import { faker } from '@faker-js/faker';

describe('Interview task complete flow', () => {
  const registration = new RegistrationPage();
  const home = new HomePage();
  const productDetails = new ProductDetailsPage();
  const shipping = new ShippingPage();
  const common = new CommonPage();
  const randomText = faker.string.alpha({ length: { min: 1, max: 20 } });
  const randomNumber = faker.number.int({ min: 5, max: 10 });
  const fakeEmailAddress = faker.internet.email({
    provider: 'example.fakerjs.dev',
  });

  before(() => {
    // cy.logCustomer1();
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('Complete E2E task - covering TC3, TC4 and TC5 ', () => {
    cy.visit(Cypress.env('registration_link'));
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.emailInputField().type(fakeEmailAddress);
    registration
      .passwordInputField()
      .type(Cypress.env('password_for_registration'));
    registration
      .passwordConfirmationInputField()
      .type(Cypress.env('password_for_registration'));
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    cy.url().should('eq', Cypress.env('account_url'));
    cy.get('.message-success > div').should(
      'contain',
      'Thank you for registering with Main Website Store.'
    );
    cy.get('.greet').should('contain', 'Welcome');

    // // Search and add products
    home.searchInputField().type('Beaumont Summit Kit');
    home.searchAutocomplete().contains('Beaumont Summit Kit').click();
    home.product().contains('Beaumont Summit Kit').click();
    common.productPagePrice().should('contain', '42');
    common.productSizeOption().click();
    common.productColorOptionBeaumont().click();
    productDetails.addToCart().click();
    home.searchInputField().scrollIntoView();
    home.searchInputField().type('Strike Endurance Tee');
    home.searchAutocomplete().contains('Strike Endurance Tee').click();
    home.product().contains('Strike Endurance Tee').click();
    common.productPagePrice().should('contain', '39');
    common.productSizeOption().click();
    common.productColorOptionStrike().click();
    productDetails.addToCart().click();
    home.cart().scrollIntoView();
    home.cart().should('be.visible');
    cy.wait(2000);
    home.cart().click();
    home.productNameInCart().should('be.visible');
    home.proceedToCheckoutButton().should('be.visible');
    home.proceedToCheckoutButton().click();

    // Shipping Page
    shipping.shippingFirstNameInputField().should('not.contain', 'error');
    shipping.shippingLastNameInputField().should('not.contain', 'error');
    shipping.shippingAddressInputField().type(randomText);
    cy.intercept({
      method: 'POST',
      url: Cypress.env('shipping_method_url'),
    }).as('estimateShippingMethod');
    shipping.shippingCityInputField().type(randomText);
    shipping.shippingCountryDropdown().select('Serbia');
    cy.wait('@estimateShippingMethod').then(() => {
      shipping.shippingNextButton({ timeout: 20000 }).should('be.visible');
    });
    shipping.shippingZipCodeInputField().type(randomText);
    shipping.shippingPhoneInputField().type(randomNumber);
    shipping.shippingNextButton().should('be.visible');
    shipping.shippingNextButton().click();
    cy.wait(5000);
    shipping.shippingPlaceOrderButton().should('be.visible');

    // API call

    // cy.intercept({
    //   method: 'POST',
    //   url: 'https://magento.softwaretestingboard.com/checkout/onepage/success/',
    // }).as('apiCallSuccessOrder');
    shipping.shippingPlaceOrderButton().click();
    // cy.wait('@apiCallSuccessOrder').then((response) => {
    //   expect(response).to.have.property('statusCode').to.equal(200);
    // });

    // Order was Success
    common.pageTitleMessage().should('contain', 'Thank you for your purchase!');
    common.continueShoppingButton().should('be.visible');
    common.customerDropdownButton().click();
    common.headerLinkOption().contains('My Account').click({ force: true });
    common.sideMenuOption().contains('My Orders').click();
    common.viewOrder().click();
    common.orderStatus().should('contain', 'Pending');
    common.productPriceOnOrderPage().eq(0).should('contain', '42');
    common.productPriceOnOrderPage().eq(1).should('contain', '39');
    common.grandTotalPrice().should('contain', '91');
  });
});
