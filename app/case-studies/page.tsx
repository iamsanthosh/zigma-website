import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getCaseStudies } from "@/lib/catalog";
import { getVerticals } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Case Studies | Zigma Technologies",
  description: "Success stories across enterprise technology, automation, power, security, software and solar deployments.",
};

export default async function CaseStudiesPage() {
  const [labels, caseStudies, verticals] = await Promise.all([
    getLabels(),
    getCaseStudies(),
    getVerticals(),
  ]);

  const verticalMap = Object.fromEntries(verticals.map((v) => [v.slug, v]));

  return (
    <>
      <PageHero
        eyebrow={labels["home.casestudies.eyebrow"]}
        title={labels["home.casestudies.title"]}
        subtitle="Real engagements, real outcomes — across every vertical Zigma Technologies serves."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((c) => {
              const v = verticalMap[c.vertical_slug];
              return (
                <Link
                  key={c.id}
                  href={`/case-studies/${c.slug}`}
                  className="group rounded-lg border border-line bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  {v && (
                    <span
                      className="font-mono-tag text-[11px] font-bold tracking-wider px-2 py-0.5 rounded text-white self-start mb-4"
                      style={{ backgroundColor: v.color_theme }}
                    >
                      {labels[v.tag_key ?? ""] ?? ""}
                    </span>
                  )}
                  <p className="text-xs text-ink/45 mb-1">{c.client_name}</p>
                  <h3 className="font-display font-bold text-navy mb-2 group-hover:text-steel transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {c.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {labels["common.read_more"] ?? "Read more"}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
