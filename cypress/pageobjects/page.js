class Page {
  headerTxt() {
    return cy.get("section h1");
  }

  // Basket
  basketBtn() {
    return cy.get(".header-actions__item--cart");
  }
  itemsBasketBtn() {
    return cy.get("app-buy-button");
  }
  basketPriceValues() {
    return cy.get('[data-testid="cost"]');
  }
  basketItemNames() {
    return cy.get('[data-testid="title"]');
  }
  basketSum() {
    return cy.get('[data-testid="cart-receipt-sum"] span');
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
