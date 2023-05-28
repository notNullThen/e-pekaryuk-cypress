import HomePage from "../pageobjects/homePage.js";
import ItemsPage from "../pageobjects/itemsPage.js";

const homePage = new HomePage();
const itemsPage = new ItemsPage();

export function searchSuggestionsCheck(searchQuery) {
  homePage.searchField().click();
  homePage.searchField().clear();
  homePage.searchField().should("have.value", "");
  cy.interceptSearchAutocomplete();
  homePage.searchField().type(searchQuery);
  homePage.searchField().should("have.value", searchQuery);
  cy.waitSearchAutocomplete();
  homePage.searchSuggestions().each(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
  });
}

export function searchItemsCheck(searchQuery) {
  homePage.searchField().click();
  homePage.searchField().clear();
  homePage.searchField().should("have.value", "");
  cy.interceptGetPrice();
  homePage.searchField().type(`${searchQuery}{enter}`);
  homePage.searchField().should("have.value", searchQuery);
  cy.waitGetPrice();
  itemsPage.itemNames().each(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
  });
}
