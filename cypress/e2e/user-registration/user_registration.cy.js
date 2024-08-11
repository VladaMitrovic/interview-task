import RegistrationPage from '../pages/registrationPage';
import { faker } from '@faker-js/faker';

describe('TC1 & TC2 Successfully register and assert a new account', () => {
  const registration = new RegistrationPage();
  const randomText = faker.string.alpha({ length: { min: 1, max: 20 } });
  const randomShortText = faker.string.alpha({ length: { min: 1, max: 7 } });
  const fakeEmailAddress = faker.internet.email({
    provider: 'example.fakerjs.dev',
  });

  beforeEach(() => {
    cy.visit(Cypress.env('registration_link'));
  });

  it('Check validation message for First Name Input field', () => {
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .firstNameInputFieldError()
      .should('contain', 'This is a required field.');
  });

  it('Check validation message for Last Name Input field', () => {
    registration.firstNameInputField().type(randomText);
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .lastNameInputFieldError()
      .should('contain', 'This is a required field.');
  });

  it('Check validation message for Email Input field', () => {
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .emailInputFieldError()
      .should('contain', 'This is a required field.');
  });

  it('Check validation message for Password Input field', () => {
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.emailInputField().type(fakeEmailAddress);
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .passwordInputFieldError()
      .should('contain', 'This is a required field.');
  });

  it('Check validation message for Short Password', () => {
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.emailInputField().type(fakeEmailAddress);
    registration.passwordInputField().type(randomShortText);
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .passwordInputFieldError()
      .should(
        'contain',
        'Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.'
      );
  });

  it('Check validation message for Confirm Password Input Field', () => {
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.emailInputField().type(fakeEmailAddress);
    registration
      .passwordInputField()
      .type(Cypress.env('password_for_registration'));
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .passwordConfirmationInputFieldError()
      .should('contain', 'This is a required field.');
  });

  it('Check validation message for Different Passwords', () => {
    registration.firstNameInputField().type(randomText);
    registration.lastNameInputField().type(randomText);
    registration.emailInputField().type(fakeEmailAddress);
    registration
      .passwordInputField()
      .type(Cypress.env('password_for_registration'));
    registration.passwordConfirmationInputField().type(randomText);
    registration.createAnAccountButton().scrollIntoView();
    registration.createAnAccountButton().click();
    registration
      .passwordConfirmationInputFieldError()
      .should('contain', 'Please enter the same value again.');
  });

  it('Successfull Registration', () => {
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
});
