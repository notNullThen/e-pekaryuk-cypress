// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("interceptShort", (method, endpoint, alias) => {
  cy.intercept(method, endpoint).as(alias);
});
Cypress.Commands.add("waitShort", (alias) => {
  cy.wait(`@${alias}`, { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("interceptAddToBusket", () => {
  cy.intercept("POST", /.*cart-se\/add.*/).as("add-to-busket");
});
Cypress.Commands.add("waitAddToBusket", () => {
  cy.wait("@add-to-busket", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("interceptGetPrice", () => {
  cy.intercept("GET", /.*goods\/get-price.*/).as("get-price");
});
Cypress.Commands.add("waitGetPrice", () => {
  cy.wait("@get-price", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("interceptSearchAutocomplete", () => {
  cy.intercept("GET", /.*search.*autocomplete.*/).as("search-autocomplete");
});
Cypress.Commands.add("waitSearchAutocomplete", () => {
  cy.wait("@search-autocomplete", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("interceptCartItemDelete", () => {
  cy.intercept("POST", /.*cart-se\/delete.*/).as("cart-item-delete");
});
Cypress.Commands.add("waitCartItemDelete", () => {
  cy.wait("@cart-item-delete", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("interceptGetCartBlocks", () => {
  cy.intercept("GET", /.*get-cart-blocks.*/).as("get-cart-blocks");
});
Cypress.Commands.add("waitGetCartBlocks", () => {
  cy.wait("@get-cart-blocks", { timeout: 10000 })
    .its("response.statusCode")
    .should("eq", 200);
});

Cypress.Commands.add("clickBrandFilter", (brandName) => {
  cy.get(`[data-id=${brandName}]`).click();
});
