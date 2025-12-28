-- =====================================================
-- ADD AVATAR FIELD TO TESTIMONIALS TABLE
-- Run this in your Supabase SQL Editor if avatar field is missing
-- =====================================================

-- Add avatar column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'testimonials' 
    AND column_name = 'avatar'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN avatar TEXT;
    RAISE NOTICE 'Avatar column added to testimonials table';
  ELSE
    RAISE NOTICE 'Avatar column already exists in testimonials table';
  END IF;
END $$;

