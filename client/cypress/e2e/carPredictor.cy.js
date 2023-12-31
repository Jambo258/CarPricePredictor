/* eslint-disable cypress/no-unnecessary-waiting */

describe("Car price predictor tests", () => {
  beforeEach(() => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("admin@admin.com");
    cy.get('input[placeholder="Password"]').type("admin");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("Logout").should("be.visible");
    cy.wait(1000);
  });
  it("Try to submit Invalid values on the car price predictor form", () => {
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Manufactorer is required").should("be.visible");
    cy.contains("Model is required").should("be.visible");
    cy.contains("fuelType is required").should("be.visible");
    cy.contains("Transmission is required").should("be.visible");
    cy.contains("OfferType is required").should("be.visible");
    cy.wait(1000);
  });

  it("Try to submit false values on the car price predictor form", () => {
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.get('input[placeholder="Kilometer"]').clear();
    cy.get('input[placeholder="Kilometer"]').type("-100");
    cy.get('input[placeholder="Horsepower"]').clear();
    cy.get('input[placeholder="Horsepower"]').type("-100");
    cy.get('input[placeholder="Year"]').clear();
    cy.get('input[placeholder="Year"]').type("1899");
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Kilometer must be positive").should("be.visible");
    cy.contains("Horsepower must be positive").should("be.visible");
    cy.contains("Cars were invented in the 1900's").should("be.visible");
    cy.wait(1000);
  });
  it("Try to submit empty fields on the car price predictor form", () => {
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.get('input[placeholder="Kilometer"]').clear();
    cy.get('input[placeholder="Horsepower"]').clear();
    cy.get('input[placeholder="Year"]').clear();
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Kilometer is required").should("be.visible");
    cy.contains("Horsepower is required").should("be.visible");
    cy.contains("Year is required").should("be.visible");
    cy.wait(1000);
  });
  it("Succeesfull prediction", () => {
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.get('input[placeholder="Kilometer"]').clear();
    cy.get('input[placeholder="Kilometer"]').type("100000");
    cy.get(".predict-form")
      .find(".w-100")
      .find(".dropdown-component")
      .contains("Select Manufactorer")
      .click();
    cy.get(".dropdown-item").contains("Mercedes-Benz").click();
    cy.get(".predict-form")
      .find(".w-100")
      .find(".dropdown-component")
      .contains("Select Model")
      .click();
    cy.get(".dropdown-item").contains("C 200").click();
    cy.get(".predict-form")
      .find(".w-100")
      .find(".dropdown-component")
      .contains("Select fuelType")
      .click();
    cy.get(".dropdown-item").contains("Diesel").click();
    cy.get(".predict-form")
      .find(".w-100")
      .find(".dropdown-component")
      .contains("Select gearType")
      .click();
    cy.get(".dropdown-item").contains("Manual").click();
    cy.get(".predict-form")
      .find(".w-100")
      .find(".dropdown-component")
      .contains("Select offerType")
      .click();
    cy.get(".dropdown-item").contains("Used").click();
    cy.get('input[placeholder="Horsepower"]').clear();
    cy.get('input[placeholder="Horsepower"]').type("137");
    cy.get('input[placeholder="Year"]').clear();
    cy.get('input[placeholder="Year"]').type("2015");
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Price prediction:").should("be.visible");
    cy.wait(1000);
  });
});
