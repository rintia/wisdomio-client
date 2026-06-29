"use client";

import { Avatar, Card } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { getTopContributors } from "@/lib/api/user";
import { useEffect, useState } from "react";



export default function TopContributors() {
     const [contributors, setContributors] =
    useState([]);

  useEffect(() => {
    const loadContributors = async () => {
      const data =
        await getTopContributors();

      if (Array.isArray(data)) {
        setContributors(data);
      }
    };

    loadContributors();
  }, []);

  
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
            key={user._id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
            <Avatar>
                 <Avatar.Image
                src={user.image}
                name={user.name}
              />
            </Avatar>

              <div>
                <p className="font-semibold">
                  {user.name}
                </p>

                <p className="text-sm text-default-500">
                  {user.lessonCount} lessons
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