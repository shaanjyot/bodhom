'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/store/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-brass-gold to-primary-dark p-2 rounded-lg">
              <span className="text-white font-serif text-2xl font-bold">ब</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-deep-maroon">BodhOm</h1>
              <p className="text-xs text-gray-600">Traditional Craftsmanship</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brass-gold font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-brass-gold font-medium transition-colors">
              Products
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-brass-gold font-medium transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brass-gold font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brass-gold font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="hidden md:block p-2 text-gray-700 hover:text-brass-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            <Link
              href="/auth/login"
              className="hidden md:flex items-center space-x-1 p-2 text-gray-700 hover:text-brass-gold transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Account</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-brass-gold transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-sacred-saffron text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-brass-gold transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/collections"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-brass-gold font-medium transition-colors px-2 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

