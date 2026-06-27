"use client";

import Link from "next/link";
import {
    Button,
    Chip,
    Modal,

} from "@heroui/react";

import { toast } from "react-hot-toast";
import { updateLessonVisibility } from "@/lib/api/lesson";

import {
    Eye,
    Pencil,
    TrashBin,
    Calendar,
    Heart,
    Bookmark,
} from "@gravity-ui/icons";

import { deleteLesson } from "@/lib/api/lesson";
import { useState } from "react";

export default function MyLessonsTable({
    lessons,
    setLessons
}) {
    const [isDeleteOpen, setIsDeleteOpen] =
        useState(false);

    const [selectedLessonId, setSelectedLessonId] =
        useState(null);
    const handleVisibilityToggle = async (
        lessonId,
        currentVisibility
    ) => {
        const newVisibility =
            currentVisibility === "public"
                ? "private"
                : "public";

        try {
            await updateLessonVisibility(
                lessonId,
                newVisibility
            );

            setLessons((prev) =>
                prev.map((lesson) =>
                    lesson._id === lessonId
                        ? {
                            ...lesson,
                            visibility: newVisibility,
                        }
                        : lesson
                )
            );

            toast.success(
                `Lesson is now ${newVisibility}.`
            );
        } catch {
            toast.error(
                "Failed to update visibility."
            );
        }
    };
    const handleDelete = async () => {
        try {
            const res = await deleteLesson(
                selectedLessonId
            );

            if (res.deletedCount > 0) {
                toast.success(
                    "Lesson deleted successfully!"
                );

                setLessons((prev) =>
                    prev.filter(
                        (lesson) =>
                            lesson._id !== selectedLessonId
                    )
                );

                setIsDeleteOpen(false);
            }
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to delete lesson."
            );
        }
    };
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

                                    <button
                                        onClick={() =>
                                            handleVisibilityToggle(
                                                lesson._id,
                                                lesson.visibility
                                            )
                                        }
                                        className={`rounded-full px-4 py-1 text-sm font-medium transition
      ${lesson.visibility === "public"
                                                ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                            }`}
                                    >
                                        {lesson.visibility === "public"
                                            ? "🌍 Public"
                                            : "🔒 Private"}
                                    </button>

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

                                        {lesson.likesCount ||
                                            0}
                                    </div>
                                </td>

                                {/* Saves */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                        <Bookmark className="h-4 w-4" />

                                        {lesson.savesCount || 0}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            href={`/lessons/${lesson._id}`}
                                            className="button button--primary"
                                        >
                                            See Details

                                        </Link>


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
                                            onPress={() => {
                                                setSelectedLessonId(lesson._id);
                                                setIsDeleteOpen(true);
                                            }}
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
            <Modal.Backdrop
                isOpen={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
            >
                <Modal.Container size="sm">
                    <Modal.Dialog>
                        {({ close }) => (
                            <>
                                <Modal.Header>
                                    <Modal.Heading>
                                        Delete Lesson
                                    </Modal.Heading>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>
                                        Are you sure you want to delete
                                        this lesson?
                                    </p>

                                    <p className="text-sm text-red-500 mt-2">
                                        This action cannot be undone.
                                    </p>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button
                                        variant="bordered"
                                        onPress={close}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        color="danger"
                                        onPress={async () => {
                                            await handleDelete();
                                            close();
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </div>

    );
}