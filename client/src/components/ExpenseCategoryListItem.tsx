import { CiApple } from "react-icons/ci";
import { GiShinyApple } from "react-icons/gi";
import React from "react";

const ExpenseCategoryListItem = () => {
  return (
    <div className="expense-category-list-item-container">
      <CiApple fill="black" size="2em" className="category-icon" />
      <label>Fruit</label>
    </div>
  );
};

export default ExpenseCategoryListItem;
