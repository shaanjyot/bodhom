-- =====================================================
-- BODHOM SEED DATA
-- Run this after schema.sql to populate initial data
-- =====================================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE categories, products, hero_slides, testimonials, blog_posts, page_content CASCADE;

-- =====================================================
-- CATEGORIES
-- =====================================================
INSERT INTO categories (name, slug, description, image, is_active, sort_order) VALUES
  ('Brass Utensils', 'brass-utensils', 'Traditional brass utensils handcrafted by skilled artisans from Odisha. Perfect for daily use and special occasions.', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800', true, 1),
  ('Copper Cookware', 'copper-cookware', 'Authentic copper cookware known for excellent heat distribution and health benefits. Ayurvedic approved.', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', true, 2),
  ('Pooja Items', 'pooja-items', 'Sacred brass and copper items for your daily pooja rituals. Handcrafted with devotion.', 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', true, 3),
  ('Home Decor', 'home-decor', 'Beautiful brass and copper decorative pieces to enhance your living spaces with traditional elegance.', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', true, 4)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

-- =====================================================
-- PRODUCTS
-- =====================================================
-- First, get category IDs for reference
DO $$
DECLARE
  cat_brass_utensils UUID;
  cat_copper_cookware UUID;
  cat_pooja_items UUID;
  cat_home_decor UUID;
BEGIN
  SELECT id INTO cat_brass_utensils FROM categories WHERE slug = 'brass-utensils';
  SELECT id INTO cat_copper_cookware FROM categories WHERE slug = 'copper-cookware';
  SELECT id INTO cat_pooja_items FROM categories WHERE slug = 'pooja-items';
  SELECT id INTO cat_home_decor FROM categories WHERE slug = 'home-decor';

  -- Insert products
  INSERT INTO products (name, slug, description, short_description, price, original_price, sku, category_id, images, thumbnail, badge, rating, reviews_count, stock_quantity, is_active, is_featured, specifications, features) VALUES
    (
      'Traditional Brass Diya Set (5 Pieces)',
      'traditional-brass-diya-set',
      'This exquisite brass diya set is handcrafted by skilled artisans from Odisha. Made from pure brass, these diyas are perfect for your pooja rituals and home decoration. Each piece is carefully crafted to preserve traditional designs passed down through generations. The set includes 5 beautifully designed diyas of varying sizes, perfect for creating a divine atmosphere during festivals and daily prayers.',
      'Handcrafted pure brass diya set for pooja and decoration',
      1299,
      1999,
      'BDH-DIYA-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800'],
      'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800',
      'Best Seller',
      4.5,
      128,
      45,
      true,
      true,
      '{"Material": "Pure Brass", "Set Includes": "5 Diyas", "Dimensions": "2-4 inches each", "Weight": "500g", "Care": "Clean with soft cloth"}'::jsonb,
      ARRAY['Made from pure brass', 'Handcrafted by skilled artisans', 'Traditional Odisha design', 'Perfect for pooja and decoration', 'Set of 5 pieces']
    ),
    (
      'Copper Water Pot (Tamra Lota)',
      'copper-water-pot-tamra-lota',
      'Store water in this traditional copper lota and experience the Ayurvedic benefits of copper-infused water. Handcrafted from pure copper, this vessel is designed following ancient traditions. Drinking water stored in copper vessels helps balance the three doshas and supports overall health. The elegant design makes it perfect for both daily use and special occasions.',
      'Pure copper water pot with Ayurvedic health benefits',
      2499,
      3499,
      'BDH-LOTA-001',
      cat_copper_cookware,
      ARRAY['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800',
      'New',
      4.8,
      89,
      32,
      true,
      true,
      '{"Material": "Pure Copper", "Capacity": "1.5 Liters", "Height": "8 inches", "Weight": "450g", "Care": "Clean with lemon and salt"}'::jsonb,
      ARRAY['100% pure copper', 'Ayurvedic health benefits', 'Leak-proof design', 'Traditional craftsmanship', 'Easy to clean']
    ),
    (
      'Brass Pooja Thali Set (11 Pieces)',
      'brass-pooja-thali-set',
      'Complete your pooja setup with this comprehensive brass thali set. Includes thali, small bowls, diya, bell, incense holder, and more. Each piece is intricately designed with traditional motifs that add spiritual significance to your prayers. Made from high-quality brass that develops a beautiful patina over time.',
      'Complete 11-piece brass pooja thali set',
      1899,
      2599,
      'BDH-THALI-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800', 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800'],
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
      'Popular',
      4.6,
      156,
      28,
      true,
      true,
      '{"Material": "Pure Brass", "Set Includes": "11 Pieces", "Thali Diameter": "12 inches", "Weight": "1.2kg", "Finish": "Hand polished"}'::jsonb,
      ARRAY['Complete 11-piece set', 'Traditional designs', 'High-quality brass', 'Perfect for all occasions', 'Gift-ready packaging']
    ),
    (
      'Handcrafted Brass Urli (Decorative Bowl)',
      'handcrafted-brass-urli',
      'Transform your home with this stunning brass urli, traditionally used for floating flowers and diyas. This piece is handcrafted using the ancient lost-wax casting technique by artisans from Odisha. Perfect as a centerpiece for your living room, entrance, or during festivals. The intricate border design adds to its visual appeal.',
      'Decorative brass urli for floating flowers and diyas',
      3499,
      4999,
      'BDH-URLI-001',
      cat_home_decor,
      ARRAY['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800'],
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
      'Featured',
      4.7,
      203,
      15,
      true,
      true,
      '{"Material": "Pure Brass", "Diameter": "14 inches", "Depth": "3 inches", "Weight": "2kg", "Technique": "Lost-wax casting"}'::jsonb,
      ARRAY['Ancient lost-wax technique', 'Intricate border design', 'Perfect for floating flowers', 'Statement decor piece', 'Handcrafted in Odisha']
    ),
    (
      'Copper Kalash with Stand',
      'copper-kalash-with-stand',
      'An essential item for Hindu rituals, this copper kalash with stand is perfect for Griha Pravesh, weddings, and other auspicious ceremonies. The kalash represents abundance and prosperity. Made from pure copper with traditional engravings, this set includes a beautifully crafted stand that elevates the kalash.',
      'Pure copper kalash with decorative stand for rituals',
      4299,
      5999,
      'BDH-KALASH-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800'],
      'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800',
      'Premium',
      4.9,
      67,
      12,
      true,
      true,
      '{"Material": "Pure Copper", "Kalash Height": "10 inches", "Stand Height": "4 inches", "Capacity": "2 Liters", "Weight": "1.5kg"}'::jsonb,
      ARRAY['Pure copper construction', 'Traditional engravings', 'Includes decorative stand', 'Perfect for ceremonies', 'Auspicious design']
    ),
    (
      'Brass Ganesha Idol (6 inches)',
      'brass-ganesha-idol',
      'Invite prosperity and wisdom into your home with this beautifully crafted brass Ganesha idol. Lord Ganesha, the remover of obstacles, is depicted in his traditional seated posture. This idol is perfect for your pooja room, office desk, or as a thoughtful gift. Made using traditional casting methods by skilled artisans.',
      'Handcrafted brass Ganesha idol for blessings',
      1599,
      2299,
      'BDH-GANESH-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1567591414240-e9c1e8eb8a71?w=800', 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800'],
      'https://images.unsplash.com/photo-1567591414240-e9c1e8eb8a71?w=800',
      'Best Seller',
      4.5,
      312,
      55,
      true,
      true,
      '{"Material": "Pure Brass", "Height": "6 inches", "Width": "4 inches", "Weight": "800g", "Finish": "Antique gold"}'::jsonb,
      ARRAY['Detailed craftsmanship', 'Traditional posture', 'Antique gold finish', 'Perfect for gifting', 'Brings prosperity']
    ),
    (
      'Copper Panchapatra Set',
      'copper-panchapatra-set',
      'Essential for Hindu rituals, this copper panchapatra set includes the traditional vessel and spoon used for offering water and other liquids during pooja. The copper material is considered pure and auspicious in Vedic traditions. Handcrafted with precision and care.',
      'Traditional copper panchapatra and spoon for pooja',
      2199,
      2999,
      'BDH-PANCH-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800',
      NULL,
      4.4,
      98,
      40,
      true,
      false,
      '{"Material": "Pure Copper", "Vessel Capacity": "100ml", "Spoon Length": "6 inches", "Weight": "200g", "Set Includes": "Vessel and Spoon"}'::jsonb,
      ARRAY['Pure copper material', 'Traditional design', 'Includes spoon', 'Ritual essential', 'Easy to maintain']
    ),
    (
      'Brass Oil Lamp (Deepam)',
      'brass-oil-lamp-deepam',
      'Light up your prayers with this traditional brass oil lamp. The deepam has been an integral part of Indian households for centuries. This five-faced lamp creates a beautiful glow and is perfect for daily pooja or festival celebrations. The sturdy base ensures stability.',
      'Traditional five-faced brass oil lamp',
      899,
      1299,
      'BDH-DEEPAM-001',
      cat_pooja_items,
      ARRAY['https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800'],
      'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800',
      NULL,
      4.6,
      145,
      65,
      true,
      false,
      '{"Material": "Pure Brass", "Faces": "5", "Height": "5 inches", "Base Diameter": "4 inches", "Weight": "350g"}'::jsonb,
      ARRAY['Five-faced design', 'Stable base', 'Traditional style', 'Easy to light', 'Long-lasting']
    )
  ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    stock_quantity = EXCLUDED.stock_quantity;

END $$;

-- =====================================================
-- HERO SLIDES
-- =====================================================
INSERT INTO hero_slides (title, subtitle, description, image, button_text, button_link, is_active, sort_order) VALUES
  (
    'Ancient Artistry',
    'From the Heart of Odisha',
    'Discover handcrafted brass and copper treasures, each piece telling a story of centuries-old tradition.',
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1920',
    'Explore Collection',
    '/products',
    true,
    1
  ),
  (
    'Timeless Elegance',
    'Handcrafted with Love',
    'Experience the warmth of traditional Indian craftsmanship in every detail.',
    'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=1920',
    'Shop Now',
    '/products',
    true,
    2
  ),
  (
    'Sacred Traditions',
    'For Your Pooja Space',
    'Elevate your spiritual practice with authentic ritual items crafted by master artisans.',
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1920',
    'View Pooja Items',
    '/collections/pooja-items',
    true,
    3
  ),
  (
    'Home Decor',
    'Artisan Collections',
    'Transform your living spaces with pieces that blend tradition with contemporary aesthetics.',
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920',
    'Explore Decor',
    '/collections/home-decor',
    true,
    4
  )
ON CONFLICT DO NOTHING;

-- =====================================================
-- TESTIMONIALS
-- =====================================================
INSERT INTO testimonials (name, location, initials, rating, text, product, is_active, sort_order) VALUES
  (
    'Priya Sharma',
    'Mumbai, Maharashtra',
    'PS',
    5,
    'The brass diya set I purchased is absolutely stunning! The craftsmanship is impeccable, and it arrived beautifully packaged. It has become the centerpiece of my pooja room. Highly recommend BodhOm for authentic brass items.',
    'Brass Diya Set',
    true,
    1
  ),
  (
    'Rajesh Patel',
    'Ahmedabad, Gujarat',
    'RP',
    5,
    'I have been searching for authentic Odisha brass work for years. BodhOm exceeded my expectations. The quality is museum-worthy, and the customer service was exceptional. Will definitely order again!',
    'Copper Water Pot',
    true,
    2
  ),
  (
    'Anita Krishnan',
    'Chennai, Tamil Nadu',
    'AK',
    5,
    'Every piece I have bought tells a story. You can feel the heritage and dedication of the artisans. The brass urli is now a conversation starter at every gathering. Thank you for preserving this art form.',
    'Brass Urli',
    true,
    3
  ),
  (
    'Vikram Singh',
    'Delhi, NCR',
    'VS',
    5,
    'Gifted the Ganesha idol to my parents and they were overjoyed. The attention to detail is remarkable. The antique finish gives it such an authentic look. Packaging was also very secure.',
    'Brass Ganesha Idol',
    true,
    4
  ),
  (
    'Meera Iyer',
    'Bangalore, Karnataka',
    'MI',
    5,
    'The copper kalash set was perfect for our housewarming ceremony. It added such an auspicious touch to the occasion. The quality of copper is excellent and the engravings are beautiful.',
    'Copper Kalash Set',
    true,
    5
  )
ON CONFLICT DO NOTHING;

-- =====================================================
-- BLOG POSTS
-- =====================================================
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, author, read_time, is_published, published_at, tags) VALUES
  (
    'The Art of Dhokra: An Ancient Lost-Wax Technique',
    'art-of-dhokra-ancient-lost-wax-technique',
    'Discover the 4,000-year-old metal casting tradition that continues to thrive in Odisha villages, creating intricate tribal art pieces.',
    E'Dhokra is one of the earliest known methods of non-ferrous metal casting using the lost-wax technique. This ancient art form dates back approximately 4,000 years, making it one of the oldest metal casting techniques in the world.\n\nThe process begins with creating a clay core, which is then coated with wax. Artisans meticulously carve intricate designs into the wax, adding details that will eventually appear in the final metal piece. Once the wax model is complete, it is covered with layers of clay and allowed to dry.\n\nThe mold is then heated, causing the wax to melt and drain away - hence the name "lost-wax." Molten brass or bronze is poured into the cavity left by the wax. After cooling, the outer clay mold is broken to reveal the metal casting.\n\nWhat makes Dhokra special is that each piece is unique. The mold is destroyed in the process, ensuring no two pieces are exactly alike. This tradition is kept alive by tribal communities in Odisha, West Bengal, and other parts of India.\n\nAt BodhOm, we work directly with these artisan communities, ensuring fair wages and helping preserve this magnificent art form for future generations.',
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200',
    'Craftsmanship',
    'Shantanu Goswami',
    '5 min read',
    true,
    NOW() - INTERVAL '7 days',
    ARRAY['dhokra', 'brass', 'traditional', 'odisha', 'craftsmanship']
  ),
  (
    'Brass vs Copper: Understanding Traditional Metals',
    'brass-vs-copper-understanding-traditional-metals',
    'Learn about the unique properties, health benefits, and spiritual significance of brass and copper in Indian culture.',
    E'Both brass and copper have been integral to Indian households for millennia, but they serve different purposes and offer unique benefits.\n\n**Copper (Tamba)**\nCopper is revered in Ayurveda for its health benefits. Drinking water stored overnight in copper vessels is believed to:\n- Balance the three doshas (Vata, Pitta, Kapha)\n- Aid digestion\n- Support the immune system\n- Have anti-inflammatory properties\n\nCopper naturally purifies water by killing harmful bacteria. This is why copper vessels have been used for storing water in Indian homes for generations.\n\n**Brass (Pital)**\nBrass is an alloy of copper and zinc, offering durability and a beautiful golden appearance. Traditional uses include:\n- Pooja items (diyas, bells, thalis)\n- Cooking utensils (historically)\n- Decorative pieces\n- Musical instruments\n\n**Spiritual Significance**\nIn Hindu traditions, both metals are considered sacred. Brass items are preferred for pooja as they are believed to attract positive energy. The sound of brass bells is considered auspicious and is used to invoke deities.\n\n**Care Tips**\n- Clean copper with lemon and salt\n- Polish brass with tamarind paste\n- Avoid harsh chemicals on both metals\n- Store in dry places to prevent tarnishing',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    'Knowledge',
    'Shantanu Goswami',
    '7 min read',
    true,
    NOW() - INTERVAL '14 days',
    ARRAY['brass', 'copper', 'ayurveda', 'health', 'tradition']
  ),
  (
    'Setting Up Your Perfect Pooja Room',
    'setting-up-perfect-pooja-room',
    'Expert tips on creating a sacred space that honors tradition while fitting modern home aesthetics.',
    E'A pooja room is the spiritual heart of an Indian home. Whether you have a dedicated room or a small corner, creating a sacred space requires thoughtful planning.\n\n**Location Matters**\nTraditionally, the pooja room should be in the northeast corner of the house, known as the "Ishan" corner. This direction is associated with positive energy and is considered most auspicious.\n\n**Essential Items**\n1. **Idols/Images**: Choose deities that resonate with your family traditions\n2. **Brass Diya**: For the sacred flame that represents divine light\n3. **Pooja Thali**: A complete set for daily rituals\n4. **Bell**: To invoke deities and ward off negative energy\n5. **Incense Holder**: For dhoop and agarbatti\n6. **Kalash**: Symbolizing abundance and life\n\n**Design Tips**\n- Keep the space clutter-free\n- Use white or light colors for walls\n- Ensure good ventilation for incense smoke\n- Install soft, warm lighting\n- Add a small cabinet for storing pooja items\n\n**Modern Adaptations**\nFor apartments with space constraints:\n- Wall-mounted mandirs work beautifully\n- A dedicated shelf can serve as a mini temple\n- Use brass urlis for floating flowers to add elegance\n\n**Maintenance**\n- Clean idols weekly with a soft cloth\n- Replace flowers daily if possible\n- Keep the flame lit during mornings and evenings\n- Organize items neatly after each pooja\n\nA well-maintained pooja room brings peace and positive energy to your entire home.',
    'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=1200',
    'Lifestyle',
    'Shantanu Goswami',
    '6 min read',
    true,
    NOW() - INTERVAL '21 days',
    ARRAY['pooja room', 'home', 'vastu', 'spirituality', 'decor']
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- =====================================================
-- PAGE CONTENT
-- =====================================================
INSERT INTO page_content (page_key, section_key, content) VALUES
  ('home', 'why_choose_us', '{
    "title": "Why Choose BodhOm",
    "subtitle": "Our Promise",
    "items": [
      {
        "icon": "✨",
        "title": "Authentic Craftsmanship",
        "description": "Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques passed down through generations."
      },
      {
        "icon": "🚚",
        "title": "Free Shipping",
        "description": "Enjoy complimentary shipping on orders above ₹999 across India. Fast, secure, and carefully packaged delivery."
      },
      {
        "icon": "💎",
        "title": "Premium Quality",
        "description": "Quality-checked products with 7-day return policy. Your complete satisfaction is our utmost priority."
      }
    ]
  }'::jsonb),
  ('home', 'newsletter', '{
    "title": "Join Our Community",
    "subtitle": "Stay Connected",
    "description": "Get exclusive offers, artisan stories, and updates on new collections delivered to your inbox.",
    "placeholder": "Enter your email",
    "button_text": "Subscribe"
  }'::jsonb),
  ('about', 'story', '{
    "title": "Our Story",
    "content": "BodhOm was born from a deep appreciation for India rich artisanal heritage. We work directly with master craftsmen from Odisha, ensuring fair wages while bringing their extraordinary creations to homes across India and the world."
  }'::jsonb)
ON CONFLICT (page_key, section_key) DO UPDATE SET
  content = EXCLUDED.content;

-- =====================================================
-- VERIFY DATA
-- =====================================================
SELECT 'Categories' as table_name, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Hero Slides', COUNT(*) FROM hero_slides
UNION ALL
SELECT 'Testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'Blog Posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'Page Content', COUNT(*) FROM page_content;
