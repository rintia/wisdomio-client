"use client";

import Link from "next/link";
import {
  Button,
  Chip,
} from "@heroui/react";

import {
  Eye,
  Pencil,
  TrashBin,
  Calendar,
  Heart,
  Bookmark,
} from "@gravity-ui/icons";

export default function MyLessonsTable({
  lessons,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-zinc-100">
            <tr>
              <th className="px-4 py-4 text-left text-sm font-semibold">
                Lesson
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Visibility
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Access
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Created
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Reactions
              </th>

              <th className="px-4 py-4 text-left text-sm font-semibold">
                Saves
              </th>

              <th className="px-4 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson) => (
              <tr
                key={lesson._id}
                className="border-t border-zinc-200"
              >
                {/* Title */}
                <td className="px-4 py-4">
                  <div>
                    <h3 className="font-semibold">
                      {lesson.title}
                    </h3>

                    <p className="text-xs text-zinc-500">
                      {lesson.category}
                    </p>
                  </div>
                </td>

                {/* Visibility */}
                <td className="px-4 py-4">
                  <Chip
                    color={
                      lesson.visibility ===
                      "public"
                        ? "success"
                        : "warning"
                    }
                    variant="flat"
                  >
                    {lesson.visibility ||
                      "Public"}
                  </Chip>
                </td>

                {/* Access */}
                <td className="px-4 py-4">
                  <Chip
                    color={
                      lesson.accessLevel ===
                      "premium"
                        ? "secondary"
                        : "primary"
                    }
                    variant="flat"
                  >
                    {lesson.accessLevel ||
                      "Free"}
                  </Chip>
                </td>

                {/* Created */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />

                    {new Date(
                      lesson.createdAt
                    ).toLocaleDateString()}
                  </div>
                </td>

                {/* Reactions */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />

                    {lesson.reactionCount ||
                      0}
                  </div>
                </td>

                {/* Saves */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />

                    {lesson.savedCount || 0}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      as={Link}
                      href={`/lessons/${lesson._id}`}
                      size="sm"
                      variant="flat"
                      color="primary"
                      startContent={
                        <Eye className="h-4 w-4" />
                      }
                    >
                      Details
                    </Button>

                   <Link href={`/dashboard/user/my-lessons/${lesson._id}/edit`}>
                    <Button
                      size="sm"
                      variant="flat"
                      color="warning"
                      startContent={
                        <Pencil className="h-4 w-4" />
                      }
                    >
                      Update
                    </Button>
                    </Link>

                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      startContent={
                        <TrashBin className="h-4 w-4" />
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {lessons.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-zinc-500"
                >
                  No lessons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}