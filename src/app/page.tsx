// import BranchesMap from "@/components/sections/Branches/BranchesMap";  `
import HeroMotion from "@/components/sections/HeroMotion";
import Specialties from "@/components/sections/Specialties";
import StoreCarousel from "@/components/sections/Carousel/StoreCarousel";
import StoryScroll from "@/components/sections/StoryScroll";
import VisitUs from "@/components/sections/VisitUs";
import StoreCarouselArch from "@/components/sections/Carousel/StoreCarouselArch";
import StoreCarouselCinema from "@/components/sections/Carousel/StoreCarouselCinema";
import StoreCarouselPanels from "@/components/sections/Carousel/StoreCarouselPanels";
import StoreBanner from "@/components/sections/Carousel/StoreBanner";
import GoogleReviews from "@/components/sections/GoogleReview";

export default function Home() {
  return (
    <>
      <HeroMotion />
      <StoreBanner />
      {/* <StoreCarousel /> */}
      {/* <StoreCarouselArch />
      <StoreCarouselCinema />
      <StoreCarouselPanels /> */}
      <StoryScroll />
      <Specialties />
      <VisitUs />
      <GoogleReviews />
      {/* <BranchesMap /> */}
    </>
  );
}
