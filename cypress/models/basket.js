import Page from "../pageobjects/page.js";
import ItemsPage from "../pageobjects/itemsPage.js";

const page = new Page();
const itemsPage = new ItemsPage();

export function checkBasket(itemsCount) {
  let itemsStoreNamesArr = [];
  let priceStoreArr = [];
  let priceStoreSum = 0;

  itemsPage.itemNames().each(($el, index) => {
    if (index < itemsCount) {
      itemsStoreNamesArr.push($el.text());
    }
  });

  itemsPage.itemPrices().each(($el, index) => {
    if (index < itemsCount) {
      const priceStr = $el.text().replace(/\D/g, "");
      const priceInt = Number(priceStr);
      priceStoreArr.push(priceInt);
      priceStoreSum += priceInt;
    }
  });

  page.itemsBasketBtn().each(($el, index) => {
    cy.intercept("POST", /.*cart-se\/add.*/).as("add-to-busket");
    if (index < itemsCount) {
      cy.wrap($el).click();
      cy.wait("@add-to-busket", { timeout: 10000 })
        .its("response.statusCode")
        .should("eq", 200);
    }
  });

  page.basketBtn().click();

  let itemsBasketNamesArr = [];
  let priceBasketArr = [];
  let basketCalcSum = 0;
  let basketItemsCount = 0;

  page.basketItemNames().each(($el) => {
    itemsBasketNamesArr.push($el.text());
    basketItemsCount++;
  });

  page.basketPriceValues().each(($el) => {
    const priceStr = $el.text().replace(/\D/g, "");
    const priceInt = Number(priceStr);
    priceBasketArr.unshift(priceInt);
    basketCalcSum += priceInt;
  });

  page.basketSum().then(($el) => {
    cy.wrap(priceStoreSum).should("deep.equal", basketCalcSum);
    const basketItemsPricesSum = Number($el.text().replace(/\D/g, ""));
    cy.wrap(priceStoreSum).should("deep.equal", basketItemsPricesSum);
    cy.wrap(priceStoreArr).should("deep.equal", priceBasketArr);
  });
}
