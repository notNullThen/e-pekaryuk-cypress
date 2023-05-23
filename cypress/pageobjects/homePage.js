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


}

export default new HomePage();