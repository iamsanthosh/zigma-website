import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { SOLAR_PAGES } from "@/lib/fallback-data";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

const SOLAR_COLOR = "#E8A33D";

export const metadata = {
  title: "Solar Energy Solutions | Zigma Technologies",
  description:
    "Residential, commercial and industrial solar solutions including on-grid, off-grid, hybrid systems, solar pumps, street lights, batteries, inverters and AMC.",
};

export default async function SolarHubPage() {
  const labels = await getLabels();

  return (
    <>
      <PageHero
        eyebrow={labels["vertical.solar.tag"] ?? "SOL-06"}
        title={labels["solar.hero.title"] ?? "Solar Energy Solutions for Every Scale"}
        subtitle={labels["solar.hero.subtitle"] ?? ""}
        accentColor={SOLAR_COLOR}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                Our Solar Portfolio
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {SOLAR_PAGES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/solar/${p.slug}`}
                    className="group rounded-lg border border-line bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded"
                        style={{ backgroundColor: `${SOLAR_COLOR}22` }}
                      >
                        <Sun size={14} style={{ color: SOLAR_COLOR }} />
                      </span>
                      <h3 className="font-display font-bold text-navy text-sm group-hover:text-steel transition-colors">
                        {p.label}
                      </h3>
                    </div>
                    <p className="text-xs text-ink/55 leading-relaxed mb-4 flex-1 line-clamp-2">
                      {p.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
                      {labels["common.learn_more"] ?? "Learn more"}
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="solar-quote"
                  sourcePage="/solar"
                  title={labels["solar.quote.title"] ?? "Request a Solar Quote"}
                  subtitle={labels["solar.quote.subtitle"] ?? ""}
                  showSolarFields
                  accentColor={SOLAR_COLOR}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
