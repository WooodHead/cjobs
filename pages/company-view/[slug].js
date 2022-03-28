import CompanyCard from "../../components/CompanyCard";

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
    <div>
      <CompanyCard companyInfo={companyInfo} />
    </div>
  );
};

export default Details;
