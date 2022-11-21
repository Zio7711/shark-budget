import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import CategoryIconLookUp from "../../../utils/CategoryIconLookUp";
import { PieChartDataObj } from "../../../utils/expenseChartHelper";
import color from "../../../utils/color";
import { round } from "lodash";
import { selectExpense } from "../../../store/expenseSlice";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useMemo } from "react";

interface Props {
  categoryObj: PieChartDataObj;
  mostExpense: PieChartDataObj;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? color.main : "#308fe8",
  },
}));

const ExpenseRanking = ({ categoryObj, mostExpense }: Props) => {
  const { totalExpense } = useAppSelector(selectExpense);

  const expensePercentage = useMemo(
    () => round((categoryObj.value / totalExpense) * 100, 2),
    [totalExpense, categoryObj.value]
  );

  return (
    <div className="expense-ranking-container">
      <CategoryIconLookUp category={categoryObj.name} />
      <div className="ranking-item-right">
        <div className="ranking-item-right-top">
          <p>
            {categoryObj.name}
            <span style={{ marginLeft: "1em" }}>({expensePercentage}%)</span>
          </p>
          <p>${categoryObj.value}</p>
        </div>
        <BorderLinearProgress
          variant="determinate"
          value={(categoryObj.value / mostExpense.value) * 100}
        />
      </div>
    </div>
  );
};

export default ExpenseRanking;
