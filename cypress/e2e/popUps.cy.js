import { categoryNav } from "../models/categoriesNav.js";
import { checkBasket } from "../models/basket.js";
import {
  checkFullAgePopUpDecline,
  checkFullAgePopUpConfirm,
} from "../models/fullAge.js";

describe("Pop-ups tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should test the basket", () => {
    categoryNav(8, 5);
    checkBasket(5);
  });

  it("Should test the Age 18+ confirmation pup-up", () => {
    categoryNav(16, 5);
    checkFullAgePopUpDecline();
    categoryNav(16, 5);
    checkFullAgePopUpConfirm();
  });
});
