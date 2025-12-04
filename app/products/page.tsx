'use client'

import ProductCard from '@/components/ProductCard'
import { Filter, Grid, List } from 'lucide-react'

// Mock products - in a real app, this would come from a database
const allProducts = [
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
  {
    id: '7',
    name: 'Copper Panchapatra Set',
    price: 2199,
    originalPrice: 2999,
    image: '/api/placeholder/400/400',
    rating: 4.4,
    reviews: 98,
  },
  {
    id: '8',
    name: 'Brass Oil Lamp (Deepam)',
    price: 899,
    originalPrice: 1299,
    image: '/api/placeholder/400/400',
    rating: 4.6,
    reviews: 145,
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide1.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Our Collection</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 animate-fade-in-up">
            All Products
          </h1>
          <p className="text-xl text-cream-300 animate-fade-in-up stagger-2">
            Discover our complete collection of traditional brass and copper works
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
            <span className="text-sm text-gray-600">
              Showing {allProducts.length} products
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Grid className="w-5 h-5 text-brass-gold" />
            </button>
            <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <List className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-gold text-white px-8 py-4 rounded-xl font-semibold">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}

