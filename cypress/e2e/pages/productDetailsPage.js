class ProductDetailsPage {
  addToCart() {
    return cy.get('#product-addtocart-button');
  }
}

export default ProductDetailsPage;
