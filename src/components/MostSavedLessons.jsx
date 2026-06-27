"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Button } from "@heroui/react";
import { Bookmark } from "@gravity-ui/icons";

import { getMostSavedLessons } from "@/lib/api/lesson";

export default function MostSavedLessons() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const loadLessons = async () => {
      const data = await getMostSavedLessons();
      setLessons(data);
    };

    loadLessons();
  }, []);
  useEffect(() => {
  const loadLessons = async () => {
    const data = await getMostSavedLessons();

    console.log(data);

    setLessons(data);
  };

  loadLessons();
}, []);

  return (
    <section className="bg-content1 py-20">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Most Saved Lessons
          </h2>

          <p className="mt-3 text-default-500">
            Discover lessons that resonated most with our community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {lessons.map((lesson) => (
            <Card key={lesson._id}>
              <div className="flex h-full flex-col p-6">

                <h3 className="mb-3 text-xl font-semibold">
                  {lesson.title}
                </h3>

                <p className="mb-6 line-clamp-3 text-default-500">
                  {lesson.description}
                </p>

                <div className="mt-auto flex items-center justify-between">

                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                    <Bookmark className="h-4 w-4" />
                    <span>
                      {lesson.savesCount || 0} saves
                    </span>
                  </div>

                  <Button
                    as={Link}
                    href={`/lessons/${lesson._id}`}
                    size="sm"
                    color="success"
                    variant="flat"
                  >
                    Read More
                  </Button>

                </div>

              </div>
            </Card>
          ))}

        </div>

      </div>
    </section>
  );
}