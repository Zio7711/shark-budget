import "express-async-errors";

import express, { Express, Request, Response } from "express";

import ErrorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import authenticateUser from "./middleware/auth.js";
import chalk from "chalk";
import connectDB from "./db/connect.js";
import cors from "cors";
import { dirname } from "path";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes.js";
import { fileURLToPath } from "url";
// import morgan = require("morgan");
import morgan from "morgan";
import notFoundMiddleware from "./middleware/not-found.js";
import path from "path";

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT || 4000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.get("/", (req: Request, res: Response) => {
//   //   throw new Error("Something went wrong");
//   res.send("Express + TypeScript Server");
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", authenticateUser, expenseRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

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
