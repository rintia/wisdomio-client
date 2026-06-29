const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers = async () => {
  const res = await fetch(
    `${baseUrl}/api/admin/users`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export async function getReportedLessons() {
  const res = await fetch(`${baseUrl}/api/admin/reported-lessons`);

  return res.json();
}

export async function ignoreReports(lessonId) {
  const res = await fetch(
    `${baseUrl}/api/admin/reported-lessons/${lessonId}/ignore`,
    {
      method: "PATCH",
    }
  );

  return res.json();
}

export async function deleteReportedLesson(lessonId) {
  const res = await fetch(
    `${baseUrl}/api/admin/reported-lessons/${lessonId}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
}

export const makeAdmin = async (
  id
) => {
  const res = await fetch(
    `${baseUrl}/api/admin/users/${id}`,
    {
      method: "PATCH",
    }
  );

  return res.json();
};

