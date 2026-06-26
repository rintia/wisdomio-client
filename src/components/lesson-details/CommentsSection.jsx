"use client";

import { useEffect, useState } from "react";

import { Card } from "@heroui/react";

import { getComments } from "@/lib/api/comment";

import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

import { useSession } from "@/lib/auth-client";

export default function CommentsSection({
  lesson,
}) {
  const { data } = useSession();

  const user = data?.user;

  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    const data = await getComments(lesson._id);

    console.log(data);

    setComments(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Card className="mt-10 p-6">

      <h2 className="mb-6 text-2xl font-bold">

        Comments ({comments.length})

      </h2>

      <CommentForm
        lesson={lesson}
        user={user}
        onCommentAdded={loadComments}
      />

      <div className="mt-8 space-y-4">

        {comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
          />
        ))}

      </div>

    </Card>
  );
}