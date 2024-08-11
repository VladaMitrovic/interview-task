import HomePage from '../pages/homePage';
import RegistrationPage from '../pages/registrationPage';
import ProductDetailsPage from '../pages/productDetailsPage';
import ShippingPage from '../pages/shippingPage';
import { faker } from '@faker-js/faker';

const registration = new RegistrationPage();
const home = new HomePage();
const productDetails = new ProductDetailsPage();
const shipping = new ShippingPage();
const randomText = faker.string.alpha({ length: { min: 1, max: 20 } });
const randomNumber = faker.number.int({ min: 5, max: 10 });
const fakeEmailAddress = faker.internet.email({
  provider: 'example.fakerjs.dev',
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands';

Cypress.Commands.add('logCustomer', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('login_url'),
    body: {
      username: Cypress.env('customer_email'),
      password: Cypress.env('customer_password'),
    },
  })
    .then((response) => {
      cy.log(response.body);
      cy.setLocalStorage('access_token', response.body);
    })
    .its('body')
    .then((identity) => {
      cy.setLocalStorage('access_token', identity.access_token);
    });
});

Cypress.Commands.add('registerCustomer', () => {
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
});
