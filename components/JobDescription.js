import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import classes from "../styles/JobDescription.module.css";

const JobDescription = ({ jobDescription }) => {
  return (
    <Grid xs={6} item>
      <Card>
        <CardContent className={classes.cardContent}>
          <Typography>{jobDescription}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobDescription;
