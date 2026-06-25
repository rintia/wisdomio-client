import { Card } from "@heroui/react";

export default function RecentLessons() {
  const lessons = [
    "Patience during difficult times",
    "Consistency beats motivation",
    "Listen more than you speak",
  ];

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
          {lessons.map((lesson) => (
            <div
              key={lesson}
              className="rounded-lg border p-3"
            >
              {lesson}
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}