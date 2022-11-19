import { useCallback, useEffect, useRef, useState } from "react";

import { DollarLogo } from "../../AllSVGs";
import ExpenseDetailsBody from "./ExpenseDetailsBody";
import MonthPicker from "./MonthPicker";
import color from "../../../utils/color";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const ExpenseDetails = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);

  const { expenseList } = useAppSelector(selectExpense);

  const sumExpense = useCallback(
    (type: "income" | "expense") => {
      // calculated the total expense and income
      const sum = expenseList.reduce((acc: number, expense) => {
        if (expense.type === type) {
          return acc + expense.amount;
        }
        return acc;
      }, 0);
      return sum;
    },
    [expenseList]
  );

  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  return (
    <div className="expense-details-container">
      <div className="expense-details-header" ref={headerRef}>
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
            <MonthPicker />
          </div>
          <div className="summary-right">
            <div>
              <label>Income</label>
              <p className="price">{sumExpense("income")}</p>
            </div>
            <div>
              <label>Expense</label>
              <p className="price">{sumExpense("expense")}</p>
            </div>
          </div>
        </div>
      </div>

      {headerOffsetHeight && bottomNavOffsetHeight && (
        <ExpenseDetailsBody
          bottomNavOffsetHeight={bottomNavOffsetHeight}
          headerOffsetHeight={headerOffsetHeight}
        />
      )}
    </div>
  );
};

export default ExpenseDetails;
