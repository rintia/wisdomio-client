"use client";

import { Avatar, Card } from "@heroui/react";

export default function CommentCard({ comment }) {
  return (
    <Card className="p-4">

      <div className="flex gap-3">

        <Avatar>
            <Avatar.Image
          src={comment.userImage}
          name={comment.userName}
        />
        </Avatar>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h4 className="font-semibold">
              {comment.userName}
            </h4>

            <span className="text-xs text-default-500">
              {new Date(
                comment.createdAt
              ).toLocaleDateString()}
            </span>

          </div>

          <p className="mt-2 text-default-600">
            {comment.comment}
          </p>

        </div>

      </div>

    </Card>
  );
}