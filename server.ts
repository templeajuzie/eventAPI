import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import Router from './Routes/AuthRoutes';

import ConnectDb from './Db/Database';

const app = express();

ConnectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

app.use(express.json());
app.use('/api/v1', Router);