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
      cy.intercept("GET", /.*goods\/labels.*/).as("get-labels");
      categoryPage.subCategories().eq(subcategoryNum).click();
      cy.wait("@get-labels", { timeout: 10000 })
        .its("response.statusCode")
        .should("eq", 200);
    }
  }
}

export function categoriesNamesCheck() {
  homePage.sbElems().each(($el, index) => {
    if (
      index == 0 ||
      index == 1 ||
      index == 7 ||
      index == 9 ||
      index == 11 ||
      index == 16
    ) {
    } else {
      const sbElText = $el.text().replace("’", "'");
      homePage.sbElems().eq(index).click();
      page.headerTxt().then(($el) => {
        expect($el.text()).contains(sbElText, { matchCase: false });
      });
      cy.go("back");
    }
  });
}
