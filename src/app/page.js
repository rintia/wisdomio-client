import Banner from "@/components/Banner";
import FeaturedLessons from "@/components/FeaturedLessons";
import MostSavedLessons from "@/components/MostSavedLessons";
import TopContributors from "@/components/TopContributors";
import WhyLearningMatters from "@/components/WhyLearningMatters";


export default function Home() {
  return (
    <div className="font-sans">
      <Banner/>
      <FeaturedLessons/>
      <MostSavedLessons/>
      <TopContributors/>
      <WhyLearningMatters/>
    </div>
  );
}
