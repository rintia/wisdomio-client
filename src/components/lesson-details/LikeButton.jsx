"use client";

import { useState } from "react";

import { Button } from "@heroui/react";

import { HeartFill, Heart } from "@gravity-ui/icons";

import { toast } from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import { toggleLike } from "@/lib/api/lesson";

export default function LikeButton({
  lesson,
}) {
  const { data: session } = useSession();

  const user = session?.user;

  const [liked, setLiked] = useState(
    lesson.likes?.includes(user?.id)
  );

  const [likesCount, setLikesCount] =
    useState(lesson.likesCount || 0);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like.");

      return;
    }

    const previousLiked = liked;
    const previousCount = likesCount;

    // optimistic update
    setLiked(!liked);

    setLikesCount((prev) =>
      liked ? prev - 1 : prev + 1
    );

    try {
      const updatedLesson =
        await toggleLike(
          lesson._id,
          user.id
        );

      setLiked(
        updatedLesson.likes.includes(user.id)
      );

      setLikesCount(
        updatedLesson.likesCount
      );
    } catch {
      setLiked(previousLiked);
      setLikesCount(previousCount);

      toast.error("Something went wrong.");
    }
  };

  return (
    <Button
      color={liked ? "danger" : "default"}
      variant={
        liked ? "solid" : "bordered"
      }
      startContent={
        liked ? (
          <HeartFill />
        ) : (
          <Heart />
        )
      }
      onPress={handleLike}
    >
      {likesCount} Likes
    </Button>
  );
}