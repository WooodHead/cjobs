import { ApolloServer, gql } from "apollo-server-micro";
import {
  MultiMatchQuery,
  RefinementSelectFacet,
  SearchkitResolver,
  SearchkitSchema,
} from "@searchkit/schema";
import cors from "micro-cors";
import { useEffect } from "react";

const searchkitConfig = {
  host: "167.172.142.105:5000",
  index: "cassandra_job_posts",
  hits: {
    fields: [
      "external_api_name",
      "external_api_id",
      "original_post_url",
      "tags",
      "external_api_published_at",
      "description",
      "description_html",
      "position_name",
      "position_category",
      "company_name",
      "company_logo_url",
      "external_api_verified",
      "external_api_original",
      "external_api_updated_at",
      "job_post_image_url",
      "location",
      "company_url",
      "job_hours_type",
      "how_to_apply_html",
      "updated_at",
    ],
  },
  query: new MultiMatchQuery({
    fields: ["description^1"],
  }),
  facets: [
    new RefinementSelectFacet({
      identifier: "relevance",
      field: "_score",
      label: "Relevance",
    }),
    new RefinementSelectFacet({
      identifier: "latest releases",
      field: "external_api_published_at",
      label: "Latest Releases",
    }),
    new RefinementSelectFacet({
      identifier: "earliest releases",
      field: "external_api_published_at",
      label: "Earliest Releases",
    }),
  ],
};

const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig,
  typeName: "ResultSet", // type name for Searchkit Root
  hitTypeName: "ResultHit", // type name for each search result
  addToQueryType: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// const typeDefs = [
//   gql`
//     type Query {
//       root: String
//     }

//     type Mutation {
//       root: String
//     }
//   `,
// ];
const server = new ApolloServer({
  typeDefs: [
    gql`
      type Query {
        root: String
      }

      type HitFields {
        external_api_name: String
        external_api_id: Int
        original_post_url: String
        tags: [String]
        external_api_published_at: Int
        description: String
        description_html: String
        position_name: String
        position_category: String
        company_name: String
        company_logo_url: String
        external_api_verified: String
        external_api_original: String
        external_api_updated_at: Int
        job_post_image_url: String
        location: String
        company_url: String
        job_hours_type: String
        how_to_apply_html: String
        updated_at: Int
      }

      type ResultHit implements SKHit {
        id: ID!
        fields: HitFields
        customField: String
      }
    `,
    ...typeDefs,
  ],
  resolvers: withSearchkitResolvers({}),
  introspection: true,
  playground: true,
  context: {
    ...context,
  },
});

const handler = server
  .start()
  .then((res) => server.createHandler({ path: "/api/graphql" }));

export default cors()((req, res) =>
  req.method === "OPTIONS" ? res.end() : handler
);
