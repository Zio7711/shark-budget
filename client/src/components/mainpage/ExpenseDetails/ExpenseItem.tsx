import CategoryIconLookUp from "../../../utils/CategoryIconLookUp";
import { Expense } from "../../../store/expenseSlice";

interface Props {
  expense: Expense;
  handleToggle: (expense: Expense) => void;
}
const ExpenseItem = ({ expense, handleToggle }: Props) => {
  const displayAmount =
    expense.type === "expense" ? `-${expense.amount}` : `${expense.amount}`;

  return (
    <>
      <div
        className="expense-item-container"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle(expense);
        }}
      >
        <div>
          <CategoryIconLookUp category={expense.category} />
        </div>

        <div className="expense-item-right-section">
          <p>{expense.description}</p>
          <p>{displayAmount}</p>
        </div>
      </div>
    </>
  );
};

export default ExpenseItem;
