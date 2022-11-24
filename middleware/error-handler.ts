import { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import chalk from "chalk";

const ErrorHandlerMiddleware = (
  err: any,
  _: Request,
  res: Response,
  _2: NextFunction
) => {
  let status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong";

  if (err.name === "ValidationError") {
    status = StatusCodes.BAD_REQUEST;
    message = Object.values(err.errors)
      .map((val: any) => val.message)
      .join(" ");
  }

  if (err.code && err.code === 11000) {
    status = StatusCodes.BAD_REQUEST;
    message = `${Object.keys(err.keyValue)} already exists`;
  }

  // console.log(chalk.red(message));
  res.status(status).send({
    status,
    message,
  });
};

export default ErrorHandlerMiddleware;
