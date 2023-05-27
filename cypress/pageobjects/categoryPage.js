class CategoryPage {
  subCategories() {
    return cy.get("rz-list-tile a");
  }
}

export default CategoryPage;
