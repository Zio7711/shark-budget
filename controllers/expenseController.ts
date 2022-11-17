import { Request, Response } from "express";

import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const createExpense = async (req: Request, res: Response) => {
  const { type, amount, category, date, description, createdBy } = req.body;
  if (!type || !amount || !category || !date || !description || !createdBy) {
    throw new BadRequestError("Please provide all required fields.");
  }
  res.send("create expense");
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
