import { Card } from "@heroui/react";

export default function StatCard({
  title,
  value,
  description,
}) {
  return (
    <Card variant="secondary">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>
          {description}
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <h2 className="text-4xl font-bold">
          {value}
        </h2>
      </Card.Content>
    </Card>
  );
}