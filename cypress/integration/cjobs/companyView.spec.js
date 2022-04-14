/// <reference types="cypress"/>

describe("Company View Test", () => {
  beforeEach(() => {
    cy.CompanyView("Rockbot");
  });

  context("Initial Load", () => {
    it("The company name is visible", () => {
      cy.contains("Rockbot").should("be.visible");
    });

    context("Job posts", () => {
      it("Job post is visible", () => {
        cy.contains("Job Posts").should("be.visible");
      });
    });

    context("Tehnologies", () => {
      it("Tehnologie is visible", () => {
        cy.contains("Tehnologies").should("be.visible");
      });
    });

    context("Categories", () => {
      it("Categorie is visible", () => {
        cy.contains("Categories").should("be.visible");
      });
    });

    context("Mails", () => {
      it("Mail is exist", () => {
        cy.contains("[data-cy='mails']", "@").should("be.visible");
      });
    });
  });
});
