"use client";

import Link from "next/link";
import { Card, Chip, Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

const lessons = [
  {
    id: 1,
    title: "The Power of Patience",
    author: "Sarah Ahmed",
    access: "public",
  },
  {
    id: 2,
    title: "Never Stop Learning",
    author: "John Doe",
    access: "premium",
  },
  {
    id: 3,
    title: "Success Comes Slowly",
    author: "Emily Tan",
    access: "public",
  },
  {
    id: 4,
    title: "Forgive to Grow",
    author: "Fatima Noor",
    access: "premium",
  },
];

export default function RecentLessons() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            Recent Lessons
          </h2>

          <p className="text-default-500">
            Latest published lessons
          </p>
        </div>

        <Button
          as={Link}
          href="/dashboard/manage-lessons"
          color="success"
          variant="flat"
          endContent={<ArrowRight className="h-4 w-4" />}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {lesson.title}
              </h3>

              <p className="text-sm text-default-500">
                {lesson.author}
              </p>
            </div>

            <Chip
              color={
                lesson.access === "premium"
                  ? "warning"
                  : "success"
              }
              variant="flat"
            >
              {lesson.access}
            </Chip>
          </div>
        ))}
      </div>
    </Card>
  );
}