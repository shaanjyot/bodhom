'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react'
import { useHomePage, Product } from '@/contexts/HomePageContext'
import { useCart } from '@/store/cartStore'

// Product Card Component - Redesigned for better visibility
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const productImage = (product.thumbnail && product.thumbnail.trim()) || 
    (product.images && product.images.length > 0 && product.images[0]?.trim()) || 
    '/slide0.webp'
  
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: productImage,
    })
  }

  return (
    <Link 
      href={`/products/${product.id}`} 
      className="group block h-full"
    >
      <div 
        className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col border border-brass-gold/20 sm:border-2 hover:border-brass-gold/50"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image Container - Compact on mobile */}
        <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-gradient-to-br from-cream-100 to-cream-200">
          {/* Badges - Smaller on mobile */}
          {product.badge && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-5 lg:left-5 bg-gradient-to-r from-brass-gold to-amber-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold z-20 shadow-md sm:shadow-lg">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-5 lg:right-5 bg-gradient-to-r from-red-600 to-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold z-20 shadow-md sm:shadow-lg">
              -{discount}%
            </span>
          )}
          
          {/* Wishlist Button - Hidden on very small screens */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
            className="absolute top-10 right-2 sm:top-14 sm:right-3 lg:top-20 lg:right-5 z-20 p-1.5 sm:p-2 lg:p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md sm:shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 hidden sm:block"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-6 lg:h-6 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-400 hover:text-red-500'}`} />
          </button>
          
          {/* Product Image */}
          <div className="relative w-full h-full">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 sm:border-3 lg:border-4 border-brass-gold/30 border-t-brass-gold rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={productImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              priority={index < 4}
            />
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
          
          {/* Quick Add Button - Hidden on mobile, visible on hover for larger screens */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 bg-brass-gold hover:bg-brass-gold-dark text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-8 lg:py-3 rounded-full font-semibold flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg sm:shadow-xl text-[10px] sm:text-xs lg:text-base hidden sm:flex"
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            <span>Quick Add</span>
          </button>
        </div>

        {/* Product Info - Compact on mobile */}
        <div className="p-2.5 sm:p-4 lg:p-6 xl:p-8 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="font-serif text-xs sm:text-sm lg:text-xl xl:text-2xl font-bold text-charcoal mb-1 sm:mb-2 lg:mb-3 group-hover:text-brass-gold transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Rating - Compact on mobile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 mb-1.5 sm:mb-3 lg:mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 lg:w-5 lg:h-5 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-xs lg:text-base text-charcoal-400 font-medium">
              ({product.reviews_count || 0})
            </span>
          </div>

          {/* Price - Compact on mobile */}
          <div className="flex items-baseline gap-1 sm:gap-2 lg:gap-3 mb-2 sm:mb-4 lg:mb-5">
            <span className="text-sm sm:text-lg lg:text-3xl xl:text-4xl font-bold text-brass-gold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-[10px] sm:text-sm lg:text-lg text-charcoal-400 line-through">
                ₹{product.original_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* View Details Button - Smaller on mobile */}
          <button
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/products/${product.id}`
            }}
            className="w-full bg-gradient-to-r from-charcoal to-charcoal-700 hover:from-brass-gold hover:to-amber-600 text-white py-1.5 sm:py-2.5 lg:py-4 px-2 sm:px-4 lg:px-6 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-1 sm:gap-2 lg:gap-3 transition-all duration-300 group/btn text-[10px] sm:text-sm lg:text-lg mt-auto shadow-sm sm:shadow-md hover:shadow-xl"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </Link>
  )
}

// Loading Skeleton - Compact on mobile
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-md sm:shadow-lg overflow-hidden h-full flex flex-col border border-brass-gold/10 sm:border-2 animate-pulse">
      <div className="aspect-square sm:aspect-[4/5] bg-gradient-to-br from-cream-100 to-cream-200"></div>
      <div className="p-2.5 sm:p-4 lg:p-6 xl:p-8 flex-1 flex flex-col">
        <div className="h-4 sm:h-6 lg:h-8 bg-cream-200 rounded-lg mb-1.5 sm:mb-3"></div>
        <div className="h-3 sm:h-4 lg:h-5 bg-cream-200 rounded w-2/3 mb-2 sm:mb-4"></div>
        <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-cream-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-5 sm:h-8 lg:h-10 bg-cream-200 rounded-lg w-1/2 mb-2 sm:mb-4"></div>
        <div className="h-8 sm:h-12 lg:h-14 bg-cream-200 rounded-lg sm:rounded-xl mt-auto"></div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const { featuredProducts, loading } = useHomePage()
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(4)
  const [isInitialized, setIsInitialized] = useState(false)

  // Calculate slides per view based on screen size
  useEffect(() => {
    const calculateSlidesPerView = () => {
      const width = window.innerWidth
      if (width < 480) return 2        // Extra small mobile: 2 smaller products
      if (width < 640) return 2        // Mobile: 2 smaller products
      if (width < 768) return 2        // Small tablet: 2 products
      if (width < 1024) return 3       // Tablet: 3 products
      if (width < 1280) return 3       // Small desktop: 3 products
      if (width < 1536) return 4       // Desktop: 4 products
      return 4                          // Large desktop: 4 products
    }

    const handleResize = () => {
      setSlidesPerView(calculateSlidesPerView())
    }

    // Initial calculation
    if (typeof window !== 'undefined') {
      handleResize()
      setIsInitialized(true)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, featuredProducts.length - slidesPerView)

  // Auto-scroll
  useEffect(() => {
    if (featuredProducts.length === 0 || maxIndex <= 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredProducts.length, maxIndex])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // Calculate gap based on screen size
  const getGap = () => {
    if (typeof window === 'undefined') return 16
    const width = window.innerWidth
    if (width < 480) return 12
    if (width < 640) return 16
    if (width < 1024) return 20
    return 24
  }
  
  const gap = getGap()
  const slideWidthPercent = 100 / slidesPerView

  return (
    <section className="py-10 sm:py-14 md:py-18 lg:py-24 bg-gradient-to-b from-[#8B1538] via-[#7A1230] to-[#6B0F2A] relative overflow-hidden">
      {/* Background Pattern - Brighter Golden Animated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated rotating pattern layer */}
        <div className="absolute inset-0 opacity-40 animate-[spin_120s_linear_infinite]">
          <svg className="w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="featuredBgPattern1" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
                <circle cx="50" cy="50" r="30" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.5"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4"/>
                <circle cx="50" cy="50" r="4" fill="#FFD700" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#featuredBgPattern1)"/>
          </svg>
        </div>
        {/* Static pattern layer for depth */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="featuredBgPattern2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.5"/>
                <circle cx="40" cy="40" r="8" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>
                <circle cx="40" cy="40" r="3" fill="#D4AF37" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#featuredBgPattern2)"/>
          </svg>
        </div>
        {/* Floating golden particles */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-brass-gold rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-brass-gold rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-amber-300 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#6B0F2A]/50"></div>
      </div>
      
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-6 lg:mb-0">
            <p className="text-brass-gold font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base">
              Handpicked for You
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight">
              Featured Products
            </h2>
            <p className="text-cream-200/80 text-base sm:text-lg lg:text-xl mt-3 sm:mt-4 max-w-xl">
              Discover our finest handcrafted brass and copper treasures
            </p>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex === 0
                  ? 'bg-white/10 cursor-not-allowed opacity-50'
                  : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-brass-gold/30 hover:border-brass-gold'
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIndex >= maxIndex
                  ? 'bg-white/10 cursor-not-allowed opacity-50'
                  : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-brass-gold/30 hover:border-brass-gold'
              }`}
              aria-label="Next products"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            </button>
            
            {/* View All Link - Desktop */}
            <Link
              href="/products"
              className="hidden lg:flex items-center gap-2 text-brass-gold hover:text-white font-semibold text-lg ml-4 transition-colors group"
            >
              View All
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Products Slider */}
        <div className="overflow-hidden" ref={sliderRef}>
          {!isInitialized || loading ? (
            // Loading State
            <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
              slidesPerView === 1 ? 'grid-cols-1' :
              slidesPerView === 2 ? 'grid-cols-2' :
              slidesPerView === 3 ? 'grid-cols-3' :
              'grid-cols-4'
            }`}>
              {[...Array(slidesPerView)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            // Empty State
            <div className="text-center py-16 lg:py-20">
              <p className="text-cream-200 text-lg lg:text-xl">No featured products available.</p>
            </div>
          ) : (
            // Products Grid/Slider
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
                gap: `${gap}px`,
                marginRight: `-${gap}px`
              }}
            >
              {featuredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc(${slideWidthPercent}% - ${gap * (slidesPerView - 1) / slidesPerView}px)`,
                  }}
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Dots - Hidden on small screens */}
        {featuredProducts.length > slidesPerView && (
          <div className="hidden sm:flex justify-center items-center gap-1.5 md:gap-2 mt-8 lg:mt-10">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-5 lg:w-8 h-1 lg:h-1.5 bg-brass-gold rounded-full' 
                    : 'w-1.5 lg:w-2 h-1.5 lg:h-2 bg-white/40 hover:bg-white/70 rounded-full'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Button - Mobile */}
        <div className="text-center mt-10 sm:mt-12 lg:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-brass-gold to-amber-500 hover:from-amber-500 hover:to-brass-gold text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all text-base sm:text-lg"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
