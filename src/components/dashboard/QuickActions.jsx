import Link from "next/link";
import { Card, Button } from "@heroui/react";

export default function QuickActions() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          Quick Actions
        </Card.Title>

        <Card.Description>
          Jump to common tasks
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <div className="flex flex-col gap-3">
          <Link  href="/dashboard/add-lesson">
           <Button>
            Add Lesson
          </Button>
          </Link>
         

         <Link href="/dashboard/user/my-lessons">
          <Button
          
            
            variant="bordered"
          >
            My Lessons
          </Button>
         </Link>

          <Button
            as={Link}
            href="/lessons"
            variant="light"
          >
            Public Lessons
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}