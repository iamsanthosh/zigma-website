import Hero from "@/components/home/Hero";
import StatsCounter from "@/components/home/StatsCounter";
import VerticalGrid from "@/components/home/VerticalGrid";
import Timeline from "@/components/home/Timeline";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <VerticalGrid />
      <Timeline />
      <CTASection />
    </>
  );
}
