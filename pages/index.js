import styles from "../styles/Home.module.css";
import JobsList from "../components/JobsList";
import { Grid } from "@material-ui/core";
import JobDescription from "../components/JobDescription";
import { useState } from "react";

export default function Home() {
  const [clickedJob, setClickedJob] = useState("");
  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <JobsList clickedJob={clickedJob} setClickedJob={setClickedJob} />
        {clickedJob && (
          <JobDescription jobDescription={clickedJob._source.description} />
        )}
      </Grid>
    </div>
  );
}
