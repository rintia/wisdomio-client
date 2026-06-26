const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getFavorites = async (
  userId
) => {
  const res = await fetch(
    `${baseUrl}/api/favorites/${userId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export const removeFavorite =
  async (
    lessonId,
    userId
  ) => {
    const res = await fetch(
      `${baseUrl}/api/favorites/${lessonId}/${userId}`,
      {
        method: "DELETE",
      }
    );

    return res.json();
  };