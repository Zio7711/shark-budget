import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense, } from "../controllers/expenseController.js";
import express from "express";
const expenseRouter = express.Router();
expenseRouter.route("/").post(createExpense).get(getAllExpenses);
expenseRouter
    .route("/:id")
    .get(getExpense)
    .patch(updateExpense)
    .delete(deleteExpense);
export default expenseRouter;
