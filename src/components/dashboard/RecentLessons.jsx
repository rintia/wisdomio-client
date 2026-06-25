import { Card } from "@heroui/react";

export default function RecentLessons({
  lessons = [],
}) {
  const recentLessons = [...lessons]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Recently Added Lessons
        </Card.Title>

        <Card.Description>
          Your latest reflections
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div className="space-y-3">
          {recentLessons.length > 0 ? (
            recentLessons.map((lesson) => (
              <div
                key={lesson._id}
                className="rounded-lg border p-3"
              >
                <h4 className="font-medium">
                  {lesson.title}
                </h4>

                <p className="mt-1 text-sm text-zinc-500">
                  {lesson.category}
                </p>
              </div>
            ))
          ) : (
            <p className="text-zinc-500">
              No lessons added yet.
            </p>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}