import ItemsPage from "../pageobjects/itemsPage.js";

const itemsPage = new ItemsPage();

export function brandFilter(brandName, check) {
  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
  cy.get(`[data-id=${brandName}]`).click();
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
  if (check) {
    itemsPage.itemNames().each(($el) => {
      expect($el.text()).contains(brandName);
    });
  }
}
