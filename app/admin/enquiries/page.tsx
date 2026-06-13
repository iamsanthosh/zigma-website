"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Enquiry = {
  id: string;
  enquiry_type: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string | null;
  status: string;
  source_page: string | null;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber/15 text-amber",
  synced: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
};

export default function EnquiriesAdminPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);
      setItems(data ?? []);
      setLoading(false);
    })();
  }, []);

  const types = ["all", ...Array.from(new Set(items.map((i) => i.enquiry_type)))];
  const filtered = filter === "all" ? items : items.filter((i) => i.enquiry_type === filter);

  if (loading) return <p className="p-8 text-sm text-ink/50">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-navy mb-1">Enquiries (Leads)</h1>
      <p className="text-sm text-ink/55 mb-6">
        All form submissions captured from the website, with their CRM sync status.
      </p>

      <div className="flex gap-2 mb-4">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded text-xs font-semibold capitalize transition-colors ${
              filter === t ? "bg-navy text-white" : "bg-mist text-ink/60 hover:bg-line"
            }`}
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-line bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-mist text-left text-xs font-semibold text-ink/55 uppercase tracking-wide">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.id} className="border-t border-line">
                <td className="px-4 py-3 text-ink/55 whitespace-nowrap">
                  {new Date(i.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 capitalize">{i.enquiry_type.replace("-", " ")}</td>
                <td className="px-4 py-3 font-medium text-navy">
                  {i.name}
                  {i.company && <div className="text-xs text-ink/45">{i.company}</div>}
                </td>
                <td className="px-4 py-3 text-ink/65">
                  <div>{i.email}</div>
                  <div className="text-xs text-ink/45">{i.phone}</div>
                </td>
                <td className="px-4 py-3 text-ink/45 font-mono-tag text-xs">{i.source_page}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                      STATUS_STYLES[i.status] ?? "bg-mist text-ink/60"
                    }`}
                  >
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/45">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
