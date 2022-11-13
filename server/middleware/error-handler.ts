import { NextFunction, Request, Response } from "express";

const ErrorHandlerMiddleware = (
  err: any,
  _: Request,
  res: Response,
  _2: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).send({
    status,
    message,
  });
};

export default ErrorHandlerMiddleware;
