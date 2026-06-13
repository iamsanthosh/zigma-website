import { notFound } from "next/navigation";
import { getLabels } from "@/lib/labels";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/catalog";
import { getVerticalBySlug } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export async function generateStaticParams() {
  const items = await getCaseStudies();
  return items.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseStudyBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.title} | Zigma Technologies`,
    description: item.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [labels, item] = await Promise.all([getLabels(), getCaseStudyBySlug(slug)]);

  if (!item) notFound();

  const vertical = await getVerticalBySlug(item.vertical_slug);

  return (
    <>
      <PageHero
        eyebrow={item.client_name}
        title={item.title}
        subtitle={item.summary}
        accentColor={vertical?.color_theme}
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-2">The Challenge</h2>
                <p className="text-ink/65 leading-relaxed">{item.challenge}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-2">The Solution</h2>
                <p className="text-ink/65 leading-relaxed">{item.solution}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-navy mb-2">The Result</h2>
                <p className="text-ink/65 leading-relaxed">{item.result}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="general"
                  verticalId={vertical?.id}
                  sourcePage={`/case-studies/${item.slug}`}
                  title="Discuss a Similar Project"
                  subtitle="Tell us about your requirements and our team will reach out."
                  accentColor={vertical?.color_theme}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
