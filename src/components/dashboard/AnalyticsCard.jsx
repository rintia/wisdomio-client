import { Card } from "@heroui/react";

export default function AnalyticsCard() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Activity Analytics
        </Card.Title>

        <Card.Description>
          Weekly contributions
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div className="flex h-72 items-center justify-center rounded-xl border border-dashed">
          Chart Here
        </div>
      </Card.Content>
    </Card>
  );
}