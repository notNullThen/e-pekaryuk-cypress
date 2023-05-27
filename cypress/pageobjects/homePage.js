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
  sbElems() {
    return cy.get("aside rz-sidebar-fat-menu a");
  }
}

export default HomePage;
