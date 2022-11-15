import DatePicker from "./MonthPicker";
import { DollarLogo } from "../AllSVGs";
import ExpenseDetailsBody from "./ExpenseDetailsBody";
import React from "react";
import color from "../../utils/color";
const ExpenseDetails = () => {
  return (
    <div className="expense-details-container">
      <div className="expense-details-header">
        <div className="title-section">
          <DollarLogo
            width="30px"
            fill={color.main}
            style={{ position: "absolute" }}
          />
          <h2>Shark Money</h2>
        </div>

        <div className="summary">
          <div className="date">
            <DatePicker />
          </div>
          <div className="summary-right">
            <div>
              <label>Income</label>
              <p className="price">0.00</p>
            </div>
            <div>
              <label>Expense</label>
              <p className="price">190.00</p>
            </div>
          </div>
        </div>
      </div>

      <ExpenseDetailsBody />
    </div>
  );
};

export default ExpenseDetails;
