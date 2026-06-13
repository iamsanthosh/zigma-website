import { Briefcase, MapPin } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getJobOpenings } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export const metadata = {
  title: "Careers | Zigma Technologies",
  description: "Open positions at Zigma Technologies across engineering, solar, automation and IT support roles.",
};

export default async function CareersPage() {
  const [labels, jobs] = await Promise.all([getLabels(), getJobOpenings()]);

  return (
    <>
      <PageHero
        eyebrow={labels["nav.careers"]}
        title="Build Your Career With Us"
        subtitle="Join a team that's been engineering solutions across technology, automation, power and solar for two decades."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy mb-6">Open Positions</h2>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-lg border border-line bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div>
                      <h3 className="font-display font-bold text-navy mb-1">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-ink/55">
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase size={14} /> {job.department}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="font-mono-tag text-[11px] font-semibold text-steel uppercase">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href="#apply"
                      className="shrink-0 inline-flex items-center justify-center rounded bg-navy text-white px-5 py-2.5 text-sm font-semibold hover:bg-steel transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div id="apply" className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="career"
                  sourcePage="/careers"
                  title="Apply / Send Your Resume"
                  subtitle="Tell us which role you're interested in and share your details — our HR team will reach out."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
