import mongoose from "mongoose";
import expenseCategories from "./expenseCategories.js";
import incomeCategories from "./incomeCategories.js";
const ExpenseSchema = new mongoose.Schema({
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
