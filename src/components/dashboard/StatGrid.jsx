import StatCard from "./StatCard";

export default function StatGrid({ lessons = [] })  {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Lessons"
        value={lessons.length}
        description="Lessons you've created"
      />

      <StatCard
        title="Favorites"
        value={lessons.filter((lesson) => lesson.isFavorite).length}
        description="Saved lessons"
      />

      <StatCard
        title="This Month"
        value={lessons.filter((lesson) => new Date(lesson.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 30))).length}
        description="New contributions"
      />
    </div>
  );
}