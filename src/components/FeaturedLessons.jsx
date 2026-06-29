

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Card, Button } from "@heroui/react";
import { StarFill } from "@gravity-ui/icons";

import { getFeaturedLessons } from "@/lib/api/lesson";

export default function FeaturedLessons() {
  const [featuredLessons, setFeaturedLessons] = useState([]);

  useEffect(() => {
    async function loadFeatured() {
      const data = await getFeaturedLessons();
      setFeaturedLessons(data);
    }

    loadFeatured();
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700">
            <StarFill className="h-4 w-4" />
            Editor's Picks
          </div>

          <h2 className="text-4xl font-bold">
            Featured Life Lessons
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Handpicked lessons selected by our team for their insight,
            impact, and ability to inspire meaningful growth.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <Card key={lesson._id}>
              <div className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-2 text-amber-600">
                  <StarFill className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Featured Lesson
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {lesson.title}
                </h3>

                <p className="mb-4 flex-grow text-default-500 line-clamp-3">
                  {lesson.description}
                </p>

                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={lesson.authorImage}
                    alt={lesson.author}
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{lesson.author}</p>
                    <p className="text-xs text-default-500">
                      {lesson.category}
                    </p>
                  </div>
                </div>

                <Link href={`/lessons/${lesson._id}`}>
                <Button
                color="warning"
                >
                  Read Lesson
                </Button>
                </Link>
                
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}