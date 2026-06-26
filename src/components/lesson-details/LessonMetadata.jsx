"use client";

import { Card } from "@heroui/react";

import {
    Calendar,
    Clock,
    Eye,
} from "@gravity-ui/icons";

export default function LessonMetadata({
    lesson,
}) {
    const words =
        (lesson?.description ?? "")
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;

    const readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );

    return (
        <Card className="p-6">

            <h2 className="mb-6 text-2xl font-bold">
                Lesson Information
            </h2>

            <div className="space-y-5">

                <div className="flex items-center gap-3">

                    <Calendar className="h-5 w-5 text-emerald-600" />

                    <div>

                        <p className="text-sm text-default-500">
                            Created
                        </p>

                        <p>
                            {new Date(
                                lesson.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Calendar className="h-5 w-5 text-blue-500" />

                    <div>

                        <p className="text-sm text-default-500">
                            Last Updated
                        </p>

                        <p>
                            {lesson.updatedAt
                                ? new Date(
                                    lesson.updatedAt
                                ).toLocaleDateString()
                                : "Never"}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Eye className="h-5 w-5 text-purple-600" />

                    <div>

                        <p className="text-sm text-default-500">
                            Visibility
                        </p>

                        <p className="capitalize">
                            {lesson.visibility}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-3">

                    <Clock className="h-5 w-5 text-orange-500" />

                    <div>

                        <p className="text-sm text-default-500">
                            Reading Time
                        </p>

                        <p>{readingTime} min</p>

                    </div>

                </div>

            </div>

        </Card>
    );
}