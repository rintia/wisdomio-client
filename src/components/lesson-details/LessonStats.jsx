"use client";

import { Card } from "@heroui/react";

import {
  Heart,
  Bookmark,
} from "@gravity-ui/icons";

export default function LessonStats({
  lesson,
}) {
  return (
    <Card className="p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Community Engagement
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border p-6">

          <div className="flex items-center gap-3">

            <Heart className="h-7 w-7 text-red-500" />

            <div>

              <p className="text-sm text-default-500">
                Likes
              </p>

              <h3 className="text-3xl font-bold">
                {lesson.likes || 0}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl border p-6">

          <div className="flex items-center gap-3">

            <Bookmark className="h-7 w-7 text-emerald-600" />

            <div>

              <p className="text-sm text-default-500">
                Favorites
              </p>

              <h3 className="text-3xl font-bold">
                {lesson.savedCount || 0}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </Card>
  );
}