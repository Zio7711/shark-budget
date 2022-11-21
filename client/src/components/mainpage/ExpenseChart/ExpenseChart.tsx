import { useEffect, useRef, useState } from "react";

import ExpenseChartBody from "./ExpenseChartBody";
import MonthPicker from "../ExpenseDetails/MonthPicker";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const ExpenseChart = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { totalExpense } = useAppSelector(selectExpense);

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  return (
    <div className="expense-chart-container">
      <div className="expense-chart-header" ref={headerRef}>
        <h2>Expense Chart</h2>

        <div className="header-sub-section">
          <MonthPicker />
          <h3>Total Expense: {totalExpense}</h3>
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
