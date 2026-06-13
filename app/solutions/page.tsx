import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getVerticals } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Solutions | Zigma Technologies",
  description:
    "Explore Zigma Technologies' seven business verticals: Enterprise Technology, Industrial Automation, UPS, Security, Software & Managed Services, Solar Energy and Annual Maintenance.",
};

export default async function SolutionsPage() {
  const [labels, verticals] = await Promise.all([getLabels(), getVerticals()]);

  return (
    <>
      <PageHero
        eyebrow={labels["home.verticals.eyebrow"]}
        title={labels["home.verticals.title"]}
        subtitle={labels["home.verticals.subtitle"]}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line">
            {verticals.map((v) => (
              <Link
                key={v.id}
                href={`/solutions/${v.slug}`}
                className="group relative bg-white p-7 transition-colors hover:bg-mist flex flex-col min-h-[220px]"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: v.color_theme }}
                  />
                  <span
                    className="font-mono-tag text-[11px] font-bold tracking-wider px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: v.color_theme }}
                  >
                    {labels[v.tag_key ?? ""] ?? "VRT"}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-navy mb-2.5">
                  {labels[v.title_key] ?? v.slug}
                </h3>
                <p className="text-sm text-ink/55 leading-relaxed mb-6 flex-1">
                  {labels[v.description_key] ?? ""}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all">
                  {labels["common.explore"] ?? "Explore"}
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
