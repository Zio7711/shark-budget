import {
  selectExpense,
  sumExpenseAndIncome,
} from "../../../store/expenseSlice";
import { useEffect, useRef, useState } from "react";

import { DollarLogo } from "../../AllSVGs";
import ExpenseDetailsBody from "./ExpenseDetailsBody";
import MonthPicker from "./MonthPicker";
import color from "../../../utils/color";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const ExpenseDetails = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);

  const { expenseList, totalExpense, totalIncome } =
    useAppSelector(selectExpense);

  useEffect(() => {
    dispatch(sumExpenseAndIncome());
  }, [expenseList, dispatch]);

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
              <p className="price">{totalIncome}</p>
            </div>
            <div>
              <label>Expense</label>
              <p className="price">{totalExpense}</p>
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
