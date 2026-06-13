"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import type { MenuItem } from "@/lib/menus";
import { useLabel, useLabels } from "@/lib/LabelProvider";
import { FALLBACK_VERTICALS } from "@/lib/fallback-data";

export default function Header({ menu }: { menu: MenuItem[] }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const labels = useLabels();
  const siteName = useLabel("site.name", "Zigma Technologies");
  const enquireLabel = useLabel("nav.cta.enquire", "Enquire Now");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-18 lg:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-navy font-mono-tag text-sm font-bold text-amber">
            ZT
          </span>
          <span className="font-display text-lg font-bold text-navy tracking-tight">
            {siteName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-stretch h-full">
          {menu.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center px-4 h-full"
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.url_slug ?? "#"}
                className="flex items-center gap-1 text-sm font-medium text-ink/80 hover:text-navy transition-colors"
              >
                {labels[item.label_key] ?? item.label_key}
                {item.children.length > 0 && (
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      activeMenu === item.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {item.children.length > 0 && activeMenu === item.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[340px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-line shadow-xl rounded-lg overflow-hidden">
                    <div className="h-1 bg-amber" />
                    <div className="p-2">
                      {item.children.map((child) => {
                        const vertical = FALLBACK_VERTICALS.find(
                          (v) => `/solutions/${v.slug}` === child.url_slug
                        );
                        return (
                          <Link
                            key={child.id}
                            href={child.url_slug ?? "#"}
                            className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 hover:bg-mist transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              {vertical && (
                                <span
                                  className="font-mono-tag text-[10px] font-semibold px-1.5 py-0.5 rounded text-white shrink-0"
                                  style={{ backgroundColor: vertical.color_theme }}
                                >
                                  {labels[vertical.tag_key] ?? ""}
                                </span>
                              )}
                              <span className="text-sm text-ink/85 group-hover:text-navy">
                                {labels[child.label_key] ?? child.label_key}
                              </span>
                            </div>
                            <ArrowRight
                              size={14}
                              className="text-ink/30 group-hover:text-navy group-hover:translate-x-0.5 transition-all shrink-0"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-navy text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-steel transition-colors"
          >
            {enquireLabel}
            <ArrowRight size={15} />
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-navy"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-white max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4">
            {menu.map((item) => (
              <div key={item.id} className="border-b border-line/60 last:border-0">
                <Link
                  href={item.url_slug ?? "#"}
                  className="block py-3 text-sm font-medium text-ink/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {labels[item.label_key] ?? item.label_key}
                </Link>
                {item.children.length > 0 && (
                  <div className="pl-4 pb-2 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={child.url_slug ?? "#"}
                        className="text-xs text-ink/60 py-1"
                        onClick={() => setMobileOpen(false)}
                      >
                        {labels[child.label_key] ?? child.label_key}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-4 text-center bg-navy text-white px-5 py-2.5 rounded text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              {enquireLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
