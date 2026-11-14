// import BranchesMap from "@/components/sections/Branches/BranchesMap";  `
import HeroMotion from "@/components/sections/HeroMotion";
import Specialties from "@/components/sections/Specialties";
import StoryScroll from "@/components/sections/StoryScroll";
import VisitUs from "@/components/sections/VisitUs";

export default function Home() {
  return (
    <>
      <HeroMotion />
      <StoryScroll />
      <Specialties />
      <VisitUs />
      {/* <BranchesMap /> */}
    </>
  );
}
