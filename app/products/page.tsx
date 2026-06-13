import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getProducts } from "@/lib/catalog";
import { getVerticals } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Product Catalogue | Zigma Technologies",
  description: "Browse Zigma Technologies' full product catalogue across all business verticals.",
};

export default async function ProductsPage() {
  const [labels, products, verticals] = await Promise.all([
    getLabels(),
    getProducts(),
    getVerticals(),
  ]);

  const verticalMap = Object.fromEntries(verticals.map((v) => [v.slug, v]));

  return (
    <>
      <PageHero
        eyebrow={labels["nav.products"]}
        title={labels["home.verticals.title"] ? "Product Catalogue" : "Product Catalogue"}
        subtitle="Browse engineered solutions across enterprise technology, automation, power, security, software and solar."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const v = verticalMap[p.vertical_slug];
              return (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
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
                  <h3 className="font-display font-bold text-navy mb-2 group-hover:text-steel transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {p.short_desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {labels["common.learn_more"] ?? "Learn more"}
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
