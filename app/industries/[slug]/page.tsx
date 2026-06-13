import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getIndustries, getIndustryBySlug, getCaseStudies } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `${industry.name} | Zigma Technologies`,
    description: industry.description,
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [labels, industry, caseStudies] = await Promise.all([
    getLabels(),
    getIndustryBySlug(slug),
    getCaseStudies(),
  ]);

  if (!industry) notFound();

  return (
    <>
      <PageHero eyebrow={labels["nav.industries"]} title={industry.name} subtitle={industry.description} />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-3">
                  {labels["common.overview"] ?? "Overview"}
                </h2>
                <p className="text-ink/65 leading-relaxed">
                  Zigma Technologies works closely with organizations in the {industry.name.toLowerCase()}{" "}
                  sector to deliver infrastructure that meets compliance, reliability and budget
                  requirements specific to the industry — drawing on solutions from across our
                  seven business verticals.
                </p>
              </div>

              {caseStudies.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-bold text-navy mb-4">
                    {labels["home.casestudies.title"] ?? "Related Case Studies"}
                  </h2>
                  <div className="space-y-4">
                    {caseStudies.slice(0, 3).map((c) => (
                      <Link
                        key={c.id}
                        href={`/case-studies/${c.slug}`}
                        className="block rounded-lg border border-line p-5 hover:bg-mist transition-colors"
                      >
                        <p className="text-xs font-mono-tag text-steel mb-1">{c.client_name}</p>
                        <h3 className="font-display font-bold text-navy">{c.title}</h3>
                        <p className="text-sm text-ink/55 mt-1 line-clamp-2">{c.summary}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy mt-2">
                          {labels["common.read_more"] ?? "Read more"}
                          <ArrowRight size={14} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="general"
                  sourcePage={`/industries/${industry.slug}`}
                  title={labels["common.request_quote"] ?? "Request a Quote"}
                  subtitle={`Tell us about your ${industry.name} project`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
