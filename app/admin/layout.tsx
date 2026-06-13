export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Menu as MenuIcon,
  Tag,
  Layers,
  Package,
  FileText,
  Newspaper,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menus", label: "Menus & Navigation", icon: MenuIcon },
  { href: "/admin/labels", label: "UI Labels", icon: Tag },
  { href: "/admin/verticals", label: "Business Verticals", icon: Layers },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { href: "/admin/blog", label: "Blog / Resources", icon: Newspaper },
  { href: "/admin/enquiries", label: "Enquiries (Leads)", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // In dev / preview mode (no Supabase configured), skip auth so the
  // admin UI can be reviewed. In production, this MUST enforce auth.
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      redirect("/admin/login");
    }
  }

  return (
    <div className="flex min-h-screen bg-mist">
      <aside className="hidden md:flex w-64 flex-col bg-navy text-white">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display text-lg font-bold">Zigma Admin</span>
          <p className="text-xs text-white/50 mt-1">Content & Configuration</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white/75 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            Back to Website
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
