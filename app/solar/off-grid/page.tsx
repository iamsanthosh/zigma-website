import SolarPageTemplate from "@/components/solar/SolarPageTemplate";
import { SOLAR_PAGES } from "@/lib/fallback-data";

const SLUG = "off-grid";

export async function generateMetadata() {
  const page = SOLAR_PAGES.find((p) => p.slug === SLUG);
  return {
    title: `${page?.label ?? "Solar Solutions"} | Zigma Technologies`,
    description: page?.desc ?? "",
  };
}

export default function Page() {
  return <SolarPageTemplate slug={SLUG} />;
}
