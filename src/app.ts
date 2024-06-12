import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello page");
});

export default app;
