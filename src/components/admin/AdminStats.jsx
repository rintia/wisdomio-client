"use client";

import { Card } from "@heroui/react";
import {
  Persons,
  BookOpen,
  TriangleExclamation,
  Star,
  Calendar
} from "@gravity-ui/icons";

const stats = [
  {
    title: "Total Users",
    value: 1245,
    icon: Persons,
    color: "text-blue-600",
  },
  {
    title: "Public Lessons",
    value: 683,
    icon: BookOpen,
    color: "text-emerald-600",
  },
  {
    title: "Reported Lessons",
    value: 14,
    icon: TriangleExclamation,
    color: "text-red-600",
  },
  {
    title: "Active Contributors",
    value: 27,
    icon: Star,
    color: "text-yellow-500",
  },
  {
    title: "Today's Lessons",
    value: 12,
    icon: Calendar,
    color: "text-purple-600",
  },
];

export default function AdminStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title} className="p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-default-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {item.value}
                </h2>
              </div>

              <Icon
                className={`h-10 w-10 ${item.color}`}
              />

            </div>

          </Card>
        );
      })}
    </div>
  );
}