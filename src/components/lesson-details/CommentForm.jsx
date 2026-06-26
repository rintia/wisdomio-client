"use client";

import { useState } from "react";

import {
    Button,
    TextArea,
} from "@heroui/react";

import { toast } from "react-hot-toast";

import { createComment } from "@/lib/actions/comment";

export default function CommentForm({
    lesson,
    user,
    onCommentAdded,
}) {
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login first.");

            return;
        }

        if (!comment.trim()) {
            return;
        }

        const payload = {
            lessonId: lesson._id,

            userId: user.id,

            userName: user.name,

            userEmail: user.email,

            userImage: user.image,

            comment,
        };

        await createComment(payload);

        toast.success("Comment added!");

        setComment("");

        onCommentAdded();
    };

    return (
        <div className="space-y-4 rounded-2xl border border-default-200 bg-white p-5 shadow-sm">
            <TextArea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this lesson..."
                rows={5}
                className="w-full"
            />

            <div className="flex items-center justify-between">
                <p className="text-sm text-default-500">
                    Be respectful and constructive.
                </p>

                <Button
                    color="success"
                    onPress={handleSubmit}
                >
                    Post Comment
                </Button>
            </div>
        </div>
    );
}