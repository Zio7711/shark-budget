import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
import notFoundMiddleware from "./middleware/not-found";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//middleware
app.use(notFoundMiddleware);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
