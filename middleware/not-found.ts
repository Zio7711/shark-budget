import { Request, Response } from "express";

const NotFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).send("Route does not exist!");
};

export default NotFoundMiddleware;
