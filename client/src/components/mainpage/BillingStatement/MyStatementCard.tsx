import { Card, CardContent, Stack, Typography } from "@mui/material";

import dayjs from "dayjs";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

const MyStatementCard = () => {
  const { totalExpense, totalIncome, date } = useAppSelector(selectExpense);
  return (
    <Card className="billing-statement-card">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          My Statement
        </Typography>

        <div className="statement-card-info">
          <span>{dayjs(date).format("MMM")}</span>
          <Stack direction="row" spacing={2}>
            <div className="card-info-item">
              <p>income</p>
              <p>{totalIncome}</p>
            </div>
            <div className="card-info-item">
              <p>expense</p>
              <p>{totalExpense}</p>
            </div>
            <div className="card-info-item">
              <p>savings</p>
              <p>{totalIncome - totalExpense}</p>
            </div>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyStatementCard;
