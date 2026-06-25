import { Card, Avatar } from "@heroui/react";

export default function TopContributors() {
 const contributors = [
  {
    _id: "1",
    name: "Sarah Ahmed",
    image: "https://i.pravatar.cc/150?img=32",
    lessonCount: 24,
  },
  {
    _id: "2",
    name: "Hasan Rahman",
    image: "https://i.pravatar.cc/150?img=12",
    lessonCount: 19,
  },
  {
    _id: "3",
    name: "Nusrat Jahan",
    image: "https://i.pravatar.cc/150?img=47",
    lessonCount: 16,
  },
];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            Top Contributors of the Week
          </h2>

          <p className="mt-3 text-default-500">
            Celebrating community members who shared the most wisdom this week.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {contributors.map((user, index) => (
            <Card key={user._id}>
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Avatar
                    src={user.image}
                    name={user.name}
                    size="lg"
                  />
                </div>

                <div className="mb-2 text-2xl">
                  #{index + 1}
                </div>

                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="mt-2 text-sm text-default-500">
                  {user.lessonCount} lessons shared
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}