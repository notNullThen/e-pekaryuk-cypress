import ItemsPage from "../pageobjects/itemsPage.js";

const itemsPage = new ItemsPage();

export function brandFilter(brandName, check) {
  cy.interceptGetPrice();
  cy.clickBrandFilter(brandName);
  cy.waitGetPrice();
  if (check) {
    itemsPage.itemNames().each(($el) => {
      expect($el.text()).contains(brandName);
    });
  }
}
