"use client";

import { Card } from "@heroui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsCard({
  lessons = [],
}) {
  const monthlyData = Array.from(
    { length: 12 },
    (_, index) => ({
      month: new Date(
        0,
        index
      ).toLocaleString("default", {
        month: "short",
      }),
      lessons: 0,
    })
  );

  lessons.forEach((lesson) => {
    if (!lesson.createdAt) return;

    const month = new Date(
      lesson.createdAt
    ).getMonth();

    monthlyData[month].lessons += 1;
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Activity Analytics
        </Card.Title>

        <Card.Description>
          Lessons created per month
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="lessons"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Content>
    </Card>
  );
}