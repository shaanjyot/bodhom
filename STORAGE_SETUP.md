# Supabase Storage Setup Guide

## Step 1: Create Storage Buckets

Go to your Supabase Dashboard → Storage and create these buckets:

1. **products** (Public bucket)
2. **slides** (Public bucket)
3. **blogs** (Public bucket)
4. **assets** (Public bucket)
5. **pages** (Public bucket)

For each bucket:
- Click "New bucket"
- Enter the bucket name
- Check "Public bucket" to allow public access to files
- Click "Create bucket"

## Step 2: Get S3 Access Keys

1. Go to Supabase Dashboard → Project Settings → Storage
2. Scroll down to "S3 Access Keys" section
3. Click "Generate new token" if you don't have keys
4. Copy the Access Key ID and Secret Access Key

## Step 3: Add Environment Variables

Add these to your `.env.local` file:

```env
# Supabase S3 Storage Credentials
SUPABASE_S3_ACCESS_KEY_ID=your_access_key_id_here
SUPABASE_S3_SECRET_ACCESS_KEY=your_secret_access_key_here
```

## Step 4: Restart the Development Server

After adding the environment variables:

```bash
# Stop the dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Complete .env.local Example

Your `.env.local` should have these variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Supabase S3 Storage
SUPABASE_S3_ACCESS_KEY_ID=your-s3-access-key
SUPABASE_S3_SECRET_ACCESS_KEY=your-s3-secret-key

# Razorpay (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## Troubleshooting

### Error: "Bucket not found"
- Make sure you've created all required buckets in Supabase Storage
- Bucket names must match exactly: products, slides, blogs, assets, pages

### Error: "Access denied"
- Check that your S3 credentials are correct
- Make sure the buckets are set to "Public"

### Error: "Storage not configured"
- Add SUPABASE_S3_ACCESS_KEY_ID and SUPABASE_S3_SECRET_ACCESS_KEY to .env.local
- Restart the development server after adding variables
