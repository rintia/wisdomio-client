"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  Chip,
  Modal,
} from "@heroui/react";

import {
  Eye,
  TrashBin,
  BroomMotion,
} from "@gravity-ui/icons";

import {
  deleteReportedLesson,
  ignoreReports,
} from "@/lib/api/admin";

export default function ReportedLessonsTable({
  lessons,
  setLessons,
}) {
  const handleDelete = async (lessonId) => {
    if (
      !window.confirm(
        "Delete this lesson permanently?"
      )
    )
      return;

    const res =
      await deleteReportedLesson(lessonId);

    if (res.success) {
      toast.success("Lesson deleted.");

      setLessons((prev) =>
        prev.filter(
          (lesson) =>
            lesson.lessonId !== lessonId
        )
      );
    } else {
      toast.error(res.message);
    }
  };

  const handleIgnore = async (lessonId) => {
    if (
      !window.confirm(
        "Delete all reports for this lesson?"
      )
    )
      return;

    const res =
      await ignoreReports(lessonId);

    if (res.success) {
      toast.success("Reports removed.");

      setLessons((prev) =>
        prev.filter(
          (lesson) =>
            lesson.lessonId !== lessonId
        )
      );
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-default">
      <table className="min-w-full">
        <thead className="bg-zinc-100">
          <tr>
            <th className="px-4 py-4 text-left">
              Lesson
            </th>

            <th className="px-4 py-4 text-center">
              Reports
            </th>

            <th className="px-4 py-4 text-center">
              Reasons
            </th>

            <th className="px-4 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {lessons.map((lesson) => (
            <tr
              key={lesson.lessonId}
              className="border-t"
            >
              <td className="px-4 py-4 font-medium">
                {lesson.title}
              </td>

              <td className="px-4 py-4 text-center">
                <Chip
                  color="danger"
                  variant="flat"
                >
                  {lesson.reportCount}
                </Chip>
              </td>

              <td className="px-4 py-4 text-center text-emerald-200">
                <Modal>
                  <Button
                    size="sm"
                    variant="flat"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>

                  <Modal.Backdrop>
                    <Modal.Container placement="auto">
                      <Modal.Dialog className="max-w-2xl">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                          <Modal.Heading>
                            Reports for "{lesson.title}"
                          </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                          <div className="max-h-[500px] space-y-4 overflow-y-auto">
                            {lesson.reports.map(
                              (
                                report,
                                index
                              ) => (
                                <div
                                  key={index}
                                  className="rounded-xl border p-4"
                                >
                                  <div className="mb-3 flex items-center gap-3">
                                    <img
                                      src={
                                        report
                                          .reporter
                                          ?.image ||
                                        "/default-avatar.png"
                                      }
                                      className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                      <h3 className="font-semibold">
                                        {
                                          report
                                            .reporter
                                            ?.name
                                        }
                                      </h3>

                                      <p className="text-sm text-zinc-500">
                                        {
                                          report
                                            .reporter
                                            ?.email
                                        }
                                      </p>
                                    </div>
                                  </div>

                                  <div className="rounded-lg bg-red-50 p-3">
                                    <p className="font-semibold text-red-600">
                                      Reason
                                    </p>

                                    <p>
                                      {
                                        report.reason
                                      }
                                    </p>
                                  </div>

                                  <p className="mt-3 text-sm text-zinc-500">
                                    {new Date(
                                      report.createdAt
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button
                            slot="close"
                            variant="secondary"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </Modal.Container>
                  </Modal.Backdrop>
                </Modal>
              </td>

              <td className="px-4 py-4 text-emerald-300">
                <div className="flex justify-center gap-3">
                  <Button
                    size="sm"
                    color="danger"
                    onPress={() =>
                      handleDelete(
                        lesson.lessonId
                      )
                    }
                  >
                    <TrashBin className="mr-2 h-4 w-4" />
                    Delete
                  </Button>

                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      handleIgnore(
                        lesson.lessonId
                      )
                    }
                  >
                    <BroomMotion className="mr-2 h-4 w-4" />
                    Ignore
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {lessons.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-16 text-center text-default-500"
              >
                🎉 No reported lessons.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}