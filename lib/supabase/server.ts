import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  // Dynamically import next/headers to avoid top-level dependency on
  // a server-only API which breaks client-side bundling in some tools.
  let cookieStore: any = undefined;
  try {
    const headers = await import("next/headers");
    cookieStore = await headers.cookies();
  } catch (e) {
    // If importing next/headers fails (e.g., during client-side bundling),
    // leave cookieStore undefined. The caller should only invoke this
    // function from server contexts where headers are available.
  }

  const cookiesOption = cookieStore
    ? {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: any[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // called from a Server Component – safe to ignore
            }
          },
        },
      }
    : {
        cookies: {
          getAll() {
            return [];
          },
          setAll(_: any[]) {
            /* no-op */
          },
        },
      };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookiesOption as any
  );
}
