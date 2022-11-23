import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { UserRequest } from "./../middleware/auth";

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

  res.status(StatusCodes.OK).json({
    user: { email: user.email, name: user.name, createdAt: user.createdAt },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check request fields
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("User does not exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: { email: user.email, name: user.name, createdAt: user.createdAt },
    token,
  });
};

const updateUser = async (req: UserRequest, res: Response) => {
  const { name, budget } = req.body;
  if (!name && !budget) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findByIdAndUpdate({ _id: req.user?.userId });

  if (user) {
    if (name) user.name = name;
    if (budget) user.budget = budget;
    await user.save();
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        budget: user.budget,
      },
      token,
    });
  }
};

export { register, login, updateUser };
