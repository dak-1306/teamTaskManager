import React from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "../../../components/ui/chart";

type PieEntry = { name: string; value: number };

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function PieChartStatus({
  data = [],
  totalData = 0,
}: {
  data?: PieEntry[];
  totalData?: number;
}) {
  const config: Record<string, { color?: string }> = {};

  const coloredData = data.map((d, i) => {
    const color = COLORS[i % COLORS.length];
    config[d.name] = { color };
    return { ...d, fill: color };
  });

  return (
    <ChartContainer
      config={config}
      id="pie-status"
      className="w-full h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={coloredData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
          />

          {/* ✅ Tooltip */}
          <Tooltip />

          {/* ✅ Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pointer-events-none"
          >
            <tspan className="text-2xl font-semibold fill-current">
              {totalData}
            </tspan>
            <tspan
              x="50%"
              dy="1.4em"
              fontSize="12"
              className="fill-current text-gray-500"
            >
              Tasks
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
