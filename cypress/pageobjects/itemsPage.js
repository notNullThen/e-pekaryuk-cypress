class ItemsPage {
  searchHeaderText() {
    return cy.get("rz-search h1");
  }
  itemNames() {
    return cy.get("app-goods-tile-default div > a > span");
  }

  itemsBasketBtn() {
    return cy.get("app-buy-button");
  }

  filterCheckboxes() {
    return cy.get("aside a");
  }
  priceMinFilter() {
    return cy.get('[formcontrolname="min"]');
  }
  priceMaxFilter() {
    return cy.get('[formcontrolname="max"]');
  }
  applyPriceFilterBtn() {
    return cy.get("button[type=submit]");
  }

  sortingSelector() {
    return cy.get("rz-sort select");
  }

  itemPrices() {
    return cy.get("rz-catalog-tile div > p > span");
  }
}

export default ItemsPage;
