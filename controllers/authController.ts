import { Request, Response } from "express";

import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check request fields
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // check if user exists
  const userAlreadyExits = await User.findOne({ email });
  if (userAlreadyExits) {
    throw new BadRequestError("User already exists");
  }

  // create user
  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ user: { email: user.email, name: user.name }, token });
};

const login = (req: Request, res: Response) => {
  res.send("login user");
};

const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};

export { register, login, updateUser };
