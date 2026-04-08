import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { ChartContainer, ChartTooltip } from "../../../components/ui/chart";

function normalizeMonths(tasksByMonth: any[], year: number) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    year,
    created: 0,
    completed: 0,
  }));

  tasksByMonth.forEach((item) => {
    if (item.year === year) {
      months[item.month - 1] = item;
    }
  });

  return months;
}

export default function TasksLineChart({
  tasksByMonth = [],
}: {
  tasksByMonth?: any[];
}) {
  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    const set = new Set(tasksByMonth.map((t) => t.year).filter(Boolean));
    if (!set.has(currentYear)) set.add(currentYear);
    return Array.from(set).sort((a, b) => b - a);
  }, [tasksByMonth, currentYear]);

  const [selectedYear, setSelectedYear] = useState(years[0] ?? currentYear);

  React.useEffect(() => {
    if (!years.includes(selectedYear)) {
      setSelectedYear(years[0] ?? currentYear);
    }
  }, [years, selectedYear, currentYear]);

  const normalized = useMemo(
    () => normalizeMonths(tasksByMonth, selectedYear),
    [tasksByMonth, selectedYear],
  );

  const data = normalized.map((item) => ({
    date: `${item.month}`,
    created: item.created,
    completed: item.completed,
  }));

  const config = {
    created: { color: "#3b82f6" },
    completed: { color: "#22c55e" },
  } as const;

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground text-center mb-4">
        Tasks by Month
      </h2>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}
      >
        <label style={{ marginRight: 8, alignSelf: "center" }}>Năm:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <ChartContainer config={config} id="tasks-line-month" className="w-full">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval={0}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            allowDecimals={false}
            tickCount={6}
            domain={[0, "dataMax + 2"]}
          />
          <ChartTooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="created"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
          <RechartsDevtools />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
