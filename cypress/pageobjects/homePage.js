class HomePage {
  searchField() {
    return cy.get("[search-input]");
  }
  searchBtn() {
    return cy.get("button.search-form__submit");
  }
  searchSuggestions() {
    return cy.get("header form a > span");
  }
  searchHeaderText() {
    return cy.get("rz-search h1");
  }
  sbElems() {
    return cy.get("aside rz-sidebar-fat-menu a");
  }
  headerTxt() {
    return cy.get("section h1");
  }
  itemNames() {
    return cy.get("app-goods-tile-default div > a > span");
  }
  subCategories() {
    return cy.get("rz-list-tile a");
  }

  // Filters
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

  // Sotring
  sortingSelector() {
    return cy.get("rz-sort select");
  }

  // Confirm 18+ years dialog
  confirmBtn() {
    return cy.get("div.rz-btn_blue");
  }
  declineBtn() {
    return cy.get("div.rz-btn_gray");
  }

  // Price
  itemPrices() {
    return cy.get("rz-catalog-tile div > p > span");
  }

  // Localization
  uaLangBtn() {
    return cy.get('[alt="ua"]');
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
}

export default HomePage;
