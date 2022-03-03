const index_name = "cassandra_job_posts";
const esEndpoint = `http://${process.env.API_ENDPOINT}/api/elasticsearch/${index_name}`;

export default esEndpoint;
