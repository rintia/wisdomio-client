"use client";

import { Card, Chip } from "@heroui/react";

export default function LessonContent({ lesson }) {
  return (
    <Card className="overflow-hidden p-0">

      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="h-96 w-full object-cover"
        />
      )}

      <div className="space-y-6 p-8">

        <div className="flex flex-wrap gap-2">

          <Chip color="success">
            {lesson.category}
          </Chip>

          <Chip variant="flat">
            {lesson.tone}
          </Chip>

          <Chip
            color={
              lesson.accessLevel === "premium"
                ? "warning"
                : "primary"
            }
          >
            {lesson.accessLevel}
          </Chip>

        </div>

        <h1 className="text-4xl font-bold">
          {lesson.title}
        </h1>

        <div className="whitespace-pre-line text-lg leading-8 text-default-600">
          {lesson.description}
        </div>

      </div>

    </Card>
  );
}