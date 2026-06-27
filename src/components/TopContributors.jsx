"use client";

import { useEffect, useState } from "react";
import { Card, Avatar } from "@heroui/react";

import { getTopContributors } from "@/lib/api/user";

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
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Top Contributors
          </h2>

          <p className="mt-3 text-default-500">
            Community members who have shared the
            most life lessons.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {contributors.map((user, index) => (
            <Card key={user._id}>
              <div className="p-6 text-center">

                <div className="mb-4 flex justify-center">
                  <Avatar>
                   <Avatar.Image
                    src={user.image}
                    name={user.name}
                    className="object-cover"
                  />
                  </Avatar>
                 
                </div>

                <div className="mb-2 text-2xl font-bold text-emerald-600">
                  #{index + 1}
                </div>

                <h3 className="text-lg font-semibold">
                  {user.name}
                </h3>

                <p className="mt-2 text-default-500">
                  {user.lessonCount} lessons shared
                </p>

              </div>
            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}