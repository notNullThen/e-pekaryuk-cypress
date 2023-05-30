import { applyPriceFilter } from "../models/filtersSortings.js";
import { checkItemsPrices } from "../models/filtersSortings.js";
import { categoryNav } from "../models/categoriesNav.js";
import { brandFilter } from "../models/brandFilter.js";
import { selectSortingOption } from "../models/filtersSortings.js";
import { categoriesNamesCheck } from "../models/categoriesNav.js";
import { checkBasket } from "../models/basket.js";
import { searchSuggestionsCheck } from "../models/search.js";
import { searchItemsCheck } from "../models/search.js";

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Compare the sidebar categories names with opened pages names", () => {
    categoriesNamesCheck();
  });

  it("Should check the price filter", () => {
    categoryNav(5, 96);

    // Declare price variables
    const minPrice = Cypress.env("min_price");
    const maxPrice = Cypress.env("max_price");

    applyPriceFilter(minPrice, maxPrice);

    // Apply brand filters (optional)
    brandFilter("ATEN");
    brandFilter("ATIS");
    brandFilter("AVC");

    checkItemsPrices(minPrice, maxPrice);

    // Remove brand filters (optional)
    brandFilter("ATEN");
    brandFilter("ATIS");
    brandFilter("AVC");

    checkItemsPrices(minPrice, maxPrice);
  });

  it("Should check the price sorting", () => {
    categoryNav(5, 96);

    // true - if want to check the price sorting
    selectSortingOption(1, true);
    selectSortingOption(2, true);
  });

  it("Should test the basket", () => {
    categoryNav(8, 5);
    checkBasket(5);
  });

  it("Should test the search function", () => {
    const searchQuery = "GoOgLe PiXeL";
    searchSuggestionsCheck(searchQuery);
    searchItemsCheck(searchQuery);
  });

  it("Should check the items names to contain the filtered brand name", () => {
    // Open the CCTV category
    categoryNav(5, 96);

    brandFilter(Cypress.env("brand_name"), true);
  });
});
