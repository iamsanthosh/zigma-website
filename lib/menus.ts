import { createClient } from "@/lib/supabase/server";
import { FALLBACK_HEADER_MENU, FALLBACK_FOOTER_MENU } from "@/lib/fallback-data";

export type MenuItem = {
  id: string;
  label_key: string;
  url_slug: string | null;
  icon?: string | null;
  display_order: number;
  children: MenuItem[];
};

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export async function getMenuTree(
  location: "header" | "footer" | "mobile" = "header"
): Promise<MenuItem[]> {
  const fallback = location === "footer" ? FALLBACK_FOOTER_MENU : FALLBACK_HEADER_MENU;

  if (!isSupabaseConfigured()) {
    return fallback as MenuItem[];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menus")
      .select("id, parent_id, label_key, url_slug, icon, display_order")
      .eq("menu_location", location)
      .eq("is_active", true)
      .order("display_order");

    if (error || !data || data.length === 0) {
      return fallback as MenuItem[];
    }

    const map = new Map<string, MenuItem>();
    data.forEach((i) => map.set(i.id, { ...i, children: [] }));

    const roots: MenuItem[] = [];
    data.forEach((i) => {
      const node = map.get(i.id)!;
      if (i.parent_id && map.has(i.parent_id)) {
        map.get(i.parent_id)!.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  } catch {
    return fallback as MenuItem[];
  }
}
