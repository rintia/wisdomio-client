const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// get user lessons by userId
export const getUserLessons = async (userId) => {
  const res = await fetch(
    `${baseUrl}/api/lessons?userId=${userId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};
// Like lesson
export const toggleLike = async (lessonId, userId) => {
  const res = await fetch(
    `${baseUrl}/api/lessons/${lessonId}/like`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        userId,
      }),
    }
  );

  return res.json();
};
// get lesson by id
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

// update lesson
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
// delete lesson
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

// public lessons
export const getPublicLessons = async () => {
  const res = await fetch(
    `${baseUrl}/api/lessons/public`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};