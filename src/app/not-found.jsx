"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {
  BookOpen,
  House,
  ArrowRight,
} from "@gravity-ui/icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-6">

      {/* Background Decorations */}

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />

      <div className="relative z-10 max-w-2xl text-center">

        {/* Icon */}

        <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 shadow-lg">

          <BookOpen className="h-14 w-14 text-emerald-600" />

        </div>

        {/* 404 */}

        <h1 className="text-8xl font-extrabold tracking-tight text-emerald-600">
          404
        </h1>

        <h2 className="mt-5 text-4xl font-bold text-zinc-900">
          The lesson you're looking for
          couldn't be found.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-600">
          Every journey teaches us something—even getting
          lost. The page may have been moved, deleted,
          or never existed in the first place.
        </p>

        {/* Quote */}

        <div className="mt-10 rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-sm backdrop-blur">

          <p className="text-lg italic text-zinc-700">
            "The greatest wisdom often begins with taking
            the right path again."
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <Link href="/">
          <Button
            
            color="success"
            size="lg"
            startContent={<House />}
          >
            Go Home
          </Button>
          </Link>


        </div>

        <p className="mt-12 text-sm text-zinc-500">
          Keep exploring. Every lesson is one step closer to wisdom.
        </p>

      </div>

    </section>
  );
}