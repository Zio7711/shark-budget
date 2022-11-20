import { Expense } from "../store/expenseSlice";
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
    investment: 0,
    insurance: 0,
    daily: 0,
    pension: 0,
  };

  const expensesByCategory = sumExpenseByCategory(expenses);

  for (const category in expensesByCategory) {
    const INVESTMENT = ["investment", "education", "books"];
    const INSURANCE = ["insurance"];
    const PENSION = ["pension"];

    switch (true) {
      case INVESTMENT.includes(category):
        expenseAllocationObj.investment += expensesByCategory[category];
        break;

      case INSURANCE.includes(category):
        expenseAllocationObj.insurance += expensesByCategory[category];
        break;

      case PENSION.includes(category):
        expenseAllocationObj.pension += expensesByCategory[category];
        break;

      default:
        expenseAllocationObj.daily += expensesByCategory[category];
        break;
    }
  }

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
