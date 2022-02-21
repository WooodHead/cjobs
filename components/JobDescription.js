import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import classes from "../styles/JobDescription.module.css";

const JobDescription = ({ job }) => {
  return (
    <Grid xs={6} item>
      <Card elevation={2} className={classes.summaryCard}>
        <CardHeader title="Summary" />
        <CardContent>
          <Typography color="secondary" gutterBottom component="div">
            Company Name: {job.company_name}
          </Typography>
          <Typography variant="body1">
            Position Name: {job.position_name}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.descriptionCard} elevation={2}>
        <CardHeader title="Description" />
        <CardContent className={classes.cardContent} id="description">
          <div dangerouslySetInnerHTML={{ __html: job.description_html }}></div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default JobDescription;
