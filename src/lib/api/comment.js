const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getComments = async (lessonId) => {
  const res = await fetch(
    `${baseUrl}/api/comments?lessonId=${lessonId}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};