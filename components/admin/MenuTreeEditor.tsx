"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, ChevronRight, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type MenuRow = {
  id: string;
  parent_id: string | null;
  menu_location: string;
  label_key: string;
  url_slug: string | null;
  display_order: number;
  is_active: boolean;
};

type LabelRow = { label_key: string; label_text: string };

export default function MenuTreeEditor({ location }: { location: "header" | "footer" }) {
  const supabase = createClient();
  const [menus, setMenus] = useState<MenuRow[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  async function load() {
    setLoading(true);
    const [{ data: m }, { data: l }] = await Promise.all([
      supabase.from("menus").select("*").eq("menu_location", location).order("display_order"),
      supabase.from("ui_labels").select("label_key, label_text"),
    ]);
    setMenus(m ?? []);
    setLabels(Object.fromEntries((l ?? []).map((r: LabelRow) => [r.label_key, r.label_text])));
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [location]);

  async function addMenuItem(parentId: string | null) {
    const labelKey = `nav.custom.${Date.now()}`;
    await supabase.from("ui_labels").insert({ label_key: labelKey, label_text: "New Menu Item" });
    const { data } = await supabase
      .from("menus")
      .insert({
        parent_id: parentId,
        label_key: labelKey,
        url_slug: "/",
        menu_location: location,
        display_order: menus.filter((m) => m.parent_id === parentId).length,
        is_active: true,
      })
      .select()
      .single();

    if (data) {
      setMenus((prev) => [...prev, data]);
      setLabels((prev) => ({ ...prev, [labelKey]: "New Menu Item" }));
      if (parentId) setExpanded((prev) => ({ ...prev, [parentId]: true }));
    }
  }

  async function deleteMenuItem(id: string) {
    if (!confirm("Delete this menu item and all its submenus?")) return;
    await supabase.from("menus").delete().eq("id", id);
    setMenus((prev) => prev.filter((m) => m.id !== id && m.parent_id !== id));
  }

  async function toggleActive(item: MenuRow) {
    const next = !item.is_active;
    await supabase.from("menus").update({ is_active: next }).eq("id", item.id);
    setMenus((prev) => prev.map((m) => (m.id === item.id ? { ...m, is_active: next } : m)));
  }

  async function saveLabel(labelKey: string, text: string) {
    setSaving(labelKey);
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", labelKey);
    setLabels((prev) => ({ ...prev, [labelKey]: text }));
    setSaving(null);
  }

  async function saveSlug(id: string, slug: string) {
    setSaving(id);
    await supabase.from("menus").update({ url_slug: slug }).eq("id", id);
    setMenus((prev) => prev.map((m) => (m.id === id ? { ...m, url_slug: slug } : m)));
    setSaving(null);
  }

  if (loading) return <p className="text-sm text-ink/50 p-6">Loading menu...</p>;

  const roots = menus.filter((m) => !m.parent_id).sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-3">
      <button
        onClick={() => addMenuItem(null)}
        className="inline-flex items-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
      >
        <Plus size={15} /> Add Top-Level Menu
      </button>

      <div className="space-y-2">
        {roots.map((item) => {
          const children = menus
            .filter((m) => m.parent_id === item.id)
            .sort((a, b) => a.display_order - b.display_order);
          const isOpen = expanded[item.id] ?? children.length > 0;

          return (
            <div key={item.id} className="rounded-lg border border-line bg-white">
              <div className="flex items-center gap-3 p-3">
                <button
                  onClick={() => setExpanded((prev) => ({ ...prev, [item.id]: !isOpen }))}
                  className="text-ink/40"
                >
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>

                <input
                  defaultValue={labels[item.label_key] ?? ""}
                  onBlur={(e) => saveLabel(item.label_key, e.target.value)}
                  className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm font-medium"
                  placeholder="Label text"
                />
                <input
                  defaultValue={item.url_slug ?? ""}
                  onBlur={(e) => saveSlug(item.id, e.target.value)}
                  className="w-48 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag text-ink/60"
                  placeholder="/url-slug"
                />

                <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                  <input
                    type="checkbox"
                    checked={item.is_active}
                    onChange={() => toggleActive(item)}
                  />
                  Active
                </label>

                <button
                  onClick={() => addMenuItem(item.id)}
                  className="text-xs font-semibold text-steel hover:underline shrink-0"
                >
                  + Submenu
                </button>
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="text-red-500 hover:text-red-600 shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {isOpen && children.length > 0 && (
                <div className="border-t border-line bg-mist/50 px-3 py-2 space-y-2">
                  {children.map((child) => (
                    <div key={child.id} className="flex items-center gap-3 pl-7">
                      <input
                        defaultValue={labels[child.label_key] ?? ""}
                        onBlur={(e) => saveLabel(child.label_key, e.target.value)}
                        className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm"
                        placeholder="Submenu label"
                      />
                      <input
                        defaultValue={child.url_slug ?? ""}
                        onBlur={(e) => saveSlug(child.id, e.target.value)}
                        className="w-48 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag text-ink/60"
                        placeholder="/url-slug"
                      />
                      <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                        <input
                          type="checkbox"
                          checked={child.is_active}
                          onChange={() => toggleActive(child)}
                        />
                        Active
                      </label>
                      <button
                        onClick={() => deleteMenuItem(child.id)}
                        className="text-red-500 hover:text-red-600 shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {saving && (
        <p className="inline-flex items-center gap-1.5 text-xs text-steel">
          <Save size={12} className="animate-pulse" /> Saving...
        </p>
      )}
    </div>
  );
}
