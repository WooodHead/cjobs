import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import classes from "../styles/JobsList.module.css";
import companies from "../response.json";

const JobsList = ({ clickedJob, setClickedJob }) => {
  const onCardClick = (item) => {
    if (item._id === clickedJob._id) {
      return setClickedJob("");
    }
    setClickedJob(item);
  };

  return (
    <Grid xs={6} item>
      {companies.hits.hits.map((item) => {
        return (
          <Card
            key={item._id}
            variant="outlined"
            sx={{ minWidth: 275 }}
            onClick={() => onCardClick(item)}
            className={classes.cardItem}
          >
            <CardContent>
              <Typography variant="h4" component="div">
                {item._source.company_name}
              </Typography>
              <Typography variant="h6" component="div">
                {item._source.position_name}
              </Typography>
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
