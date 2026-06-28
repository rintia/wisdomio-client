"use client";

import { Avatar, Card } from "@heroui/react";
import { Star } from "@gravity-ui/icons";

const contributors = [
  {
    id: 1,
    name: "Sarah Ahmed",
    image: "https://i.pravatar.cc/150?img=1",
    lessons: 42,
    saves: 560,
  },
  {
    id: 2,
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=2",
    lessons: 37,
    saves: 492,
  },
  {
    id: 3,
    name: "Emily Tan",
    image: "https://i.pravatar.cc/150?img=3",
    lessons: 34,
    saves: 445,
  },
  {
    id: 4,
    name: "Fatima Noor",
    image: "https://i.pravatar.cc/150?img=4",
    lessons: 29,
    saves: 380,
  },
];

export default function TopContributors() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold">
        Top Contributors
      </h2>

      <p className="mb-6 text-default-500">
        Most active lesson creators.
      </p>

      <div className="space-y-4">
        {contributors.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Avatar
                src={user.image}
                name={user.name}
              />

              <div>
                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-sm text-default-500">
                  {user.lessons} lessons
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4" />
              <span>{user.saves}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}