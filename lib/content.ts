import { createClient } from "@/lib/supabase/server";
import { FALLBACK_VERTICALS, FALLBACK_STATS, FALLBACK_MILESTONES } from "@/lib/fallback-data";

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export type Vertical = {
  id: string;
  slug: string;
  title_key: string;
  tag_key?: string;
  description_key: string;
  color_theme: string;
  card_image_url?: string | null;
  display_order: number;
};

export async function getVerticals(): Promise<Vertical[]> {
  if (!isSupabaseConfigured()) return FALLBACK_VERTICALS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("verticals")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data || data.length === 0) return FALLBACK_VERTICALS;
    return data;
  } catch {
    return FALLBACK_VERTICALS;
  }
}

export async function getVerticalBySlug(slug: string): Promise<Vertical | undefined> {
  const verticals = await getVerticals();
  return verticals.find((v) => v.slug === slug);
}

export type CompanyStat = {
  id: string;
  stat_value: string;
  label_key: string;
  display_order: number;
};

export async function getCompanyStats(): Promise<CompanyStat[]> {
  if (!isSupabaseConfigured()) return FALLBACK_STATS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("company_stats")
      .select("*")
      .order("display_order");

    if (error || !data || data.length === 0) return FALLBACK_STATS;
    return data;
  } catch {
    return FALLBACK_STATS;
  }
}

export type Milestone = {
  id: string;
  year: number;
  title_key?: string;
  title_text?: string;
  description_key?: string;
  description_text?: string;
};

export async function getMilestones(): Promise<Milestone[]> {
  if (!isSupabaseConfigured()) return FALLBACK_MILESTONES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("company_milestones")
      .select("*")
      .order("year");

    if (error || !data || data.length === 0) return FALLBACK_MILESTONES;
    return data;
  } catch {
    return FALLBACK_MILESTONES;
  }
}
