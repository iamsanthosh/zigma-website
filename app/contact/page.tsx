import { MapPin, Phone, Mail } from "lucide-react";
import { getLabels } from "@/lib/labels";
import { getOffices } from "@/lib/catalog";
import PageHero from "@/components/layout/PageHero";
import EnquiryForm from "@/components/products/EnquiryForm";

export const metadata = {
  title: "Contact Us | Zigma Technologies",
  description: "Get in touch with Zigma Technologies — offices, phone numbers, email and enquiry form.",
};

export default async function ContactPage() {
  const [labels, offices] = await Promise.all([getLabels(), getOffices()]);

  return (
    <>
      <PageHero
        eyebrow={labels["nav.contact"]}
        title="Get in Touch"
        subtitle="Have a project in mind or need support? Reach out and our team will respond within one business day."
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy mb-6">Our Offices</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {offices.map((office: any) => (
                  <div key={office.id} className="rounded-lg border border-line bg-white p-6">
                    <h3 className="font-display font-bold text-navy mb-3 flex items-center gap-2">
                      {office.name}
                      {office.is_headquarters && (
                        <span className="font-mono-tag text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber text-navy">
                          HQ
                        </span>
                      )}
                    </h3>
                    <ul className="space-y-2.5 text-sm text-ink/65">
                      <li className="flex items-start gap-2.5">
                        <MapPin size={15} className="text-steel mt-0.5 shrink-0" />
                        {office.address}
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Phone size={15} className="text-steel shrink-0" />
                        {office.phone}
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Mail size={15} className="text-steel shrink-0" />
                        {office.email}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-line p-6 bg-mist">
                <EnquiryForm
                  enquiryType="general"
                  sourcePage="/contact"
                  title={labels["common.request_quote"] ?? "Send Us a Message"}
                  subtitle="Fill in the details below and we'll get back to you shortly."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
