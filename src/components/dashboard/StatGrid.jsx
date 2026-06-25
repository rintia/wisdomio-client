import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Lessons"
        value="24"
        description="Lessons you've created"
      />

      <StatCard
        title="Favorites"
        value="12"
        description="Saved lessons"
      />

      <StatCard
        title="This Month"
        value="5"
        description="New contributions"
      />
    </div>
  );
}