"use client";

import Link from "next/link";

import {
  Avatar,
  Button,
  Card,
} from "@heroui/react";

import {
  Person,
} from "@gravity-ui/icons";

export default function AuthorCard({
  lesson,
}) {
  return (
    <Card className="p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Creator
      </h2>

      <div className="flex flex-col items-center">

        <Avatar
          src={lesson.authorImage}
          name={lesson.author}
          className="h-24 w-24"
        />

        <h3 className="mt-4 text-xl font-semibold">
          {lesson.author}
        </h3>

        <p className="text-default-500">
          {lesson.authorEmail}
        </p>

        <div className="mt-5 flex items-center gap-2">

          <Person className="h-5 w-5 text-emerald-600" />

          <span>
            {lesson.totalLessons || 1} lessons
          </span>

        </div>

        <Button
          as={Link}
          href={`/profile/${lesson.userId}`}
          color="success"
          className="mt-6 w-full"
        >
          View All Lessons
        </Button>

      </div>

    </Card>
  );
}