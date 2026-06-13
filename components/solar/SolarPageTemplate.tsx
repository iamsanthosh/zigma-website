import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { SOLAR_PAGES } from "@/lib/fallback-data";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

const SOLAR_COLOR = "#E8A33D";

export default async function SolarPageTemplate({ slug }: { slug: string }) {
  const labels = await getLabels();
  const page = SOLAR_PAGES.find((p) => p.slug === slug);
  const title = page?.label ?? "Solar Solutions";
  const desc = page?.desc ?? "";

  const otherPages = SOLAR_PAGES.filter((p) => p.slug !== slug);

  return (
    <>
      <PageHero
        eyebrow={labels["vertical.solar.tag"] ?? "SOL-06"}
        title={title}
        subtitle={desc}
        accentColor={SOLAR_COLOR}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-3">
                  {labels["common.overview"] ?? "Overview"}
                </h2>
                <p className="text-ink/65 leading-relaxed">
                  {desc} Every installation is designed by certified solar engineers, covering
                  site assessment, system design, supply, installation, grid liaison (where
                  applicable) and post-installation support through our Annual Maintenance
                  Contracts.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-4">
                  {labels["common.applications"] ?? "What's Included"}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Site survey & feasibility assessment",
                    "Custom system design & engineering",
                    "Equipment supply (panels, inverters, mounting)",
                    "Professional installation & commissioning",
                    "Net-metering / grid coordination support",
                    "Annual Maintenance Contract options",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-ink/65 rounded-lg border border-line p-4"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: SOLAR_COLOR }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-4">
                  Explore Other Solar Solutions
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {otherPages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/solar/${p.slug}`}
                      className="group flex items-center justify-between rounded-lg border border-line px-4 py-3 hover:bg-mist transition-colors"
                    >
                      <span className="text-sm font-medium text-ink/75 group-hover:text-navy">
                        {p.label}
                      </span>
                      <ArrowRight size={14} className="text-ink/30 group-hover:text-navy" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="solar-quote"
                  sourcePage={`/solar/${slug}`}
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
