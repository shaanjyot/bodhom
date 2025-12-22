'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/store/cartStore'

interface MenuItem {
  id: string
  title: string
  url: string
  open_in_new_tab?: boolean
}

// Default menu items as fallback
const defaultMenuItems = [
  { id: '1', title: 'Home', url: '/' },
  { id: '2', title: 'Products', url: '/products' },
  { id: '3', title: 'Collections', url: '/collections' },
  { id: '4', title: 'About', url: '/about' },
  { id: '5', title: 'Contact', url: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems)
  const { items } = useCart()
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/menu-items?location=header')
        const data = await res.json()
        if (data.menuItems?.length > 0) {
          setMenuItems(data.menuItems)
        }
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    }
    fetchMenuItems()
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-br from-brass-gold to-primary-dark' 
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <span className="text-white font-serif text-2xl font-bold">ब</span>
            </div>
            <div>
              <h1 className={`text-2xl font-serif font-bold transition-colors duration-300 ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}>
                BodhOm
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                isScrolled ? 'text-charcoal-400' : 'text-white/80'
              }`}>
                Traditional Craftsmanship
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((link) => (
              <Link 
                key={link.id}
                href={link.url}
                target={link.open_in_new_tab ? '_blank' : undefined}
                rel={link.open_in_new_tab ? 'noopener noreferrer' : undefined}
                className={`font-medium transition-colors duration-300 animated-underline ${
                  isScrolled 
                    ? 'text-charcoal-500 hover:text-brass-gold' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search */}
            <button className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}>
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            <Link
              href="/auth/login"
              className={`hidden md:flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Account</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brass-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className={`py-4 border-t ${
            isScrolled 
              ? 'border-cream-200 bg-cream-100/95 backdrop-blur-md' 
              : 'border-white/20 bg-charcoal/95 backdrop-blur-md'
          }`}>
            <div className="flex flex-col space-y-1">
              {menuItems.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target={link.open_in_new_tab ? '_blank' : undefined}
                  rel={link.open_in_new_tab ? 'noopener noreferrer' : undefined}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    isScrolled 
                      ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className={`py-3 px-4 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isScrolled 
                    ? 'text-charcoal-500 hover:text-brass-gold hover:bg-cream-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Account</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
