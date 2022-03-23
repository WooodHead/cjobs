import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import classes from "../styles/JobDescription.module.css";

const JobDescription = ({ job }) => {
  return (
    <>
      {job && (
        <>
          <Card elevation={2} className={classes.summaryCard}>
            <CardHeader title="Summary" />
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="secondary" component="div">
                Company Name: {job.company_name}
              </Typography>
              <Typography color="gray">
                Position Name: {job.position_name}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.descriptionCard} elevation={2}>
            <CardHeader title="Description" />
            <CardContent className={classes.cardContent}>
              <Typography
                dangerouslySetInnerHTML={{ __html: job.description_html }}
              ></Typography>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default JobDescription;
