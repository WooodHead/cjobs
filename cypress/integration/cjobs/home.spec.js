/// <reference types="cypress"/>

describe("Home Page", () => {
  beforeEach(() => {
    cy.HomePage();
  });

  context("Initial load", () => {
    it("Should find loading...", () => {
      cy.get("h1").contains("loading...");
    });

    context("Is the card clickable", () => {
      it("Clickable", () => {
        cy.get("[data-cy='card']").click({ multiple: true });
      });
    });

    context("Pagination functionality", () => {
      it("Pagination functionality", () => {
        cy.get("[data-cy='pagination']").click({ multiple: true });
      });
    });

    context("Search box functionality", () => {
      it("Find correct company", () => {
        cy.get("[data-cy='searchBox']").type("Novartis");
        cy.contains("Novartis").should("be.visible");
      });
    });

    context("Search box functionality", () => {
      it("Find for unexist company", () => {
        cy.get(".MuiInput-root").type("asdasdasdasd");
        cy.contains("No results found").should("be.visible");
      });
    });

    context("", () => {
      it("Sort options functionality, is clickable", () => {
        cy.get("[data-cy='sortSelector']").click();
      });
    });
  });
});
