/* eslint-disable cypress/no-unnecessary-waiting */

describe("User routes tests", () => {
  it("Navigate to registrationpage on navbar", () => {
    cy.visit("/");
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.get('a[href="/registerpage"]').click();
    cy.url().should("include", "/registerpage");
  });
  it("Try to register user with existing email", () => {
    cy.visit("/registerpage");
    cy.get('input[placeholder="Username"]').type("testinguser");
    cy.get('input[placeholder="Email"]').type("admin@admin.com");
    cy.get('input[placeholder="Password"]').type("testinguser");
    cy.get('input[placeholder="Retype Password"').type("testinguser");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Email exists").should("be.visible");
    cy.wait(1000);
  });
  it("Try to register user with false inputs", () => {
    cy.visit("/registerpage");
    cy.get('input[placeholder="Username"]').type("test");
    cy.get('input[placeholder="Email"]').type("testguy");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('input[placeholder="Retype Password"').type("password1");
    cy.get('input[placeholder="Retype Password"').blur();
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Invalid email form").should("be.visible");
    cy.contains("Passwords must match").should("be.visible");
    cy.wait(1000);
  });
  it("Register user succeessfully", () => {
    cy.visit("/registerpage");
    cy.get('input[placeholder="Username"]').type("testguy");
    cy.get('input[placeholder="Email"]').type("testguy@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('input[placeholder="Retype Password"').type("password");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("Logout").should("be.visible");
  });
  it("Navigate to loginpage on navbar", () => {
    cy.visit("/");
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.get('a[href="/loginpage"]').click();
    cy.url().should("include", "/loginpage");
  });
  it("Try to login with with false input", () => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("testguy");
    cy.get('input[placeholder="Password"]').type("pass");
    cy.get('input[placeholder="Password"').blur();
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Password must be at least 5 characters").should("be.visible");
    cy.contains("Invalid email form").should("be.visible");
    cy.wait(1000);
  });
  it("Try to login with user that doesnt exist", () => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("testguy123@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Couldnt find user").should("be.visible");
    cy.wait(1000);
  });
  it("Login succeessfully", () => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("testguy@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("Logout").should("be.visible");
  });
});

describe("Tests when user is logged in", () => {
  beforeEach(() => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("testguy@gmail.com");
    cy.get('input[placeholder="Password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains("Logout").should("be.visible");
    cy.wait(1000);
  });

  it("Try to change username with false input", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change username").click();
    cy.get('input[placeholder="Username"]').clear();
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Username is required").should("be.visible");
    cy.wait(1000);
  });

  it("Try to change password with false input", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change Password").click();
    cy.get('input[placeholder="Password"]').clear();
    cy.get('input[placeholder="Retype Password"]').clear();
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("Password is required").should("be.visible");
    cy.contains("Retype Password is required").should("be.visible");
    cy.wait(1000);
  });

  it("Try to change password without giving same passwords", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change Password").click();
    cy.get('input[placeholder="Password"]').type("password1");
    cy.get('input[placeholder="Retype Password"]').type("password2");
    cy.contains("button", "Submit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Passwords must match").should("be.visible");
    cy.wait(1000);
  });

  it("Try to change email with false input", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change Email").click();
    cy.get('input[placeholder="Email"]').clear();
    cy.contains("button", "Submit").should('be.visible').click();
    cy.wait(1000);
    cy.contains("Email is required").should("be.visible");
    cy.wait(1000);
  });

  it("Delete account and on verification modal press cancel", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Delete").click();
    cy.contains("User Deletion Verification").should("be.visible");
    cy.contains("button", "Cancel").should('be.visible').click();
    cy.wait(1000);
  });

  it("Change username successfully", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change username").click();
    cy.get('input[placeholder="Username"]').clear();
    cy.get('input[placeholder="Username"]').type("newusername");
    cy.contains("button", "Submit").click();
    cy.wait(1000);
    cy.contains("newusername").should("exist");
    cy.wait(1000);
  });

  it("Change email & password successfully", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Change Password").click();
    cy.get('input[placeholder="Password"]').type("password1");
    cy.get('input[placeholder="Retype Password"]').type("password1");
    cy.contains("button", "Submit").should('be.visible').click();
    cy.wait(1000);
    cy.contains("Change Email").click();
    cy.get('input[placeholder="Email"]').type("newusername@gmail.com");
    cy.contains("button", "Submit").should('be.visible').click();
    cy.wait(1000);
    cy.contains("newusername@gmail.com").should("exist");
    cy.wait(1000);
  });
});

describe("Logged in user tests after changing password and email", () => {
  beforeEach(() => {
    cy.visit("/loginpage");
    cy.get('input[placeholder="Email"]').type("newusername@gmail.com");
    cy.get('input[placeholder="Password"]').type("password1");
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("Logout").should("be.visible");
    cy.wait(1000);
  });

  it("Delete user succeessfully", () => {
    cy.get('a[href="/profilepage"]').click();
    cy.url().should("include", "/profilepage");
    cy.contains("Delete").click();
    cy.contains("User Deletion Verification").should("be.visible");
    cy.get('[data-testid="confirm-delete"]').click();
    cy.wait(1000);
    // cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.url().should("eq", Cypress.env("CYPRESS_baseUrl") + "/");
    cy.contains("Login").should("be.visible");
    cy.contains("Register").should("be.visible");
    cy.wait(1000);
  });
});
