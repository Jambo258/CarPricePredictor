/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  env: {
    CYPRESS_baseUrl: process.env.CYPRESS_baseUrl,
    codeCoverageTasksRegistered: true,
    coverage: process.env.CYPRESS_coverage,
    codeCoverage: {
      exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl,
    scrollBehavior: "bottom",
    viewportWidth: 1200,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);

      return config;
    },
  },
});
