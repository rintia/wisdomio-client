"use client";

import Link from "next/link";
import {
  Lock,
  ArrowLeft,
  ArrowRight,
} from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <Lock className="h-12 w-12 text-red-600" />
        </div>

        <h1 className="mt-6 text-6xl font-extrabold text-zinc-900">
          401
        </h1>

        <h2 className="mt-2 text-3xl font-bold text-zinc-900">
          Unauthorized Access
        </h2>

        <p className="mt-4 text-zinc-600">
          Sorry, you don't have permission to access this page.
          Please sign in with an authorized account or return to the home page.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Home
          </Link>

        </div>

      </div>
    </div>
  );
}