import { BadRequestError, NotFoundError } from "../errors/index.js";
import Expense from "../models/Expense.js";
import { StatusCodes } from "http-status-codes";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
const createExpense = async (req, res) => {
    const { type, amount, category, date, description } = req.body;
    if (!type || !amount || !category || !date || !description) {
        throw new BadRequestError("Please provide all required fields.");
    }
    req.body.createdBy = req.user?.userId;
    const newExpense = await Expense.create(req.body);
    res.status(StatusCodes.CREATED).json({ newExpense });
};
const getAllExpenses = async (req, res) => {
    // const expenseList = await Expense.find({ createdBy: req.user?.userId });
    const month = req.query.month || new Date().getMonth() + 1;
    const year = req.query.year || new Date().getFullYear();
    const expenseList = await Expense.aggregate([
        {
            $addFields: {
                month: { $month: "$date" },
                year: { $year: "$date" },
            },
        },
        {
            $match: {
                // createdBy: mongoose.Types.ObjectId(req.user?.userId),
                $and: [
                    { createdBy: new mongoose.Types.ObjectId(req.user?.userId) },
                    { month: Number(month) },
                    { year: Number(year) },
                ],
            },
        },
        { $sort: { date: -1 } },
        // {
        //   $group: {
        //     _id: {
        //       date: "$date",
        //     },
        //     expenses: {
        //       $push: {
        //         _id: "$_id",
        //         type: "$type",
        //         amount: "$amount",
        //         category: "$category",
        //         date: "$date",
        //         description: "$description",
        //       },
        //     },
        //   },
        // },
    ]);
    res.status(StatusCodes.OK).json({ expenseList, numOfPages: 1 });
};
const getExpense = async (req, res) => {
    res.status(StatusCodes.OK).send("getExpense");
};
const updateExpense = async (req, res) => {
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
    const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseId }, req.body, { new: true, runValidators: true });
    res.status(StatusCodes.OK).json({ updatedExpense });
};
const deleteExpense = async (req, res) => {
    const { id: expenseId } = req.params;
    const expense = await Expense.findOne({ _id: expenseId });
    if (!expense) {
        throw new NotFoundError("Expense not found.");
    }
    // check permissions
    checkPermissions(req.user?.userId, expense.createdBy);
    await Expense.deleteOne({ _id: expenseId });
    res.status(StatusCodes.OK).json({
        message: "Expense deleted successfully.",
        deletedExpenseId: expenseId,
    });
};
export { createExpense, getAllExpenses, getExpense, updateExpense, deleteExpense, };
