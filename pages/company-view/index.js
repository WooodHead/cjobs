import { method } from "lodash";
import { QueryString, SearchkitManager } from "searchkit";
import CompanyCard from "../../components/CompanyCard";
import esEndpoint from "../api/elasticSearch";

export const getStaticProps = async () => {
  try {
    const res = await fetch(
      `http://167.172.142.105:5000/api/company/StyleSeat`
    );
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

// const getPosts = async () => {
//   const response = await fetch(
//     "http://167.172.142.105:5000/api/elasticsearch/cassandra_job_posts/_search",
//     {
//       method: "POST",
//       body: QueryString({
//         query: {
//           bool: {
//             must: [{ match: { company_name: "StyleSeat" } }],
//           },
//         },
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// };

export default function CompanyView({ companyInfo }) {
  return (
    <>
      <CompanyCard companyInfo={companyInfo} />
    </>
  );
}
