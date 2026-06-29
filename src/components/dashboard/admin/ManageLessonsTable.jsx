"use client";
import Image from "next/image";
import toast from "react-hot-toast";

import { Button, Chip } from "@heroui/react";

import {
    TrashBin,
    Star,
    Calendar,
} from "@gravity-ui/icons";

import {
    deleteLesson,
    toggleFeaturedLesson,
} from "@/lib/api/lesson";

export default function ManageLessonsTable({
    lessons,
    setLessons,
}) {
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this lesson permanently?"
        );

        if (!confirmDelete) return;

        const res = await deleteLesson(id);

        if (res.deletedCount || res.success) {
            toast.success("Lesson deleted.");

            setLessons((prev) =>
                prev.filter((lesson) => lesson._id !== id)
            );
        } else {
            toast.error("Failed to delete lesson.");
        }
    };

    const handleFeature = async (id) => {
        const res = await toggleFeaturedLesson(id);

        if (res.success) {
            toast.success("Lesson updated.");

            setLessons((prev) =>
                prev.map((lesson) =>
                    lesson._id === id
                        ? {
                            ...lesson,
                            featured: !lesson.featured,
                        }
                        : lesson
                )
            );
        } else {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-default">
            <table className="min-w-full">
                <thead className="bg-zinc-100">
                    <tr>
                        <th className="px-4 py-4 text-left">
                            Lesson
                        </th>

                        <th className="px-4 py-4 text-left">
                            Author
                        </th>

                        <th className="px-4 py-4 text-center">
                            Visibility
                        </th>

                        <th className="px-4 py-4 text-center">
                            Featured
                        </th>

                        <th className="px-4 py-4 text-center">
                            Created
                        </th>

                        <th className="px-4 py-4 text-center">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {lessons.map((lesson) => (
                        <tr
                            key={lesson._id}
                            className="border-t"
                        >
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  

                                    <div>
                                        <h3 className="font-semibold">
                                            {lesson.title}
                                        </h3>

                                        <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                                            {lesson.description}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <div>
                                    <p className="font-medium">
                                        {lesson.author}
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        {lesson.authorEmail}
                                    </p>
                                </div>
                            </td>

                            <td className="px-4 py-4 text-center">
                                <Chip
                                    color={
                                        lesson.visibility === "public"
                                            ? "success"
                                            : "secondary"
                                    }
                                    variant="flat"
                                >
                                    {lesson.visibility}
                                </Chip>
                            </td>

                            <td className="px-4 py-4 text-center">
                                <Chip
                                    color={
                                        lesson.featured
                                            ? "warning"
                                            : "default"
                                    }
                                    variant="flat"
                                >
                                    {lesson.featured
                                        ? "Featured"
                                        : "No"}
                                </Chip>
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                                    <Calendar className="h-4 w-4" />

                                    {new Date(
                                        lesson.createdAt
                                    ).toLocaleDateString()}
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex justify-center gap-2">
                                    <Button
                                        size="sm"
                                        className={
                                            lesson.featured
                                                ? "bg-yellow-500 text-white"
                                                : "bg-zinc-700 text-white"
                                        }
                                        onPress={() =>
                                            handleFeature(lesson._id)
                                        }
                                    >
                                        <Star className="mr-2 h-4 w-4" />

                                        {lesson.featured
                                            ? "Unfeature"
                                            : "Feature"}
                                    </Button>

                                    <Button
                                        size="sm"
                                        color="danger"
                                        onPress={() =>
                                            handleDelete(lesson._id)
                                        }
                                    >
                                        <TrashBin className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {lessons.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="py-16 text-center text-default-500"
                            >
                                No lessons found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}