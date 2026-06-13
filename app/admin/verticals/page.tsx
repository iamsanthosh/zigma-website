"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Vertical = {
  id: string;
  slug: string;
  title_key: string;
  description_key: string;
  tag_key: string | null;
  color_theme: string;
  display_order: number;
  is_active: boolean;
};

export default function VerticalsAdminPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Vertical[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [{ data: v }, { data: l }] = await Promise.all([
        supabase.from("verticals").select("*").order("display_order"),
        supabase.from("ui_labels").select("label_key, label_text"),
      ]);
      setItems(v ?? []);
      setLabels(Object.fromEntries((l ?? []).map((r: any) => [r.label_key, r.label_text])));
      setLoading(false);
    })();
  }, []);

  async function addVertical() {
    const slug = `new-vertical-${Date.now()}`;
    const titleKey = `vertical.${slug}.title`;
    const descKey = `vertical.${slug}.desc`;
    const tagKey = `vertical.${slug}.tag`;

    await supabase.from("ui_labels").insert([
      { label_key: titleKey, label_text: "New Vertical" },
      { label_key: descKey, label_text: "Description for this vertical." },
      { label_key: tagKey, label_text: "NEW-00" },
    ]);

    const { data } = await supabase
      .from("verticals")
      .insert({
        slug,
        title_key: titleKey,
        description_key: descKey,
        tag_key: tagKey,
        color_theme: "#1E5C8C",
        display_order: items.length + 1,
        is_active: true,
      })
      .select()
      .single();

    if (data) {
      setItems((prev) => [...prev, data]);
      setLabels((prev) => ({
        ...prev,
        [titleKey]: "New Vertical",
        [descKey]: "Description for this vertical.",
        [tagKey]: "NEW-00",
      }));
    }
  }

  async function deleteVertical(id: string) {
    if (!confirm("Delete this vertical? Associated products will remain but lose their category.")) return;
    await supabase.from("verticals").delete().eq("id", id);
    setItems((prev) => prev.filter((v) => v.id !== id));
  }

  async function updateField(id: string, field: keyof Vertical, value: any) {
    setSaving(id);
    await supabase.from("verticals").update({ [field]: value }).eq("id", id);
    setItems((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
    setSaving(null);
  }

  async function saveLabel(key: string, text: string) {
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", key);
    setLabels((prev) => ({ ...prev, [key]: text }));
  }

  if (loading) return <p className="p-8 text-sm text-ink/50">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-navy">Business Verticals</h1>
        <button
          onClick={addVertical}
          className="inline-flex items-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
        >
          <Plus size={15} /> Add Vertical
        </button>
      </div>
      <p className="text-sm text-ink/55 mb-6">
        These 7 verticals power the homepage grid, navigation mega-menu and footer links.
      </p>

      <div className="space-y-3">
        {items.map((v) => (
          <div key={v.id} className="rounded-lg border border-line bg-white p-4">
            <div className="flex items-center gap-3 mb-3">
              <input
                type="color"
                value={v.color_theme}
                onChange={(e) => updateField(v.id, "color_theme", e.target.value)}
                className="h-8 w-8 rounded border border-line shrink-0"
              />
              <input
                defaultValue={labels[v.title_key] ?? ""}
                onBlur={(e) => saveLabel(v.title_key, e.target.value)}
                className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm font-semibold"
                placeholder="Title"
              />
              <input
                defaultValue={labels[v.tag_key ?? ""] ?? ""}
                onBlur={(e) => v.tag_key && saveLabel(v.tag_key, e.target.value)}
                className="w-28 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag"
                placeholder="TAG-00"
              />
              <input
                defaultValue={v.slug}
                onBlur={(e) => updateField(v.id, "slug", e.target.value)}
                className="w-44 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag text-ink/60"
                placeholder="url-slug"
              />
              <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                <input
                  type="checkbox"
                  checked={v.is_active}
                  onChange={(e) => updateField(v.id, "is_active", e.target.checked)}
                />
                Active
              </label>
              <button onClick={() => deleteVertical(v.id)} className="text-red-500 hover:text-red-600 shrink-0">
                <Trash2 size={15} />
              </button>
              {saving === v.id && <Save size={14} className="text-steel animate-pulse shrink-0" />}
            </div>
            <textarea
              defaultValue={labels[v.description_key] ?? ""}
              onBlur={(e) => saveLabel(v.description_key, e.target.value)}
              rows={2}
              className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-ink/65"
              placeholder="Description"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
