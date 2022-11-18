import CategoryIconLookUp from "../../../utils/CategoryIconLookUp";
import { Expense } from "../../../store/expenseSlice";
import { GiShinyApple } from "react-icons/gi";
interface Props {
  expense: Expense;
}
const ExpenseItem = ({ expense }: Props) => {
  const displayAmount =
    expense.type === "expense" ? `-${expense.amount}` : `${expense.amount}`;
  return (
    <div className="expense-item-container">
      <div>
        <CategoryIconLookUp category={expense.category} />
      </div>

      <div className="expense-item-right-section">
        <p>{expense.description}</p>
        <p>{displayAmount}</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
