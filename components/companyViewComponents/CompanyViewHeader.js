import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";

const CompanyViewHeader = ({ companyInfo }) => {
  return (
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
  );
};

export default CompanyViewHeader;
