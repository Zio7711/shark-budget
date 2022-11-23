import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { selectAuth, updateUser } from "../../../store/authSlice";
import { useCallback, useEffect, useMemo } from "react";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Swal from "sweetalert2";
import { budgetSchema } from "./BillingStatement";
import color from "../../../utils/color";
import { expenseAllocation } from "../../../utils/expenseChartHelper";
import { round } from "lodash";
import { selectExpense } from "../../../store/expenseSlice";
import { styled } from "@mui/material/styles";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

const COLOR = {
  alert: "#d32f2f",
  warning: "#ed6c02",
  info: "#0288d1",
  healthy: "#2e7d32",
};

const MyBudgeCard = () => {
  const { expenseList, totalExpense } = useAppSelector(selectExpense);
  const { user } = useAppSelector(selectAuth);
  const budget = user?.budget || 0;
  const dispatch = useAppDispatch();
  const { needs, wants } = useMemo(
    () => expenseAllocation(expenseList),
    [expenseList]
  );

  const budgetAmountCalc = useCallback(
    (type: "needs" | "wants" | "savings") => {
      if (budget) {
        if (type === "needs") {
          return round(budget * 0.5, 2);
        } else if (type === "wants") {
          return round(budget * 0.3, 2);
        } else {
          return round(budget * 0.2, 2);
        }
      } else {
        return 0;
      }
    },
    [budget]
  );

  const needsPercentage = useMemo(() => {
    if (budget === 0) return 0;

    return (needs / budgetAmountCalc("needs")) * 100 > 100
      ? 100
      : round((needs / budgetAmountCalc("needs")) * 100, 2);
  }, [budget, needs]);

  const wantsPercentage = useMemo(() => {
    if (budget === 0) return 0;
    return (wants / budgetAmountCalc("wants")) * 100 > 100
      ? 100
      : round((wants / budgetAmountCalc("wants")) * 100, 2);
  }, [budget, wants]);

  const savings = useMemo(() => {
    return budget ? round(budget - totalExpense, 2) : 0;
  }, [budget, totalExpense]);

  const savingsPercentage = useMemo(() => {
    if (savings > 0) {
      return (savings / budgetAmountCalc("savings")) * 100 > 100
        ? 100
        : round((savings / budgetAmountCalc("savings")) * 100, 2);
    } else {
      return 0;
    }
  }, [budget, totalExpense]);

  const NeedsBorderLinearProgress: any = useMemo(() => {
    let barColor = COLOR.healthy;
    if (needsPercentage > 50) barColor = COLOR.info;
    if (needsPercentage > 80) barColor = COLOR.warning;
    if (needsPercentage > 90) barColor = COLOR.alert;
    return styled(LinearProgress)(({ theme }) => ({
      height: 30,
      borderRadius: 15,
      width: "100%",
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
          theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: barColor,
      },
    }));
  }, [budget, needsPercentage]);

  const WantsBorderLinearProgress: any = useMemo(() => {
    let barColor = COLOR.healthy;
    if (wantsPercentage > 50) barColor = COLOR.info;
    if (wantsPercentage > 80) barColor = COLOR.warning;
    if (wantsPercentage > 90) barColor = COLOR.alert;
    return styled(LinearProgress)(({ theme }) => ({
      height: 30,
      borderRadius: 15,
      width: "100%",
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
          theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: barColor,
      },
    }));
  }, [budget, wantsPercentage]);

  const SavingsBorderLinearProgress: any = useMemo(() => {
    let barColor = COLOR.healthy;
    if (savingsPercentage < 50) barColor = COLOR.info;
    if (savingsPercentage < 20) barColor = COLOR.warning;
    if (savingsPercentage < 10) barColor = COLOR.alert;
    return styled(LinearProgress)(({ theme }) => ({
      height: 30,
      borderRadius: 15,
      width: "100%",
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
          theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: barColor,
      },
    }));
  }, [budget, savingsPercentage]);

  const setBudget = useCallback(() => {
    const title = budget
      ? "Please update your budget"
      : "Please set your budget";

    Swal.fire({
      title: title,
      input: "number",
      confirmButtonText: "Save",
      allowOutsideClick: true,
      preConfirm: async (budget) => {
        const result = await budgetSchema.validate({ budget }).catch((err) => {
          Swal.showValidationMessage("Please enter a valid budget");
        });

        if (result) {
          dispatch(updateUser({ budget: Number(budget) }));
          return budget;
        } else {
          return false;
        }
      },
    });
  }, []);

  return (
    <Card className="billing-statement-card">
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          Budget Condition
          <IconButton size="small" onClick={setBudget}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Typography>

        {!budget && (
          <Typography
            variant="body2"
            component="div"
            sx={{ marginBottom: "1em" }}
          >
            Please set your budget
          </Typography>
        )}

        <div className="my-budget-desc">
          <p>
            ({needs}/{budgetAmountCalc("needs")}) (
            {round(100 - needsPercentage, 2)}% Remaining)
          </p>
          <div className="my-budget-info">
            <label>Needs</label>
            <NeedsBorderLinearProgress
              variant="determinate"
              value={needsPercentage}
            />
          </div>
        </div>

        <div className="my-budget-desc">
          <p>
            ({wants}/{budgetAmountCalc("wants")}) (
            {round(100 - wantsPercentage, 2)}% Remaining)
          </p>
          <div className="my-budget-info">
            <label>Wants</label>
            <WantsBorderLinearProgress
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
            <label>Savings</label>
            <SavingsBorderLinearProgress
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
