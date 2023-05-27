import HomePage from "../pageobjects/homePage.js";

const homePage = new HomePage();

export function searchSuggestionsCheck(searchQuery) {
  homePage.searchField().click();
  cy.intercept("GET", /.*search.*autocomplete.*/).as("search-autocomplete");
  homePage.searchField().clear();
  homePage.searchField().should("have.value", "");
  homePage.searchField().type(searchQuery);
  homePage.searchField().should("have.value", searchQuery);
  cy.wait("@search-autocomplete", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
  homePage.searchSuggestions().each(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
  });
}

export function searchItemsCheck(searchQuery) {
  homePage.searchField().click();
  cy.intercept("GET", /.*search.*autocomplete.*/).as("search-autocomplete");
  homePage.searchField().clear();
  homePage.searchField().should("have.value", "");
  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
  homePage.searchField().type(`${searchQuery}{enter}`);
  homePage.searchField().should("have.value", searchQuery);
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
  homePage.itemNames().each(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
  });
}
