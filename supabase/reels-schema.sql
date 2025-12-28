-- =====================================================
-- REELS/SHORTS TABLE
-- For Instagram, Facebook, YouTube reels and shorts
-- =====================================================

CREATE TABLE IF NOT EXISTS reels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  video_url TEXT NOT NULL,
  platform VARCHAR(50) NOT NULL, -- 'instagram', 'facebook', 'youtube'
  product_link VARCHAR(500), -- Link to product page if applicable
  thumbnail_url TEXT, -- Optional thumbnail image
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_reels_active ON reels(is_active);
CREATE INDEX idx_reels_order ON reels(sort_order);
CREATE INDEX idx_reels_platform ON reels(platform);

CREATE TRIGGER update_reels_updated_at
  BEFORE UPDATE ON reels
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;

-- Public can view active reels
CREATE POLICY "Public can view active reels" ON reels
  FOR SELECT
  USING (is_active = true);

-- Service role has full access
CREATE POLICY "Service role full access reels" ON reels
  FOR ALL
  USING (true)
  WITH CHECK (true);

