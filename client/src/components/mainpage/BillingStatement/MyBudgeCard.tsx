import { Card, CardContent, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useCallback, useMemo } from "react";

import { expenseAllocation } from "../../../utils/expenseChartHelper";
import { round } from "lodash";
import { selectExpense } from "../../../store/expenseSlice";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../hooks/useAppSelector";

const BorderLinearProgress: any = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

interface Props {
  budget: number | null;
}

const MyBudgeCard = ({ budget }: Props) => {
  const { expenseList, totalExpense } = useAppSelector(selectExpense);

  const { needs, wants } = useMemo(
    () => expenseAllocation(expenseList),
    [expenseList]
  );

  const budgetAmountCalc = useCallback(
    (type: "needs" | "wants" | "savings") => {
      if (budget) {
        if (type === "needs") {
          return budget * 0.5;
        } else if (type === "wants") {
          return budget * 0.3;
        } else {
          return budget * 0.2;
        }
      } else {
        return 0;
      }
    },
    []
  );

  const needsPercentage = useMemo(() => {
    return (needs / budgetAmountCalc("needs")) * 100 > 100
      ? 100
      : round((needs / budgetAmountCalc("needs")) * 100, 2);
  }, [budget, needs]);

  const wantsPercentage = useMemo(() => {
    return (wants / budgetAmountCalc("wants")) * 100 > 100
      ? 100
      : round((wants / budgetAmountCalc("wants")) * 100, 2);
  }, [budget, wants]);

  const savings = useMemo(() => {
    return budget ? budget - totalExpense : 0;
  }, [budget, totalExpense]);

  const savingsPercentage = useMemo(() => {
    return (savings / budgetAmountCalc("savings")) * 100 > 100
      ? 100
      : round((savings / budgetAmountCalc("savings")) * 100, 2);
  }, [budget, totalExpense]);

  return (
    <Card className="billing-statement-card">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          My Budget Condition
        </Typography>

        <div className="my-budget-desc">
          <p>
            ({needs}/{budgetAmountCalc("needs")}) ({100 - needsPercentage}%
            Remaining)
          </p>
          <div className="my-budget-info">
            <span>Needs</span>
            <BorderLinearProgress
              variant="determinate"
              value={needsPercentage}
            />
          </div>
        </div>

        <div className="my-budget-desc">
          <p>
            ({wants}/{budgetAmountCalc("wants")}) ({100 - wantsPercentage}%
            Remaining)
          </p>
          <div className="my-budget-info">
            <span>Wants</span>
            <BorderLinearProgress
              variant="determinate"
              value={wantsPercentage}
            />
          </div>
        </div>

        <div className="my-budget-desc">
          <p>
            ({savings}/{budgetAmountCalc("wants")}) ({100 - savingsPercentage}%
            Remaining)
          </p>
          <div className="my-budget-info">
            <span>Savings</span>
            <BorderLinearProgress
              variant="determinate"
              value={savingsPercentage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyBudgeCard;
