import HomePage from "../pageobjects/homePage.js";

const homePage = new HomePage();

// 'subcategoryNum = false' if you don't want to navigate subcategory
export function categoryNav(categoryNum, subcategoryNum) {
  if (categoryNum != false) {
    cy.visit("/");
    categoryNum--;
    homePage.sbElems().eq(categoryNum).click();
    if (subcategoryNum != false) {
      subcategoryNum--;
      homePage.subCategories().eq(subcategoryNum).click();
    }
    cy.intercept("GET", /.*goods\/labels.*/).as("get-labels");
    cy.wait("@get-labels", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  }
}

export function categoriesNamesCheck() {
  for (let i = 0; i < 15; i++) {
    if (i == 0 || i == 7 || i == 9 || i == 11) {
      continue;
    }
    homePage
      .sbElems()
      .eq(i)
      .invoke("text")
      .then((text) => {
        homePage.sbElems().eq(i).click();
        text = text.replace("’", "'");
        homePage.headerTxt().contains(text, { matchCase: false });
        cy.go("back");
      });
  }
}
