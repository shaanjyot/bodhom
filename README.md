# BodhOm - Traditional Brass & Copper Works E-commerce

A modern, elegant e-commerce website for traditional brass and copper works from Odisha, India. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Full E-commerce Functionality**
  - Product listings and categories
  - Shopping cart with persistent storage
  - Product detail pages
  - Responsive design

- 🔐 **Authentication System**
  - Email/password login and registration
  - OAuth integration (Google, GitHub)
  - Protected routes
  - User session management

- 🎨 **Beautiful Design**
  - Traditional Indian color scheme
  - Elegant typography with Playfair Display
  - Smooth animations and transitions
  - Mobile-responsive layout

- ⚡ **Performance**
  - Server-side rendering with Next.js
  - Optimized images
  - Fast page loads

## Color Scheme

- **Brass Gold**: `#B8860B` - Primary brand color
- **Deep Maroon**: `#800000` - Secondary color
- **Sacred Saffron**: `#FF9933` - Accent color
- **Bodhi Green**: `#2E8B57` - Success/positive actions
- **Sandstone Beige**: `#F5F5DC` - Background accents

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bodhom
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (if using Prisma)
DATABASE_URL=your-database-url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bodhom/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   └── ProductCard.tsx    # Product card component
├── store/                 # State management
│   └── cartStore.ts       # Shopping cart store
└── public/                # Static assets
```

## Key Pages

- `/` - Homepage with featured products
- `/products` - All products listing
- `/products/[id]` - Product detail page
- `/cart` - Shopping cart
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/oauth` - OAuth callback handler

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **NextAuth.js** - Authentication (ready for integration)

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  'brass-gold': '#B8860B',
  'deep-maroon': '#800000',
  // ... other colors
}
```

### Fonts

Fonts are configured in `app/layout.tsx` and `app/globals.css`. Currently using:
- **Inter** - Body text
- **Playfair Display** - Headings

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Future Enhancements

- [ ] Database integration (Prisma + PostgreSQL)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard
- [ ] Order management system
- [ ] User reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Search functionality
- [ ] Product filtering and sorting

## License

This project is private and proprietary.

## Contact

For questions or support, please contact info@bodhom.in

---

Made with ❤️ for traditional craftsmanship

