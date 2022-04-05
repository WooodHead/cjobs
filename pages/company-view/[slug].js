import { Grid } from "@material-ui/core";
import CompanyCard from "../../components/CompanyCard";
import classes from "../../styles/CompanyCard.module.css";

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const res = await fetch(`http://167.172.142.105:5000/api/company/${slug}`);
  const companyInfo = await res.json();

  return {
    props: {
      companyInfo,
    },
  };
};

const Details = ({ companyInfo }) => {
  return (
    <Grid className={classes.companyInfo}>
      <CompanyCard companyInfo={companyInfo} />
    </Grid>
  );
};

export default Details;
