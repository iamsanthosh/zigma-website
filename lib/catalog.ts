import { createClient } from "@/lib/supabase/server";
import {
  FALLBACK_PRODUCTS,
  FALLBACK_INDUSTRIES,
  FALLBACK_CASE_STUDIES,
  FALLBACK_BLOG_POSTS,
  FALLBACK_JOBS,
  FALLBACK_OFFICES,
} from "@/lib/fallback-data";

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

/* ---------------- Products ---------------- */

export async function getProducts(verticalSlug?: string) {
  if (!isSupabaseConfigured()) {
    return verticalSlug
      ? FALLBACK_PRODUCTS.filter((p) => p.vertical_slug === verticalSlug)
      : FALLBACK_PRODUCTS;
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("products")
      .select("*, verticals(slug)")
      .eq("is_active", true)
      .order("display_order");

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return verticalSlug
        ? FALLBACK_PRODUCTS.filter((p) => p.vertical_slug === verticalSlug)
        : FALLBACK_PRODUCTS;
    }

    const mapped = data.map((p: any) => ({
      id: p.id,
      slug: p.slug,
      vertical_slug: p.verticals?.slug ?? "",
      name: p.name_key,
      short_desc: p.short_desc_key,
      overview: p.overview_key,
      applications: p.applications_key,
      specs: [] as { label: string; value: string }[],
      faqs: [] as { q: string; a: string }[],
    }));

    return verticalSlug ? mapped.filter((p) => p.vertical_slug === verticalSlug) : mapped;
  } catch {
    return verticalSlug
      ? FALLBACK_PRODUCTS.filter((p) => p.vertical_slug === verticalSlug)
      : FALLBACK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

/* ---------------- Industries ---------------- */

export async function getIndustries() {
  if (!isSupabaseConfigured()) return FALLBACK_INDUSTRIES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error || !data || data.length === 0) return FALLBACK_INDUSTRIES;

    return data.map((i: any) => ({
      id: i.id,
      slug: i.slug,
      name: i.name_key,
      description: i.description_key,
    }));
  } catch {
    return FALLBACK_INDUSTRIES;
  }
}

export async function getIndustryBySlug(slug: string) {
  const industries = await getIndustries();
  return industries.find((i) => i.slug === slug);
}

/* ---------------- Case Studies ---------------- */

export async function getCaseStudies(verticalSlug?: string) {
  if (!isSupabaseConfigured()) {
    return verticalSlug
      ? FALLBACK_CASE_STUDIES.filter((c) => c.vertical_slug === verticalSlug)
      : FALLBACK_CASE_STUDIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("case_studies")
      .select("*, verticals(slug)")
      .eq("is_active", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return verticalSlug
        ? FALLBACK_CASE_STUDIES.filter((c) => c.vertical_slug === verticalSlug)
        : FALLBACK_CASE_STUDIES;
    }

    const mapped = data.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      title: c.title_key,
      client_name: c.client_name,
      vertical_slug: c.verticals?.slug ?? "",
      summary: c.summary_key,
      challenge: c.challenge_key,
      solution: c.solution_key,
      result: c.result_key,
    }));

    return verticalSlug ? mapped.filter((c) => c.vertical_slug === verticalSlug) : mapped;
  } catch {
    return verticalSlug
      ? FALLBACK_CASE_STUDIES.filter((c) => c.vertical_slug === verticalSlug)
      : FALLBACK_CASE_STUDIES;
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const items = await getCaseStudies();
  return items.find((c) => c.slug === slug);
}

/* ---------------- Blog ---------------- */

export async function getBlogPosts() {
  if (!isSupabaseConfigured()) return FALLBACK_BLOG_POSTS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_active", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_BLOG_POSTS;

    return data.map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title_key,
      category: b.category,
      excerpt: b.excerpt_key,
    }));
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((b) => b.slug === slug);
}

/* ---------------- Jobs ---------------- */

export async function getJobOpenings() {
  if (!isSupabaseConfigured()) return FALLBACK_JOBS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("job_openings")
      .select("*")
      .eq("is_active", true)
      .order("posted_at", { ascending: false });

    if (error || !data || data.length === 0) return FALLBACK_JOBS;

    return data.map((j: any) => ({
      id: j.id,
      title: j.title_key,
      department: j.department,
      location: j.location,
      type: j.employment_type,
    }));
  } catch {
    return FALLBACK_JOBS;
  }
}

/* ---------------- Offices ---------------- */

export async function getOffices() {
  if (!isSupabaseConfigured()) return FALLBACK_OFFICES;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("offices")
      .select("*")
      .order("display_order");

    if (error || !data || data.length === 0) return FALLBACK_OFFICES;
    return data;
  } catch {
    return FALLBACK_OFFICES;
  }
}
