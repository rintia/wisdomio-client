"use client";

import Link from "next/link";

import {
  Card,
  Chip,
  Button,
} from "@heroui/react";

import {
  Heart,
  BookOpen,
} from "@gravity-ui/icons";

export default function UserLessonCard({
  lesson,
}) {
  return (
    <Card className="p-5">

      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="mb-4 h-48 w-full rounded-xl object-cover"
        />
      )}

      <h3 className="text-xl font-semibold">
        {lesson.title}
      </h3>

      <div className="mt-3 flex gap-2">

        <Chip size="sm">
          {lesson.category}
        </Chip>

        <Chip
          size="sm"
          color="success"
        >
          {lesson.tone}
        </Chip>

      </div>

      <p className="mt-4 line-clamp-4 text-default-500">
        {lesson.description}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex gap-4 text-sm text-default-500">

          <span className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            {lesson.savedCount || 0}
          </span>

          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {lesson.reactionCount || 0}
          </span>

        </div>

        <Button
          as={Link}
          href={`/lessons/${lesson._id}`}
          size="sm"
          color="success"
        >
          Read
        </Button>

      </div>

    </Card>
  );
}