import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json({ user });
};

const login = (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };
