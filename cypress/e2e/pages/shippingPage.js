class ShippingPage {
  shippingFirstNameInputField() {
    return cy.get('[name="shippingAddress.firstname"]');
  }

  shippingLastNameInputField() {
    return cy.get('[name="shippingAddress.lastname"]');
  }

  shippingAddressInputField() {
    return cy.get('.street > :nth-child(2) > .field._required');
  }

  shippingCityInputField() {
    return cy.get('[name="shippingAddress.city"]');
  }

  shippingCountryDropdown() {
    return cy.get('.field._required > .control >.select').eq(1);
  }

  shippingCountryOption() {
    return cy.get('data-title');
  }

  shippingZipCodeInputField() {
    return cy.get('[name="shippingAddress.postcode"]');
  }

  shippingPhoneInputField() {
    return cy.get('[name="shippingAddress.telephone"]');
  }

  shippingNextButton() {
    return cy.get('.primary').contains('Next');
  }

  shippingPlaceOrderButton() {
    return cy.get('.primary').contains('Place Order');
  }
}

export default ShippingPage;
