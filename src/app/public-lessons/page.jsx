"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

import { getPublicLessons } from "@/lib/api/lesson";
import LessonsGrid from "@/components/LessonsGrid";

export default function PublicLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await getPublicLessons();
        setLessons(data);
      } finally {
        setLoading(false);
      }
    };

    loadLessons();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold">
          Public Life Lessons
        </h1>

        <p className="mt-3 text-default-500">
          Browse wisdom shared by people from all walks of life.
        </p>
      </div>

      <LessonsGrid lessons={lessons} />
    </section>
  );
}