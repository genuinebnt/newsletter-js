import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';

import healthCheckRoute from './routes/health-check';
import subscriptionsRoute from './routes/subscriptions';

dotenv.config();

const app: Application = express();

app.use('/healthCheck', healthCheckRoute);
app.use('/subscriptions', subscriptionsRoute);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
