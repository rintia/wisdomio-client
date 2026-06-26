'use client";'
import { useSession } from "@/lib/auth-client";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import { getFavorites } from "@/lib/api/favorite";

export default function StatGrid({ lessons = [] }) {
  const [favorites, setFavorites] = useState([]);
  const user = useSession()?.data?.user;
  useEffect(() => {
    if (!user) return;

    getFavorites(user.id).then((data) => {
      setFavorites(data);
    });
  }, [user]);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Lessons"
        value={lessons.length}
        description="Lessons you've created"
      />

      <StatCard
        title="Favorites"
        value={favorites.length}
        description="Saved lessons"
      />

      <StatCard
        title="This Month"
        value={lessons.filter((lesson) => new Date(lesson.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 30))).length}
        description="New contributions"
      />
    </div>
  );
}