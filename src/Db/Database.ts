import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl: any = process.env.MONGO_URL;

const ConnectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(dbUrl);
    console.log('Connection to DB was established');
  } catch (err) {
    console.error('Connection to DB was not established');
  }
};

const CloseDbConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (err) {
    console.error('Error closing MongoDB connection');
  }
};

export { ConnectDb, CloseDbConnection };
