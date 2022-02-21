import styles from "../styles/Home.module.css";
import JobsList from "../components/JobsList";
import { Grid, Input } from "@material-ui/core";
import JobDescription from "../components/JobDescription";
import { useState } from "react";
import { Pagination } from "@mui/material";
import companies from "../response.json";
import FilterForm from "../components/FilterForm";

export default function Home() {
  const [clickedJob, setClickedJob] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(10);
  const [allJobs, setAllJobs] = useState(companies.hits.hits);
  const [searchedJob, setSearchedJob] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(null);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const currentFilteredJobs =
    filteredJobs && filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const filterPageCount =
    filteredJobs && Math.ceil(filteredJobs.length / jobsPerPage);
  const pageCount = Math.ceil(allJobs.length / jobsPerPage);

  const handleChange = (event, value) => setCurrentPage(value);

  return (
    <div className={styles.container}>
      <Grid container>
        <FilterForm setSearchedJob={setSearchedJob} />
      </Grid>
      <Grid container spacing={2}>
        <JobsList
          allJobs={allJobs}
          clickedJob={clickedJob}
          setClickedJob={setClickedJob}
          currentJobs={currentJobs}
          searchedJob={searchedJob}
          setFilteredJobs={setFilteredJobs}
          filteredJobs={filteredJobs}
          currentFilteredJobs={currentFilteredJobs}
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
        count={filteredJobs ? filterPageCount : pageCount}
        page={currentPage}
        color="secondary"
        onChange={handleChange}
      />
    </div>
  );
}
