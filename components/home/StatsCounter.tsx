import { getLabels } from "@/lib/labels";
import { getCompanyStats } from "@/lib/content";

export default async function StatsCounter() {
  const [labels, stats] = await Promise.all([getLabels(), getCompanyStats()]);

  return (
    <section className="bg-mist border-b border-line">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center sm:text-left">
            <div className="font-display text-3xl lg:text-4xl font-bold text-navy">
              {stat.stat_value}
            </div>
            <div className="text-xs lg:text-sm text-ink/60 mt-1 font-medium">
              {labels[stat.label_key] ?? stat.label_key}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
