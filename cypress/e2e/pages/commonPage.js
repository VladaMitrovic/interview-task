class CommonPage {
  productPagePrice() {
    return cy.get(
      '.product-info-main > .product-info-price .price-container > .price-wrapper > .price'
    );
  }

  productSizeOption() {
    return cy.get('.swatch-option.text').contains('L');
  }

  productColorOptionBeaumont() {
    return cy.get('#option-label-color-93-item-58');
  }

  productColorOptionStrike() {
    return cy.get('#option-label-color-93-item-49');
  }

  pageTitleMessage() {
    return cy.get('.page-title');
  }

  continueShoppingButton() {
    return cy.get('.primary').contains('Continue Shopping');
  }

  customerDropdownButton() {
    return cy.get(
      ':nth-child(2) > .customer-welcome > .customer-name > .action'
    );
  }

  headerLinkOption() {
    return cy.get('.header.links');
  }

  sideMenuOption() {
    return cy.get('.items > :nth-child(2) > a');
  }
  viewOrder() {
    return cy.get('.actions > .view > span').contains('View Order');
  }

  orderStatus() {
    return cy.get('.order-status');
  }

  productPriceOnOrderPage() {
    return cy.get('.col.price > .price-excluding-tax');
  }

  grandTotalPrice() {
    return cy.get('.grand_total > .amount');
  }
}

export default CommonPage;
