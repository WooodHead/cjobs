import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import classes from "../../styles/CompanyCard.module.css";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(() => ({
  textAlign: "center",
  height: 60,
  lineHeight: "60px",
}));

const CompanyTehnologiesCategories = ({ companyInfo }) => {
  return (
    <Grid item xs={12} md={6}>
      <Card className={classes.jobTechnologies}>
        <CardContent>
          <Typography variant="overline">Tehnologies</Typography>
        </CardContent>

        <Box className={classes.tehnologies}>
          {companyInfo.hits.hits[0]._source.clearbit_tech.map((item) => (
            <Item className={classes.items} key={item} elevation={2}>
              {`${item}`}
            </Item>
          ))}
        </Box>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="overline">Categories</Typography>
        </CardContent>
        <Box className={classes.tehnologies}>
          {companyInfo.hits.hits[0]._source.clearbit_tech_categories.map(
            (item) => (
              <Item className={classes.items} key={item} elevation={2}>
                {`${item}`}
              </Item>
            )
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default CompanyTehnologiesCategories;
