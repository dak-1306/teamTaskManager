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
import Button from "../../../shared/ui/Button";

// ===== Get ISO week number =====
function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

// ===== Get week start date info =====
function getWeekInfo(year, week) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simple.getDay();
  const start = new Date(simple);
  start.setDate(simple.getDate() - dayOfWeek + 1);

  const month = start.getMonth() + 1;
  const weekYear = start.getFullYear();

  return { month, year: weekYear };
}

// ===== Get 7 days in week =====
function getWeekDays(year, week) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simple.getDay();
  const start = new Date(simple);
  start.setDate(simple.getDate() - dayOfWeek + 1);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

// ===== Normalize data for 7 days =====
function normalizeWeek(tasksByDay, year, week) {
  const weekDays = getWeekDays(year, week);

  return weekDays.map((date) => {
    const found = tasksByDay.find((t) => t.date === date);
    return found ? { ...found } : { date, created: 0, completed: 0 };
  });
}

export default function TasksLineChartByWeek({ tasksByDay = [] }) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentWeek = getWeekNumber(today);

  const [year] = useState(currentYear);
  const [week, setWeek] = useState(currentWeek);

  const weekInfo = getWeekInfo(year, week);

  const data = useMemo(() => {
    const normalized = normalizeWeek(tasksByDay, year, week);
    return normalized.map((item) => ({
      date: item.date.slice(5), // MM-DD
      created: item.created,
      completed: item.completed,
    }));
  }, [tasksByDay, year, week]);

  return (
    <div className="w-full">
      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Button
          variant="outline"
          onClick={() => setWeek((w) => Math.max(1, w - 1))}
        >
          Prev Week
        </Button>

        <span style={{ fontWeight: "bold" }}>
          Week {week} ({weekInfo.month}/{weekInfo.year})
        </span>

        <Button
          variant="outline"
          onClick={() => setWeek((w) => Math.min(52, w + 1))}
        >
          Next Week
        </Button>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
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
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <RechartsDevtools />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
