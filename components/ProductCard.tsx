'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  badge?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-sandstone-beige to-white overflow-hidden">
          {product.badge && (
            <span className="absolute top-4 left-4 bg-sacred-saffron text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-bodhi-green text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
              -{discount}%
            </span>
          )}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brass-gold/10 to-primary-dark/10">
            <span className="text-6xl">🏺</span>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brass-gold transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-sacred-saffron text-sacred-saffron'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-deep-maroon">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-brass-gold to-primary-dark text-white py-3 px-4 rounded-lg font-semibold hover:from-primary-dark hover:to-brass-gold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

