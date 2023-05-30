import ItemsPage from "../pageobjects/itemsPage.js";

const itemsPage = new ItemsPage();

export function brandFilter(brandName, check) {
  cy.interceptGetPrice();
  cy.clickBrandFilter(brandName);
  cy.waitGetPrice();
  if (check) {
    itemsPage
      .itemNames()
      .its("length")
      .then((length) => {
        for (let i = 0; i < length; i++) {
          itemsPage
            .itemNames()
            .eq(i)
            .then(($el) => {
              expect($el.text()).contains(brandName);
            });
        }
      });
  }
}
