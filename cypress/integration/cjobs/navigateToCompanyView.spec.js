/// <reference types="cypress"/>

describe("Company View Test", () => {
  beforeEach(() => {
    cy.NavigateToCompanyView("Novartis");
  });

  context("Initial Load", () => {
    it("Is card with correct company visible", () => {
      cy.contains("[data-cy='companyName']", "Novartis").should("be.visible");
    });

    context("Is card clickable", () => {
      it("Is it clickable", () => {
        cy.contains("[data-cy='companyName']", "Novartis").click();
        cy.contains("Summary").should("be.visible");
        cy.contains("Description").should("be.visible");
        cy.contains("[data-cy='companyLink']", "Novartis").should("be.visible");
      });
    });

    context("Goes to company view", () => {
      it("Goes to the company view", () => {
        cy.contains("[data-cy='companyName']", "Novartis").click({
          multiple: true,
        });
        cy.contains("[data-cy='companyLink']", "Novartis").click({
          multiple: true,
        });
        cy.url().should("include", "/company-view/Novartis");
      });
    });
  });
});
