'use client'

import ProductCard from '@/components/ProductCard'
import { Filter } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface BackendProduct {
  id: string
  name: string
  price: number
  original_price?: number
  thumbnail?: string
  images?: string[]
  rating?: number
  reviews_count?: number
  badge?: string
}

interface ProductCardProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<ProductCardProduct[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || '')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, priceRange, sortBy, sortOrder, searchQuery])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?active=true')
      const data = await res.json()
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      params.set('active', 'true')
      if (selectedCategory) params.set('category', selectedCategory)
      if (priceRange.min) params.set('minPrice', priceRange.min)
      if (priceRange.max) params.set('maxPrice', priceRange.max)
      if (sortBy) params.set('sortBy', sortBy)
      if (sortOrder) params.set('sortOrder', sortOrder)
      if (searchQuery) params.set('search', searchQuery)

      const response = await fetch(`/api/products?${params.toString()}`)
      const data = await response.json()
      
      if (data.products && Array.isArray(data.products)) {
        let mappedProducts: ProductCardProduct[] = data.products.map((product: BackendProduct) => {
          let imageUrl = '/slide0.webp'
          if (product.thumbnail && product.thumbnail.trim()) {
            imageUrl = product.thumbnail.trim()
          } else if (product.images && product.images.length > 0 && product.images[0]?.trim()) {
            imageUrl = product.images[0].trim()
          }

          return {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            originalPrice: product.original_price ? Number(product.original_price) : undefined,
            image: imageUrl,
            rating: product.rating ? Number(product.rating) : 0,
            reviews: product.reviews_count || 0,
            badge: product.badge,
          }
        })

        // Client-side price filtering if API doesn't support it
        if (priceRange.min || priceRange.max) {
          mappedProducts = mappedProducts.filter(p => {
            const price = p.price
            if (priceRange.min && price < Number(priceRange.min)) return false
            if (priceRange.max && price > Number(priceRange.max)) return false
            return true
          })
        }
        
        setProducts(mappedProducts)
        setTotal(data.total || mappedProducts.length)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setPriceRange({ min: '', max: '' })
    setSortBy('created_at')
    setSortOrder('desc')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide1.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Our Collection</p>
          <div className="ethnic-title-wrapper">
            <h1 className="text-5xl md:text-6xl font-serif font-bold title-decorated animate-fade-in-up">
              All Products
            </h1>
          </div>
          <p className="text-xl text-cream-300 animate-fade-in-up stagger-2 mt-6">
            Discover our complete collection of traditional brass and copper works
          </p>
        </div>
      </section>

      <div className="section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Filters and View Toggle */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow"
                >
                  <Filter className="w-5 h-5 text-charcoal-400" />
                  <span className="text-sm font-medium text-charcoal">Filters</span>
                </button>
                <span className="text-sm text-charcoal-400">
                  Showing {products.length} {total > products.length ? `of ${total} ` : ''}products
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-')
                    setSortBy(sort)
                    setSortOrder(order)
                  }}
                  className="px-4 py-2 bg-white rounded-xl shadow-soft border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brass-gold text-sm"
                >
                  <option value="created_at-desc">Newest First</option>
                  <option value="created_at-asc">Oldest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-white rounded-xl shadow-soft p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Min Price (₹)</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Max Price (₹)</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="No limit"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-charcoal-400 hover:text-charcoal font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-soft animate-pulse">
                  <div className="aspect-square bg-cream-200"></div>
                  <div className="p-5">
                    <div className="h-4 bg-cream-200 rounded mb-2"></div>
                    <div className="h-4 bg-cream-200 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-cream-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal-400">No products found.</p>
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-gold text-white px-8 py-4 rounded-xl font-semibold">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
