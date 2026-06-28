"use client";

import AdminStats from "@/components/admin/AdminStats";
import LessonGrowthChart from "@/components/admin/LessonGrowthChart";
import UserGrowthChart from "@/components/admin/UserGrowthChart";
import TopContributors from "@/components/admin/TopContributors";
import RecentLessons from "@/components/admin/RecentLessons";
import ReportedLessons from "@/components/admin/ReportedLessons";
import QuickActions from "@/components/admin/QuickActions";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 p-8">

      <div>
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-default-500">
          Welcome back! Here's an overview of your platform.
        </p>
      </div>

      <AdminStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <LessonGrowthChart />
        <UserGrowthChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopContributors />
        <QuickActions />
      </div>

      <RecentLessons />

      <ReportedLessons />

    </div>
  );
}