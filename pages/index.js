import styles from "../styles/Home.module.css";
import JobsList from "../components/JobsList";
import { Grid } from "@material-ui/core";
import JobDescription from "../components/JobDescription";
import { useState } from "react";
import { Pagination } from "@mui/material";
import companies from "../response.json";

export default function Home() {
  const [clickedJob, setClickedJob] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const allJobs = companies.hits.hits;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const pageCount = Math.ceil(allJobs.length / jobsPerPage);

  const handleChange = (event, value) => setCurrentPage(value);

  return (
    <div className={styles.container}>
      <Grid container spacing={2} className={styles.jobsContainer}>
        <JobsList
          clickedJob={clickedJob}
          setClickedJob={setClickedJob}
          currentJobs={currentJobs}
        />
        {clickedJob && (
          <JobDescription
            jobDescription={clickedJob._source.description}
            job={clickedJob._source}
          />
        )}
      </Grid>
      <Pagination
        className={styles.pagination}
        count={pageCount}
        page={currentPage}
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
}
