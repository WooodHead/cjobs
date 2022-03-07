import { Container, Grid, Typography } from "@material-ui/core";

function AboutUs() {
  return (
    <Container maxWidth="lg">
      <Grid>
        <Typography variant="h2" component="h1">
          Cassandra Jobs
        </Typography>
        <Typography paragraph>
          {
            "Welcome to Cassandra.Jobs, a curated job board dedicated solely to Cassandra to help Apache Cassandra developers, administrators, and architects find their dream job."
          }
        </Typography>
        <Typography paragraph>
          {
            "Apache Cassandra is one of the most forward looking Databases in the world. It is designed for now and the future. Our goal is to connect Cassandra professionals with potential opportunities using a technology that is continuing to gain traction with enterprises who need real-time, resilient, scalable platforms."
          }
        </Typography>
        <Typography component="h2" variant="h3">
          The Team
        </Typography>
        <Typography component="ul">
          <Typography component="li" gutterBottom>
            Editor: Rahul Singh
          </Typography>
          <Typography component="li" gutterBottom>
            Project Manager: Danielle Crispino
          </Typography>
          <Typography component="li" gutterBottom>
            Interface: Max Logan
          </Typography>
          <Typography component="li" gutterBottom>
            Software: Ryan Quey, Arpan Patel, Stefan Nikolovski
          </Typography>
          <Typography component="li" gutterBottom>
            Database: Rahul Singh, Jagannath Bilgi, Ryan Quey
          </Typography>
          <Typography component="li" paragraph>
            Systems: Jagannath Bilgi, Rahul Singh, Ryan Quey
          </Typography>
        </Typography>
      </Grid>
    </Container>
  );
}

export default AboutUs;
