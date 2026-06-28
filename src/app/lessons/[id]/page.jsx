"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

import { getLessonById } from "@/lib/api/lesson";

import LessonContent from "@/components/lesson-details/LessonContent";
import LessonMetadata from "@/components/lesson-details/LessonMetadata";
import AuthorCard from "@/components/lesson-details/AuthorCard";
import LessonStats from "@/components/lesson-details/LessonStats";
import ReportLessonButton from "@/components/lesson-details/ReportLessonButton";

import CommentsSection from "@/components/lesson-details/CommentsSection";
import { useSession } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";

export default function LessonDetailsPage() {
    const router = useRouter();
    const { id } = useParams();
    const { data: session } = useSession();
    const user = session?.user;
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(id);


    useEffect(() => {
        if (!id) return;

        const loadLesson = async () => {
            try {
                const data = await getLessonById(id, user?.id);

                // Redirect non-premium users trying to access premium lessons
                if (
                    data.accessLevel === "premium" &&
                    !user?.isPremium
                ) {
                    router.replace("/upgrade");
                    return;
                }

                setLesson(data);
            } finally {
                setLoading(false);
            }
        };

        loadLesson();
    }, [id, user?.id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h2 className="text-2xl font-semibold">
                    Lesson not found.
                </h2>
            </div>
        );
    }

    return (
        <section className="bg-zinc-50 py-10">
            <div className="mx-auto max-w-6xl px-4">
                <LessonContent lesson={lesson} />

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <LessonMetadata lesson={lesson} />
                    </div>

                    <AuthorCard lesson={lesson} />
                </div>

                <div className="mt-8">
                    <LessonStats lesson={lesson} />
                </div>

                <div className="mt-6 flex justify-end">
                    <ReportLessonButton lesson={lesson} />
                </div>

                <div className="mt-8">
                    <CommentsSection lesson={lesson} />
                </div>
            </div>
        </section>
    );
}