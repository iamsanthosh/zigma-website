"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  slug: string;
  vertical_id: string | null;
  name_key: string;
  short_desc_key: string;
  overview_key: string | null;
  applications_key: string | null;
  display_order: number;
  is_active: boolean;
};

type Vertical = { id: string; slug: string; title_key: string };

export default function ProductsAdminPage() {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>([]);
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: p }, { data: v }, { data: l }] = await Promise.all([
        supabase.from("products").select("*").order("display_order"),
        supabase.from("verticals").select("id, slug, title_key").order("display_order"),
        supabase.from("ui_labels").select("label_key, label_text"),
      ]);
      setProducts(p ?? []);
      setVerticals(v ?? []);
      setLabels(Object.fromEntries((l ?? []).map((r: any) => [r.label_key, r.label_text])));
      setLoading(false);
    })();
  }, []);

  async function addProduct() {
    const slug = `new-product-${Date.now()}`;
    const nameKey = `product.${slug}.name`;
    const descKey = `product.${slug}.short_desc`;

    await supabase.from("ui_labels").insert([
      { label_key: nameKey, label_text: "New Product" },
      { label_key: descKey, label_text: "Short description of the product." },
    ]);

    const { data } = await supabase
      .from("products")
      .insert({
        slug,
        vertical_id: verticals[0]?.id ?? null,
        name_key: nameKey,
        short_desc_key: descKey,
        display_order: products.length + 1,
        is_active: true,
      })
      .select()
      .single();

    if (data) {
      setProducts((prev) => [...prev, data]);
      setLabels((prev) => ({ ...prev, [nameKey]: "New Product", [descKey]: "Short description of the product." }));
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function updateField(id: string, field: keyof Product, value: any) {
    await supabase.from("products").update({ [field]: value }).eq("id", id);
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function saveLabel(key: string, text: string) {
    await supabase.from("ui_labels").update({ label_text: text }).eq("label_key", key);
    setLabels((prev) => ({ ...prev, [key]: text }));
  }

  if (loading) return <p className="p-8 text-sm text-ink/50">Loading...</p>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl font-bold text-navy">Products</h1>
        <button
          onClick={addProduct}
          className="inline-flex items-center gap-2 rounded bg-navy text-white px-4 py-2 text-sm font-semibold hover:bg-steel transition-colors"
        >
          <Plus size={15} /> Add Product
        </button>
      </div>
      <p className="text-sm text-ink/55 mb-6">
        Manage the product catalogue. Detailed specs and FAQs can be extended via the
        product_specs and product_faqs tables.
      </p>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-lg border border-line bg-white p-4 space-y-3">
            <div className="flex items-center gap-3">
              <input
                defaultValue={labels[p.name_key] ?? ""}
                onBlur={(e) => saveLabel(p.name_key, e.target.value)}
                className="flex-1 border border-line rounded px-2.5 py-1.5 text-sm font-semibold"
                placeholder="Product name"
              />
              <select
                value={p.vertical_id ?? ""}
                onChange={(e) => updateField(p.id, "vertical_id", e.target.value)}
                className="border border-line rounded px-2.5 py-1.5 text-sm w-56"
              >
                <option value="">— Vertical —</option>
                {verticals.map((v) => (
                  <option key={v.id} value={v.id}>
                    {labels[v.title_key] ?? v.slug}
                  </option>
                ))}
              </select>
              <input
                defaultValue={p.slug}
                onBlur={(e) => updateField(p.id, "slug", e.target.value)}
                className="w-48 border border-line rounded px-2.5 py-1.5 text-sm font-mono-tag text-ink/60"
                placeholder="url-slug"
              />
              <label className="flex items-center gap-1.5 text-xs text-ink/50 shrink-0">
                <input
                  type="checkbox"
                  checked={p.is_active}
                  onChange={(e) => updateField(p.id, "is_active", e.target.checked)}
                />
                Active
              </label>
              <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-600 shrink-0">
                <Trash2 size={15} />
              </button>
            </div>
            <textarea
              defaultValue={labels[p.short_desc_key] ?? ""}
              onBlur={(e) => saveLabel(p.short_desc_key, e.target.value)}
              rows={2}
              className="w-full border border-line rounded px-2.5 py-1.5 text-sm text-ink/65"
              placeholder="Short description"
            />
          </div>
        ))}
        {products.length === 0 && (
          <p className="text-sm text-ink/45">
            No products in the database yet — the live site is currently showing fallback
            seed data. Click &quot;Add Product&quot; to start managing the catalogue from here.
          </p>
        )}
      </div>
    </div>
  );
}
