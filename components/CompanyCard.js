import { Card, CardContent, Grid, Typography, Box } from "@material-ui/core";
import classes from "../styles/CompanyCard.module.css";

const CompanyCard = ({ companyInfo }) => {
  console.log(companyInfo);

  return (
    <Box className={classes.companyWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.cardHeader}>
            <Grid container>
              <Grid item xs={6}>
                <CardContent>
                  <Typography variant="h2">Header</Typography>
                  <Typography variant="h5">Location</Typography>
                </CardContent>
              </Grid>
              <Grid item xs={6}>
                <CardContent>
                  <Typography>Description</Typography>
                </CardContent>
              </Grid>
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
