import { Button, Grid } from "@material-ui/core";

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://167.172.142.105:5000/cassandra-job-posts`);
    const jobs = await res.json();
    return {
      props: {
        jobs,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
};

export default function About({ jobs }) {
  return (
    <>
      <Grid>
        <Button variant="contained">Click</Button>
      </Grid>
    </>
  );
}
