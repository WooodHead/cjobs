import {gql, useQuery} from '@apollo/client';
import withApollo from '../../lib/withApollo';

const QUERY = gql`
query ExampleQuery {
  root
  results {
    hits {
      items {
        ... on ResultHit {
          id
          fields {
            external_api_name
            external_api_id
            external_api_verified
          }
        }
      }
    }
  }
}
`

const Cassandra = () => {
  const {loading, previousData, data = previousData} = useQuery(QUERY);

  if (loading || !data) {
    return <h1>loading...</h1>;
  }
  return (
    <>
      {data.results.hits.items.map((item) => {
        return <div key={item.id}>hit id: {item.id}</div>;
      })}
    </>
  );
};

export default withApollo(Cassandra);