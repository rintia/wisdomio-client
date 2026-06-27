"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import {
    Button,
    Card,
    Chip,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";

import {
    ArrowRight,
    Bookmark,
    Calendar,
    Eye,
    Magnifier,
} from "@gravity-ui/icons";

import { useSession } from "@/lib/auth-client";
import {
    getFavorites,
    removeFavorite,
} from "@/lib/api/favorite";

const categories = [
    "Mindset",
    "Personal Growth",
    "Career",
    "Relationships",
    "Mistakes Learned",
];

const tones = [
    "Motivational",
    "Realization",
    "Sad",
    "Gratitude",
];

export default function MyFavoritesPage() {
    const { data } = useSession();

    const user = data?.user;

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [tone, setTone] = useState("");

    useEffect(() => {
        if (!user) return;

        getFavorites(user.id).then((res) => {
            setFavorites(res);
            setLoading(false);
        });
    }, [user]);

    const filtered = useMemo(() => {
        return favorites.filter((item) => {
            const lesson = item.lesson;

            const matchesSearch =
                lesson.title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                !category ||
                lesson.category === category;

            const matchesTone =
                !tone ||
                lesson.tone === tone;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesTone
            );
        });
    }, [favorites, search, category, tone]);

    const handleRemove = async (lessonId) => {
        await removeFavorite(lessonId, user.id);

        setFavorites((prev) =>
            prev.filter(
                (item) => item.lessonId !== lessonId
            )
        );

        toast.success(
            "Removed from favorites"
        );
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">

            <div>
                <h1 className="text-3xl font-bold">
                    My Favorite Lessons
                </h1>

                <p className="text-default-500 mt-1">
                    {filtered.length} saved lesson(s)
                </p>
            </div>

            {/* Filters */}

            <Card className="p-5">

                <div className="grid gap-4 md:grid-cols-3">

                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search lessons..."
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-xl border bg-white px-3 py-2"
                    >
                        <option value="">All Categories</option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="rounded-xl border bg-white px-3 py-2"
                    >
                        <option value="">All Tones</option>

                        {tones.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                </div>

            </Card>

            {/* Table */}

            <Card className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                    <thead className="bg-zinc-100">

                        <tr>

                            <th className="px-4 py-4 text-left">
                                Lesson
                            </th>

                            <th className="px-4 py-4 text-left">
                                Author
                            </th>

                            <th className="px-4 py-4 text-left">
                                Category
                            </th>

                            <th className="px-4 py-4 text-left">
                                Tone
                            </th>

                            <th className="px-4 py-4 text-left">
                                Saved On
                            </th>

                            <th className="px-4 py-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t"
                            >

                                <td className="px-4 py-4">

                                    <div>

                                        <h3 className="font-semibold">
                                            {item.lesson.title}
                                        </h3>

                                        <p className="text-xs text-default-500">
                                            {item.lesson.description.slice(
                                                0,
                                                70
                                            )}
                                            ...
                                        </p>

                                    </div>

                                </td>

                                <td className="px-4 py-4">

                                    {item.lesson.author}

                                </td>

                                <td className="px-4 py-4">

                                    <Chip
                                        color="success"
                                        variant="flat"
                                    >
                                        {item.lesson.category}
                                    </Chip>

                                </td>

                                <td className="px-4 py-4">

                                    <Chip variant="flat">
                                        {item.lesson.tone}
                                    </Chip>

                                </td>

                                <td className="px-4 py-4">

                                    <div className="flex items-center gap-2">

                                        <Calendar className="h-4 w-4" />

                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}

                                    </div>

                                </td>

                                <td className="px-4 py-4">

                                    <div className="flex justify-center gap-2">
                                        <Link
                                            href={`/lessons/${item.lessonId}`}
                                            className="button button--primary"
                                        >
                                            See Details
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>


                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="flat"
                                            startContent={<Bookmark />}
                                            onPress={() =>
                                                handleRemove(
                                                    item.lessonId
                                                )
                                            }
                                        >
                                            Remove
                                        </Button>

                                    </div>

                                </td>

                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-12 text-center text-default-500"
                                >
                                    No favorite lessons found.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </Card>

        </div>
    );
}