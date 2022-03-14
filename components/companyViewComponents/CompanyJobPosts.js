import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";

import printData from "../../services/jobs-service";
import { useState } from "react";

const CompanyJobPosts = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const finalData = printData().then((final) => setFetchedData(final));

  return (
    <div>
      <Grid item sm={12} md={6}>
        <Card className={classes.posts}>
          <CardContent>
            <Typography variant="overline">Job Posts</Typography>
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
                      <CardContent>{data._source.position_name}</CardContent>
                    </Card>
                  );
                  //   return <p>{data._source.position_name}</p>;
                })}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CompanyJobPosts;
