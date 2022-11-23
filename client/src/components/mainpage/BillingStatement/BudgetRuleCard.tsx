import { Card, CardContent, Typography } from "@mui/material";
import { Legend, Pie, PieChart } from "recharts";

import { useMemo } from "react";

interface Props {
  budget: number | null;
}
const BudgetRuleCard = ({ budget }: Props) => {
  const data01 = useMemo(
    () => [
      { name: "Needs", value: budget ? budget * 0.5 : 5, fill: "#0088FE" },
      { name: "Wants", value: budget ? budget * 0.3 : 3, fill: "#00C49F" },
      { name: "Savings", value: budget ? budget * 0.2 : 2, fill: "#FFBB28" },
    ],
    [budget]
  );
  return (
    <Card className="billing-statement-card">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          50/30/20 Budget Rule
        </Typography>

        <div className="budget-rule-card-chart">
          <PieChart width={120} height={180}>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Legend />
          </PieChart>

          <div className="budget-rule-list">
            <ul>
              <li>
                50% on needs: Groceries, Housing, Utilities, Insurance, Car
              </li>

              <li>30% on wants: Entertainment, Dining Out, Shopping, Travel</li>

              <li>20% on savings</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetRuleCard;
