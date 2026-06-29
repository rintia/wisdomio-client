"use client";

import { useEffect, useState } from "react";

import { Card } from "@heroui/react";

import {
  Persons,
  BookOpen,
  TriangleExclamation,
  Star,
  Calendar,
} from "@gravity-ui/icons";

import { getAdminStats } from "@/lib/api/admin";

export default function AdminStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getAdminStats();
      setStats(data);
    }

    load();
  }, []);

  if (!stats) return null;

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Persons,
      color: "text-blue-600",
    },
    {
      title: "Public Lessons",
      value: stats.publicLessons,
      icon: BookOpen,
      color: "text-emerald-600",
    },
    {
      title: "Reported Lessons",
      value: stats.reportedLessons,
      icon: TriangleExclamation,
      color: "text-red-600",
    },
    {
      title: "Active Contributors",
      value: stats.activeContributors,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Today's Lessons",
      value: stats.todaysLessons,
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="p-6"
          >
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