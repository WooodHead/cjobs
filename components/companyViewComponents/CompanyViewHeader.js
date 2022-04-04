import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";

const CompanyViewHeader = ({ companyInfo }) => {
  return (
    <Grid item xs={12}>
      <Card className={classes.cardHeader}>
        <Grid className={classes.cardHeaderName}>
          <CardContent>
            <Typography className={classes.heading} variant="h2">
              {companyInfo.hits.hits[0]._source.name}
            </Typography>
            <Typography variant="h5">
              {companyInfo.hits.hits[0]._source.city}
            </Typography>
          </CardContent>
        </Grid>
        <Grid>
          <CardContent>
            <Typography gutterBottom>
              {companyInfo.hits.hits[0]._source.clearbit_description}
            </Typography>
            <Typography gutterBottom>
              Phone:{" "}
              {companyInfo.hits.hits[0]._source.phone
                ? companyInfo.hits.hits[0]._source.phone
                : "No phone number"}
            </Typography>
            <Typography gutterBottom>
              Website:{" "}
              {companyInfo.hits.hits[0]._source.website_domain
                ? companyInfo.hits.hits[0]._source.website_domain
                : "No website"}
            </Typography>
            <Typography gutterBottom>
              Emails:{" "}
              {companyInfo.hits.hits[0]._source.site_emails
                ? companyInfo.hits.hits[0]._source.site_emails.join(", ")
                : "No emails"}
            </Typography>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CompanyViewHeader;
