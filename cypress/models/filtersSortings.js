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
  itemsPage
    .itemPrices()
    .its("length")
    .then((length) => {
      for (let i = 0; i < length; i++) {
        itemsPage
          .itemPrices()
          .eq(i)
          .then(($el) => {
            const priceStr = $el.text().replace(/\D/g, "");
            const priceInt = Number(priceStr);
            expect(priceInt).to.be.gte(minPrice);
            expect(priceInt).to.be.lte(maxPrice);
          });
      }
    });
}

export function selectSortingOption(optionNum, check) {
  const options = {
    1: "1: cheap",
    2: "2: expensive",
    3: "3: novelty",
    4: "4: rank",
  };
  const optionName = options[optionNum];

  cy.interceptGetPrice();
  itemsPage.sortingSelector().select(optionName);
  cy.should("have.value", optionName);
  cy.waitGetPrice();

  if (check) {
    let prevElem = 0;
    itemsPage
      .itemPrices()
      .its("length")
      .then((length) => {
        for (let i = 0; i < length; i++) {
          itemsPage
            .itemPrices()
            .eq(i)
            .then(($el) => {
              const priceInt = Number($el.text().replace(/\D/g, ""));
              if (i == 0) {
                prevElem = priceInt;
              } else {
                const options = {
                  1: function (priceInt, prevElem) {
                    expect(priceInt >= prevElem).to.be.true;
                  },
                  2: function (priceInt, prevElem) {
                    expect(priceInt <= prevElem).to.be.true;
                  },
                };

                options[optionNum](priceInt, prevElem);
              }

              prevElem = priceInt;
            });
        }
      });
  }
}
