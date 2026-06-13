import Link from "next/link";
import { ArrowRight, Landmark, HeartPulse, Factory, GraduationCap, Banknote, ShoppingBag, Building2, Sprout } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getIndustries } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";

export const metadata = {
  title: "Industries We Serve | Zigma Technologies",
  description: "Zigma Technologies serves Government, Healthcare, Manufacturing, Education, Banking & Finance, Retail, Real Estate and Agriculture sectors.",
};

const ICONS: Record<string, any> = {
  government: Landmark,
  healthcare: HeartPulse,
  manufacturing: Factory,
  education: GraduationCap,
  "banking-finance": Banknote,
  retail: ShoppingBag,
  "real-estate": Building2,
  agriculture: Sprout,
};

export default async function IndustriesPage() {
  const [labels, industries] = await Promise.all([getLabels(), getIndustries()]);

  return (
    <>
      <PageHero
        eyebrow={labels["nav.industries"]}
        title="Industries We Serve"
        subtitle="Integrated technology, automation, power and solar solutions tailored to the operational realities of each sector."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind) => {
              const Icon = ICONS[ind.slug] ?? Building2;
              return (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  className="group rounded-lg border border-line bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded bg-mist mb-4">
                    <Icon size={18} className="text-steel" />
                  </span>
                  <h3 className="font-display font-bold text-navy mb-2 group-hover:text-steel transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-ink/55 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {ind.description}
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
