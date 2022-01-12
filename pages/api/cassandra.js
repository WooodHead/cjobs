
const assert = require('assert');
//”cassandra-driver” is in the node_modules folder. Redirect if necessary.
const cassandra = require('cassandra-driver');
//Replace Username and Password with your cluster settings
const authProvider = new cassandra.auth.PlainTextAuthProvider(process.env.usr, process.env.pw);
//Replace PublicIP with the IP addresses of your clusters
const contactPoints = [process.env.node1, process.env.node2];
var client = new cassandra.Client({ contactPoints: contactPoints, authProvider: authProvider, localDataCenter: 'AZURE_SWITZERLAND_NORTH', keyspace: 'grocery' });

//Execute the queries 
var query = 'SELECT * FROM grocery.fruit_stock;';
let response
async function get() {
  await new Promise((resolve, reject) => {
    client.execute(query)
      .then(res => {
        if (!res) {
          response = 'error'
          reject()
        } else {
          response = res
          resolve()
        }
      })
  })
}

async function post(number, name, price) {
  await new Promise((resolve, reject) => {
    client.execute(`INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('d${number}','${name}',${price});`)
    .then(res => {
      if (!res) {
        reject()
      } else {
        resolve()
      }
    })
  })
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await post(req.body.number, req.body.name, req.body.price)
    .then(res.status(200).json('Sucsess'))
  } else {
    await get()
      .then(() => {
        if (response) {
          res.status(200).json(response)
        }
      })
  }
}