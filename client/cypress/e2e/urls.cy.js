
describe("Routes tests", () => {
  it("Application default page /", () => {
    cy.visit("/");
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
  });
  it("Visits the app with route that doesnt exist redirect to /", () => {
    cy.visit("/unknownroute");
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
  });
});
