import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getVerticals } from "@/lib/content";

export default async function VerticalGrid() {
  const [labels, verticals] = await Promise.all([getLabels(), getVerticals()]);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="font-mono-tag text-xs font-semibold text-steel tracking-widest uppercase">
            {labels["home.verticals.eyebrow"]}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy mt-3 mb-4">
            {labels["home.verticals.title"]}
          </h2>
          <p className="text-ink/60 leading-relaxed">
            {labels["home.verticals.subtitle"]}
          </p>
        </div>

        {/* Switchboard panel grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-xl overflow-hidden border border-line">
          {verticals.map((v) => (
            <Link
              key={v.id}
              href={`/solutions/${v.slug}`}
              className="group relative bg-white p-7 transition-colors hover:bg-mist flex flex-col min-h-[220px]"
            >
              {/* status indicator + code tag */}
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  className="relative flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: v.color_theme }}
                >
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-40"
                    style={{ backgroundColor: v.color_theme }}
                  />
                </span>
                <span
                  className="font-mono-tag text-[11px] font-bold tracking-wider px-2 py-0.5 rounded text-white"
                  style={{ backgroundColor: v.color_theme }}
                >
                  {labels[v.tag_key ?? ""] ?? "VRT"}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-navy mb-2.5 leading-snug">
                {labels[v.title_key] ?? v.slug}
              </h3>

              <p className="text-sm text-ink/55 leading-relaxed mb-6 flex-1">
                {labels[v.description_key] ?? ""}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 group-hover:text-steel transition-all">
                {labels["common.explore"] ?? "Explore"}
                <ArrowRight size={15} />
              </span>

              {/* corner accent on hover */}
              <span
                className="absolute top-0 right-0 h-0 w-0 border-t-[28px] border-l-[28px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderTopColor: v.color_theme }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
