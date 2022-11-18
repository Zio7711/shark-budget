import { BadRequestError, NotFoundError } from "../errors";

import Expense from "../models/Expense";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRequest } from "./../middleware/auth";
import checkPermissions from "../utils/checkPermissions";

const createExpense = async (req: UserRequest, res: Response) => {
  const { type, amount, category, date, description } = req.body;
  if (!type || !amount || !category || !date || !description) {
    throw new BadRequestError("Please provide all required fields.");
  }

  req.body.createdBy = req.user?.userId;
  const newExpense = await Expense.create(req.body);
  res.status(StatusCodes.CREATED).json({ newExpense });
};

const getAllExpenses = async (req: UserRequest, res: Response) => {
  const expenseList = await Expense.find({ createdBy: req.user?.userId });
  res.status(StatusCodes.OK).json({ expenseList, numOfPages: 1 });
};

const getExpense = async (req: UserRequest, res: Response) => {
  res.send("get expense");
};

const updateExpense = async (req: UserRequest, res: Response) => {
  const { id: expenseId } = req.params;
  const { amount, date, description } = req.body;
  if (!amount && !date && !description) {
    throw new BadRequestError("Please edit at least required fields.");
  }
  const expense = await Expense.findOne({ _id: expenseId });

  if (!expense) {
    throw new NotFoundError("Expense not found.");
  }

  // check permissions
  checkPermissions(req.user?.userId, expense.createdBy);

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: expenseId },
    req.body,
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedExpense });
};

const deleteExpense = async (req: UserRequest, res: Response) => {
  const { id: expenseId } = req.params;

  const expense = await Expense.findOne({ _id: expenseId });

  if (!expense) {
    throw new NotFoundError("Expense not found.");
  }

  // check permissions
  checkPermissions(req.user?.userId, expense.createdBy);

  await Expense.deleteOne({ _id: expenseId });
  res
    .status(StatusCodes.OK)
    .json({
      message: "Expense deleted successfully.",
      deletedExpenseId: expenseId,
    });
};

export {
  createExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
};
