import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";

import printData from "../../services/jobs-service";
import { useState } from "react";

const CompanyJobPosts = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const finalData = printData().then((final) => setFetchedData(final));

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
