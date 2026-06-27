"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, Spinner, Input } from "@heroui/react";

import { getPublicLessons } from "@/lib/api/lesson";
import LessonsGrid from "@/components/LessonsGrid";

export default function PublicLessonsPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [tone, setTone] = useState("");

    const categories = [
        ...new Set(lessons.map((lesson) => lesson.category)),
    ];

    const tones = [
        ...new Set(lessons.map((lesson) => lesson.tone)),
    ];

    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) => {
            const matchesSearch =
                lesson.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesCategory =
                !category || lesson.category === category;

            const matchesTone =
                !tone || lesson.tone === tone;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesTone
            );
        });
    }, [lessons, search, category, tone]);

    useEffect(() => {
        const loadLessons = async () => {
            try {
                const data = await getPublicLessons();
                setLessons(data);
            } finally {
                setLoading(false);
            }
        };

        loadLessons();
    }, []);



    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-5xl font-bold">
                    Public Life Lessons
                </h1>

                {/* search and filter */}
                <Card className="mt-8 p-5">
                    <div className="grid gap-4 md:grid-cols-3">

                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title..."
                        />

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-xl border border-default-200 bg-white px-4 py-2"
                        >
                            <option value="">
                                All Categories
                            </option>

                            {categories.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="rounded-xl border border-default-200 bg-white px-4 py-2"
                        >
                            <option value="">
                                All Emotional Tones
                            </option>

                            {tones.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                    </div>
                </Card>

                <p className="mt-3 text-default-500">
                    Browse wisdom shared by people from all walks of life.
                </p>
            </div>

            <LessonsGrid lessons={filteredLessons} />
        </section>
    );
}