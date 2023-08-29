import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const dbUrl: any = process.env.MONGO_URL;

const ConnectDb = (): void => {
  mongoose
    .connect(dbUrl)
    .then((response) => {
      console.log('Connection to DB was established');
    })
    .catch((err) => {
      console.log('connection to DB was not established' + err.message);
    });
};

export default ConnectDb;
