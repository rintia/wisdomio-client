"use client";

import { authClient } from "@/lib/auth-client";
import { getUserLessons } from "@/lib/api/lesson";
import { Avatar, Card, Chip, Spinner } from "@heroui/react";
import { BookOpen, Heart, Star } from "@gravity-ui/icons";
import { useEffect, useState } from "react";

import { UpdateUserModal } from "@/components/profile/UpdateUserModal";
import UserLessonsGrid from "@/components/profile/UserLessonsGrid";
import { getFavorites } from "@/lib/api/favorite";

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        const loadLessons = async () => {
            if (!session?.user?.id) return;

            const data = await getUserLessons(session.user.id);
            setLessons(data);
        };

        loadLessons();
    }, [session]);

    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if (!user) return;

        getFavorites(user.id).then((data) => {
            setFavorites(data);
        });
    }, [user]);

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }







    return (
        <div className="space-y-8 p-6">

            <Card className="p-8">

                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="relative inline-block">
                        <Avatar className="h-28 w-28 rounded-full ring-2 ring-emerald-500/20">
                            <Avatar.Image
                                src={user?.image}
                                name={user?.name}
                            />
                        </Avatar>

                        {user?.isPremium && (
                            <div className="absolute -bottom-1 -right-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 shadow-lg ring-4 ring-white">
                                <Star className="h-5 w-5 fill-white text-white" />
                            </div>
                        )}
                    </div>



                    <div className="flex-1">

                        <div className="flex items-center gap-3">

                            <h1 className="text-3xl font-bold">
                                {user?.name}
                            </h1>

                            {user?.isPremium && (
                                <Chip color="warning" variant="solid">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        <span>Premium</span>
                                    </div>
                                </Chip>
                            )}

                        </div>

                        <p className="text-default-500 mt-2">
                            {user?.email}
                        </p>

                        <div className="mt-5">
                            <UpdateUserModal
                                user={user}
                            />
                        </div>

                    </div>

                </div>

            </Card>

            {user?.role !== "admin" && (
                <>
                    <div className="grid gap-6 md:grid-cols-2">

                        <Card className="p-6">
                            <div className="flex items-center gap-3">
                                <BookOpen className="h-7 w-7 text-emerald-600" />

                                <div>
                                    <p className="text-sm text-default-500">
                                        Lessons Created
                                    </p>

                                    <h2 className="text-3xl font-bold">
                                        {lessons.length}
                                    </h2>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3">
                                <Heart className="h-7 w-7 text-pink-500" />

                                <div>
                                    <p className="text-sm text-default-500">
                                        Total Saves
                                    </p>

                                    <h2 className="text-3xl font-bold">
                                        {favorites.length}
                                    </h2>
                                </div>
                            </div>
                        </Card>

                    </div>

                    <UserLessonsGrid lessons={lessons} />
                </>
            )}

        </div>
    );
}