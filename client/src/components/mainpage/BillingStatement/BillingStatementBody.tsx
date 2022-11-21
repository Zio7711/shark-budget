import { Card, CardContent, Typography } from "@mui/material";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

import { useMemo } from "react";

const data01 = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 200 },
];
interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}

const BillingStatementBody = ({
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
  }, [bottomNavOffsetHeight, headerOffsetHeight]);
  return (
    <div
      className="billing-statement-body-container"
      style={{
        marginTop: `${headerOffsetHeight}px`,
        overflow: "scroll",
        height: bodyHeight,
      }}
    >
      <Card className="billing-statement-card">
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            50/30/20 Budget Rule
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The rule is to split your after-tax income into three categories of
            spending: 50% on needs, 30% on wants, and 20% on savings.
          </Typography>

          <div className="budget-rule-card-chart">
            <PieChart width={120} height={120}>
              <Pie
                data={data01}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
            </PieChart>

            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptile
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingStatementBody;
