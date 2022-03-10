import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import classes from "../styles/CompanyCard.module.css";

const CompanyCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 275 }}
      className={classes.cardItem}
    >
      <Grid container className={classes.cardContainer}>
        <Grid container>
          <Grid xs={6}>
            <Grid>Name</Grid>
            <Grid>Location</Grid>
          </Grid>
          <Grid xs={6}>Description</Grid>
        </Grid>
        <Grid container>
          <Grid xs={6}>
            <Grid>Tehnologies</Grid>
            <Grid>Categories</Grid>
          </Grid>
          <Grid xs={6}>Job Posts</Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CompanyCard;
