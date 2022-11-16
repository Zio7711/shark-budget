import RestaurantIcon from "@mui/icons-material/Restaurant";
const ExpenseItem = () => {
  return (
    <div className="expense-item-container">
      <div>
        <RestaurantIcon />
      </div>

      <div className="expense-item-right-section">
        <p>Fruit</p>
        <p>-50</p>
      </div>
    </div>
  );
};

export default ExpenseItem;
