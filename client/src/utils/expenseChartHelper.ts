import { Expense } from "../store/expenseSlice";
import { round } from "lodash";
export type PieChartDataObj = {
  name: string;
  value: number;
  fill: string;
};

type SumExpenseByCategory = {
  [key: string]: number;
};

export const sumExpenseByCategory = (
  expenses: Expense[]
): SumExpenseByCategory => {
  const result: SumExpenseByCategory = {};

  expenses
    .filter((expense) => expense.type === "expense")
    .forEach((expense) => {
      if (result[expense.category]) {
        result[expense.category] += expense.amount;
      } else {
        result[expense.category] = expense.amount;
      }
    });

  return result;
};

//todo: add type
export const expenseAllocation = (expenses: Expense[]) => {
  const expenseAllocationObj = {
    needs: 0,
    wants: 0,
  };

  const expensesByCategory = sumExpenseByCategory(expenses);

  for (const category in expensesByCategory) {
    const needs = [
      "fruit",
      "groceries",
      "transport",
      "veggies",
      "comm",
      "rent",
      "utilities",
      "repair",
      "family",
      "kids",
      "car",
      "medical",
      "education",
    ];

    switch (true) {
      case needs.includes(category):
        expenseAllocationObj.needs += expensesByCategory[category];
        break;

      default:
        expenseAllocationObj.wants += expensesByCategory[category];
        break;
    }
  }

  expenseAllocationObj.needs = round(expenseAllocationObj.needs, 2);
  expenseAllocationObj.wants = round(expenseAllocationObj.wants, 2);

  return expenseAllocationObj;
};

// const data = [
//   { name: "investment", value: 300, fill: "#8884d8" },
//   { name: "insurance", value: 200, fill: "#57c0e8" },
//   { name: "daily", value: 100, fill: "#FF6565" },
//   { name: "pension", value: 400, fill: "#FFBB28" },
// ];

export const formatExpenseCategoryData = (
  expensesByCategory: SumExpenseByCategory
): PieChartDataObj[] => {
  const result = [];

  for (const category in expensesByCategory) {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    result.push({
      name: category,
      value: expensesByCategory[category],
      fill: randomColor,
    });
  }

  return result;
};
