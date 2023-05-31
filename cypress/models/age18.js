import Page from "../pageobjects/page.js";
import ItemsPage from "../pageobjects/itemsPage.js";

const page = new Page();
const itemsPage = new ItemsPage();

export function checkFullAgePopUpDecline(itemsCount) {
  page.declineBtn().click({ timeout: 10000 });
  page.headerTxt().should("have.text", "Товари для дітей");
}

export function checkFullAgePopUpConfirm(itemsCount) {
  page.confirmBtn().click({ timeout: 10000 });
  /* eslint-disable cypress/no-unnecessary-waiting */
  cy.wait(5000);
  /* eslint-enable cypress/no-unnecessary-waiting */
  cy.reload();
  /* eslint-disable cypress/no-unnecessary-waiting */
  cy.wait(5000);
  /* eslint-enable cypress/no-unnecessary-waiting */
  page.confirmBtn().should("not.exist");
  page.declineBtn().should("not.exist");
}
