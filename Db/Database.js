const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.MONGO_URL;

const ConnectDb = () => {

  mongoose.connect(dbUrl)
  .then((response) => {
    console.log('Connection to DB was established');
  })
  .catch((err) => {
    console.log('connection to DB was not established' + err.message);
  })

  
};

module.exports = ConnectDb;
