import Cors from "micro-cors";
import { ApolloServer, gql } from "apollo-server-micro";
import {
  // MultiMatchQuery,
  SearchkitSchema,
  // TermFilter,
} from "@searchkit/schema";
import { DateRangeFacet, MultiMatchQuery } from "@searchkit/sdk";
export const searchkitConfig = {
  host: "http://167.172.142.105:5000/api/elasticsearch",
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
    ]
  },
  sortOptions: [
    {
      id: "relevance",
      label: "Relevance",
      field: [{ _score: "desc" }],
    },
    {
      id: "latest",
      label: "latest",
      field: [{ external_api_published_at: "desc" }],
    },
    {
      id: "earliest",
      label: "earliest",
      field: [{ external_api_published_at: "asc" }],
    },
  ],
  query: new MultiMatchQuery({ fields: ["position_name^1"] }),

};
const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig, // searchkit configuration
  typeName: "ResultSet", // type name for Searchkit Root
  hitTypeName: "ResultHit", // type name for each search result
  addToQueryType: true, // When true, adds a field called results to Query type
});


export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({
  typeDefs: [
    gql`
      type Query {
        root: String
      }
      type HitFields {
        external_api_name: String
        external_api_id: String
        original_post_url: String
        tags: [String]
        external_api_published_at: String
        description: String
        description_html: String
        position_name: String
        position_category: String
        company_name: String
        company_logo_url: String
        external_api_verified: String
        external_api_original: String
        external_api_updated_at: String
        job_post_image_url: String
        location: String
        company_url: String
        job_hours_type: String
        how_to_apply_html: String
        updated_at: String
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

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});

