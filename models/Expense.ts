import mongoose, { PopulatedDoc } from "mongoose";

import { User } from "./User.js";
import expenseCategories from "./expenseCategories.js";
import incomeCategories from "./incomeCategories.js";

interface Expense {
  category: string;
  amount: number;
  type: string;
  date: Date;
  description: string;
  createdBy: PopulatedDoc<User & mongoose.Document>;
}

const ExpenseSchema = new mongoose.Schema<Expense>({
  category: {
    type: String,
    required: [true, "Please provide a type."],
    enum: [...expenseCategories, ...incomeCategories],
    default: "other",
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount."],
    positive: true,
  },
  type: {
    type: String,
    enum: ["expense", "income"],
    required: [true, "Please provide a type."],
  },
  date: {
    type: Date,
    required: [true, "Please provide a date."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user."],
  },
});

export default mongoose.model("Expense", ExpenseSchema);
