'use client'

import ProductCard from '@/components/ProductCard'
import { Filter, Grid, List } from 'lucide-react'
import { useState, useEffect } from 'react'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductCardProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?active=true')
        const data = await response.json()
        
        if (data.products && Array.isArray(data.products)) {
          // Map backend products to ProductCard format
          const mappedProducts: ProductCardProduct[] = data.products.map((product: BackendProduct) => {
            // Get image: use thumbnail if available, otherwise first image from images array, fallback to placeholder
            let imageUrl = '/slide0.webp' // fallback
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
          
          setProducts(mappedProducts)
          setTotal(data.total || mappedProducts.length)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow">
                <Filter className="w-5 h-5 text-charcoal-400" />
                <span className="text-sm font-medium text-charcoal">Filters</span>
              </button>
              <span className="text-sm text-charcoal-400">
                Showing {products.length} {total > products.length ? `of ${total} ` : ''}products
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow">
                <Grid className="w-5 h-5 text-brass-gold" />
              </button>
              <button className="p-2 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-shadow">
                <List className="w-5 h-5 text-charcoal-300" />
              </button>
            </div>
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
