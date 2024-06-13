import express, { Express } from "express";
import dotenv from "dotenv";

import healthCheckRoute from "./routes/health-check";

dotenv.config();

const app: Express = express();

app.use("/healthCheck", healthCheckRoute);

export default app;
