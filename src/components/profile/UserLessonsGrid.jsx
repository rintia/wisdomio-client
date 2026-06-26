"use client";

import UserLessonCard from "./UserLessonCard";

export default function UserLessonsGrid({
  lessons,
}) {
  return (
    <section>

      <h2 className="mb-6 text-2xl font-bold">
        My Public Lessons
      </h2>

      {lessons.length === 0 ? (
        <p className="text-default-500">
          You haven't published any public
          lessons yet.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <UserLessonCard
              key={lesson._id}
              lesson={lesson}
            />
          ))}
        </div>
      )}

    </section>
  );
}