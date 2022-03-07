const dotenv = require('dotenv');
const path = require('path');
const { initUsers, selectUsers } = require('./select.js');
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const { insertUser } = require('./insert.js');

dotenv.config({
  path: path.resolve(__dirname, `.env`)
});

// var jsonParser = bodyParser.json()
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
}))


app.get('/', async (req, res) => {
  const users = await selectUsers();
  res.send(users);
});

app.get('/init', async (req, res) => {
  let data = await initUsers();
  // console.log(data)
  res.send(data);
});

app.post('/p', async (req, res) => {
  console.log('\n\n', req.method, req.url, req.body);
  let body = req.body;
  insertUser(body.name, body.pass, body.mail, body.userType);
  console.log('inserted', typeof (req.body));
  res.send(req.body);
});

app.listen(parseInt(process.env.PORT), process.env.HOST, () => {
  console.log(`APP LISTENING ON http://${process.env.HOST}:${process.env.PORT}`);
})