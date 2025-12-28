# New Blog Posts Added

I've created 3 new blog posts relevant to your brass and copper business. Here's what was added:

## Blog Posts Created

### 1. **The Health Benefits of Cooking with Traditional Brass and Copper Utensils**
   - **Category**: Health & Wellness
   - **Read Time**: 8 min read
   - **Tags**: copper, brass, health, cooking, ayurveda, wellness, traditional
   - **Image Needed**: `/blog-copper-cooking.jpg`
   - **Content**: Comprehensive guide on health benefits, Ayurvedic wisdom, and modern research on cooking with traditional metals

### 2. **The Timeless Art of Brass Craftsmanship: From Ancient Temples to Modern Homes**
   - **Category**: Heritage & Culture
   - **Read Time**: 10 min read
   - **Tags**: brass, heritage, craftsmanship, tradition, history, culture, artisans
   - **Image Needed**: `/blog-brass-history.jpg`
   - **Content**: Rich history of brass work in India, from ancient times to modern applications

### 3. **Eco-Friendly Living: Why Traditional Brass and Copper Are Sustainable Choices**
   - **Category**: Sustainability
   - **Read Time**: 9 min read
   - **Tags**: sustainability, eco-friendly, brass, copper, environment, recycling, green living
   - **Image Needed**: `/blog-eco-friendly.jpg`
   - **Content**: Environmental benefits, circular economy, and sustainable living with traditional metals

## How to Add These Posts

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file: `supabase/blog-posts-seed.sql`
4. Copy and paste the entire SQL content
5. Click **Run** to execute

### Option 2: Using Command Line

If you have Supabase CLI set up:
```bash
supabase db execute -f supabase/blog-posts-seed.sql
```

## Adding Images

After running the SQL, you'll need to upload the featured images:

1. **Image Names Needed**:
   - `blog-copper-cooking.jpg`
   - `blog-brass-history.jpg`
   - `blog-eco-friendly.jpg`

2. **Upload via Admin Panel**:
   - Go to `/admin/blog`
   - Edit each blog post
   - Upload the corresponding image
   - Save

3. **Or Upload via API**:
   - Use the `/api/upload` endpoint with folder `blogs`
   - Update the blog posts with the image URLs

## Image Suggestions

- **blog-copper-cooking.jpg**: Image of traditional copper cookware, water in copper vessel, or cooking scene
- **blog-brass-history.jpg**: Ancient brass temple items, artisan working, or historical brass artifacts
- **blog-eco-friendly.jpg**: Brass/copper items in modern eco-friendly setting, recycling concept, or sustainable living scene

## Content Highlights

All blog posts are:
- ✅ SEO-optimized with relevant keywords
- ✅ Well-structured with headings and paragraphs
- ✅ Engaging and informative
- ✅ Relevant to your target audience
- ✅ Include calls-to-action mentioning BodhOm
- ✅ Published and ready to display

## Verification

After running the SQL, verify the posts were added:
- Check `/admin/blog` in your admin panel
- Visit the homepage to see them in the blog section
- They should appear in the grid layout we created

## Notes

- All posts are set to `is_published = true`
- Published dates are set to recent dates (3 days ago, 1 day ago, today)
- The SQL uses `ON CONFLICT` to prevent duplicates if run multiple times
- You can edit any content via the admin panel at `/admin/blog`

