'use client'

import { useCart } from '@/store/cartStore'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart()
  const total = getTotal()
  const shipping = total > 999 ? 0 : 99
  const finalTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT">
        {/* Hero Section */}
        <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Your Selection</p>
            <h1 className="text-5xl md:text-6xl font-serif font-bold animate-fade-in-up">
              Shopping Cart
            </h1>
          </div>
        </section>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="w-24 h-24 text-cream-400 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
            Your cart is empty
          </h2>
          <p className="text-charcoal-400 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center btn-gold text-white px-8 py-4 rounded-xl font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Your Selection</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold animate-fade-in-up">
            Shopping Cart
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-soft p-6 flex flex-col sm:flex-row gap-6"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-sandstone-beige to-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl">🏺</span>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-serif font-semibold text-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xl font-bold text-charcoal mb-4">
                    ₹{item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-lg font-bold text-charcoal">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft-lg p-6 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-charcoal-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-charcoal">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal-400">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-bodhi-green">Free</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                {total < 999 && (
                  <p className="text-sm text-bodhi-green">
                    Add ₹{(999 - total).toLocaleString()} more for free shipping!
                  </p>
                )}
                <div className="border-t border-cream-300 pt-4">
                  <div className="flex justify-between text-xl font-bold text-charcoal">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full btn-gold text-white py-4 px-6 rounded-xl font-semibold text-center mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full text-center text-brass-gold hover:text-primary-dark font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

