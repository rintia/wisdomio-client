"use client";

import Link from "next/link";

import {
    Avatar,
    Button,
    Card,
    Chip,
} from "@heroui/react";

import {
    Lock,
    Calendar,
    ArrowRight,
} from "@gravity-ui/icons";

import { useSession } from "@/lib/auth-client";

export default function LessonCard({ lesson }) {
    const { data: session } = useSession();

    const user = session?.user;

    const isPremiumUser =
        user?.role === "premium";

    const locked =
        lesson.accessLevel === "premium" &&
        !isPremiumUser;

    console.log(lesson);
    console.log("ID:", lesson._id);

    return (
        <Card className="overflow-hidden">

            <div className="relative">

                {lesson.image ? (
                    <img
                        src={lesson.image}
                        alt={lesson.title}
                        className={`h-56 w-full object-cover ${locked ? "blur-md" : ""
                            }`}
                    />
                ) : (
                    <div
                        className={`flex h-56 items-center justify-center bg-emerald-50 ${locked ? "blur-md" : ""
                            }`}
                    >
                        <span className="text-5xl">
                            📖
                        </span>
                    </div>
                )}

                {locked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-sm">

                        <Lock className="mb-3 h-10 w-10 text-white" />

                        <h3 className="font-semibold text-white">
                            Premium Lesson
                        </h3>

                        <p className="mt-2 px-5 text-center text-sm text-white/90">
                            Upgrade to Premium to view
                            this lesson.
                        </p>

                    </div>
                )}

            </div>

            <div className="space-y-4 p-6">

                <div className="flex flex-wrap gap-2">

                    <Chip
                        size="sm"
                        color="success"
                    >
                        {lesson.category}
                    </Chip>

                    <Chip size="sm">
                        {lesson.tone}
                    </Chip>

                    <Chip
                        size="sm"
                        color={
                            lesson.accessLevel ===
                                "premium"
                                ? "warning"
                                : "primary"
                        }
                    >
                        {lesson.accessLevel}
                    </Chip>

                </div>

                <h2 className="line-clamp-2 text-2xl font-bold">
                    {lesson.title}
                </h2>

                <p className="line-clamp-3 text-default-500">
                    {lesson.description}
                </p>

                <div className="flex items-center justify-between border-t pt-4">

                    <div className="flex items-center gap-3">
                        <Avatar>
                             <Avatar.Image
                            src={lesson.authorImage}
                            name={lesson.author}
                            size="sm"
                        />
                            </Avatar>
                       

                        <div>

                            <p className="text-sm font-medium">
                                {lesson.author}
                            </p>

                            <p className="flex items-center gap-1 text-xs text-default-500">

                                <Calendar className="h-3 w-3" />

                                {new Date(
                                    lesson.createdAt
                                ).toLocaleDateString()}

                            </p>

                        </div>

                    </div>


                    <Link
                        href={`/lessons/${lesson._id}`}
                        className="button button--primary"
                    >
                        See Details
                        <ArrowRight className="h-4 w-4" />
                    </Link>


                </div>

            </div>

        </Card>
    );
}