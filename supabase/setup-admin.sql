-- =====================================================
-- ADMIN USER SETUP SCRIPT
-- Run this AFTER you create a user in Supabase Auth
-- =====================================================

-- IMPORTANT: Before running this script:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add User" > "Create New User"
-- 4. Enter the admin email and password
-- 5. Copy the email used and update the INSERT statement below

-- Add admin user to admin_users table
-- Replace 'admin@bodhom.com' with your actual admin email
INSERT INTO admin_users (email, name, role, is_active)
VALUES (
  'admin@bodhom.com',  -- Change this to your admin email
  'Admin',              -- Change this to admin name
  'super_admin',
  true
)
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- Verify the admin user was created
SELECT * FROM admin_users WHERE email = 'admin@bodhom.com';

-- =====================================================
-- QUICK SETUP GUIDE
-- =====================================================
/*
1. Create auth user in Supabase Dashboard:
   - Go to Authentication > Users
   - Click "Add User" > "Create New User"
   - Enter email: admin@bodhom.com
   - Enter password: your-secure-password
   - Check "Auto Confirm User"
   - Click "Create User"

2. Run this SQL script in SQL Editor:
   - Update the email if different
   - Execute the INSERT statement

3. Login to your admin panel:
   - Go to /admin/login
   - Enter your credentials
*/

-- =====================================================
-- ADDITIONAL ADMIN USERS (Optional)
-- =====================================================
-- To add more admin users, use the same process:
-- 1. Create user in Supabase Auth
-- 2. Add entry to admin_users table:

/*
INSERT INTO admin_users (email, name, role, is_active)
VALUES ('another-admin@bodhom.com', 'Another Admin', 'admin', true);
*/

-- =====================================================
-- ADMIN ROLES
-- =====================================================
-- super_admin: Full access to everything
-- admin: Full access except user management
-- editor: Can manage content (products, blog, etc.)
-- viewer: Read-only access

