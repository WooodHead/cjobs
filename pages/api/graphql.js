import Cors from "micro-cors";
import {ApolloServer, gql} from 'apollo-server-micro';
import {
  MultiMatchQuery,
  SearchkitSchema
} from '@searchkit/schema'

const searchkitConfig = {
  host: 'http://localhost:9200',
  index: 'cassandra_job_posts',
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
  query: new MultiMatchQuery({ fields: [] }),
  facets: []
}
const { typeDefs, withSearchkitResolvers, context } = SearchkitSchema({
  config: searchkitConfig, // searchkit configuration
  typeName: 'ResultSet', // type name for Searchkit Root
  hitTypeName: 'ResultHit', // type name for each search result
  addToQueryType: true // When true, adds a field called results to Query type
})

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
      root: String
    }

    # Type name should match the hit typename
    type ResultHit implements SKHit {
      id: ID!
      fields: HitFields
    }
  `, ...typeDefs
  ],
  resolvers: withSearchkitResolvers({}),
  introspection: true,
  playground: true,
  context: {
    ...context
  }
})

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});