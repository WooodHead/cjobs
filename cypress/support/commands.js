// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("HomePage", () => {
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("NavigateToCompanyView", (term) => {
  cy.visit("http://localhost:3000");
  cy.get("[data-cy='searchBox']").type(term);
});

Cypress.Commands.add("CompanyView", (term) => {
  cy.visit(`http://localhost:3000/company-view/${term}`);
});

Cypress.Commands.add("LoadsData", (filePath) => {
  //   cy.visit("http://localhost:3000");
  cy.intercept(
    {
      method: "POST",
      pathname: "/api/graphql",
      headers: {
        "x-gql-operation-name": "resultSet",
      },
    },
    {
      fixture: filePath,
    }
  ).as("resultSet");

  cy.visit("http://localhost:3000");
});
