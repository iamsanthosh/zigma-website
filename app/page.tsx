import { HeroWithMedia } from "@/components/home/HeroWithMedia";
import StatsCounter from "@/components/home/StatsCounter";
import VerticalGrid from "@/components/home/VerticalGrid";
import Timeline from "@/components/home/Timeline";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroWithMedia />
      <StatsCounter />
      <VerticalGrid />
      <Timeline />
      <CTASection />
    </>
  );
}
