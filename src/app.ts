import express, { Application, Request, Response } from 'express';

import globalError from './app/middlewares/globalError';
import router from './app/routes';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());

app.use(
  cors({ origin: 'https://travelbuddy-omega.vercel.app', credentials: true }),
);
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use(globalError);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Travel Buddy, running');
});

export default app;
