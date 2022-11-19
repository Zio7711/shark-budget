import { Expense } from "./../store/expenseSlice";
import dayjs from "dayjs";

// return {date: [expense]}
const groupExpenseByDate = (expenses: Expense[]) => {
  const result: {
    [key: string]: Expense[];
  } = {};
  expenses.forEach((expense) => {
    const date = dayjs(expense.date).format("YYYY-MM-DD");
    if (result[date]) {
      result[date].push(expense);
    } else {
      result[date] = [expense];
    }
  });
  return result;
};

export default groupExpenseByDate;
