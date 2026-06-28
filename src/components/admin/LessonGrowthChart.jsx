"use client";

import { Card } from "@heroui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", lessons: 18 },
  { month: "Feb", lessons: 24 },
  { month: "Mar", lessons: 33 },
  { month: "Apr", lessons: 41 },
  { month: "May", lessons: 52 },
  { month: "Jun", lessons: 68 },
];

export default function LessonGrowthChart() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          Lesson Growth
        </h2>

        <p className="text-sm text-default-500">
          Lessons created over the last 6 months
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="lessons"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}