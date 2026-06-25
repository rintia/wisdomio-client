"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { getUserLessons } from "@/lib/api/lesson";

import MyLessonsTable from "@/components/dashboard/MyLessonsTable";

export default function MyLessonsPage() {
  const { data: session } = useSession();

  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const loadLessons = async () => {
      if (!session?.user?.id) return;

      const data = await getUserLessons(
        session.user.id
      );

      setLessons(data);
    };

    loadLessons();
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          My Lessons
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage your published lessons and
          track engagement.
        </p>
      </div>

      <MyLessonsTable lessons={lessons} setLessons={setLessons} />
    </div>
  );
}