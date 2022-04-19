import { gql } from "@apollo/client";
// import { client } from "../../graphql-client";

describe("Initial Load Sanity Test", () => {
  before(() => {
    cy.LoadsData("firstload.json");
  });

  context("Fixture Data Loads", () => {
    it("Loads the right data", () => {
      const QUERY = gql`
        query resultSet(
          $query: String
          $filters: [SKFiltersSet]
          $page: SKPageInput
          $sortBy: String
        ) {
          results(query: $query, filters: $filters) {
            summary {
              total
              sortOptions {
                id
                label
              }
            }
            hits(page: $page, sortBy: $sortBy) {
              page {
                total
                totalPages
                pageNumber
                from
                size
              }
              sortedBy
              items {
                ... on ResultHit {
                  id
                  fields {
                    external_api_published_at
                    description
                    description_html
                    position_name
                    position_category
                    company_name
                    external_api_id
                  }
                }
              }
            }
            facets {
              identifier
              type
              label
              display
              entries {
                label
                count
              }
            }
          }
        }
      `;
      // cy.wrap(client.query({ query: QUERY })).its("data.resultSet");
    });
  });
});
