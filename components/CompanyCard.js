import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import classes from "../styles/CompanyCard.module.css";
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

  return (
    <Box className={classes.companyWrapper}>
      <Grid container>
        <Grid item xs={12}>
          <Card className={classes.cardHeader}>
            <Grid item xs={6}>
              <CardContent>
                <Typography variant="h2">Header</Typography>
                <Typography variant="h5">Location</Typography>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <Typography>Description</Typography>
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
              <Typography>Job Posts</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyCard;
