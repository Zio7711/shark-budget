import AppPieChart from "./AppPieChart";

const data = [
  { name: "investment", value: 300, fill: "#8884d8" },
  { name: "insurance", value: 200, fill: "#57c0e8" },
  { name: "daily", value: 100, fill: "#FF6565" },
  { name: "pension", value: 400, fill: "#FFBB28" },
];

const ExpenseChartBody = () => {
  return (
    <div className="expense-chart-body-container">
      <h3>Recommended asset allocation</h3>
      <AppPieChart data={data} legend={true} />
      <h3 style={{ marginTop: "1em" }}>Your expenses allocation</h3>
      <AppPieChart data={data} />
    </div>
  );
};

export default ExpenseChartBody;
