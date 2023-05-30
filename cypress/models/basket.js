import Page from "../pageobjects/page.js";
import ItemsPage from "../pageobjects/itemsPage.js";

const page = new Page();
const itemsPage = new ItemsPage();

export function checkBasket(itemsCount) {
  let itemsStoreNamesArr = [];
  let priceStoreArr = [];
  let priceStoreSum = 0;

  itemsPage.itemNames().then(($els) => {
    for (let i = 0; i < itemsCount; i++) {
      itemsStoreNamesArr.push($els.eq(i).text());
    }
  });

  itemsPage.itemPrices().then(($els) => {
    for (let i = 0; i < itemsCount; i++) {
      const priceStr = $els.eq(i).text().replace(/\D/g, "");
      const priceInt = Number(priceStr);
      priceStoreArr.push(priceInt);
      priceStoreSum += priceInt;
    }
  });

  page.itemsBasketBtn().then(($els) => {
    for (let i = 0; i < itemsCount; i++) {
      cy.interceptAddToBusket();
      cy.wrap($els.eq(i)).click();
      cy.waitAddToBusket();
    }
  });

  page.basketBtn().click();

  let itemsBasketNamesArr = [];
  let priceBasketArr = [];
  let basketCalcSum = 0;
  let basketItemsCount = 0;

  page
    .basketItemNames()
    .its("length")
    .then((length) => {
      for (let i = 0; i < length; i++) {
        page
          .basketItemNames()
          .eq(i)
          .then(($el) => {
            itemsBasketNamesArr.push($el.text());
            basketItemsCount++;
          });
      }
    });

  page
    .basketPriceValues()
    .its("length")
    .then((length) => {
      for (let i = 0; i < length; i++) {
        page
          .basketPriceValues()
          .eq(i)
          .then(($el) => {
            const priceStr = $el.text().replace(/\D/g, "");
            const priceInt = Number(priceStr);
            priceBasketArr.unshift(priceInt);
            basketCalcSum += priceInt;
          });
      }
    });

  page.basketSum().then(($el) => {
    cy.wrap(priceStoreSum).should("deep.equal", basketCalcSum);
    const basketItemsPricesSum = Number($el.text().replace(/\D/g, ""));
    cy.wrap(priceStoreSum).should("deep.equal", basketItemsPricesSum);
    cy.wrap(priceStoreArr).should("deep.equal", priceBasketArr);
  });
}
