import express, { Application, NextFunction, Request, Response } from 'express';

import bodyParser from 'body-parser';
import healthCheckRoute from './routes/health-check';
import subscriptionsRoute from './routes/subscriptions';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/healthCheck', healthCheckRoute);
app.use('/subscriptions', subscriptionsRoute);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
