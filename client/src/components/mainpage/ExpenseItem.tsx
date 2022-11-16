import { GiShinyApple } from "react-icons/gi";
const ExpenseItem = () => {
  return (
    <div className="expense-item-container">
      <div>
        <GiShinyApple />
      </div>

      <div className="expense-item-right-section">
        <p>Fruit</p>
        <p>-50</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
