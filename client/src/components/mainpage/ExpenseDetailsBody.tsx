import ExpenseItem from "./ExpenseItem";
import { useMemo } from "react";
interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}

const ExpenseDetailsBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
}: Props) => {
  // calculate body height
  const bodyHeight = useMemo(() => {
    const totalHeight = window.innerHeight;
    return (
      bottomNavOffsetHeight &&
      headerOffsetHeight &&
      totalHeight - bottomNavOffsetHeight - headerOffsetHeight
    );
  }, [bottomNavOffsetHeight, headerOffsetHeight, window.innerHeight]);
  return (
    <div
      className="expense-details-body"
      style={{
        marginTop: `${headerOffsetHeight}px`,
        overflow: "scroll",
        height: bodyHeight,
      }}
    >
      <p className="expense-details-body-header">
        <span>11.12 Wednesday</span>
        <span>expense: 190</span>
      </p>
      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
      <ExpenseItem />
    </div>
  );
};

export default ExpenseDetailsBody;
