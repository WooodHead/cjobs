// const service = {
//   async getJobs() {
//     return await fetch(
//       `http://167.172.142.105:5000/api/elasticsearch/cassandra_job_posts/_search`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: `{
//             "query": {
//                 "match": {
//               "company_name": "StyleSeat"
//             }
//             }

//         }`,
//       }
//     )
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         return response;
//       });

//     // .then((res) =>
//     //   !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
//     // )
//   },
// };

// export default service;

const jobs = fetch(
  `http://167.172.142.105:5000/api/elasticsearch/cassandra_job_posts/_search`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{
                "query": {
                    "match": {
                  "company_name": "StyleSeat"
                }
                }

            }`,
  }
)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

const printData = async () => {
  const a = await jobs;
  return await a;
};

export default printData;
