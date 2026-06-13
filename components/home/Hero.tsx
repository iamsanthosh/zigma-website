import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { getLabels } from "@/lib/labels";

export default async function Hero() {
  const labels = await getLabels();

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Circuit-grid background pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-steel/30 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-4 py-1.5 mb-6">
            <Zap size={14} className="text-amber" />
            <span className="font-mono-tag text-xs font-medium text-amber tracking-wide">
              {labels["home.hero.eyebrow"]}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
            {labels["home.hero.title"]}
          </h1>

          <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
            {labels["home.hero.subtitle"]}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 bg-amber text-navy px-6 py-3.5 rounded font-semibold text-sm hover:bg-amber/90 transition-colors"
            >
              {labels["home.hero.cta_primary"]}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/25 text-white px-6 py-3.5 rounded font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              {labels["home.hero.cta_secondary"]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
