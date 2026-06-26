"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";

import { getLessonById } from "@/lib/api/lesson";

import LessonContent from "@/components/lesson-details/LessonContent";
import LessonMetadata from "@/components/lesson-details/LessonMetadata";
import AuthorCard from "@/components/lesson-details/AuthorCard";
import LessonStats from "@/components/lesson-details/LessonStats";

import CommentsSection from "@/components/lesson-details/CommentsSection";

export default function LessonDetailsPage() {
    const { id } = useParams();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(id);
    useEffect(() => {
        if (!id) return;

        const loadLesson = async () => {
            try {
                const data = await getLessonById(id);
                console.log("Lesson:", data);
                setLesson(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadLesson();
    }, [id]);

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

                <div className="mt-8">
                    <CommentsSection lesson={lesson} />
                </div>
            </div>
        </section>
    );
}