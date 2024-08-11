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
