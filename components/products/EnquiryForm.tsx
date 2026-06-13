"use client";

import { useState } from "react";
import { useLabels } from "@/lib/LabelProvider";
import { Loader2, CheckCircle2 } from "lucide-react";

type EnquiryFormProps = {
  enquiryType: string;
  productId?: string;
  verticalId?: string;
  sourcePage: string;
  title?: string;
  subtitle?: string;
  showSolarFields?: boolean;
  accentColor?: string;
};

export default function EnquiryForm({
  enquiryType,
  productId,
  verticalId,
  sourcePage,
  title,
  subtitle,
  showSolarFields = false,
  accentColor = "#0A2A4A",
}: EnquiryFormProps) {
  const labels = useLabels();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: Record<string, unknown> = {
      enquiry_type: enquiryType,
      product_id: productId,
      vertical_id: verticalId,
      source_page: sourcePage,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      company: fd.get("company"),
      message: fd.get("message"),
    };

    if (showSolarFields) {
      payload.metadata = {
        roof_area: fd.get("roof_area"),
        monthly_bill: fd.get("monthly_bill"),
        location: fd.get("location"),
      };
    }

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-line bg-mist p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-steel" size={36} />
        <p className="font-display font-semibold text-navy">
          {labels["form.success"] ?? "Thank you. Our team will contact you shortly."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <h3 className="font-display text-xl font-bold text-navy mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-ink/55">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={labels["form.name"] ?? "Full Name"} name="name" required />
        <Field label={labels["form.email"] ?? "Email Address"} name="email" type="email" required />
        <Field label={labels["form.phone"] ?? "Phone Number"} name="phone" type="tel" required />
        <Field label={labels["form.company"] ?? "Company Name"} name="company" />
      </div>

      {showSolarFields && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <Field label={labels["form.roof_area"] ?? "Roof Area (sq. ft.)"} name="roof_area" type="number" />
          <Field label={labels["form.monthly_bill"] ?? "Average Monthly Bill (₹)"} name="monthly_bill" type="number" />
          <div className="sm:col-span-2">
            <Field label={labels["form.location"] ?? "Installation Location"} name="location" />
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-ink/60 mb-1.5 uppercase tracking-wide">
          {labels["form.message"] ?? "Message"}
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded border border-line px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-steel/40 focus:border-steel"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{labels["form.error"] ?? "Something went wrong. Please try again."}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm text-white transition-opacity disabled:opacity-60"
        style={{ backgroundColor: accentColor }}
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        {labels["form.submit"] ?? "Submit Enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-ink/60 mb-1.5 uppercase tracking-wide">
        {label}
        {required && <span className="text-amber ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded border border-line px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-steel/40 focus:border-steel"
      />
    </div>
  );
}
