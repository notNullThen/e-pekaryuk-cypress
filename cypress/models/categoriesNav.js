import Page from "../pageobjects/page.js";
import HomePage from "../pageobjects/homePage.js";
import CategoryPage from "../pageobjects/categoryPage.js";

const page = new Page();
const homePage = new HomePage();
const categoryPage = new CategoryPage();

// 'subcategoryNum = false' if you don't want to navigate subcategory
export function categoryNav(categoryNum, subcategoryNum) {
  if (categoryNum != false) {
    cy.visit("/");
    categoryNum--;

    homePage.sbElems().eq(categoryNum).click();
    if (subcategoryNum != false) {
      subcategoryNum--;
      cy.interceptLabels();
      categoryPage.subCategories().eq(subcategoryNum).click();
      cy.waitLabels();
    }
  }
}

export function categoriesNamesCheck() {
  homePage
    .sbElems()
    .its("length")
    .then((length) => {
      for (let i = 0; i < length; i++) {
        homePage
          .sbElems()
          .eq(i)
          .then(($el) => {
            if (i == 0 || i == 1 || i == 7 || i == 9 || i == 11 || i == 16) {
            } else {
              const sbElText = $el.text().replace("’", "'");
              homePage.sbElems().eq(i).click();
              page.headerTxt().then(($el) => {
                expect($el.text()).contains(sbElText, { matchCase: false });
              });
              cy.go("back");
            }
          });
      }
    });
}
