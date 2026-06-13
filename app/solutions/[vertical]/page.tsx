import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getVerticals, getVerticalBySlug } from "@/lib/content";
import { getProducts, getCaseStudies } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export async function generateStaticParams() {
  const verticals = await getVerticals();
  return verticals.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const v = await getVerticalBySlug(vertical);
  const labels = await getLabels();
  if (!v) return {};
  return {
    title: `${labels[v.title_key] ?? v.slug} | Zigma Technologies`,
    description: labels[v.description_key] ?? "",
  };
}

export default async function VerticalPage({ params }: { params: Promise<{ vertical: string }> }) {
  const { vertical } = await params;
  const [labels, v, products, caseStudies] = await Promise.all([
    getLabels(),
    getVerticalBySlug(vertical),
    getProducts(vertical),
    getCaseStudies(vertical),
  ]);

  if (!v) notFound();

  return (
    <>
      <PageHero
        eyebrow={labels[v.tag_key ?? ""] ?? ""}
        title={labels[v.title_key] ?? v.slug}
        subtitle={labels[v.description_key] ?? ""}
        accentColor={v.color_theme}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                {labels["common.related_products"] ?? "Products & Solutions"}
              </h2>

              {products.length === 0 ? (
                <p className="text-sm text-ink/55">
                  {labels["common.coming_soon"] ?? "Detailed offerings for this vertical are coming soon."}
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-5">
                  {products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="group rounded-lg border border-line p-6 hover:shadow-md hover:-translate-y-0.5 transition-all bg-white"
                    >
                      <h3 className="font-display font-bold text-navy mb-2 group-hover:text-steel transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm text-ink/55 leading-relaxed mb-4 line-clamp-3">
                        {p.short_desc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                        {labels["common.learn_more"] ?? "Learn more"}
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {caseStudies.length > 0 && (
                <div className="mt-14">
                  <h2 className="font-display text-2xl font-bold text-navy mb-6">
                    {labels["home.casestudies.title"] ?? "Case Studies"}
                  </h2>
                  <div className="space-y-4">
                    {caseStudies.map((c) => (
                      <Link
                        key={c.id}
                        href={`/case-studies/${c.slug}`}
                        className="block rounded-lg border border-line p-5 hover:bg-mist transition-colors"
                      >
                        <p className="text-xs font-mono-tag text-steel mb-1">{c.client_name}</p>
                        <h3 className="font-display font-bold text-navy">{c.title}</h3>
                        <p className="text-sm text-ink/55 mt-1 line-clamp-2">{c.summary}</p>
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
                  verticalId={v.id}
                  sourcePage={`/solutions/${v.slug}`}
                  title={labels["common.request_quote"] ?? "Request a Quote"}
                  subtitle={`${labels["nav.cta.enquire"] ?? "Get in touch"} — ${labels[v.title_key] ?? v.slug}`}
                  accentColor={v.color_theme}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
