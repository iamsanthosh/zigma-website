# Zigma Technologies — Website Modernization

Next.js 16 (App Router) + Supabase + Tailwind v4. Built per the Website
Modernization Proposal: 7 business verticals, 11 dedicated Solar pages,
fully database-driven navigation and UI labels, product catalogue with
enquiry forms, and an admin CMS for non-developer content management.

## Stack

- **Frontend:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS v4, custom design tokens (navy / steel / amber)
- **Database & Auth:** Supabase (PostgreSQL + Auth)
- **CRM:** Zoho CRM (lead push via `/api/enquiry`)
- **Hosting target:** Cloudflare Pages

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Zoho credentials
npm run dev
```

The app runs **without** Supabase configured — all pages fall back to
seed-mirrored content in `lib/fallback-data.ts`, so you can preview the
full site immediately. Once Supabase env vars are set and `supabase/schema.sql`
is applied, all content (labels, menus, verticals, products, etc.) is read
live from the database.

## Database Setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql` — this creates all
   tables, RLS policies, and seeds labels/menus/verticals/stats/milestones/
   industries/offices/jobs.
3. Create an admin user via Supabase Auth, then run:
   ```sql
   insert into admin_profiles (id, full_name, role)
   values ('<user-uuid>', 'Admin Name', 'admin');
   ```
4. Log in at `/admin/login`.

> Products, case studies and blog posts have rich fallback seed content in
> `lib/fallback-data.ts` (12 products, 6 case studies, 6 posts). Use the
> admin panel's "Add" buttons to recreate these as real DB rows, or extend
> `schema.sql` following the same `ui_labels` + table-row pattern.

## Key Architectural Points

- **No hardcoded UI text.** Every label (nav items, buttons, headings, form
  fields) is stored in `ui_labels` and rendered via `getLabels()` /
  `useLabel()`. Fallback values exist only so the app degrades gracefully
  without a DB connection — once Supabase is live, DB values win.
- **Configurable navigation.** `menus` table supports unlimited nesting
  (parent_id self-reference). Header mega-menu and footer links are both
  driven from this table. Manage via `/admin/menus`.
- **7 Business Verticals** drive the homepage "switchboard" grid, the
  Solutions mega-menu, and the footer vertical links — all from the
  `verticals` table.
- **Solar expansion**: `/solar` hub + 11 sub-pages (residential, commercial,
  industrial, on-grid, off-grid, hybrid, water pumps, street lights,
  batteries, inverters, AMC), each with a solar-specific quote form
  (roof area, monthly bill, location).
- **Lead capture**: `EnquiryForm` posts to `/api/enquiry`, which writes to
  `enquiries` and pushes to Zoho CRM (`lib/zoho.ts`). CRM sync status is
  visible in `/admin/enquiries`.

## Admin Panel (`/admin`)

- **Menus & Navigation** — add/edit/delete/reorder header & footer menu
  items and submenus.
- **UI Labels** — search and edit every text string on the site.
- **Business Verticals** — manage the 7 verticals (title, description, tag,
  color, slug, active state).
- **Products** — manage product catalogue entries.
- **Case Studies / Blog** — manage success stories and resource content.
- **Enquiries** — view captured leads and their Zoho CRM sync status.
- **Settings** — account info and environment configuration notes.

## Folder Structure

```
app/
├── layout.tsx, page.tsx          Root layout (labels+menus), Homepage
├── about/                        About Us
├── solutions/
│   ├── page.tsx                  Solutions index (7 verticals)
│   └── [vertical]/page.tsx       Dynamic vertical landing page
├── solar/                        Solar hub + 11 sub-pages
├── products/
│   ├── page.tsx                  Catalogue
│   └── [slug]/page.tsx           Product detail (specs, FAQs, related)
├── industries/                   Industries index + [slug] detail
├── case-studies/                 Case studies index + [slug] detail
├── resources/                    Blog/resources index + blog/[slug]
├── careers/, contact/
├── admin/                        CMS (auth-gated)
└── api/enquiry/route.ts          Lead capture → Supabase → Zoho CRM

components/
├── layout/                       Header (mega-menu), Footer, PageHero
├── home/                         Hero, StatsCounter, VerticalGrid, Timeline, CTA
├── products/EnquiryForm.tsx      Shared lead-capture form
├── solar/SolarPageTemplate.tsx   Shared template for 11 solar pages
└── admin/MenuTreeEditor.tsx      Drag-free nested menu CRUD

lib/
├── supabase/{client,server}.ts
├── labels.ts, LabelProvider.tsx  Label fetching + context
├── menus.ts                      Menu tree fetching
├── content.ts                    Verticals, stats, milestones
├── catalog.ts                    Products, industries, case studies, blog, jobs
├── fallback-data.ts              Seed-mirrored fallback content
└── zoho.ts                       Zoho CRM lead push

supabase/schema.sql               Full schema + RLS + seed data
```

## Notes on Fonts

This build uses system font stacks (`--font-display`, `--font-sans`,
`--font-mono` in `app/globals.css`). In an environment with internet access,
swap in **Space Grotesk** (display), **Inter** (body) and **JetBrains Mono**
(tags/code) via `next/font/google` in `app/layout.tsx` for the full branded
look.

## Build & Deploy

```bash
npm run build
```

Deploy target: Cloudflare Pages (per proposal Option 2). Configure the same
environment variables from `.env.example` in the Cloudflare Pages project
settings.
