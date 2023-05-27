import HomePage from "../pageobjects/homePage.js";

const homePage = new HomePage();

export function checkBasket(itemsCount) {
  let itemsStoreNamesArr = [];
  let priceStoreArr = [];
  let priceStoreSum = 0;

  homePage.itemNames().each(($el, index) => {
    if (index < itemsCount) {
      itemsStoreNamesArr.push($el.text());
    }
  });

  homePage.itemPrices().each(($el, index) => {
    if (index < itemsCount) {
      const priceStr = $el.text().replace(/\D/g, "");
      const priceInt = Number(priceStr);
      priceStoreArr.push(priceInt);
      priceStoreSum += priceInt;
    }
  });

  homePage.itemsBasketBtn().each(($el, index) => {
    cy.intercept("POST", /.*cart-se\/add.*/).as("add-to-busket");
    if (index < itemsCount) {
      cy.wrap($el).click();
      cy.wait("@add-to-busket", { timeout: 10000 })
        .its("response.statusCode")
        .should("eq", 200);
    }
  });

  homePage.basketBtn().click();

  let itemsBasketNamesArr = [];
  let priceBasketArr = [];
  let basketCalcSum = 0;
  let basketItemsCount = 0;

  homePage.basketItemNames().each(($el) => {
    itemsBasketNamesArr.push($el.text());
    basketItemsCount++;
  });

  homePage.basketPriceValues().each(($el) => {
    const priceStr = $el.text().replace(/\D/g, "");
    const priceInt = Number(priceStr);
    priceBasketArr.unshift(priceInt);
    basketCalcSum += priceInt;
  });

  homePage.basketSum().then(($el) => {
    cy.wrap(priceStoreSum).should("deep.equal", basketCalcSum);
    const basketItemsPricesSum = Number($el.text().replace(/\D/g, ""));
    cy.wrap(priceStoreSum).should("deep.equal", basketItemsPricesSum);
    cy.wrap(priceStoreArr).should("deep.equal", priceBasketArr);
  });
}
