"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type CaseStudy = {
  id: string;
  slug: string;
  title_key: string;
  client_name: string | null;
  vertical_id: string | null;
  summary_key: string | null;
  is_active: boolean;
};

type Vertical = { id: string; slug: string; title_key: string };

export default function CaseStudiesAdminPage() {
  const supabase = createClient();
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: c }, { data: v }, { data: l }] = await Promise.all([
        supabase.from("case_studies").select("*").order("published_at", { ascending: false }),
        supabase.from("verticals").select("id, slug, title_key"),
        supabase.from("ui_labels").select("label_key, label_text"),
      ]);
      setItems(c ?? []);
      setVerticals(v ?? []);
      setLabels(Object.fromEntries((l ?? []).map((r: any) => [r.label_key, r.label_text])));
      setLoading(false);
    })();
  }, []);

  async function addItem() {
    const slug = `new-case-study-${Date.now()}`;
    const titleKey = `case_study.${slug}.title`;
    const summaryKey = `case_study.${slug}.summary`;

    await supabase.from("ui_labels").insert([
      { label_key: titleKey, label_text: "New Case Study" },
      { label_key: summaryKey, label_text: "Summary of the engagement." },
    ]);

    const { data } = await supabase
      .from("case_studies")
      .insert({
        slug,
        title_key: titleKey,
        summary_key: summaryKey,
        client_name: "Client Name",
        vertical_id: verticals[0]?.id ?? null,
        is_active: true,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (data) {
      setItems((prev) => [data, ...prev]);
      setLabels((prev) => ({ ...prev, [titleKey]: "New Case Study", [summaryKey]: "Summary of the engagement." }));
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this case study?")) return;
    await supabase.from("case_studies").delete().eq("id", id);
    setItems((prev) => prev.filter((c) => c.id !== id));
  }

  async function updateField(id: string, field: keyof CaseStudy, value: any) {
    await supabase.from("case_studies").update({ [field]: value }).eq("id", id);
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  async function saveLabel(key: string, text: string) {
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", key);
    setLabels((prev) => ({ ...prev, [key]: text }));
  }

  if (loading) return <p className="p-8 text-sm text-ink/50">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-navy">Case Studies</h1>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
        >
          <Plus size={15} /> Add Case Study
        </button>
      </div>
      <p className="text-sm text-ink/55 mb-6">
        Success stories shown on the homepage and Case Studies page.
      </p>

      <div className="space-y-3">
        {items.map((c) => (
          <div key={c.id} className="rounded-lg border border-line bg-white p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                defaultValue={labels[c.title_key] ?? ""}
                onBlur={(e) => saveLabel(c.title_key, e.target.value)}
                className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm font-semibold"
                placeholder="Title"
              />
              <input
                defaultValue={c.client_name ?? ""}
                onBlur={(e) => updateField(c.id, "client_name", e.target.value)}
                className="w-56 border border-line rounded px-2.5 py-1.5 text-sm"
                placeholder="Client name"
              />
              <select
                value={c.vertical_id ?? ""}
                onChange={(e) => updateField(c.id, "vertical_id", e.target.value)}
                className="border border-line rounded px-2.5 py-1.5 text-sm w-48"
              >
                <option value="">— Vertical —</option>
                {verticals.map((v) => (
                  <option key={v.id} value={v.id}>
                    {labels[v.title_key] ?? v.slug}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                <input
                  type="checkbox"
                  checked={c.is_active}
                  onChange={(e) => updateField(c.id, "is_active", e.target.checked)}
                />
                Active
              </label>
              <button onClick={() => deleteItem(c.id)} className="text-red-500 hover:text-red-600 shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              defaultValue={c.summary_key ? labels[c.summary_key] ?? "" : ""}
              onBlur={(e) => c.summary_key && saveLabel(c.summary_key, e.target.value)}
              rows={2}
              className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-ink/65"
              placeholder="Summary"
            />
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-ink/45">
            No case studies in the database yet — the live site is currently showing fallback
            seed data.
          </p>
        )}
      </div>
    </div>
  );
}
