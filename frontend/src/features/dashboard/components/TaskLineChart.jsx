import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

function normalizeMonths(tasksByMonth, year) {
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

export default function TasksLineChart({ tasksByMonth = [] }) {
  const currentYear = new Date().getFullYear();

  // năm có dữ liệu hoặc năm hiện tại nếu không có dữ liệu nào
  const years = useMemo(() => {
    const set = new Set(tasksByMonth.map((t) => t.year).filter(Boolean));
    if (!set.has(currentYear)) set.add(currentYear);
    return Array.from(set).sort((a, b) => b - a);
  }, [tasksByMonth, currentYear]);

  const [selectedYear, setSelectedYear] = useState(years[0] ?? currentYear);

  // nếu năm đã chọn không còn trong dữ liệu, reset về năm đầu tiên hoặc năm hiện tại
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

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
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
            <Tooltip />
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
        </ResponsiveContainer>
      </div>
    </div>
  );
}
