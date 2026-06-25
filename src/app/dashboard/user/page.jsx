"use client";

import { useEffect, useState } from "react";

import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentLessons from "@/components/dashboard/RecentLessons";
import StatsGrid from "@/components/dashboard/StatGrid";

import { useSession } from "@/lib/auth-client";
import { getUserLessons } from "@/lib/api/lesson";

import { Spinner } from "@heroui/react";

const DashboardPage = () => {
  const { data: session, isPending } = useSession();

  const [lessons, setLessons] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      if (!session?.user?.id) return;

      try {
        const data = await getUserLessons(
          session.user.id
        );

        // If API returns array:
        setLessons(data);

        // If API returns { lessons: [...] }
        // setLessons(data.lessons);

      } catch (error) {
        console.error("Failed to load lessons:", error);
      } finally {
        setLoadingLessons(false);
      }
    };

    loadLessons();
  }, [session]);

  if (isPending || loadingLessons) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-4xl font-bold">
        Welcome back, {user?.name}
      </h2>

      {/* Dynamic Stats */}
      <StatsGrid lessons={lessons} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLessons lessons={lessons} />
        <QuickActions />
      </div>

      <AnalyticsCard lessons={lessons} />
    </div>
  );
};

export default DashboardPage;