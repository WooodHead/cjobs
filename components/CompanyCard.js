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
        <Grid item xs={6}>
          <Card className={classes.cardTehnologiesCategories}>
            <Typography>Tehnologies</Typography>
            <Box className={classes.tehnologies}>
              {companyInfo.hits.hits[0]._source.clearbit_tech.map((item) => (
                <Item key={item} elevation={2}>
                  {`${item}`}
                </Item>
              ))}
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {fetchedData &&
                  fetchedData.hits.hits.map((data) => {
                    return <p>{data._source.position_name}</p>;
                  })}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyCard;
