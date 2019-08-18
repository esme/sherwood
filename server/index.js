const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const Stocks = require('stocks.js');
// const db = require('./db');

const app = express();
const port = 3000;
const stocks = new Stocks('PVY8MCGPGIBP69X4');

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var root = {
//   hello: () => {
//     axios.get(url)
//       .then(({data}) => console.log(data['Time Series (5min)']))
//     return 'Hello world!';
//   },
// };

// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

getData = html => {
  const $ = cheerio.load(html);
  const name = $('.Jo5RGrWjFiX_iyW3gMLsy h1').text();
  const desc = $('.section-description').text();
  return {name, desc};
}

app.use('/:id', express.static(path.join(__dirname, '../client', 'dist')));

app.get('/stock/:id', async (req, res) => {
  const options = {
    symbol: `${req.params.id}`,
    interval: '5min',
    amount: 100,
  };
  const result = await stocks.timeSeries(options);
  res.send(result);
})

app.get('/desc/:id', async (req, res) => {
  const response = await axios.get(`https://robinhood.com/stocks/${req.params.id}`)
  const result = getData(response.data);
  res.send(result);
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
