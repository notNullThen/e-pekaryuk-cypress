import { applyPriceFilter } from "../models/filters.js";
import { checkItemsPrices } from "../models/filters.js";
import { categoryNav } from "../models/categoriesNav.js";
import { brandFilter } from "../models/brandFilter.js";
import { selectSortingOption } from "../models/filters.js";
import { categoriesNamesCheck } from "../models/categoriesNav.js";
import { checkBasket } from "../models/basket.js";

describe("template spec", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.visit("/");
  });

  it("Compare the sidebar categories names with opened pages names", () => {
    categoriesNamesCheck();
  });

  it("should check the items names to contain the filtered brand name", () => {
    // Open the CCTV category
    categoryNav(5, 96);

    brandFilter(Cypress.env("brand_name"), true);
  });

  it("Should check the price filter", () => {
    categoryNav(5, 96);

    // Declare price variables
    let minPrice = Cypress.env("min_price");
    let maxPrice = Cypress.env("max_price");

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

    // true if want to check the price sorting
    selectSortingOption(1, true);
  });

  it("Should test the basket", () => {
    categoryNav(8, 5);
    checkBasket(5);
  });
});
