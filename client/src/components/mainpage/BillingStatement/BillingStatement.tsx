import * as yup from "yup";

import { useEffect, useRef, useState } from "react";

import BillingStatementBody from "./BillingStatementBody";
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

const BillingStatement = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [budget, setBudget] = useState<number | null>(10000);

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  const { totalExpense, totalIncome } = useAppSelector(selectExpense);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="billing-statement-container">
      <div className="billing-statement-header" ref={headerRef}>
        <h2>Billing Statement</h2>

        <div className="summary">
          <div className="date">
            <MonthPicker />
          </div>
          <div className="summary-right">
            <div>
              <label>Budget</label>
              <p className="price">{budget}</p>
            </div>
            <div>
              <label>Savings</label>
              <p className="price">{totalIncome - totalExpense}</p>
            </div>
          </div>
        </div>
      </div>

      {headerOffsetHeight && bottomNavOffsetHeight && (
        <BillingStatementBody
          bottomNavOffsetHeight={bottomNavOffsetHeight}
          headerOffsetHeight={headerOffsetHeight}
          budget={budget}
        />
      )}
    </div>
  );
};

export default BillingStatement;
