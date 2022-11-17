import { useEffect, useRef, useState } from "react";

import DatePicker from "../MonthPicker";
import { DollarLogo } from "../../AllSVGs";
import ExpenseDetailsBody from "./ExpenseDetailsBody";
import color from "../../../utils/color";

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const ExpenseDetails = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);

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
