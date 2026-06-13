"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsAdminPage() {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data?.user?.email ?? null);
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-navy mb-1">Settings</h1>
      <p className="text-sm text-ink/55 mb-6">Account and platform configuration.</p>

      <div className="rounded-lg border border-line bg-white p-6 mb-6">
        <h2 className="font-display text-sm font-bold text-navy mb-3">Signed In As</h2>
        <p className="text-sm text-ink/65">{email ?? "Not signed in"}</p>
        <button
          onClick={signOut}
          className="mt-4 rounded bg-mist px-4 py-2 text-sm font-semibold text-navy hover:bg-line transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="rounded-lg border border-line bg-white p-6">
        <h2 className="font-display text-sm font-bold text-navy mb-3">Environment</h2>
        <p className="text-sm text-ink/65 leading-relaxed">
          Site-wide settings such as analytics IDs (Google Analytics 4, Google Tag Manager,
          Microsoft Clarity), Zoho CRM credentials and Supabase keys are configured via
          environment variables — see <code className="font-mono-tag text-xs bg-mist px-1.5 py-0.5 rounded">.env.local</code>{" "}
          and the project README for the full list.
        </p>
      </div>
    </div>
  );
}
