import * as yup from "yup";

import { useEffect, useRef, useState } from "react";

import ExpenseChartBody from "./ExpenseChartBody";
import MonthPicker from "../ExpenseDetails/MonthPicker";
import Swal from "sweetalert2";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

const budgetSchema = yup.object().shape({
  budget: yup.number().required("Budget is required"),
});

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const ExpenseChart = ({ bottomNavOffsetHeight }: Props) => {
  const [budget, setBudget] = useState<number | null>(100);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  useEffect(() => {
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
      <div className="expense-chart-header" ref={headerRef}>
        <h2>Expense Chart</h2>

        <div className="header-sub-section">
          <MonthPicker />
          <h3>Budget: {budget}</h3>
        </div>
      </div>

      {headerOffsetHeight && bottomNavOffsetHeight && (
        <ExpenseChartBody
          bottomNavOffsetHeight={bottomNavOffsetHeight}
          headerOffsetHeight={headerOffsetHeight}
        />
      )}
    </div>
  );
};

export default ExpenseChart;
