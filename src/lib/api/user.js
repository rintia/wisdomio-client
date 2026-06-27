const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTopContributors = async () => {
  const res = await fetch(
    `${baseUrl}/api/contributors/top`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};