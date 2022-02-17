import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import classes from "../styles/JobsList.module.css";

const JobsList = ({ clickedJob, setClickedJob, currentJobs }) => {
  const onCardClick = (item) => {
    if (item._id === clickedJob._id) {
      return setClickedJob("");
    }
    setClickedJob(item);
  };

  return (
    <Grid xs={6} item>
      {currentJobs.map((item) => {
        return (
          <Card
            key={item._id}
            variant="outlined"
            sx={{ minWidth: 275 }}
            onClick={() => onCardClick(item)}
            className={classes.cardItem}
          >
            <CardHeader
              title={item._source.position_name}
              subheader={item._source.company_name}
            />
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="secondary" component="div">
                Job category: {item._source.position_category}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
};

export default JobsList;
