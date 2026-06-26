"use client";

import { useState } from "react";

import { Button } from "@heroui/react";

import {
    Bookmark,
    BookmarkFill,
} from "@gravity-ui/icons";

import { toast } from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import { toggleFavorite } from "@/lib/api/lesson";

export default function FavoriteButton({
    lesson,
}) {

    const { data: session } =
        useSession();

    const user = session?.user;

    const [saved, setSaved] =
        useState(lesson.isSaved);

    const [count, setCount] =
        useState(
            lesson.savesCount || 0
        );

    const handleFavorite =
        async () => {

            if (!user) {
                toast.error(
                    "Please log in to save lessons."
                );

                return;
            }

            const previousSaved =
                saved;

            const previousCount =
                count;

            setSaved(!saved);

            setCount((prev) =>
                saved
                    ? prev - 1
                    : prev + 1
            );

            try {

                const res =
                    await toggleFavorite(
                        lesson._id,
                        user.id
                    );

                setSaved(res.saved);

            } catch {

                setSaved(
                    previousSaved
                );

                setCount(
                    previousCount
                );

                toast.error(
                    "Something went wrong."
                );

            }

        };

    return (

        <Button
            color="warning"
            variant={
                saved
                    ? "solid"
                    : "bordered"
            }
            startContent={
                saved
                    ? <BookmarkFill />
                    : <Bookmark />
            }
            onPress={
                handleFavorite
            }
        >

            {count} Favorite

        </Button>

    );

}