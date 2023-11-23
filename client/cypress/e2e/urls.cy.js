describe("Routes tests", () => {
  it("Application default page /", () => {
    cy.visit("/");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
  it("Visits the app with route that doesnt exist redirect to /", () => {
    cy.visit("/unknownroute");
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});
