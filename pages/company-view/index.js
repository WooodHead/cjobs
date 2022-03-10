import CompanyCard from "../../components/CompanyCard";

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://167.172.142.105:5000/api/company/StyleSeat`);
    const companyInfo = await res.json();
    return {
      props: {
        companyInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage data", error);
  }
};

export default function CompanyView({ companyInfo }) {
  console.log(companyInfo)
  return (
    <>
      <CompanyCard />
    </>
  );
}




