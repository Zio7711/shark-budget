import { Request, Response } from "express";

const createExpense = async (req: Request, res: Response) => {
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
