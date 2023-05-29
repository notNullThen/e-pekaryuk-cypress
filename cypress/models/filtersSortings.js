import ItemsPage from "../pageobjects/itemsPage.js";

const itemsPage = new ItemsPage();

export function brandFilter(brandName) {
  cy.clickBrandFilter(brandName);
}

export function applyPriceFilter(minPrice, maxPrice) {
  itemsPage.priceMinFilter().click();
  itemsPage.priceMinFilter().clear();
  itemsPage.priceMinFilter().should("have.value", "");
  itemsPage.priceMinFilter().type(minPrice, { delay: 100 });
  itemsPage.priceMinFilter().should("have.value", minPrice);
  itemsPage.priceMaxFilter().clear();
  itemsPage.priceMaxFilter().should("have.value", "");
  itemsPage.priceMaxFilter().click();
  itemsPage.priceMaxFilter().type(maxPrice, { delay: 100 });
  itemsPage.priceMaxFilter().should("have.value", maxPrice);
  itemsPage.applyPriceFilterBtn().contains("Ok");

  cy.interceptGetPrice();
  itemsPage.applyPriceFilterBtn().click();
  cy.waitGetPrice();
}

export function checkItemsPrices(minPrice, maxPrice) {
  itemsPage.itemPrices().each(($el) => {
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

  cy.interceptGetPrice();
  itemsPage.sortingSelector().select(optionName);
  cy.should("have.value", optionName);
  cy.waitGetPrice();

  if (check) {
    let prevElem = 0;
    itemsPage.itemPrices().each(($el, index) => {
      const priceInt = Number($el.text().replace(/\D/g, ""));
      if (index == 0) {
        prevElem = priceInt;
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
