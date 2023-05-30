import ItemsPage from "../pageobjects/itemsPage.js";

const itemsPage = new ItemsPage();

export function brandFilter(brandName) {
  cy.clickBrandFilter(brandName);
}

export function applyPriceFilter(minPrice, maxPrice) {
  itemsPage
    .priceMinFilter()
    .click()
    .clear()
    .should("have.value", "")
    .type(minPrice, { delay: 100 })
    .should("have.value", minPrice);
  itemsPage
    .priceMaxFilter()
    .clear()
    .should("have.value", "")
    .click()
    .type(maxPrice, { delay: 100 })
    .should("have.value", maxPrice);
  itemsPage.applyPriceFilterBtn().contains("Ok");

  cy.interceptGetPrice();
  itemsPage.applyPriceFilterBtn().click();
  cy.waitGetPrice();
}

export function checkItemsPrices(minPrice, maxPrice) {
  itemsPage.itemPrices().its('length').then((length) => {
    for (let i = 0; i < length; i++) {
      itemsPage.itemPrices().eq(i).then(($el) => {
        const priceStr = $el.text().replace(/\D/g, "");
        const priceInt = Number(priceStr);
        expect(priceInt).to.be.gte(minPrice);
        expect(priceInt).to.be.lte(maxPrice);
      })
    }
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
    itemsPage.itemPrices().its('length').then((length) => {
      for (let i = 0; i < length; i++) {
        itemsPage.itemPrices().eq(i).then(($el) => {
          const priceInt = Number($el.text().replace(/\D/g, ""));
          if (i == 0) {
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
        })
      }
    });
  }
}
