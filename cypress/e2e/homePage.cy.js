import { categoriesNamesCheck } from "../models/categoriesNav.js";
import { searchSuggestionsCheck, searchItemsCheck } from "../models/search.js";

describe("Home Page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Compare the sidebar categories names with opened pages names", () => {
    categoriesNamesCheck();
  });

  it("Should test the search function", () => {
    const searchQuery = "GoOgLe PiXeL";
    searchSuggestionsCheck(searchQuery);
    searchItemsCheck(searchQuery);
  });
});
