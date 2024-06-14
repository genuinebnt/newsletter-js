import express, { Application } from "express";
import dotenv from "dotenv";

import healthCheckRoute from "./routes/health-check";

dotenv.config();

const app: Application = express();

app.use("/healthCheck", healthCheckRoute);

export default app;
