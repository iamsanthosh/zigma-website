export const dynamic = "force-dynamic";

import Link from "next/link";
import { Menu as MenuIcon, Tag, Layers, Package, Inbox } from "lucide-react";

const CARDS = [
  { href: "/admin/menus", label: "Menus & Navigation", desc: "Add, edit, reorder or delete header and footer menu items and submenus.", icon: MenuIcon },
  { href: "/admin/labels", label: "UI Labels", desc: "Edit every piece of text shown on the website — no hardcoded strings.", icon: Tag },
  { href: "/admin/verticals", label: "Business Verticals", desc: "Manage the 7 business verticals shown on the homepage and navigation.", icon: Layers },
  { href: "/admin/products", label: "Products", desc: "Manage the product catalogue, specs, FAQs and related products.", icon: Package },
  { href: "/admin/enquiries", label: "Enquiries (Leads)", desc: "View enquiries captured from the website and their CRM sync status.", icon: Inbox },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="font-display text-2xl font-bold text-navy mb-2">Welcome back</h1>
      <p className="text-sm text-ink/55 mb-8">
        Manage every configurable part of the Zigma Technologies website from here.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-lg border border-line bg-white p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded bg-mist mb-4">
                <Icon size={18} className="text-steel" />
              </span>
              <h3 className="font-display font-bold text-navy mb-1.5">{c.label}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
