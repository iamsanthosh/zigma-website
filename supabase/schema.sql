-- ============================================================
-- Zigma Technologies — Supabase Schema, Seed Data & RLS
-- Run this in the Supabase SQL editor (or via CLI migrations)
-- ============================================================

-- ============ UI LABELS (every label in the UI) ============
create table if not exists ui_labels (
  id uuid primary key default gen_random_uuid(),
  label_key text not null,
  label_text text not null,
  locale text default 'en',
  group_name text,
  updated_at timestamptz default now(),
  unique(label_key, locale)
);

-- ============ MENUS (header/footer/mobile, configurable) ============
create table if not exists menus (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references menus(id) on delete cascade,
  menu_location text default 'header',
  label_key text not null,
  url_slug text,
  icon text,
  display_order int default 0,
  is_active boolean default true,
  open_in_new_tab boolean default false,
  created_at timestamptz default now()
);

-- ============ BUSINESS VERTICALS ============
create table if not exists verticals (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_key text not null,
  tag_key text,
  description_key text,
  icon_url text,
  hero_image_url text,
  card_image_url text,
  color_theme text default '#0A2A4A',
  display_order int default 0,
  is_active boolean default true
);

-- ============ PRODUCTS ============
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  vertical_id uuid references verticals(id),
  slug text unique not null,
  name_key text not null,
  short_desc_key text,
  overview_key text,
  applications_key text,
  image_url text,
  brochure_url text,
  display_order int default 0,
  is_active boolean default true
);

create table if not exists product_specs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  spec_label_key text not null,
  spec_value text not null,
  display_order int default 0
);

create table if not exists product_faqs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  question_key text not null,
  answer_key text not null,
  display_order int default 0
);

create table if not exists related_products (
  product_id uuid references products(id) on delete cascade,
  related_product_id uuid references products(id) on delete cascade,
  primary key (product_id, related_product_id)
);

-- ============ INDUSTRIES ============
create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_key text not null,
  description_key text,
  icon_url text,
  hero_image_url text,
  display_order int default 0,
  is_active boolean default true
);

-- ============ CASE STUDIES ============
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_key text not null,
  client_name text,
  industry_id uuid references industries(id),
  vertical_id uuid references verticals(id),
  summary_key text,
  challenge_key text,
  solution_key text,
  result_key text,
  image_url text,
  published_at timestamptz default now(),
  is_active boolean default true
);

-- ============ CONTENT BLOCKS (homepage / generic sections) ============
create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  block_type text not null,
  title_key text,
  subtitle_key text,
  body_key text,
  image_url text,
  video_url text,
  display_order int default 0,
  metadata jsonb,
  is_active boolean default true
);

-- ============ COMPANY MILESTONES (20-year legacy timeline) ============
create table if not exists company_milestones (
  id uuid primary key default gen_random_uuid(),
  year int not null,
  title_key text,
  title_text text,
  description_key text,
  description_text text,
  display_order int default 0
);

-- ============ COMPANY STATS ============
create table if not exists company_stats (
  id uuid primary key default gen_random_uuid(),
  stat_key text not null,
  stat_value text not null,
  label_key text not null,
  icon text,
  display_order int default 0
);

-- ============ ENQUIRIES (leads → Zoho CRM) ============
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_type text not null,
  product_id uuid references products(id),
  vertical_id uuid references verticals(id),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  message text,
  metadata jsonb default '{}'::jsonb,
  status text default 'new',
  crm_lead_id text,
  source_page text,
  created_at timestamptz default now()
);

-- ============ BLOG / RESOURCES ============
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_key text not null,
  category text,
  excerpt_key text,
  content_key text,
  cover_image_url text,
  author text,
  published_at timestamptz default now(),
  is_active boolean default true
);

-- ============ JOBS (careers) ============
create table if not exists job_openings (
  id uuid primary key default gen_random_uuid(),
  title_key text not null,
  department text,
  location text,
  employment_type text default 'Full-time',
  description_key text,
  is_active boolean default true,
  posted_at timestamptz default now()
);

-- ============ OFFICES (contact) ============
create table if not exists offices (
  id uuid primary key default gen_random_uuid(),
  name_key text not null,
  address text,
  phone text,
  email text,
  latitude numeric,
  longitude numeric,
  is_headquarters boolean default false,
  display_order int default 0
);

-- ============ ADMIN PROFILES ============
create table if not exists admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'editor' -- 'admin' | 'editor'
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table ui_labels enable row level security;
alter table menus enable row level security;
alter table verticals enable row level security;
alter table products enable row level security;
alter table product_specs enable row level security;
alter table product_faqs enable row level security;
alter table related_products enable row level security;
alter table industries enable row level security;
alter table case_studies enable row level security;
alter table content_blocks enable row level security;
alter table company_milestones enable row level security;
alter table company_stats enable row level security;
alter table blog_posts enable row level security;
alter table job_openings enable row level security;
alter table offices enable row level security;
alter table enquiries enable row level security;
alter table admin_profiles enable row level security;

-- Public read access for all content tables
create policy "public read ui_labels" on ui_labels for select using (true);
create policy "public read menus" on menus for select using (true);
create policy "public read verticals" on verticals for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read product_specs" on product_specs for select using (true);
create policy "public read product_faqs" on product_faqs for select using (true);
create policy "public read related_products" on related_products for select using (true);
create policy "public read industries" on industries for select using (true);
create policy "public read case_studies" on case_studies for select using (true);
create policy "public read content_blocks" on content_blocks for select using (true);
create policy "public read company_milestones" on company_milestones for select using (true);
create policy "public read company_stats" on company_stats for select using (true);
create policy "public read blog_posts" on blog_posts for select using (true);
create policy "public read job_openings" on job_openings for select using (true);
create policy "public read offices" on offices for select using (true);

-- Authenticated (admin) write access for all content tables
create policy "admin write ui_labels" on ui_labels for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write menus" on menus for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write verticals" on verticals for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write products" on products for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write product_specs" on product_specs for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write product_faqs" on product_faqs for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write related_products" on related_products for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write industries" on industries for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write case_studies" on case_studies for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write content_blocks" on content_blocks for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write company_milestones" on company_milestones for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write company_stats" on company_stats for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write blog_posts" on blog_posts for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write job_openings" on job_openings for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

create policy "admin write offices" on offices for all
  using (auth.uid() in (select id from admin_profiles))
  with check (auth.uid() in (select id from admin_profiles));

-- Enquiries: anyone can insert (public form submissions), only admins can read
create policy "public insert enquiries" on enquiries for insert with check (true);
create policy "admin read enquiries" on enquiries for select
  using (auth.uid() in (select id from admin_profiles));
create policy "admin update enquiries" on enquiries for update
  using (auth.uid() in (select id from admin_profiles));

-- Admin profiles: users can read their own profile; only existing admins manage roles
create policy "self read admin_profiles" on admin_profiles for select
  using (auth.uid() = id or auth.uid() in (select id from admin_profiles where role = 'admin'));
create policy "admin manage admin_profiles" on admin_profiles for all
  using (auth.uid() in (select id from admin_profiles where role = 'admin'))
  with check (auth.uid() in (select id from admin_profiles where role = 'admin'));

-- ============================================================
-- SEED DATA
-- ============================================================

-- ---------- UI Labels ----------
insert into ui_labels (label_key, label_text, group_name) values
('site.name', 'Zigma Technologies', 'global'),
('site.tagline', 'Engineering tomorrow''s infrastructure, today.', 'global'),

('nav.home', 'Home', 'nav'),
('nav.about', 'About Us', 'nav'),
('nav.solutions', 'Solutions', 'nav'),
('nav.products', 'Products', 'nav'),
('nav.industries', 'Industries', 'nav'),
('nav.case_studies', 'Case Studies', 'nav'),
('nav.resources', 'Resources', 'nav'),
('nav.careers', 'Careers', 'nav'),
('nav.contact', 'Contact', 'nav'),
('nav.cta.enquire', 'Enquire Now', 'nav'),

('footer.tagline', 'Two decades of engineering excellence across technology, automation, power, security and solar.', 'footer'),
('footer.quicklinks', 'Quick Links', 'footer'),
('footer.verticals', 'Business Verticals', 'footer'),
('footer.contact', 'Get in Touch', 'footer'),
('footer.rights', 'All rights reserved.', 'footer'),

('home.hero.eyebrow', '20 Years of Engineering Trust', 'home'),
('home.hero.title', 'Powering Industry. Securing Infrastructure. Driving the Energy Transition.', 'home'),
('home.hero.subtitle', 'From enterprise IT to industrial automation, power continuity to solar energy — Zigma Technologies delivers integrated solutions across seven specialized verticals.', 'home'),
('home.hero.cta_primary', 'Explore Solutions', 'home'),
('home.hero.cta_secondary', 'Talk to an Expert', 'home'),

('home.verticals.eyebrow', 'What We Do', 'home'),
('home.verticals.title', 'Seven Verticals. One Integrated Partner.', 'home'),
('home.verticals.subtitle', 'Every department of your business, covered by a single technology partner with two decades of delivery experience.', 'home'),

('home.timeline.eyebrow', 'Our Journey', 'home'),
('home.timeline.title', 'Two Decades of Building What''s Next', 'home'),

('home.casestudies.eyebrow', 'Proven Impact', 'home'),
('home.casestudies.title', 'Results Our Clients Stand Behind', 'home'),

('home.cta.title', 'Ready to discuss your project?', 'home'),
('home.cta.subtitle', 'Tell us about your requirements and our solution architects will get back within one business day.', 'home'),
('home.cta.button', 'Request a Callback', 'home'),

('common.explore', 'Explore', 'common'),
('common.learn_more', 'Learn more', 'common'),
('common.read_more', 'Read more', 'common'),
('common.view_all', 'View all', 'common'),
('common.overview', 'Overview', 'common'),
('common.specifications', 'Technical Specifications', 'common'),
('common.applications', 'Applications', 'common'),
('common.related_products', 'Related Products', 'common'),
('common.faqs', 'Frequently Asked Questions', 'common'),
('common.download_brochure', 'Download Brochure', 'common'),
('common.request_quote', 'Request a Quote', 'common'),
('common.whatsapp', 'Chat on WhatsApp', 'common'),
('common.callback', 'Request a Callback', 'common'),
('common.coming_soon', 'Detailed offerings for this vertical are coming soon.', 'common'),

('stats.years', 'Years of Excellence', 'home'),
('stats.clients', 'Clients Served', 'home'),
('stats.projects', 'Projects Delivered', 'home'),
('stats.verticals', 'Business Verticals', 'home'),

('vertical.ent_tech.title', 'Enterprise Technology Solutions', 'vertical'),
('vertical.ent_tech.tag', 'EN-01', 'vertical'),
('vertical.ent_tech.desc', 'End-to-end IT infrastructure, networking and enterprise systems built for scale and resilience.', 'vertical'),

('vertical.automation.title', 'Industrial Automation', 'vertical'),
('vertical.automation.tag', 'AUT-02', 'vertical'),
('vertical.automation.desc', 'PLC, SCADA and process automation solutions that keep production lines running efficiently.', 'vertical'),

('vertical.ups.title', 'UPS Solutions', 'vertical'),
('vertical.ups.tag', 'UPS-03', 'vertical'),
('vertical.ups.desc', 'Critical power backup and continuity systems for enterprises, hospitals and data centers.', 'vertical'),

('vertical.security.title', 'Security Solutions', 'vertical'),
('vertical.security.tag', 'SEC-04', 'vertical'),
('vertical.security.desc', 'Surveillance, access control and integrated security systems for safer facilities.', 'vertical'),

('vertical.software.title', 'Software & Managed Services', 'vertical'),
('vertical.software.tag', 'SWM-05', 'vertical'),
('vertical.software.desc', 'Custom software, IT support and fully managed services backed by certified engineers.', 'vertical'),

('vertical.solar.title', 'Solar Energy Solutions', 'vertical'),
('vertical.solar.tag', 'SOL-06', 'vertical'),
('vertical.solar.desc', 'Residential to industrial solar installations — on-grid, off-grid and hybrid systems with full lifecycle support.', 'vertical'),

('vertical.amc.title', 'Annual Maintenance Services', 'vertical'),
('vertical.amc.tag', 'AMC-07', 'vertical'),
('vertical.amc.desc', 'Proactive maintenance contracts that maximize uptime and extend the life of your critical systems.', 'vertical'),

('solar.hero.title', 'Solar Energy Solutions for Every Scale', 'solar'),
('solar.hero.subtitle', 'From rooftop residential systems to industrial-scale solar parks — Zigma designs, installs and maintains solar infrastructure that pays for itself.', 'solar'),
('solar.quote.title', 'Request a Solar Quote', 'solar'),
('solar.quote.subtitle', 'Share a few details and our solar consultants will prepare a customized proposal.', 'solar'),

('form.name', 'Full Name', 'form'),
('form.email', 'Email Address', 'form'),
('form.phone', 'Phone Number', 'form'),
('form.company', 'Company Name', 'form'),
('form.message', 'Message', 'form'),
('form.submit', 'Submit Enquiry', 'form'),
('form.success', 'Thank you. Our team will contact you shortly.', 'form'),
('form.error', 'Something went wrong. Please try again.', 'form'),
('form.roof_area', 'Roof Area (sq. ft.)', 'form'),
('form.monthly_bill', 'Average Monthly Electricity Bill (₹)', 'form'),
('form.location', 'Installation Location', 'form')
on conflict (label_key, locale) do nothing;

-- ---------- Verticals ----------
insert into verticals (slug, title_key, tag_key, description_key, color_theme, display_order) values
('enterprise-technology', 'vertical.ent_tech.title', 'vertical.ent_tech.tag', 'vertical.ent_tech.desc', '#1E5C8C', 1),
('industrial-automation', 'vertical.automation.title', 'vertical.automation.tag', 'vertical.automation.desc', '#0A2A4A', 2),
('ups-solutions', 'vertical.ups.title', 'vertical.ups.tag', 'vertical.ups.desc', '#3E7CB1', 3),
('security-solutions', 'vertical.security.title', 'vertical.security.tag', 'vertical.security.desc', '#13202E', 4),
('software-managed-services', 'vertical.software.title', 'vertical.software.tag', 'vertical.software.desc', '#1E5C8C', 5),
('solar-energy', 'vertical.solar.title', 'vertical.solar.tag', 'vertical.solar.desc', '#E8A33D', 6),
('annual-maintenance', 'vertical.amc.title', 'vertical.amc.tag', 'vertical.amc.desc', '#0A2A4A', 7)
on conflict (slug) do nothing;

-- ---------- Header Navigation ----------
insert into menus (label_key, url_slug, menu_location, display_order) values
('nav.home', '/', 'header', 1),
('nav.about', '/about', 'header', 2),
('nav.solutions', '/solutions', 'header', 3),
('nav.products', '/products', 'header', 4),
('nav.industries', '/industries', 'header', 5),
('nav.case_studies', '/case-studies', 'header', 6),
('nav.resources', '/resources', 'header', 7),
('nav.careers', '/careers', 'header', 8),
('nav.contact', '/contact', 'header', 9);

-- Solutions submenu (linked to the Solutions item above)
insert into menus (parent_id, label_key, url_slug, menu_location, display_order)
select m.id, v.title_key, '/solutions/' || v.slug, 'header', v.display_order
from menus m, verticals v
where m.label_key = 'nav.solutions' and m.menu_location = 'header';

-- ---------- Footer Navigation ----------
insert into menus (label_key, url_slug, menu_location, display_order) values
('nav.about', '/about', 'footer', 1),
('nav.case_studies', '/case-studies', 'footer', 2),
('nav.resources', '/resources', 'footer', 3),
('nav.careers', '/careers', 'footer', 4),
('nav.contact', '/contact', 'footer', 5);

-- ---------- Company Stats ----------
insert into company_stats (stat_key, stat_value, label_key, display_order) values
('years', '20+', 'stats.years', 1),
('clients', '500+', 'stats.clients', 2),
('projects', '1000+', 'stats.projects', 3),
('verticals_count', '7', 'stats.verticals', 4);

-- ---------- Company Milestones ----------
insert into company_milestones (year, title_text, description_text, display_order) values
(2005, 'Zigma Technologies founded', 'Started as a regional IT infrastructure provider.', 1),
(2010, 'Industrial Automation division launched', 'Expanded into PLC/SCADA and process automation.', 2),
(2014, 'UPS & Power Solutions added', 'Began delivering critical power backup systems for enterprises.', 3),
(2018, 'Security Solutions vertical established', 'Integrated surveillance and access-control deployments at scale.', 4),
(2021, 'Software & Managed Services launched', 'Added custom software and 24x7 managed IT support.', 5),
(2025, 'Solar Energy Solutions introduced', 'Launched residential to industrial solar offerings with AMC support.', 6);

-- ---------- Industries ----------
insert into industries (slug, name_key, description_key, display_order) values
('government', 'industry.government.name', 'industry.government.desc', 1),
('healthcare', 'industry.healthcare.name', 'industry.healthcare.desc', 2),
('manufacturing', 'industry.manufacturing.name', 'industry.manufacturing.desc', 3),
('education', 'industry.education.name', 'industry.education.desc', 4),
('banking-finance', 'industry.banking.name', 'industry.banking.desc', 5),
('retail', 'industry.retail.name', 'industry.retail.desc', 6),
('real-estate', 'industry.realestate.name', 'industry.realestate.desc', 7),
('agriculture', 'industry.agriculture.name', 'industry.agriculture.desc', 8)
on conflict (slug) do nothing;

insert into ui_labels (label_key, label_text, group_name) values
('industry.government.name', 'Government & Public Sector', 'industry'),
('industry.government.desc', 'Secure, compliant infrastructure and automation for government departments and public utilities.', 'industry'),
('industry.healthcare.name', 'Healthcare', 'industry'),
('industry.healthcare.desc', 'Reliable power, security and IT infrastructure for hospitals and diagnostic centers.', 'industry'),
('industry.manufacturing.name', 'Manufacturing', 'industry'),
('industry.manufacturing.desc', 'Automation, power continuity and security systems built for production environments.', 'industry'),
('industry.education.name', 'Education', 'industry'),
('industry.education.desc', 'Campus-wide networking, security and solar solutions for schools and universities.', 'industry'),
('industry.banking.name', 'Banking & Finance', 'industry'),
('industry.banking.desc', 'High-availability infrastructure and surveillance for branches and data centers.', 'industry'),
('industry.retail.name', 'Retail', 'industry'),
('industry.retail.desc', 'Networking, surveillance and solar solutions across multi-location retail chains.', 'industry'),
('industry.realestate.name', 'Real Estate & Infrastructure', 'industry'),
('industry.realestate.desc', 'Integrated power, security and solar systems for residential and commercial developments.', 'industry'),
('industry.agriculture.name', 'Agriculture', 'industry'),
('industry.agriculture.desc', 'Solar water pumping and irrigation power solutions for farms and rural infrastructure.', 'industry')
on conflict (label_key, locale) do nothing;

-- ---------- Offices ----------
insert into ui_labels (label_key, label_text, group_name) values
('office.hq.name', 'Head Office – Bengaluru', 'office'),
('office.hyderabad.name', 'Branch Office – Hyderabad', 'office'),
('office.chennai.name', 'Branch Office – Chennai', 'office')
on conflict (label_key, locale) do nothing;

insert into offices (name_key, address, phone, email, is_headquarters, display_order) values
('office.hq.name', 'Zigma Technologies, MG Road, Bengaluru, Karnataka 560001, India', '+91 90000 00001', 'info@zigmatech.example', true, 1),
('office.hyderabad.name', 'Zigma Technologies, HITEC City, Hyderabad, Telangana 500081, India', '+91 90000 00002', 'hyderabad@zigmatech.example', false, 2),
('office.chennai.name', 'Zigma Technologies, Guindy, Chennai, Tamil Nadu 600032, India', '+91 90000 00003', 'chennai@zigmatech.example', false, 3);

-- ---------- Job Openings ----------
insert into ui_labels (label_key, label_text, group_name) values
('job.solar_install_engineer', 'Solar Installation Engineer', 'jobs'),
('job.plc_scada_engineer', 'PLC/SCADA Automation Engineer', 'jobs'),
('job.network_support_engineer', 'Network Support Engineer', 'jobs'),
('job.bde_solar', 'Business Development Executive – Solar', 'jobs'),
('job.service_engineer_ups', 'Service Engineer – UPS & Power Systems', 'jobs')
on conflict (label_key, locale) do nothing;

insert into job_openings (title_key, department, location, employment_type) values
('job.solar_install_engineer', 'Solar Energy Solutions', 'Bengaluru, Karnataka', 'Full-time'),
('job.plc_scada_engineer', 'Industrial Automation', 'Bengaluru, Karnataka', 'Full-time'),
('job.network_support_engineer', 'Enterprise Technology Solutions', 'Bengaluru, Karnataka', 'Full-time'),
('job.bde_solar', 'Solar Energy Solutions', 'Bengaluru, Karnataka', 'Full-time'),
('job.service_engineer_ups', 'UPS Solutions', 'Multiple Locations', 'Full-time');

-- ============================================================
-- NOTE: Products, Case Studies and Blog Posts seed data follow
-- the same label_key + table-row pattern shown above. See
-- lib/fallback-data.ts in the codebase for the full content set
-- (12 products, 6 case studies, 6 blog posts) — translate those
-- into ui_labels + table inserts following the patterns above
-- when ready to move off fallback content.
-- ============================================================

-- ============================================================
-- ADMIN USER SETUP (run after creating a user via Supabase Auth)
-- ============================================================
-- 1. Create a user in Supabase Auth (Dashboard > Authentication > Users)
-- 2. Then run:
--    insert into admin_profiles (id, full_name, role)
--    values ('<user-uuid-from-auth>', 'Admin Name', 'admin');
