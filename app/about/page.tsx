import { getLabels } from "@/lib/labels";
import { getCompanyStats, getMilestones } from "@/lib/content";
import PageHero from "@/components/layout/PageHero";
import StatsCounter from "@/components/home/StatsCounter";
import Timeline from "@/components/home/Timeline";

export const metadata = {
  title: "About Us | Zigma Technologies",
  description:
    "20 years of engineering excellence. Learn about Zigma Technologies' history, certifications and company profile.",
};

export default async function AboutPage() {
  const labels = await getLabels();

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Two Decades of Engineering Trust"
        subtitle="Zigma Technologies has grown from a regional IT infrastructure provider into a multi-vertical technology partner serving enterprises, industries, government and homes across India."
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6 text-ink/70 leading-relaxed">
          <p>
            Founded with a focus on reliable enterprise IT delivery, Zigma Technologies has
            expanded steadily into industrial automation, power continuity, security systems,
            managed software services, solar energy and annual maintenance — building a
            portfolio shaped by two decades of on-ground engineering experience.
          </p>
          <p>
            Today, our team of certified engineers and solution architects designs, deploys and
            supports infrastructure for clients across government, healthcare, manufacturing,
            education, banking, retail, real estate and agriculture sectors.
          </p>
          <p>
            Every engagement — from a single product enquiry to a multi-site rollout — is backed
            by the same commitment: dependable engineering, transparent communication and
            long-term support.
          </p>
        </div>
      </section>

      <StatsCounter />
      <Timeline />

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-navy mb-3">
            Certifications & Quality
          </h2>
          <p className="text-ink/60 max-w-2xl mx-auto leading-relaxed">
            Zigma Technologies follows industry-standard quality, safety and project management
            practices across all engagements, with manufacturer-certified engineers for the
            equipment we deploy and support.
          </p>
        </div>
      </section>
    </>
  );
}
