import "express-async-errors";

import express, { Express, Request, Response } from "express";

import ErrorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/authRoutes";
import authenticateUser from "./middleware/auth";
import chalk from "chalk";
import connectDB from "./db/connect";
import cors from "cors";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes";
import notFoundMiddleware from "./middleware/not-found";

import morgan = require("morgan");
dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 4000;

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  //   throw new Error("Something went wrong");
  res.send("Express + TypeScript Server");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", authenticateUser, expenseRouter);

//middleware
app.use(notFoundMiddleware);
app.use(ErrorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL as string);
    app.listen(port, () => {
      console.log(
        chalk.green.bold(
          `[server]: Server is running at http://localhost:${port}...`
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
