/// <reference types="Cypress" />
const searchValue = "cats";

describe("example test", () => {
  it("checks for highlight modal", () => {
    cy.visit("localhost:3000");
    cy.get("[data-cy=highlight_modal_toggle]").click();
    cy.get("[data-cy=highlight_modal]");
  });

  it("goes to explore page", () => {
    cy.visit("localhost:3000");
    cy.get("[data-cy=explore_page_icon]").click();
    cy.url().should("include", "explore");
  });

  it(`searches for ${searchValue}`, () => {
    cy.get("[data-cy=search_input]")
      .type(searchValue)
      .should("have.value", searchValue)
      .type("{enter}");
    cy.url().should("include", searchValue);
  });

  it(`switch to collections search page`, () => {
    cy.get("[data-cy=search_button_collections]").click();
    cy.url().should("include", `collections/${searchValue}`);
  });

  it(`switch to back to photos search page`, () => {
    cy.get("[data-cy=search_button_photos]").click();
    cy.url().should("include", `photos/${searchValue}`);
  });

  it("goes to home page", () => {
    cy.get("[data-cy=home_page_icon]").click();
    cy.url().should("include", "localhost:3000");
  });

  it("goes to user page", () => {
    cy.get("[data-cy=home_page_card_user_header]")
      .first()
      .click();
    cy.url().should("include", "user");
    cy.get("[data-cy=grid_photo]")
      .first()
      .click();
    cy.get("[data-cy=showcase_modal]");
  });
});
