import {
  applyPriceFilter,
  checkItemsPrices,
  selectSortingOption,
} from "../models/filtersSortings.js";
import { categoryNav } from "../models/categoriesNav.js";
import { brandFilter } from "../models/brandFilter.js";

describe("Items Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("Should check the items names to contain the filtered brand name", () => {
    // Open the CCTV category
    categoryNav(5, 96);

    brandFilter(Cypress.env("brand_name"), true);
  });
});
