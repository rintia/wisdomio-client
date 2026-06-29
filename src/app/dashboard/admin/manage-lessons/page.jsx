"use client";

import { useEffect, useState } from "react";

import { Spinner } from "@heroui/react";

import { getPublicLessons } from "@/lib/api/lesson";

import ManageLessonsTable from "@/components/dashboard/admin/ManageLessonsTable";

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPublicLessons();

      setLessons(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <ManageLessonsTable
      lessons={lessons}
      setLessons={setLessons}
    />
  );
}