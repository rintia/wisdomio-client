"use client";

import { Card, Button, Chip } from "@heroui/react";
import {
  TriangleExclamation,
  ArrowRight,
} from "@gravity-ui/icons";

const reports = [
  {
    id: 1,
    title: "Money Solves Everything",
    reports: 6,
    reason: "Inappropriate content",
  },
  {
    id: 2,
    title: "Never Trust Anyone",
    reports: 4,
    reason: "Offensive language",
  },
];

export default function ReportedLessons() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <TriangleExclamation className="h-6 w-6 text-red-500" />

        <div>
          <h2 className="text-xl font-bold">
            Reported Lessons
          </h2>

          <p className="text-default-500">
            Lessons awaiting moderation.
          </p>
        </div>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-xl bg-emerald-50 p-8 text-center">
          <p className="font-medium text-emerald-600">
            🎉 No reported lessons.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <h3 className="font-semibold">
                  {report.title}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <Chip color="danger" variant="flat">
                    {report.reports} Reports
                  </Chip>

                  <span className="text-sm text-default-500">
                    {report.reason}
                  </span>
                </div>
              </div>

              <Button
                color="danger"
                variant="flat"
                startContent={<ArrowRight className="h-4 w-4" />}
              >
                Review
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}