import * as yup from "yup";

import { useEffect, useState } from "react";

import ExpenseChartBody from "./ExpenseChartBody";
import MonthPicker from "../ExpenseDetails/MonthPicker";
import Swal from "sweetalert2";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

const budgetSchema = yup.object().shape({
  budget: yup.number().required("Budget is required"),
});

const ExpenseChart = () => {
  const [budget, setBudget] = useState<number | null>(100);
  const { expenseList } = useAppSelector(selectExpense);
  useEffect(() => {
    console.log(expenseList);
    if (!budget) {
      Swal.fire({
        title: "Please set your monthly budget!",
        input: "number",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        preConfirm: (budget) => {
          budgetSchema.validate({ budget }).catch((err) => {
            Swal.showValidationMessage("Please enter a valid budget");
          });

          setBudget(Number(budget));

          return budget;
        },
      });
    }
  }, []);

  return (
    <div className="expense-chart-container">
      <div className="expense-chart-header">
        <h2>Wealth Enhancement</h2>

        <div className="header-sub-section">
          <MonthPicker />
          <h3>Budget: {budget}</h3>
        </div>
      </div>

      <ExpenseChartBody />
    </div>
  );
};

export default ExpenseChart;
