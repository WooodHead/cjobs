import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import classes from "../styles/CompanyCard.module.css";
import printData from "../services/jobs-service";
import { useState } from "react";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const CompanyCard = ({ companyInfo }) => {
  console.log(companyInfo);
  const [fetchedData, setFetchedData] = useState(null);
  // const jobs = service.getJobs();
  const finalData = printData().then((final) => setFetchedData(final));

  fetchedData && console.log(fetchedData.hits.hits);

  return (
    <Box className={classes.companyWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.cardHeader}>
            <Grid className={classes.cardHeaderName}>
              <CardContent>
                <Typography variant="h2">
                  {companyInfo.hits.hits[0]._source.name}
                </Typography>
                <Typography variant="h5">
                  {companyInfo.hits.hits[0]._source.city}
                </Typography>
              </CardContent>
            </Grid>
            <Grid>
              <CardContent>
                <Typography>
                  {companyInfo.hits.hits[0]._source.clearbit_description}
                </Typography>
              </CardContent>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6} className={classes.informationsGrid}>
          <Card className={classes.jobTechnologies}>
            <Typography variant="overline">Tehnologies</Typography>
            <Box className={classes.tehnologies}>
              {companyInfo.hits.hits[0]._source.clearbit_tech.map((item) => (
                <Item key={item} elevation={2}>
                  {`${item}`}
                </Item>
              ))}
            </Box>
          </Card>
          <Card className={classes.jobCategories}>
            <Typography variant="overline">Categories</Typography>
            <Box className={classes.tehnologies}>
              {companyInfo.hits.hits[0]._source.clearbit_tech_categories.map(
                (item) => (
                  <Item key={item} elevation={2}>
                    {`${item}`}
                  </Item>
                )
              )}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.posts}>
            <CardContent>
              <Typography variant="overline">Job Posts</Typography>
              <Box className={classes.posts}>
                {fetchedData &&
                  fetchedData.hits.hits.map((data) => {
                    return (
                      <Card
                        key={data._id}
                        variant="outlined"
                        sx={{ minWidth: 275 }}
                        className={classes.cardItem}
                      >
                        <CardContent>{data._source.position_name}</CardContent>
                      </Card>
                    );
                    // return <p>{data._source.position_name}</p>;
                  })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyCard;
