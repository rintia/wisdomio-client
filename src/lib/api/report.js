const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const reportLesson = async (
    data
) => {
    const res = await fetch(
        `${baseUrl}/api/reports`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body: JSON.stringify(data),
        }
    );

    return res.json();
};