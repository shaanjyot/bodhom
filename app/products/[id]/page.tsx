'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/store/cartStore'
import Link from 'next/link'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Mock product data - in a real app, fetch from API
  const product = {
    id: params.id as string,
    name: 'Traditional Brass Diya Set',
    price: 1299,
    originalPrice: 1999,
    images: ['/api/placeholder/600/600', '/api/placeholder/600/600', '/api/placeholder/600/600'],
    rating: 4.5,
    reviews: 128,
    description: 'This exquisite brass diya set is handcrafted by skilled artisans from Odisha. Made from pure brass, these diyas are perfect for your pooja rituals and home decoration. Each piece is carefully crafted to preserve traditional designs passed down through generations.',
    features: [
      'Made from pure brass',
      'Handcrafted by skilled artisans',
      'Traditional Odisha design',
      'Perfect for pooja and decoration',
      'Set of 5 pieces',
    ],
    specifications: {
      Material: 'Pure Brass',
      'Set Includes': '5 Diyas',
      'Dimensions': '4 inch each',
      'Weight': '500g',
      'Care Instructions': 'Clean with soft cloth, avoid harsh chemicals',
    },
    inStock: true,
    stockCount: 45,
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-brass-gold">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-brass-gold">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-gradient-to-br from-sandstone-beige to-white rounded-xl overflow-hidden mb-4 shadow-elegant">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl">🏺</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-brass-gold' : 'border-gray-200'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-sandstone-beige to-white flex items-center justify-center">
                    <span className="text-3xl">🏺</span>
                  </div>
                </button>
              ))}
            </div>
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

            <h1 className="text-4xl font-serif font-bold text-deep-maroon mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-sacred-saffron text-sacred-saffron'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-deep-maroon">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.inStock && (
                <p className="text-bodhi-green font-medium">
                  ✓ In Stock ({product.stockCount} available)
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-brass-gold mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 border-2 border-gray-300 rounded-lg hover:border-brass-gold transition-colors"
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-brass-gold to-primary-dark text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-dark hover:to-brass-gold transition-all duration-300 flex items-center justify-center gap-2 mb-4 shadow-lg hover:shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ₹{(product.price * quantity).toLocaleString()}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Free Shipping</p>
                <p className="text-xs text-gray-500">Above ₹999</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Safe</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-brass-gold mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Easy Returns</p>
                <p className="text-xs text-gray-500">7 Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white rounded-xl shadow-elegant p-8">
          <h2 className="text-2xl font-serif font-bold text-deep-maroon mb-6">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-semibold text-gray-700 w-40">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

