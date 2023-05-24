import HomePage from "../pageobjects/homePage.js"

describe('template spec', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/')
  })

  it('Compare the sidebar categories names with opened pages names', () => {
    for (let i = 0; i < 15; i++) {
      if (i == 0 || i == 7 || i == 9 || i == 11) {
        continue;
      }
      cy.get(HomePage.sbElems).eq(i).invoke('text')
        .then((text) => {
          cy.get(HomePage.sbElems).eq(i).click()
          text = text.replace("’", "'")
          cy.get(HomePage.headerTxt).contains(text, { matchCase: false })
          cy.go('back')
        })
    }
  })

  it('should check the items names to contain the filtered brand name', () => {
    // Open the category
    HomePage.cctvCategoryNav()

    // Apply price filter (optional)
    HomePage.applyPriceFilter()

    // Brand filter apply
    cy.get(`[data-id=${Cypress.env('brand_name')}]`).click();

    // Check items names to contain the brand name
    cy.get(HomePage.itemNames).each(($el, index, $list) => {
      expect($el.text()).contains(Cypress.env('brand_name'))
    })

  })

  it('Should check the price filter', () => {

    // Open the category
    HomePage.cctvCategoryNav()

    //Aply price filter
    HomePage.applyPriceFilter()

    // Apply brand filters (optional)
    cy.get('[data-id="ATEN"]').click();
    cy.get('[data-id="ATIS"]').click();
    cy.get('[data-id="AVC"]').click();

    // Check items price
    cy.get(HomePage.itemPrices).each(($el, index, $list) => {
      const price = $el.text().replace(/\D/g, '')
      const num = Number(price)
      expect(num).to.be.gte(Cypress.env('min_price'))
      expect(num).to.be.lte(Cypress.env('max_price'))
    })

    // Remove brand filters
    cy.get('[data-id="ATEN"]').click();
    cy.get('[data-id="ATIS"]').click();
    cy.get('[data-id="AVC"]').click();

    // Check items price
    cy.get(HomePage.itemPrices).each(($el, index, $list) => {
      const price = $el.text().replace(/\D/g, '')
      const num = Number(price)
      expect(num).to.be.gte(Cypress.env('min_price'))
      expect(num).to.be.lte(Cypress.env('max_price'))
    })
  })

  it('Should check the price sorting', () => {
    HomePage.cctvCategoryNav()
    cy.get(HomePage.sortingSelector).select('1: cheap')
    cy.should('have.value', '1: cheap')
    cy.intercept('GET', /https:\/\/common-api\.rozetka\.com\.ua\/v2\/goods\/get-price.*/).as('get-price')
    cy.wait('@get-price').its('response.statusCode').should('eq', 200)

    let prevElem = 0
    cy.get(HomePage.itemPrices).each(($el) => {
      const priceInt = Number($el.text().replace(/\D/g, ''))
      expect(priceInt >= prevElem).to.be.true
      prevElem = priceInt
    })
  })
})