/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  env: {
    CYPRESS_baseUrl: process.env.CYPRESS_baseUrl,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl,
    scrollBehavior: "bottom",
    viewportWidth: 1200,
    viewportHeight: 1200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
