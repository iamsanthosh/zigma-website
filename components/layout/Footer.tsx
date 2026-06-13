import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import type { MenuItem } from "@/lib/menus";
import { getLabels } from "@/lib/labels";
import { getVerticals } from "@/lib/content";

export default async function Footer({ menu }: { menu: MenuItem[] }) {
  const [labels, verticals] = await Promise.all([getLabels(), getVerticals()]);

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-amber font-mono-tag text-sm font-bold text-navy">
              ZT
            </span>
            <span className="font-display text-lg font-bold">
              {labels["site.name"] ?? "Zigma Technologies"}
            </span>
          </div>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            {labels["footer.tagline"] ?? ""}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold tracking-wide uppercase text-amber mb-4">
            {labels["footer.verticals"] ?? "Business Verticals"}
          </h4>
          <ul className="space-y-2.5">
            {verticals.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/solutions/${v.slug}`}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {labels[v.title_key] ?? v.slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold tracking-wide uppercase text-amber mb-4">
            {labels["footer.quicklinks"] ?? "Quick Links"}
          </h4>
          <ul className="space-y-2.5">
            {menu.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url_slug ?? "#"}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {labels[item.label_key] ?? item.label_key}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold tracking-wide uppercase text-amber mb-4">
            {labels["footer.contact"] ?? "Get in Touch"}
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-amber shrink-0" />
              <span>Zigma Technologies HQ, Bengaluru, Karnataka, India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-amber shrink-0" />
              <span>+91 90000 00000</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-amber shrink-0" />
              <span>info@zigmatech.example</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} {labels["site.name"] ?? "Zigma Technologies"}.{" "}
            {labels["footer.rights"] ?? "All rights reserved."}
          </span>
          <span className="font-mono-tag">v2.0 — Built on Next.js + Supabase</span>
        </div>
      </div>
    </footer>
  );
}
