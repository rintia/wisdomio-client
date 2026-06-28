"use client";

import toast from "react-hot-toast";

import { Button, Chip } from "@heroui/react";

import {
    Calendar,
    Shield,
} from "@gravity-ui/icons";

import { makeAdmin } from "@/lib/api/admin";

export default function ManageUsersTable({
    users,
    setUsers,
}) {
    const handlePromote = async (id) => {
        await makeAdmin(id);

        setUsers((prev) =>
            prev.map((user) =>
                user.id === id
                    ? {
                        ...user,
                        role: "admin",
                    }
                    : user
            )
        );

        toast.success("User promoted.");
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-default">
            <table className=" w-full min-w-[950px]">
                <thead className="bg-zinc-100">
                    <tr>
                        <th className="px-4 py-4 text-left text-sm font-semibold">
                            User
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-semibold">
                            Email
                        </th>

                        <th className="px-4 py-4 text-left text-sm font-semibold">
                            Role
                        </th>

                        {/* <th className="px-4 py-4 text-left text-sm font-semibold">
              Lessons
            </th> */}

                        <th className="px-4 py-4 text-left text-sm font-semibold">
                            Joined
                        </th>

                        <th className="px-4 py-4 text-center text-sm font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-t"
                        >
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={
                                            user.image ||
                                            "/default-avatar.png"
                                        }
                                        className="h-10 w-10 rounded-full"
                                    />

                                    <div>
                                        <h3 className="font-semibold">
                                            {user.name}
                                        </h3>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-4 text-emerald-200">
                                {user.email}
                            </td>

                            <td className="px-4 py-4">
                                <Chip
                                    color={
                                        user.role === "admin"
                                            ? "danger"
                                            : "primary"
                                    }
                                    variant="flat"
                                >
                                    {user.role || "user"}
                                </Chip>
                            </td>

                            {/* <td className="px-4 py-4 text-emerald-200">
                {user.lessonCount}
              </td> */}

                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2 text-emerald-200">
                                    <Calendar className="h-4 w-4" />

                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex justify-center">
                                    {user.role !== "admin" ? (
                                        <Button
                                            size="sm"
                                            onPress={() => handlePromote(user.id)}
                                            className="bg-amber-500 text-white hover:bg-amber-600"
                                        >
                                            <Shield className="mr-2 h-4 w-4" />
                                            Promote
                                        </Button>
                                    ) : (
                                        <Chip
                                            color="success"
                                            variant="flat"
                                        >
                                            Admin
                                        </Chip>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}

                    {users.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="py-12 text-center text-zinc-500"
                            >
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}