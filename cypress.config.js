const fs = require('fs');
const path = require('path');
const { defineConfig } = require('cypress');

const reportsDir = 'cypress/reports';
const jsonDir = path.join(reportsDir, '.jsons');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: reportsDir,
    jsonDir,
    reportPageTitle: 'Relatório de Testes - Automation Exercise',
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1440,
    viewportHeight: 900,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    setupNodeEvents(on, config) {
      fs.mkdirSync(jsonDir, { recursive: true });
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
