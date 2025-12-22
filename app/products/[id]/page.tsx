'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import Link from 'next/link'
import Image from 'next/image'

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
  description: string
  features?: string[]
  specifications?: Record<string, any>
  stock_quantity?: number
  is_active?: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<BackendProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        } else if (data.product) {
          setProduct(data.product)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold mx-auto mb-4"></div>
          <p className="text-charcoal-400">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT flex items-center justify-center">
        <div className="text-center">
          <p className="text-charcoal-400 mb-4">{error || 'Product not found'}</p>
          <Link href="/products" className="btn-gold text-white px-6 py-3 rounded-xl font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  // Prepare images array: use thumbnail first, then images array, with fallback
  const productImages: string[] = []
  if (product.thumbnail && product.thumbnail.trim()) {
    productImages.push(product.thumbnail.trim())
  }
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => {
      if (img && img.trim() && !productImages.includes(img.trim())) {
        productImages.push(img.trim())
      }
    })
  }
  // If no images, add placeholder
  if (productImages.length === 0) {
    productImages.push('/slide0.webp')
  }

  const mainImage = productImages[selectedImage] || productImages[0]
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0
  const inStock = product.is_active && (product.stock_quantity === undefined || product.stock_quantity > 0)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: mainImage,
    })
  }

  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm">
            <Link href="/" className="text-cream-300 hover:text-brass-gold transition-colors">Home</Link>
            <span className="mx-2 text-cream-400">/</span>
            <Link href="/products" className="text-cream-300 hover:text-brass-gold transition-colors">Products</Link>
            <span className="mx-2 text-cream-400">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-cream-200 to-cream-100 rounded-2xl overflow-hidden mb-4 shadow-soft relative">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.src = '/slide0.webp'
                }}
              />
            </div>
            {productImages.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors relative ${
                      selectedImage === index ? 'border-brass-gold' : 'border-cream-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/slide0.webp'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {discount > 0 && (
                <span className="inline-block bg-bodhi-green text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {discount}% OFF
                </span>
              )}
            </div>

            <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'fill-brass-gold text-brass-gold'
                        : 'text-cream-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-charcoal-400">
                {product.rating || 0} ({product.reviews_count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-charcoal">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-xl text-charcoal-400 line-through">
                    ₹{Number(product.original_price).toLocaleString()}
                  </span>
                )}
              </div>
              {inStock && (
                <p className="text-bodhi-green font-medium">
                  ✓ In Stock {product.stock_quantity !== undefined && `(${product.stock_quantity} available)`}
                </p>
              )}
              {!inStock && (
                <p className="text-red-500 font-medium">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-charcoal-500 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-charcoal mb-3">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-brass-gold mr-2">✓</span>
                      <span className="text-charcoal-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-cream-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-cream-100 transition-colors rounded-l-lg"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-cream-100 transition-colors rounded-r-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border-2 border-cream-300 rounded-xl hover:border-brass-gold transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-400'}`} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4 ${
                inStock 
                  ? 'btn-gold text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {inStock 
                ? `Add to Cart - ₹${(Number(product.price) * quantity).toLocaleString()}`
                : 'Out of Stock'
              }
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cream-300">
              <div className="text-center">
                <Truck className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-charcoal">Free Shipping</p>
                <p className="text-xs text-charcoal-400">Above ₹999</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-charcoal">Secure Payment</p>
                <p className="text-xs text-charcoal-400">100% Safe</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-charcoal">Easy Returns</p>
                <p className="text-xs text-charcoal-400">7 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-soft p-8">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="font-semibold text-charcoal w-40">{key}:</span>
                  <span className="text-charcoal-400">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

