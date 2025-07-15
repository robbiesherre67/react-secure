const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // where your app lives in CI/local
    baseUrl: 'http://localhost:3000',
    supportFile: false,        // you can set up later
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
});
