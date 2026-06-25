const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getUserLessons = async (userId) => {
  const res = await fetch(
    `${baseUrl}/api/lessons?userId=${userId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const getLessonById = async (
  id
) => {
  const res = await fetch(
    `${baseUrl}/api/lessons/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
export const updateLesson = async (
  id,
  lessonData
) => {
  const res = await fetch(
    `${baseUrl}/api/lessons/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        lessonData
      ),
    }
  );

  return res.json();
};

export const deleteLesson = async (
  id
) => {
  const res = await fetch(
    `${baseUrl}/api/lessons/${id}`,
    {
      method: "DELETE",
    }
  );

  return res.json();
};