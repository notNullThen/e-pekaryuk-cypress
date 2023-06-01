class Page {
  headerTxt() {
    return cy.get("section h1");
  }

  // Basket
  basketBtn() {
    return cy.get(".header-actions__item--cart");
  }

  basketPriceValues() {
    return cy.get("p.cart-product__price");
  }
  basketItemNames() {
    return cy.get("a.cart-product__title");
  }
  basketSum() {
    return cy.get(".cart-receipt__sum div > span");
  }
  itemsThreeDotsBtns() {
    return cy.get("rz-popup-menu button");
  }
  itemDeleteBtn() {
    return cy.get("rz-trash-icon button");
  }

  // Confirm 18+ years dialog
  confirmBtn() {
    return cy.get("div.rz-btn_blue");
  }
  declineBtn() {
    return cy.get("div.rz-btn_gray");
  }
}

export default Page;
