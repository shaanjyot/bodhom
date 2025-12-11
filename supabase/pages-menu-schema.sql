-- =====================================================
-- PAGES AND MENU ITEMS SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- =====================================================
-- CUSTOM PAGES TABLE
-- For editable interior pages like About, Contact, etc.
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  show_in_menu BOOLEAN DEFAULT false,
  menu_order INTEGER DEFAULT 0,
  template VARCHAR(50) DEFAULT 'default'
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);
CREATE INDEX idx_pages_menu ON pages(show_in_menu, menu_order);

CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MENU ITEMS TABLE
-- For managing header/footer navigation menus
-- =====================================================
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  menu_location VARCHAR(50) DEFAULT 'header',
  parent_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  open_in_new_tab BOOLEAN DEFAULT false
);

CREATE INDEX idx_menu_items_location ON menu_items(menu_location);
CREATE INDEX idx_menu_items_parent ON menu_items(parent_id);
CREATE INDEX idx_menu_items_order ON menu_items(sort_order);

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Public read access for published pages
CREATE POLICY "Public can view published pages" ON pages
  FOR SELECT USING (is_published = true);

-- Public read access for active menu items
CREATE POLICY "Public can view active menu items" ON menu_items
  FOR SELECT USING (is_active = true);

-- Service role full access
CREATE POLICY "Service role full access pages" ON pages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access menu_items" ON menu_items
  FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert default menu items
INSERT INTO menu_items (title, url, menu_location, sort_order) VALUES
  ('Home', '/', 'header', 1),
  ('Products', '/products', 'header', 2),
  ('Collections', '/collections', 'header', 3),
  ('About', '/about', 'header', 4),
  ('Contact', '/contact', 'header', 5)
ON CONFLICT DO NOTHING;

-- Insert sample pages
INSERT INTO pages (title, slug, content, is_published, template) VALUES
  ('About Us', 'about', '<h2>Our Story</h2><p>BodhOm was born from a deep passion for preserving the traditional art forms of Odisha.</p>', true, 'about'),
  ('Contact Us', 'contact', '<h2>Get in Touch</h2><p>We would love to hear from you.</p>', true, 'contact'),
  ('Privacy Policy', 'privacy-policy', '<h2>Privacy Policy</h2><p>Your privacy is important to us.</p>', true, 'default'),
  ('Terms & Conditions', 'terms-conditions', '<h2>Terms & Conditions</h2><p>Please read these terms carefully.</p>', true, 'default')
ON CONFLICT (slug) DO NOTHING;

-- Add storage bucket for pages if needed
-- Go to Storage in Supabase Dashboard and create 'pages' bucket (public)
