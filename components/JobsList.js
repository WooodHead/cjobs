import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import classes from "../styles/JobsList.module.css";
import companies from "../response.json";
import { useState } from "react";

const JobsList = ({ clickedJob, setClickedJob }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);
  const allJobs = companies.hits.hits;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const pageCount = Math.ceil(allJobs.length / jobsPerPage);

  const handleChange = (event, value) => setCurrentPage(value);

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
      <Pagination
        count={pageCount}
        page={currentPage}
        color="secondary"
        onChange={handleChange}
      />
    </Grid>
  );
};

export default JobsList;
