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
            <div className="aspect-square bg-gradient-to-br from-cream-200 to-cream-100 rounded-2xl overflow-hidden mb-4 shadow-soft">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl">🏺</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-brass-gold' : 'border-cream-300'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-cream-200 to-cream-100 flex items-center justify-center">
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
                      i < Math.floor(product.rating)
                        ? 'fill-brass-gold text-brass-gold'
                        : 'text-cream-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-charcoal-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-charcoal">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-charcoal-400 line-through">
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
            <p className="text-charcoal-500 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
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
              className="w-full btn-gold text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ₹{(product.price * quantity).toLocaleString()}
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
        <div className="mt-16 bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-semibold text-charcoal w-40">{key}:</span>
                <span className="text-charcoal-400">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

