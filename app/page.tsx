'use client'

import { HomePageProvider } from '@/contexts/HomePageContext'
import {
  HeroSlider,
  CategoriesSection,
  FeaturedProducts,
  TestimonialsSection,
  ReelsSection,
  BlogSection,
  NewsletterSection,
} from '@/components/home'

export default function HomePage() {
  return (
    <HomePageProvider>
    <div className="min-h-screen bg-cream-DEFAULT grain-overlay">
      {/* Hero Slider Section */}
        <HeroSlider />

      {/* Categories Section */}
        <CategoriesSection />

      {/* Featured Products Slider Section */}
        <FeaturedProducts />

      {/* Why Choose BodhOm & Testimonials Combined Section */}
        <TestimonialsSection />

        {/* Instagram & Reels Section */}
        <ReelsSection />

      {/* Latest Blogs Section */}
        <BlogSection />

      {/* Newsletter Section */}
        <NewsletterSection />
          </div>
    </HomePageProvider>
  )
}
