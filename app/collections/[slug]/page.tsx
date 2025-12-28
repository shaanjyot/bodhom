'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { ArrowLeft, Filter, Grid, List } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

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

export default function CollectionPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<ProductCardProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (slug) {
      fetchCategoryAndProducts()
    }
  }, [slug])

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true)
      
      // Fetch all categories to find the one matching the slug
      const categoriesRes = await fetch('/api/categories?active=true')
      const categoriesData = await categoriesRes.json()
      const foundCategory = categoriesData.categories?.find((cat: Category) => cat.slug === slug)
      
      if (foundCategory) {
        setCategory(foundCategory)
        
        // Fetch products for this category
        const productsRes = await fetch(`/api/products?active=true&category=${foundCategory.id}`)
        const productsData = await productsRes.json()
        
        if (productsData.products && Array.isArray(productsData.products)) {
          const mappedProducts: ProductCardProduct[] = productsData.products.map((product: BackendProduct) => {
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
          
          setProducts(mappedProducts)
          setTotal(productsData.total || mappedProducts.length)
        }
      }
    } catch (error) {
      console.error('Error fetching collection:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide2.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-brass-gold hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Collections</span>
          </Link>
          <div className="text-center">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">
              {category?.name || 'Collection'}
            </p>
            <div className="ethnic-title-wrapper">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold title-decorated animate-fade-in-up">
                {category?.name || 'Loading...'}
              </h1>
            </div>
            {category?.description && (
              <p className="text-xl text-cream-300 max-w-2xl mx-auto animate-fade-in-up stagger-2 mt-6">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and View Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-charcoal-400">
                Showing {products.length} {total > products.length ? `of ${total} ` : ''}products
              </span>
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
              <p className="text-charcoal-400">No products found in this collection.</p>
              <Link
                href="/collections"
                className="inline-block mt-4 text-brass-gold hover:text-primary-dark font-semibold animated-underline"
              >
                Browse All Collections
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

