import { Grid, Box } from "@material-ui/core";

import CompanyViewHeader from "./companyViewComponents/CompanyViewHeader";
import CompanyTehnologiesCategories from "./companyViewComponents/CompanyTehnologiesCategories";
import CompanyJobPosts from "./companyViewComponents/CompanyJobPosts";

import classes from "../styles/CompanyCard.module.css";

const CompanyCard = ({ companyInfo }) => {
  return (
    <Box className={classes.companyWrapper}>
      <Grid container>
        <CompanyViewHeader companyInfo={companyInfo} />
      </Grid>

      <Grid container spacing={2}>
        <CompanyTehnologiesCategories companyInfo={companyInfo} />
        <CompanyJobPosts />
      </Grid>
    </Box>
  );
};

export default CompanyCard;
