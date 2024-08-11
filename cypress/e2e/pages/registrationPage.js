class RegistrationPage {
  firstNameInputField() {
    return cy.get('#firstname');
  }

  firstNameInputFieldError() {
    return cy.get('#firstname-error');
  }

  lastNameInputField() {
    return cy.get('#lastname');
  }

  lastNameInputFieldError() {
    return cy.get('#lastname-error');
  }

  emailInputField() {
    return cy.get('#email_address');
  }

  emailInputFieldError() {
    return cy.get('#email_address-error');
  }

  passwordInputField() {
    return cy.get('#password');
  }

  passwordInputFieldError() {
    return cy.get('#password-error');
  }

  passwordConfirmationInputField() {
    return cy.get('#password-confirmation');
  }

  passwordConfirmationInputFieldError() {
    return cy.get('#password-confirmation-error');
  }

  createAnAccountButton() {
    return cy.get('.actions-toolbar').contains('Create an Account');
  }
}

export default RegistrationPage;
