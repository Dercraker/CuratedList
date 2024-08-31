import { Hero } from "@/components/landing/Hero";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { SectionDivider } from "@/components/landing/SectionDivider";
import { StatsSection } from "@/components/landing/StatsSection";
import { Footer } from "@/components/layout/Footer";
import { CuratedListSection } from "./_components/CuratedListSection";

const HomePage = () => {
  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>
      <LandingHeader />
      <Hero />
      <StatsSection />
      <CuratedListSection />
      <SectionDivider />
      <Footer />
    </div>
  );
};

export default HomePage;
