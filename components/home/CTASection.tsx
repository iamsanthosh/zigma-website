import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { getLabels } from "@/lib/labels";

export default async function CTASection() {
  const labels = await getLabels();

  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          {labels["home.cta.title"]}
        </h2>
        <p className="text-white/65 mb-9 max-w-xl mx-auto leading-relaxed">
          {labels["home.cta.subtitle"]}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-amber text-navy px-7 py-3.5 rounded font-semibold text-sm hover:bg-amber/90 transition-colors"
        >
          <Phone size={16} />
          {labels["home.cta.button"]}
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
