'use client'

import Link from 'next/link'
import { ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

// Mock product data - in a real app, this would come from a database
const featuredProducts = [
  {
    id: '1',
    name: 'Traditional Brass Diya Set',
    price: 1299,
    originalPrice: 1999,
    image: '/api/placeholder/400/400',
    rating: 4.5,
    reviews: 128,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Copper Water Pot (Tamra Lota)',
    price: 2499,
    originalPrice: 3499,
    image: '/api/placeholder/400/400',
    rating: 4.8,
    reviews: 89,
    badge: 'New',
  },
  {
    id: '3',
    name: 'Brass Pooja Thali Set',
    price: 1899,
    originalPrice: 2599,
    image: '/api/placeholder/400/400',
    rating: 4.6,
    reviews: 156,
    badge: 'Popular',
  },
  {
    id: '4',
    name: 'Handcrafted Brass Urli',
    price: 3499,
    originalPrice: 4999,
    image: '/api/placeholder/400/400',
    rating: 4.7,
    reviews: 203,
    badge: 'Featured',
  },
  {
    id: '5',
    name: 'Copper Kalash with Stand',
    price: 4299,
    originalPrice: 5999,
    image: '/api/placeholder/400/400',
    rating: 4.9,
    reviews: 67,
    badge: 'Premium',
  },
  {
    id: '6',
    name: 'Brass Ganesha Idol',
    price: 1599,
    originalPrice: 2299,
    image: '/api/placeholder/400/400',
    rating: 4.5,
    reviews: 312,
    badge: 'Best Seller',
  },
]

const categories = [
  { name: 'Brass Utensils', image: '/api/placeholder/300/300', count: 45 },
  { name: 'Copper Cookware', image: '/api/placeholder/300/300', count: 32 },
  { name: 'Pooja Items', image: '/api/placeholder/300/300', count: 67 },
  { name: 'Home Decor', image: '/api/placeholder/300/300', count: 28 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brass-gold via-primary-dark to-deep-maroon text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Traditional Craftsmanship
                <span className="block text-brass-gold">From Odisha</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Discover authentic handcrafted brass and copper products,
                preserving centuries of traditional artistry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="bg-white text-deep-maroon px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-deep-maroon transition-all duration-300 inline-flex items-center justify-center"
                >
                  Our Story
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brass-gold to-transparent opacity-50 rounded-3xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="aspect-square bg-white/20 rounded-2xl flex items-center justify-center">
                    <span className="text-8xl font-serif">ब</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-maroon mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our curated collections of traditional craftsmanship
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-brass-gold/20 to-primary-dark/20 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">🏺</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-brass-gold transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{category.count} items</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-b from-white to-sandstone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-maroon mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Handpicked traditional pieces crafted with love
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center text-brass-gold hover:text-primary-dark font-semibold"
            >
              View All
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="md:hidden inline-flex items-center bg-brass-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-maroon mb-4">
              Why Choose BodhOm
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-sandstone-beige to-white">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-2">Authentic Craftsmanship</h3>
              <p className="text-gray-600">
                Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-sandstone-beige to-white">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Enjoy free shipping on orders above ₹999 across India. Fast and secure delivery.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-sandstone-beige to-white">
              <div className="w-16 h-16 bg-brass-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-deep-maroon mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Quality-checked products with 7-day return policy. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deep-maroon to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Get exclusive offers and updates on new collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
            <button className="bg-brass-gold text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-light transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

