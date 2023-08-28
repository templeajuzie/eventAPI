import express, { Express, Request, Response } from 'express';

const app: Express = express();

const port = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Temple, Welcome to Typescript!...');
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
