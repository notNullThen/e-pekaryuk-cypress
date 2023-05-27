import HomePage from "../pageobjects/homePage.js";

const homePage = new HomePage();

export function brandFilter(brandName, check) {
  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
  cy.get(`[data-id=${brandName}]`).click();
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
  if (check) {
    homePage.itemNames().each(($el, index, $list) => {
      expect($el.text()).contains(brandName);
    });
  }
}
