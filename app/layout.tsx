import type { Metadata } from "next";
import "./globals.css";
import { getLabels } from "@/lib/labels";
import { getMenuTree } from "@/lib/menus";
import { LabelProvider } from "@/lib/LabelProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Note: Space Grotesk / Inter / JetBrains Mono are normally loaded via
// next/font/google. This sandbox has no network access to Google Fonts,
// so we use the system-font fallback stacks defined in globals.css
// (--font-display / --font-sans / --font-mono). In production with
// internet access, swap back to next/font/google for the branded faces.

export const metadata: Metadata = {
  title: "Zigma Technologies | Enterprise Tech, Automation, Power & Solar Solutions",
  description:
    "Zigma Technologies delivers Enterprise Technology, Industrial Automation, UPS, Security, Software, Solar Energy and AMC solutions backed by 20 years of engineering excellence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [labels, headerMenu, footerMenu] = await Promise.all([
    getLabels(),
    getMenuTree("header"),
    getMenuTree("footer"),
  ]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-ink">
        <LabelProvider labels={labels}>
          <Header menu={headerMenu} />
          <main className="flex-1">{children}</main>
          <Footer menu={footerMenu} />
        </LabelProvider>
      </body>
    </html>
  );
}
