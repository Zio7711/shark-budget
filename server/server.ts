import express, { Express, Request, Response } from "express";

import ErrorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/authRoutes";
import connectDB from "./db/connect";
import dotenv from "dotenv";
import notFoundMiddleware from "./middleware/not-found";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  //   throw new Error("Something went wrong");
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/auth", authRouter);

//middleware
app.use(notFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL as string);
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
