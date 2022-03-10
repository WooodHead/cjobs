import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import classes from "../styles/CompanyCard.module.css";

const CompanyCard = ({ companyInfo }) => {
  console.log(companyInfo);

  return (
    <Box className={classes.companyWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.cardHeader}>
            <Grid className={classes.cardHeaderName}>
              <CardContent>
                <Typography variant="h2">
                  {companyInfo.hits.hits[0]._source.name}
                </Typography>
                <Typography variant="h5">
                  {companyInfo.hits.hits[0]._source.city}
                </Typography>
              </CardContent>
            </Grid>
            <Grid>
              <CardContent>
                <Typography>
                  {companyInfo.hits.hits[0]._source.clearbit_description}
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Tehnologies</Typography>
              <Typography>Categories</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Job Posts</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyCard;
