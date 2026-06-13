"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { Save, Plus, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type LabelRow = {
  id?: string;
  label_key: string;
  label_text: string;
  group_name: string | null;
};

export default function LabelsAdminPage() {
  const supabase = createClient();
  const [labels, setLabels] = useState<LabelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ui_labels")
        .select("id, label_key, label_text, group_name")
        .eq("locale", "en")
        .order("group_name")
        .order("label_key");
      setLabels(data ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return labels;
    const q = search.toLowerCase();
    return labels.filter(
      (l) => l.label_key.toLowerCase().includes(q) || l.label_text.toLowerCase().includes(q)
    );
  }, [labels, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, LabelRow[]> = {};
    for (const l of filtered) {
      const g = l.group_name ?? "other";
      groups[g] = groups[g] ?? [];
      groups[g].push(l);
    }
    return groups;
  }, [filtered]);

  async function saveLabel(labelKey: string, text: string) {
    setSavingKey(labelKey);
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", labelKey).eq("locale", "en");
    setLabels((prev) => prev.map((l) => (l.label_key === labelKey ? { ...l, label_text: text } : l)));
    setSavingKey(null);
  }

  async function addLabel() {
    if (!newKey.trim()) return;
    const { data } = await supabase
      .from("ui_labels")
      .insert({ label_key: newKey.trim(), label_text: newText.trim() || newKey.trim(), group_name: "custom" })
      .select()
      .single();
    if (data) {
      setLabels((prev) => [...prev, data]);
      setNewKey("");
      setNewText("");
    }
  }

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-navy mb-1">UI Labels</h1>
      <p className="text-sm text-ink/55 mb-6">
        Every label shown on the website — navigation, buttons, headings, form fields — is
        editable here. No text is hardcoded in the frontend.
      </p>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by key or text..."
          className="w-full rounded border border-line pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-steel/40 focus:border-steel"
        />
      </div>

      <div className="rounded-lg border border-line bg-white p-4 mb-8">
        <h2 className="font-display text-sm font-bold text-navy mb-3">Add New Label</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="label_key e.g. home.banner.title"
            className="flex-1 rounded border border-line px-3 py-2 text-sm font-mono-tag"
          />
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Display text"
            className="flex-1 rounded border border-line px-3 py-2 text-sm"
          />
          <button
            onClick={addLabel}
            className="inline-flex items-center justify-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading labels...</p>
      ) : (
        Object.entries(grouped).map(([group, items]) => (
          <div key={group} className="mb-8">
            <h3 className="font-mono-tag text-xs font-bold text-steel uppercase tracking-wider mb-3">
              {group}
            </h3>
            <div className="space-y-2">
              {items.map((l) => (
                <div key={l.label_key} className="flex items-center gap-3 rounded border border-line bg-white p-3">
                  <span className="font-mono-tag text-xs text-ink/40 w-56 shrink-0 truncate">
                    {l.label_key}
                  </span>
                  <input
                    defaultValue={l.label_text}
                    onBlur={(e) => saveLabel(l.label_key, e.target.value)}
                    className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm"
                  />
                  {savingKey === l.label_key && (
                    <Save size={14} className="text-steel animate-pulse shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
