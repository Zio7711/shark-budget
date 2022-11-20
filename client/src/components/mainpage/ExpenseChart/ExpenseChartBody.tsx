import {
  formatExpenseCategoryData,
  sumExpenseByCategory,
} from "../../../utils/expenseChartHelper";

import Alert from "@mui/material/Alert";
import AppPieChart from "./AppPieChart";
import ExpenseRanking from "./ExpenseRanking";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useMemo } from "react";

// const data = [
//   { name: "investment", value: 300, fill: "#8884d8" },
//   { name: "insurance", value: 200, fill: "#57c0e8" },
//   { name: "daily", value: 100, fill: "#FF6565" },
//   { name: "pension", value: 400, fill: "#FFBB28" },
// ];

interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}
const ExpenseChartBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
}: Props) => {
  const { expenseList } = useAppSelector(selectExpense);

  const userExpenseData = useMemo(
    () => formatExpenseCategoryData(sumExpenseByCategory(expenseList)),
    [expenseList]
  );

  const sortedUserExpenseData = useMemo(
    () => userExpenseData.sort((a, b) => b.value - a.value),
    [userExpenseData]
  );

  // calculate body height
  const bodyHeight = useMemo(() => {
    const totalHeight = window.innerHeight;
    return (
      bottomNavOffsetHeight &&
      headerOffsetHeight &&
      totalHeight - bottomNavOffsetHeight - headerOffsetHeight
    );
  }, [bottomNavOffsetHeight, headerOffsetHeight]);

  return (
    <div
      className="expense-chart-body-container"
      style={{
        marginTop: `${headerOffsetHeight}px`,
        overflow: "scroll",
        height: bodyHeight,
      }}
    >
      {/* <h3>Recommended asset allocation</h3>
      <AppPieChart data={data} legend={true} /> */}
      <h3
      //  style={{ marginTop: "1em" }}
      >
        Your expenses allocation
      </h3>
      {userExpenseData.length > 0 ? (
        <AppPieChart data={userExpenseData} legend={true} />
      ) : (
        <>
          <Alert severity="error">You Do Not Have Any Expenses!</Alert>
          <AppPieChart
            data={[{ name: "asdf", value: 1 }]}
            label={false}
            height={180}
          />
        </>
      )}

      <h3 style={{ marginTop: "1em" }}>Your expenses Ranking</h3>
      {sortedUserExpenseData.length > 0 ? (
        sortedUserExpenseData.map((categoryObj) => {
          return (
            <ExpenseRanking
              key={categoryObj.name}
              categoryObj={categoryObj}
              mostExpense={sortedUserExpenseData[0]}
            />
          );
        })
      ) : (
        <Alert severity="error">You Do Not Have Any Expenses!</Alert>
      )}
    </div>
  );
};

export default ExpenseChartBody;
