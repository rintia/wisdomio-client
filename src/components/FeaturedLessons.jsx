"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import { StarFill } from "@gravity-ui/icons";

export default function FeaturedLessons() {
  const featuredLessons = [
    {
      _id: "1",
      title: "Failure Is a Better Teacher Than Success",
      excerpt:
        "The lessons I learned from failure shaped my character far more than my achievements ever did.",
      author: "Sarah Ahmed",
    },
    {
      _id: "2",
      title: "Small Habits Create Big Changes",
      excerpt:
        "Improvement doesn't happen overnight. Tiny daily actions compound into remarkable results.",
      author: "Hasan Rahman",
    },
    {
      _id: "3",
      title: "Learning to Let Go",
      excerpt:
        "Sometimes growth comes from releasing what no longer serves us rather than holding on tighter.",
      author: "Nusrat Jahan",
    },
  ];

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

                <p className="mb-4 flex-grow text-default-500">
                  {lesson.excerpt}
                </p>

                <div className="mb-4 text-sm text-default-400">
                  By {lesson.author}
                </div>

                <Button
                  as={Link}
                  href={`/lessons/${lesson._id}`}
                  color="warning"
                >
                  Read Lesson
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}