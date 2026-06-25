"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Spinner,
  Button,
} from "@heroui/react";

import { toast } from "react-hot-toast";

import {
  getLessonById,
  updateLesson,
} from "@/lib/api/lesson";

import { useSession } from "@/lib/auth-client";

export default function EditLessonPage({
  params,
}) {
  const { id } = use(params);

  const router = useRouter();

  const { data: session } =
    useSession();

  const user = session?.user;

  const [lesson, setLesson] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  // Change later if you have premium logic
  const [isPremiumUser] =
    useState(false);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        const data =
          await getLessonById(id);

        setLesson(data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load lesson"
        );
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    const formData = new FormData(
      e.currentTarget
    );

    const data =
      Object.fromEntries(
        formData.entries()
      );

    const payload = {
      title: data.title,
      description:
        data.description,
      category: data.category,
      tone: data.tone,
      image: data.image,
      accessLevel:
        isPremiumUser
          ? data.accessLevel
          : "free",
      userId: user?.id,
    };

    try {
      const res =
        await updateLesson(
          id,
          payload
        );

      if (
        res.modifiedCount > 0
      ) {
        toast.success(
          "Lesson updated successfully!"
        );

        router.push(
          "/dashboard/user/my-lessons"
        );
      } else {
        toast.error(
          "No changes were made."
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update lesson."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-8">
        Lesson not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">

        <div className="mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold">
            Update Lesson
          </h1>

          <p className="mt-2 text-zinc-500">
            Edit your lesson and save
            changes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Lesson Title
            </label>

            <input
              name="title"
              defaultValue={
                lesson.title
              }
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Description /
              Story / Insight
            </label>

            <textarea
              name="description"
              rows={8}
              defaultValue={
                lesson.description
              }
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              name="category"
              defaultValue={
                lesson.category
              }
              className="w-full rounded-lg border p-3"
            >
              <option>
                Personal Growth
              </option>

              <option>
                Career
              </option>

              <option>
                Relationships
              </option>

              <option>
                Mindset
              </option>

              <option>
                Mistakes Learned
              </option>
            </select>
          </div>

          {/* Tone */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Emotional Tone
            </label>

            <select
              name="tone"
              defaultValue={
                lesson.tone
              }
              className="w-full rounded-lg border p-3"
            >
              <option>
                Motivational
              </option>

              <option>Sad</option>

              <option>
                Realization
              </option>

              <option>
                Gratitude
              </option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Image URL
            </label>

            <input
              name="image"
              defaultValue={
                lesson.image
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Author */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Author
              </label>

              <input
                readOnly
                value={
                  lesson.author ||
                  ""
                }
                className="w-full rounded-lg border bg-zinc-100 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                readOnly
                value={
                  lesson.authorEmail ||
                  ""
                }
                className="w-full rounded-lg border bg-zinc-100 p-3"
              />
            </div>
          </div>

          {/* Access Level */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Access Level
            </label>

            <select
              name="accessLevel"
              defaultValue={
                lesson.accessLevel
              }
              disabled={
                !isPremiumUser
              }
              className="w-full rounded-lg border p-3 disabled:bg-zinc-100"
            >
              <option value="free">
                Free
              </option>

              <option value="premium">
                Premium
              </option>
            </select>

            {!isPremiumUser && (
              <p className="mt-2 text-xs text-amber-600">
                Upgrade to Premium
                to create paid
                lessons.
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              variant="bordered"
              onPress={() =>
                router.back()
              }
            >
              Cancel
            </Button>

            <Button
              color="success"
              type="submit"
              isDisabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Lesson"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}