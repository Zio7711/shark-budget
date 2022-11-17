import { Request, Response } from "express";

import { BadRequestError } from "../errors";
import Expense from "../models/Expense";
import { StatusCodes } from "http-status-codes";
import { UserRequest } from "./../middleware/auth";

const createExpense = async (req: UserRequest, res: Response) => {
  const { type, amount, category, date, description } = req.body;
  if (!type || !amount || !category || !date || !description) {
    throw new BadRequestError("Please provide all required fields.");
  }

  req.body.createdBy = req.user?.userId;
  const newExpense = await Expense.create(req.body);
  res.status(StatusCodes.CREATED).json({ newExpense });
};

const getAllExpenses = async (req: Request, res: Response) => {
  res.send("get all expenses");
};

const getExpense = async (req: Request, res: Response) => {
  res.send("get expense");
};

const updateExpense = async (req: Request, res: Response) => {
  res.send("update expense");
};

const deleteExpense = async (req: Request, res: Response) => {
  res.send("delete expense");
};

export {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
