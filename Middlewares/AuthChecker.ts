const express = require('express');
require('dotenv').config();
const ConnectDb = require('./DB/Database');
const authRourter = require('./Routes/AuthRoutes');

const app = express();

ConnectDb();

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('app is running on port ' + port);
});

app.use(express.json());
app.use('/api/v1/auth', authRourter);
