"use client";

import LessonCard from "./LessonCard";

export default function LessonsGrid({ lessons }) {
  if (!lessons.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          No public lessons yet.
        </h2>

        <p className="mt-2 text-default-500">
          Check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson._id}
          lesson={lesson}
        />
      ))}
    </div>
  );
}