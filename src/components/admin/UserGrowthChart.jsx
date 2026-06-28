"use client";

import { Card } from "@heroui/react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", users: 45 },
  { month: "Feb", users: 72 },
  { month: "Mar", users: 94 },
  { month: "Apr", users: 131 },
  { month: "May", users: 170 },
  { month: "Jun", users: 228 },
];

export default function UserGrowthChart() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold">
          User Growth
        </h2>

        <p className="text-sm text-default-500">
          New users joined over the last 6 months
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="4 4" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              fill="#93c5fd"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}