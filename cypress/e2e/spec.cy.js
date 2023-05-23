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
      let elemTxt = ''
      cy.get(HomePage.sbElems).eq(i).invoke('text')
      .then((text) => {
        cy.get(HomePage.sbElems).eq(i).click()
        // text = text.replace(/’/g, "'")
        text = text.replace("’", "'")
        cy.get(HomePage.headerTxt).contains(text, { matchCase: false })
        // cy.get(HomePage.headerTxt).should('have.text', text)
        cy.go('back')
      })
      cy.get(HomePage.sbElems).should('exist')
    }
  })

  it('Should check the price filter', () => {
    let priceMin = 14372;
    let priceMax = 18787;

    cy.get(HomePage.sbElems).eq(4).click()
    cy.get(HomePage.subCategories).eq(95).should('exist')
    cy.get(HomePage.subCategories).eq(95).click()
    cy.get(HomePage.priceMinFilter).click()
    cy.get(HomePage.priceMinFilter).clear()
    cy.get(HomePage.priceMinFilter)
      .type(priceMin).should('have.value', priceMin)
    cy.get(HomePage.priceMaxFilter).clear()
    cy.get(HomePage.priceMaxFilter).click()
    cy.get(HomePage.priceMaxFilter)
      .type(priceMax).should('have.value', priceMax)
    cy.get(HomePage.applyPriceFilterBtn).click()
    cy.get('[data-id="ATEN"]').click();
    cy.get('[data-id="ATIS"]').click();
    cy.get('[data-id="AVC"]').click();
    cy.get(HomePage.itemPrices).each(($el, index, $list) => {
      const price = $el.text().replace(/\D/g, '')
      const num = Number(price)
      expect(num).to.be.gte(priceMin)
      expect(num).to.be.lte(priceMax)
    })
  })
})