"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

import { getReportedLessons } from "@/lib/api/admin";
import ReportedLessonsTable from "@/components/dashboard/admin/ReportedLessonsTable";

export default function ReportedLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReportedLessons();
      setLessons(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

   console.log(lessons);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Reported Lessons
        </h1>

        <p className="mt-2 text-default-500">
          Review community reports and moderate inappropriate lessons.
        </p>
      </div>

      <ReportedLessonsTable
        lessons={lessons}
        setLessons={setLessons}
      />
    </section>
  );
}