import HomePage from "../pageobjects/homePage.js";
import ItemsPage from "../pageobjects/itemsPage.js";

const homePage = new HomePage();
const itemsPage = new ItemsPage();

export function searchSuggestionsCheck(searchQuery) {
  homePage.searchField().click().clear().should("have.value", "");
  cy.interceptSearchAutocomplete();
  homePage.searchField().type(searchQuery).should("have.value", searchQuery);
  cy.waitSearchAutocomplete();
  homePage.searchSuggestions().its('length').then((length) => {
    for (let i = 0; i < length; i++) {
      homePage.searchSuggestions().eq(i).then(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
      })
    }
  });
}

export function searchItemsCheck(searchQuery) {
  homePage.searchField().click().clear().should("have.value", "");
  cy.interceptGetPrice();
  homePage
    .searchField()
    .type(`${searchQuery}{enter}`)
    .should("have.value", searchQuery);
  cy.waitGetPrice();
  itemsPage.itemNames().its('length').then((length) => {
    for (let i = 0; i < length; i++) {
      itemsPage.itemNames().eq(i).then(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).contains(searchQuery.toLowerCase(), { matchCase: false });
      })
    }
  });
}
