const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    // min_price: 14372,
    // max_price: 18787,
  },
});

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://rozetka.com.ua",
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
