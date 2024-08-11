class HomePage {
  createAnAccount() {
    return cy.get('.header links').contains('Create an Account');
  }

  signIn() {
    return cy.get('.authorization-link').contains('Sign In ');
  }

  searchInputField() {
    return cy.get('#search');
  }

  searchAutocomplete() {
    return cy.get('#search_autocomplete');
  }

  cart() {
    return cy.get('.showcart');
  }

  cartCounter() {
    return cy.get('.action showcart .counter-number');
  }

  product() {
    return cy.get('.product-item-name');
  }

  productNameInCart() {
    return cy.get('.product-item-name > a');
  }
  proceedToCheckoutButton() {
    return cy.get('#top-cart-btn-checkout').contains('Proceed to Checkout');
  }
}

export default HomePage;
