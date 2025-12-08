-- =====================================================
-- BODHOM E-COMMERCE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  sku VARCHAR(100) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  badge VARCHAR(50),
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  meta_title VARCHAR(255),
  meta_description TEXT,
  specifications JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  weight DECIMAL(10,2),
  dimensions JSONB
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_sku ON products(sku);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  razorpay_signature TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  notes TEXT,
  items JSONB NOT NULL
);

CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_razorpay ON orders(razorpay_order_id);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HERO SLIDES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS hero_slides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  image TEXT NOT NULL,
  button_text VARCHAR(100),
  button_link VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_hero_slides_active ON hero_slides(is_active);
CREATE INDEX idx_hero_slides_order ON hero_slides(sort_order);

CREATE TRIGGER update_hero_slides_updated_at
  BEFORE UPDATE ON hero_slides
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category VARCHAR(100),
  author VARCHAR(255) NOT NULL,
  author_image TEXT,
  read_time VARCHAR(50),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PAGE CONTENT TABLE (For editable sections)
-- =====================================================
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  page_key VARCHAR(100) NOT NULL,
  section_key VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(page_key, section_key)
);

CREATE INDEX idx_page_content_keys ON page_content(page_key, section_key);

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  initials VARCHAR(10),
  avatar TEXT,
  rating INTEGER DEFAULT 5,
  text TEXT NOT NULL,
  product VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_testimonials_active ON testimonials(is_active);

-- =====================================================
-- ADMIN USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =====================================================
-- NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for active products
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Public read access for active categories
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);

-- Public read access for active hero slides
CREATE POLICY "Public can view active hero slides" ON hero_slides
  FOR SELECT USING (is_active = true);

-- Public read access for published blog posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Public read access for active page content
CREATE POLICY "Public can view active page content" ON page_content
  FOR SELECT USING (is_active = true);

-- Public read access for active testimonials
CREATE POLICY "Public can view active testimonials" ON testimonials
  FOR SELECT USING (is_active = true);

-- Service role has full access (for admin operations)
CREATE POLICY "Service role full access products" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access categories" ON categories
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access hero_slides" ON hero_slides
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access page_content" ON page_content
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access admin_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access newsletter" ON newsletter_subscribers
  FOR ALL USING (auth.role() = 'service_role');

-- Allow public to insert orders (for checkout)
CREATE POLICY "Public can create orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Allow public to subscribe to newsletter
CREATE POLICY "Public can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- STORAGE BUCKETS (Run in Supabase Dashboard)
-- =====================================================
-- Go to Storage in Supabase Dashboard and create these buckets:
-- 1. products (public)
-- 2. slides (public)
-- 3. blogs (public)
-- 4. assets (public)

-- Storage policies (run these after creating buckets):
/*
-- For 'products' bucket
CREATE POLICY "Public read access for products" ON storage.objects
  FOR SELECT USING (bucket_id = 'products');

CREATE POLICY "Service role full access products storage" ON storage.objects
  FOR ALL USING (bucket_id = 'products' AND auth.role() = 'service_role');

-- For 'slides' bucket
CREATE POLICY "Public read access for slides" ON storage.objects
  FOR SELECT USING (bucket_id = 'slides');

CREATE POLICY "Service role full access slides storage" ON storage.objects
  FOR ALL USING (bucket_id = 'slides' AND auth.role() = 'service_role');

-- For 'blogs' bucket
CREATE POLICY "Public read access for blogs" ON storage.objects
  FOR SELECT USING (bucket_id = 'blogs');

CREATE POLICY "Service role full access blogs storage" ON storage.objects
  FOR ALL USING (bucket_id = 'blogs' AND auth.role() = 'service_role');

-- For 'assets' bucket
CREATE POLICY "Public read access for assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'assets');

CREATE POLICY "Service role full access assets storage" ON storage.objects
  FOR ALL USING (bucket_id = 'assets' AND auth.role() = 'service_role');
*/

-- =====================================================
-- SAMPLE DATA (Optional - for initial setup)
-- =====================================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Brass Utensils', 'brass-utensils', 'Traditional brass utensils handcrafted in Odisha', 1),
  ('Copper Cookware', 'copper-cookware', 'Authentic copper cookware for healthy cooking', 2),
  ('Pooja Items', 'pooja-items', 'Sacred items for your spiritual practices', 3),
  ('Home Decor', 'home-decor', 'Beautiful brass and copper decor pieces', 4)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (name, location, initials, rating, text, product, sort_order) VALUES
  ('Priya Sharma', 'Mumbai, Maharashtra', 'PS', 5, 'The brass diya set I purchased is absolutely stunning! The craftsmanship is impeccable, and it arrived beautifully packaged. It has become the centerpiece of my pooja room.', 'Brass Diya Set', 1),
  ('Rajesh Patel', 'Ahmedabad, Gujarat', 'RP', 5, 'I have been searching for authentic Odisha brass work for years. BodhOm exceeded my expectations. The quality is museum-worthy, and the customer service was exceptional.', 'Copper Water Pot', 2),
  ('Anita Krishnan', 'Chennai, Tamil Nadu', 'AK', 5, 'Every piece I have bought tells a story. You can feel the heritage and dedication of the artisans. The brass urli is now a conversation starter at every gathering.', 'Brass Urli', 3)
ON CONFLICT DO NOTHING;

-- Insert sample page content
INSERT INTO page_content (page_key, section_key, content) VALUES
  ('home', 'why_choose_us', '{
    "title": "Why Choose BodhOm",
    "subtitle": "Our Promise",
    "items": [
      {"icon": "✨", "title": "Authentic Craftsmanship", "description": "Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques passed down through generations."},
      {"icon": "🚚", "title": "Free Shipping", "description": "Enjoy complimentary shipping on orders above ₹999 across India. Fast, secure, and carefully packaged delivery."},
      {"icon": "💎", "title": "Premium Quality", "description": "Quality-checked products with 7-day return policy. Your complete satisfaction is our utmost priority."}
    ]
  }'::jsonb),
  ('home', 'newsletter', '{
    "title": "Join Our Community",
    "subtitle": "Stay Connected",
    "description": "Get exclusive offers, artisan stories, and updates on new collections delivered to your inbox.",
    "placeholder": "Enter your email",
    "button_text": "Subscribe"
  }'::jsonb)
ON CONFLICT (page_key, section_key) DO NOTHING;

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  order_num TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM orders;
  order_num := 'BDH' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(counter::TEXT, 5, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Function to update product stock
CREATE OR REPLACE FUNCTION update_product_stock(
  p_product_id UUID,
  p_quantity INTEGER,
  p_operation VARCHAR(10) DEFAULT 'decrease'
)
RETURNS BOOLEAN AS $$
BEGIN
  IF p_operation = 'decrease' THEN
    UPDATE products 
    SET stock_quantity = stock_quantity - p_quantity 
    WHERE id = p_product_id AND stock_quantity >= p_quantity;
  ELSE
    UPDATE products 
    SET stock_quantity = stock_quantity + p_quantity 
    WHERE id = p_product_id;
  END IF;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

