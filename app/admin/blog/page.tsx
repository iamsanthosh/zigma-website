"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
  id: string;
  slug: string;
  title_key: string;
  category: string | null;
  excerpt_key: string | null;
  is_active: boolean;
};

export default function BlogAdminPage() {
  const supabase = createClient();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: b }, { data: l }] = await Promise.all([
        supabase.from("blog_posts").select("*").order("published_at", { ascending: false }),
        supabase.from("ui_labels").select("label_key, label_text"),
      ]);
      setItems(b ?? []);
      setLabels(Object.fromEntries((l ?? []).map((r: any) => [r.label_key, r.label_text])));
      setLoading(false);
    })();
  }, []);

  async function addItem() {
    const slug = `new-post-${Date.now()}`;
    const titleKey = `blog.${slug}.title`;
    const excerptKey = `blog.${slug}.excerpt`;

    await supabase.from("ui_labels").insert([
      { label_key: titleKey, label_text: "New Blog Post" },
      { label_key: excerptKey, label_text: "Short excerpt for this post." },
    ]);

    const { data } = await supabase
      .from("blog_posts")
      .insert({
        slug,
        title_key: titleKey,
        excerpt_key: excerptKey,
        category: "Blog",
        is_active: true,
        published_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (data) {
      setItems((prev) => [data, ...prev]);
      setLabels((prev) => ({ ...prev, [titleKey]: "New Blog Post", [excerptKey]: "Short excerpt for this post." }));
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    setItems((prev) => prev.filter((b) => b.id !== id));
  }

  async function updateField(id: string, field: keyof BlogPost, value: any) {
    await supabase.from("blog_posts").update({ [field]: value }).eq("id", id);
    setItems((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  }

  async function saveLabel(key: string, text: string) {
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", key);
    setLabels((prev) => ({ ...prev, [key]: text }));
  }

  const CATEGORIES = ["Blog", "Industry Insights", "Solar ROI", "Product Updates", "Case Studies", "FAQs"];

  if (loading) return <p className="p-8 text-sm text-ink/50">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-navy">Blog / Resources</h1>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
        >
          <Plus size={15} /> Add Post
        </button>
      </div>
      <p className="text-sm text-ink/55 mb-6">
        Manage blog posts, industry insights, solar ROI articles, product updates and FAQs.
      </p>

      <div className="space-y-3">
        {items.map((b) => (
          <div key={b.id} className="rounded-lg border border-line bg-white p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                defaultValue={labels[b.title_key] ?? ""}
                onBlur={(e) => saveLabel(b.title_key, e.target.value)}
                className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm font-semibold"
                placeholder="Title"
              />
              <select
                value={b.category ?? ""}
                onChange={(e) => updateField(b.id, "category", e.target.value)}
                className="border border-line rounded px-2.5 py-1.5 text-sm w-48"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <input
                defaultValue={b.slug}
                onBlur={(e) => updateField(b.id, "slug", e.target.value)}
                className="w-44 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag text-ink/60"
                placeholder="url-slug"
              />
              <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                <input
                  type="checkbox"
                  checked={b.is_active}
                  onChange={(e) => updateField(b.id, "is_active", e.target.checked)}
                />
                Published
              </label>
              <button onClick={() => deleteItem(b.id)} className="text-red-500 hover:text-red-600 shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              defaultValue={b.excerpt_key ? labels[b.excerpt_key] ?? "" : ""}
              onBlur={(e) => b.excerpt_key && saveLabel(b.excerpt_key, e.target.value)}
              rows={2}
              className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-ink/65"
              placeholder="Excerpt"
            />
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-ink/45">
            No posts in the database yet — the live site is currently showing fallback seed data.
          </p>
        )}
      </div>
    </div>
  );
}
