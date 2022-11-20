import { Legend, Pie, PieChart, Tooltip } from "recharts";

interface Props {
  data: { name: string; value: number; fill?: string }[];
  legend?: boolean;
}

const AppPieChart = ({ data, legend = false }: Props) => {
  return (
    <PieChart width={window.innerWidth} height={280}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx={"50%"}
        cy={"50%"}
        outerRadius={80}
        fill="#8884d8"
        label
      />

      {legend && <Legend />}
      <Tooltip />
    </PieChart>
  );
};

export default AppPieChart;
