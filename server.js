const express = require('express');
require('dotenv').config();
const ConnectDb = require('./Db/Database');

const app = express();

ConnectDb();

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('app is running on port ' + port);
});

app.use(express.json());
