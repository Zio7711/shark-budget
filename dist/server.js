import "express-async-errors";
import express from "express";
import ErrorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from "./routes/authRoutes.js";
import authenticateUser from "./middleware/auth.js";
import chalk from "chalk";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname } from "path";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoutes.js";
import { fileURLToPath } from "url";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import notFoundMiddleware from "./middleware/not-found.js";
import path from "path";
import xss from "xss-clean";
dotenv.config();
const app = express();
const corsOptions = {
    origin: true,
    credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
const port = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
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
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(chalk.green.bold(`[server]: Server is running at http://localhost:${port}...`));
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
