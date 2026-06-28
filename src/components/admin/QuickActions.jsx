"use client";

import Link from "next/link";
import { Card, Button } from "@heroui/react";
import {
  SquarePlus,
  Persons,
  TriangleExclamation,
  Star,
  Folder,
  ArrowRight,
} from "@gravity-ui/icons";

const actions = [
  {
    title: "Create Lesson",
    description: "Add a new lesson to the platform.",
    href: "/dashboard/create-lesson",
    icon: SquarePlus,
    color: "text-emerald-600",
  },
  {
    title: "Manage Users",
    description: "View and manage registered users.",
    href: "/dashboard/manage-users",
    icon: Persons,
    color: "text-blue-600",
  },
  {
    title: "Review Reports",
    description: "Moderate reported lessons.",
    href: "/dashboard/reported-lessons",
    icon: TriangleExclamation,
    color: "text-red-600",
  },
  {
    title: "Premium Members",
    description: "View premium subscribers.",
    href: "/dashboard/premium-users",
    icon: Star,
    color: "text-amber-500",
  },
  {
    title: "Manage Categories",
    description: "Create, edit and delete categories.",
    href: "/dashboard/categories",
    icon: Folder,
    color: "text-purple-600",
  },
];

export default function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="mb-1 text-xl font-bold">
        Quick Actions
      </h2>

      <p className="mb-6 text-sm text-default-500">
        Frequently used administrator actions.
      </p>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link key={action.title} href={action.href}>
              <div className="flex items-center justify-between rounded-xl border border-default-200 p-4 transition hover:border-emerald-500 hover:bg-default-50">

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-default-100 p-3">
                    <Icon className={`h-6 w-6 ${action.color}`} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {action.title}
                    </h3>

                    <p className="text-sm text-default-500">
                      {action.description}
                    </p>
                  </div>
                </div>

                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>

              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}