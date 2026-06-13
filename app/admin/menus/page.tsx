"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import MenuTreeEditor from "@/components/admin/MenuTreeEditor";

export default function MenusAdminPage() {
  const [tab, setTab] = useState<"header" | "footer">("header");

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-navy mb-1">Menus & Navigation</h1>
      <p className="text-sm text-ink/55 mb-6">
        Add, edit, reorder or delete menu items and submenus. Changes reflect on the live site
        immediately — every label shown here is read from the database.
      </p>

      <div className="flex gap-2 mb-6 border-b border-line">
        {(["header", "footer"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
              tab === t ? "border-navy text-navy" : "border-transparent text-ink/45 hover:text-ink/70"
            }`}
          >
            {t === "header" ? "Header Navigation" : "Footer Navigation"}
          </button>
        ))}
      </div>

      <MenuTreeEditor location={tab} />
    </div>
  );
}
