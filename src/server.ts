import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import authRouter from './Routes/AuthRoutes';
import eventRouter from './Routes/EventRoutes';

import {ConnectDb} from './Db/Database';

export const app = express();

ConnectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

app.use(express.json());
app.use('/api/v1', authRouter);
app.use('/api/v1', eventRouter);
app.get('*', (req, res) => {
  res.status(404).send('404 - Page Not Found');
});

export default app;