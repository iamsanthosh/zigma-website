import { createClient } from "@/lib/supabase/server";
import { FALLBACK_LABELS } from "@/lib/fallback-data";

export type LabelMap = Record<string, string>;

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

/**
 * Fetches all UI labels for a locale from Supabase (ui_labels table).
 * Falls back to FALLBACK_LABELS if Supabase isn't configured or the
 * table is empty, so the app always renders meaningful copy and
 * never shows raw label_key strings to end users.
 */
export async function getLabels(locale = "en"): Promise<LabelMap> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_LABELS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ui_labels")
      .select("label_key, label_text")
      .eq("locale", locale);

    if (error || !data || data.length === 0) {
      return FALLBACK_LABELS;
    }

    const dbLabels = Object.fromEntries(data.map((d) => [d.label_key, d.label_text]));
    // DB labels override fallback, but fallback fills any gaps
    return { ...FALLBACK_LABELS, ...dbLabels };
  } catch {
    return FALLBACK_LABELS;
  }
}

export function pickLabel(labels: LabelMap, key: string, fallback?: string) {
  return labels[key] ?? fallback ?? key;
}
