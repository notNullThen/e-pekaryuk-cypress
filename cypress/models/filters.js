import HomePage from "../pageobjects/homePage.js";

const homePage = new HomePage();

export function brandFilter(brandName) {
  cy.get(`[data-id=${brandName}]`).click();
}

export function applyPriceFilter(minPrice, maxPrice) {
  homePage.priceMinFilter().click();
  homePage.priceMinFilter().clear();
  homePage.priceMinFilter().should("have.value", "");
  homePage.priceMinFilter().type(minPrice, { delay: 100 });
  homePage.priceMinFilter().should("have.value", minPrice);
  homePage.priceMaxFilter().clear();
  homePage.priceMaxFilter().should("have.value", "");
  homePage.priceMaxFilter().click();
  homePage.priceMaxFilter().type(maxPrice, { delay: 100 });
  homePage.priceMaxFilter().should("have.value", maxPrice);
  homePage.applyPriceFilterBtn().contains("Ok");

  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
  homePage.applyPriceFilterBtn().click();
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
}

export function checkItemsPrices(minPrice, maxPrice) {
  homePage.itemPrices().each(($el) => {
    const priceStr = $el.text().replace(/\D/g, "");
    const priceInt = Number(priceStr);
    expect(priceInt).to.be.gte(minPrice);
    expect(priceInt).to.be.lte(maxPrice);
  });
}

export function selectSortingOption(optionNum, check) {
  let optionName = "";

  switch (optionNum) {
    case 1:
      optionName = "1: cheap";
      break;
    case 2:
      optionName = "2: expensive";
      break;
    case 3:
      optionName = "3: novelty";
      break;
    case 4:
      optionName = "4: rank";
      break;
  }

  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
  homePage.sortingSelector().select(optionName);
  cy.should("have.value", optionName);
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);

  if (check) {
    let prevElem = 0;
    homePage.itemPrices().each(($el, index) => {
      let priceInt = Number($el.text().replace(/\D/g, ""));
      if (index == 0) {
      } else {
        switch (optionNum) {
          case 1:
            expect(priceInt >= prevElem).to.be.true;
            break;
          case 2:
            expect(priceInt <= prevElem).to.be.true;
            break;
        }
      }

      prevElem = priceInt;
    });
  }
}
