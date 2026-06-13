-- ============================================================
-- MEDIA MANAGEMENT TABLES (Images, Logos, Banners as Blobs)
-- ============================================================

-- Main media storage table (stores binary blob data)
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('logo', 'product', 'banner', 'division', 'marketing', 'hero')),
  mime_type TEXT NOT NULL,
  file_size BIGINT,
  file_data BYTEA NOT NULL,
  url_fallback TEXT, -- External URL fallback if blob fails
  alt_text TEXT,
  description TEXT,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Company logo references
CREATE TABLE IF NOT EXISTS company_logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  logo_type TEXT NOT NULL CHECK (logo_type IN ('primary', 'secondary', 'favicon', 'footer')),
  display_location TEXT, -- 'header', 'footer', 'admin', etc.
  is_current BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(logo_type, display_location)
);

-- Product images (many-to-many relationship)
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  image_type TEXT DEFAULT 'main', -- 'main', 'thumbnail', 'gallery'
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, media_id)
);

-- Division/Vertical media (banners, hero images)
CREATE TABLE IF NOT EXISTS division_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID NOT NULL REFERENCES verticals(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  media_position TEXT NOT NULL, -- 'hero', 'sidebar', 'card', 'banner'
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Industry media (hero images, icons)
CREATE TABLE IF NOT EXISTS industry_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES industries(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  media_position TEXT NOT NULL, -- 'hero', 'icon', 'card'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Case study media (hero images, client logos)
CREATE TABLE IF NOT EXISTS case_study_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_study_id UUID NOT NULL REFERENCES case_studies(id) ON DELETE CASCADE,
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL, -- 'hero', 'client_logo', 'gallery'
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Marketing/Hero section media
CREATE TABLE IF NOT EXISTS marketing_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL, -- 'home.hero', 'home.banner', 'campaigns.x', etc.
  media_id UUID NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all media tables
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE division_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE industry_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_study_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read access for all active media
CREATE POLICY "public read media" ON media FOR SELECT USING (is_active = true);
CREATE POLICY "public read company_logos" ON company_logos FOR SELECT USING (true);
CREATE POLICY "public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "public read division_media" ON division_media FOR SELECT USING (true);
CREATE POLICY "public read industry_media" ON industry_media FOR SELECT USING (true);
CREATE POLICY "public read case_study_media" ON case_study_media FOR SELECT USING (true);
CREATE POLICY "public read marketing_media" ON marketing_media FOR SELECT USING (is_active = true);

-- RLS Policies: Admin write access
CREATE POLICY "admin write media" ON media FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write company_logos" ON company_logos FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write product_images" ON product_images FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write division_media" ON division_media FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write industry_media" ON industry_media FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write case_study_media" ON case_study_media FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

CREATE POLICY "admin write marketing_media" ON marketing_media FOR ALL
  USING (auth.uid() IN (SELECT id FROM admin_profiles))
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_profiles));

-- Create indexes for performance
CREATE INDEX idx_media_type ON media(type) WHERE is_active = true;
CREATE INDEX idx_media_name ON media(name);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_images_media ON product_images(media_id);
CREATE INDEX idx_division_media_vertical ON division_media(vertical_id);
CREATE INDEX idx_industry_media_industry ON industry_media(industry_id);
CREATE INDEX idx_case_study_media_case ON case_study_media(case_study_id);
CREATE INDEX idx_marketing_media_section ON marketing_media(section_key);

-- Add comments
COMMENT ON TABLE media IS 'Binary blob storage for all media (logos, images, banners) with mime type and fallback URL';
COMMENT ON TABLE company_logos IS 'Company logo references with type and location mapping';
COMMENT ON TABLE product_images IS 'Many-to-many relationship between products and media';
COMMENT ON TABLE division_media IS 'Division/vertical specific media (hero, banner, sidebar images)';
