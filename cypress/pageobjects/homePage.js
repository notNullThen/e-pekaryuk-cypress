class HomePage {
    searchField = '[search-input]'
    searchBtn = 'button.search-form__submit'
    searchSuggestions = 'header form a > span'
    sbElems = 'aside rz-sidebar-fat-menu a'
    headerTxt = 'section h1'
    itemNames = 'app-goods-tile-default div > a > span'
    subCategories = 'rz-list-tile a'

    // Filters
    filterCheckboxes = 'aside a'
    priceMinFilter = '[formcontrolname="min"]'
    priceMaxFilter = '[formcontrolname="max"]'
    applyPriceFilterBtn = 'button[type=submit]'

    // Sotring
    sortingSelector = 'rz-sort select'


    // Confirm 18+ years dialog
    confirmBtn = 'div.rz-btn_blue'
    declineBtn = 'div.rz-btn_gray'

    // Price
    itemPrices = 'rz-catalog-tile div > p > span'

    // Localization
    uaLangBtn = '[alt="ua"]';

    // Basket
    basketBtn = '[rzopencart]'
    itemBasketBtn = 'app-buy-button'
    basketPriceValues = '[data-testid="cost"]'
    basketItemNames = '[data-testid="title"]'
    basketSum = '[data-testid="cart-receipt-sum"]'
    itemsThreeDotsBtns = 'rz-popup-menu button'
    itemDelBtn = 'rz-trash-icon button'

    cctvCategoryNav() {
        cy.get(this.sbElems).eq(4).click()
        cy.get(this.subCategories).eq(95).should('exist')
        cy.get(this.subCategories).eq(95).click()
        cy.wait(3000)
    }

    applyPriceFilter() {
        cy.get(this.priceMinFilter).click()
        cy.get(this.priceMinFilter)
            .clear().wait(1000).should('have.value', '')
        cy.get(this.priceMinFilter)
            .type(Cypress.env('min_price'), { delay: 100 }).should('have.value', Cypress.env('min_price'))
        cy.get(this.priceMaxFilter)
            .clear().wait(1000).should('have.value', '')
        cy.get(this.priceMaxFilter).click()
        cy.get(this.priceMaxFilter)
            .type(Cypress.env('max_price'), { delay: 100 }).should('have.value', Cypress.env('max_price'))
        cy.wait(3000)
        cy.get(this.applyPriceFilterBtn)
            .contains('Ok')
            .click()
        cy.wait(3000)
    }
}

export default new HomePage();