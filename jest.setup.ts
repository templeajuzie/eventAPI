import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const dbUrl: any = process.env.MONGO_URL;

beforeAll(async () => {
  await mongoose.connect(dbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
});
