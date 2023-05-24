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
        cy.get(this.subCategories).eq(95).click()
        cy.intercept('GET', 'https://design.rozetka.com.ua/assets/common/img/icons/sprite.svg')
            .as('get-banners')
        cy.wait('@get-banners').its('response.statusCode').should('eq', 200)
    }

    applyPriceFilter() {
        cy.get(this.priceMinFilter).click()
        cy.get(this.priceMinFilter)
            .clear().should('have.value', '')
        cy.get(this.priceMinFilter)
            .type(Cypress.env('min_price'), { delay: 100 }).should('have.value', Cypress.env('min_price'))
        cy.get(this.priceMaxFilter)
            .clear().should('have.value', '')
        cy.get(this.priceMaxFilter).click()
        cy.get(this.priceMaxFilter)
            .type(Cypress.env('max_price'), { delay: 100 }).should('have.value', Cypress.env('max_price'))
        cy.get(this.applyPriceFilterBtn)
            .contains('Ok')
        cy.get(this.applyPriceFilterBtn).click()
        cy.intercept('GET', /https:\/\/common-api\.rozetka\.com\.ua\/v2\/goods\/get-price.*/).as('get-price')
        cy.wait('@get-price').its('response.statusCode').should('eq', 200)
    }
}

export default new HomePage();