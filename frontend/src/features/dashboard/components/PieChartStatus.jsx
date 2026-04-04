import { Pie, PieChart, Tooltip, Cell } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
// #endregion
export default function PieChartStatus({ data = [], totalData }) {
  return (
    <PieChart style={{ width: "100%", height: 300, maxWidth: 500 }}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        paddingAngle={2}
        isAnimationActive={false}
      >
        {data.map((entry, index) => (
          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#111"
      >
        <tspan className="text-2xl font-semibold fill-current text-gray-900 dark:text-gray-100">
          {totalData}
        </tspan>
        <tspan
          x="50%"
          dy="1.4em"
          fontSize="12"
          className="text-2xl font-semibold fill-current text-gray-600 dark:text-gray-400"
        >
          Tasks
        </tspan>
      </text>
    </PieChart>
  );
}
