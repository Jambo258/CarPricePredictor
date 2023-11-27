/* eslint-disable cypress/no-unnecessary-waiting */

const baseUrl = Cypress.env("CYPRESS_BASE_URL") || "http://localhost:5173";

describe("Dummy user to admin control panel", () => {
  it("Register dummy user for admin to delete", () => {
    cy.visit("/registerpage");
    cy.get('input[placeholder="Username"]').type("dummydude");
    cy.get('input[placeholder="Email"]').type("dummydude@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('input[placeholder="Retype Password"').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", baseUrl + "/");
    cy.contains("Logout").should("be.visible");
  });
  });
  describe("Admin control panel tests", () => {
    beforeEach(() => {
      cy.visit("/loginpage");
      cy.get('input[placeholder="Email"]').type("admin@admin.com");
      cy.get('input[placeholder="Password"]').type("admin");
      cy.get('button[type="submit"]').click();
      cy.url().should("eq", baseUrl + "/");
      cy.contains("Logout").should("be.visible");
      cy.wait(1000);
    });


  it("change dummy user username as admin", () => {
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.get(".container")
      .find(".card")
      .find(".card-body")
      .contains(".card-text", "dummydude")
      .should("be.visible")
      .parent()
      .find(".list-group")
      .should("be.visible")
      .find(".list-group-item")
      .should("be.visible")
      .find(".btn.btn-primary")
      .contains("Change username")
      .click();
    cy.get('input[placeholder="Username"]').type("dummydude123");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.contains("dummydude123").should("be.visible");
  });
  it("change dummy user email as admin", () => {
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.get(".container")
      .find(".card")
      .find(".card-body")
      .contains(".card-text", "dummydude123")
      .should("be.visible")
      .parent()
      .find(".list-group")
      .should("be.visible")
      .find(".list-group-item")
      .should("be.visible")
      .find(".btn.btn-primary")
      .contains("Change Email")
      .click();
    cy.get('input[placeholder="Email"]').type("dummydude123@gmail.com");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.contains("dummydude123@gmail.com").should("be.visible");
  });
  it("change dummy user password as admin", () => {
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.get(".container")
      .find(".card")
      .find(".card-body")
      .contains(".card-text", "dummydude123")
      .should("be.visible")
      .parent()
      .find(".list-group")
      .should("be.visible")
      .find(".list-group-item")
      .should("be.visible")
      .find(".btn.btn-primary")
      .contains("Change Password")
      .click();
    cy.get('input[placeholder="Password"]').type("dummydude123");
    cy.get('input[placeholder="Retype Password"]').type("dummydude123");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("dummydude123@gmail.com").should("be.visible");
  });
  it("change dummy user role as admin", () => {
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.get(".container")
      .find(".card")
      .find(".card-body")
      .contains(".card-text", "dummydude123")
      .should("be.visible")
      .parent()
      .find(".list-group")
      .should("be.visible")
      .find(".list-group-item")
      .should("be.visible")
      .find(".dropdown")
      .click()
      cy.get(".dropdown-item").contains("admin").click();
    cy.wait(1000);
  });
});
describe("Admin tests as new admin & delete dummy user", () => {
  it("login with dummy user new email & password", () => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("dummydude123@gmail.com");
    cy.get('input[placeholder="Password"]').type("dummydude123");
    cy.get('button[type="submit"]').click();
    cy.contains("Logout").should("be.visible");
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.wait(1000);
  });

  it("Login as admin and delete dummy user", () => {

    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("admin@admin.com");
    cy.get('input[placeholder="Password"]').type("admin");
    cy.get('button[type="submit"]').click();
    cy.url().should("eq", baseUrl + "/");
    cy.contains("Logout").should("be.visible");
    cy.wait(1000);
    cy.get('a[href="/adminpage"]').click();
    cy.url().should("include", "/adminpage");
    cy.get(".container")
      .find(".card")
      .find(".card-body")
      .contains(".card-text", "dummydude123")
      .should("be.visible")
      .parent()
      .find(".card-title")
      .should("be.visible")
      .find(".btn.btn-danger")
      .click();
    cy.get('[data-testid="confirm-delete"]').click();
    cy.contains("dummydude123").should("not.exist");
    cy.contains("Logout").click();
  });
});
