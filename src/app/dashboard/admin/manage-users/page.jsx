"use client";

import { useEffect, useState } from "react";

import { Spinner } from "@heroui/react";

import {
  getUsers,
} from "@/lib/api/admin";

import ManageUsersTable from "@/components/dashboard/admin/ManageUsersTable";

export default function ManageUsersPage() {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const data =
        await getUsers();

      setUsers(data);

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner />
      </div>
    );
  }

  return (
    <ManageUsersTable
      users={users}
      setUsers={setUsers}
    />
  );
}