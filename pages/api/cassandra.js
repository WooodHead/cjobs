const assert = require('assert');
//”cassandra-driver” is in the node_modules folder. Redirect if necessary.
const cassandra = require('cassandra-driver');
//Replace Username and Password with your cluster settings
const authProvider = new cassandra.auth.PlainTextAuthProvider('iccassandra', 'dd7f9212d0acf03d923d7f11ac9cf65a');
//Replace PublicIP with the IP addresses of your clusters
const contactPoints = ["20.203.149.23", "20.203.189.87"];
var client = new cassandra.Client({ contactPoints: contactPoints, authProvider: authProvider, localDataCenter: 'AZURE_SWITZERLAND_NORTH', keyspace: 'grocery' });

//Execute the queries 
var query = 'SELECT * FROM grocery.fruit_stock;';
let response
async function call (){
 await new Promise((resolve, reject) => {
    client.execute(query)
      .then(res => {
        if(!res){
          response = 'error'
          reject()
        }else{
          response = res
          resolve()
        }
      })
  })
}


export default async function handler(req, res) {
  await call()
  .then(res.status(200).json(response))
}