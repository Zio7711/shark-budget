import { Legend, Pie, PieChart, Tooltip } from "recharts";

interface Props {
  data: { name: string; value: number; fill?: string }[];
  legend?: boolean;
  label?: boolean;
  height?: number;
}

const AppPieChart = ({
  data,
  legend = false,
  label = true,
  height = 280,
}: Props) => {
  return (
    <PieChart width={window.innerWidth} height={height}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={"50%"}
        cy={"50%"}
        outerRadius={80}
        fill="#8884d8"
        label={label}
      />

      {legend && <Legend />}
      <Tooltip />
    </PieChart>
  );
};

export default AppPieChart;
