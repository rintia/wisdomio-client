"use client";

import { Card } from "@heroui/react";

import {
  Heart,
  Bookmark,
} from "@gravity-ui/icons";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";

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
            <LikeButton lesson={lesson} />
            </div>

          </div>

        </div>

        <div className="rounded-xl border p-6">

          <div className="flex items-center gap-3">

            <Bookmark className="h-7 w-7 text-emerald-600" />

            <div>
                <FavoriteButton lesson={lesson} />

            </div>

          </div>

        </div>

      </div>

    </Card>
  );
}