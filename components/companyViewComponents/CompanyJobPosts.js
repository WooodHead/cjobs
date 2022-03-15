import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CompanyJobPosts = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://167.172.142.105:5000/api/elasticsearch/cassandra_job_posts/_search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `{
                "query": {
                    "match": {
                  "company_name": "${slug}"
                }
                }

            }`,
        }
      );
      const data = await res.json();
      setFetchedData(data);
    }
    getData();
  }, [slug]);

  return (
    <Grid item sm={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="overline">Job Posts</Typography>
        </CardContent>
        <Box className={classes.posts}>
          {fetchedData &&
            fetchedData.hits.hits.map((data) => {
              return (
                <Card
                  key={data._id}
                  variant="outlined"
                  sx={{ minWidth: 275 }}
                  className={classes.cardItem}
                >
                  <CardContent className={classes.items}>
                    {data._source.position_name}
                  </CardContent>
                </Card>
              );
            })}
        </Box>
      </Card>
    </Grid>
  );
};

export default CompanyJobPosts;
