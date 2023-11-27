const baseUrl = Cypress.env("CYPRESS_BASE_URL") || "http://localhost:5173";

describe("Routes tests", () => {
  it("Application default page /", () => {
    cy.visit("/");
    cy.url().should("eq", baseUrl + "/");
  });
  it("Visits the app with route that doesnt exist redirect to /", () => {
    cy.visit("/unknownroute");
    cy.url().should("eq", baseUrl + "/");
  });
});
