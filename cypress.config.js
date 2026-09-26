const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com'
  },
  defaultCommandTimeout: 10000,

  viewportWidth: 1440,
  viewportHeight: 900,
});
