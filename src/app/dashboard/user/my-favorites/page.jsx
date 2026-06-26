"use client";

import { useEffect, useState } from "react";

import { Spinner } from "@heroui/react";

import { useSession } from "@/lib/auth-client";

import { getFavorites } from "@/lib/api/favorite";

import FavoritesTable from "@/components/dashboard/FavoritesTable";

export default function MyFavoritesPage() {
  const { data } = useSession();

  const user = data?.user;

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user) return;

    getFavorites(user.id).then((res) => {
      setFavorites(res);
      setLoading(false);
    });
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );

  return (
    <div className="space-y-6 p-6">

      <h1 className="text-3xl font-bold">
        My Favorites
      </h1>

      <FavoritesTable
        favorites={favorites}
        setFavorites={setFavorites}
      />

    </div>
  );
}