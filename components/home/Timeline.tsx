import { getLabels } from "@/lib/labels";
import { getMilestones } from "@/lib/content";

export default async function Timeline() {
  const [labels, milestones] = await Promise.all([getLabels(), getMilestones()]);

  return (
    <section className="py-20 lg:py-28 bg-mist">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="font-mono-tag text-xs font-semibold text-steel tracking-widest uppercase">
            {labels["home.timeline.eyebrow"]}
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy mt-3">
            {labels["home.timeline.title"]}
          </h2>
        </div>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-line" />
          <div className="space-y-10">
            {milestones.map((m) => (
              <div key={m.id} className="relative">
                <span className="absolute -left-8 sm:-left-10 top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-mist" />
                <span className="font-mono-tag text-sm font-bold text-steel">{m.year}</span>
                <h3 className="font-display text-lg font-bold text-navy mt-1">
                  {m.title_text ?? (m.title_key ? labels[m.title_key] : "")}
                </h3>
                <p className="text-sm text-ink/55 mt-1 max-w-xl leading-relaxed">
                  {m.description_text ?? (m.description_key ? labels[m.description_key] : "")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
