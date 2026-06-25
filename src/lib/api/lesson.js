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