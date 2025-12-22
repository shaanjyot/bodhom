'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ArrowLeft, Star, Heart, Quote, ChevronLeft, ChevronRight, Calendar, Clock, User, Hammer, Truck, Award } from 'lucide-react'
import { useCart } from '@/store/cartStore'

// Fallback data for initial render or when API fails
const fallbackSlides = [
  {
    id: '1',
    image: '/slide0.webp',
    title: 'Ancient Artistry',
    subtitle: 'From the Heart of Odisha',
    description: 'Discover handcrafted brass and copper treasures, each piece telling a story of centuries-old tradition.',
  },
]

const fallbackCategories = [
  { id: '1', name: 'Brass Utensils', image: '/slide4.webp', slug: 'brass-utensils' },
  { id: '2', name: 'Copper Cookware', image: '/slide5.webp', slug: 'copper-cookware' },
  { id: '3', name: 'Pooja Items', image: '/slide6.webp', slug: 'pooja-items' },
  { id: '4', name: 'Home Decor', image: '/slide7.webp', slug: 'home-decor' },
]

// Types for API data
interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  button_text?: string
  button_link?: string
}

interface Product {
  id: string
  name: string
  price: number
  original_price?: number
  thumbnail?: string
  images?: string[]
  rating?: number
  reviews_count?: number
  badge?: string
  slug?: string
}

interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

interface Testimonial {
  id: string
  name: string
  location: string
  initials: string
  rating: number
  text: string
  product: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image?: string
  category: string
  author: string
  published_at?: string
  read_time: string
}

// Product Card Component
function ProductCard({ product, index }: { product: Product, index: number }) {
  const { addItem } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const productImage = (product.thumbnail && product.thumbnail.trim()) || (product.images && product.images.length > 0 && product.images[0]?.trim()) || '/slide0.webp'
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
    <Link href={`/products/${product.id}`} className="group product-slide">
      <div 
        className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden card-glow"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          {product.badge && (
            <span className="absolute top-4 left-4 bg-brass-gold text-white px-3 py-1 rounded-full text-xs font-semibold z-10 animate-fade-in">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-charcoal text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
              -{discount}%
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
            className="absolute top-14 right-4 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-cream-100"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal-400'}`} />
          </button>
          <div className="relative w-full h-full">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5">
          <h3 className="font-serif text-base md:text-lg font-semibold text-charcoal mb-2 group-hover:text-brass-gold transition-colors line-clamp-2 min-h-[3rem] md:min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-brass-gold text-brass-gold'
                      : 'text-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-charcoal-400">
              {product.rating || 0} ({product.reviews_count || 0})
            </span>
          </div>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/products/${product.id}`
            }}
            className="w-full btn-gold text-white py-2.5 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:gap-3 group/btn"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [productSlideIndex, setProductSlideIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  
  // Dynamic data from API
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackSlides as HeroSlide[])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch all data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesRes, productsRes, categoriesRes, testimonialsRes, blogRes] = await Promise.all([
          fetch('/api/slides'),
          fetch('/api/products?featured=true&limit=6'),
          fetch('/api/categories'),
          fetch('/api/testimonials'),
          fetch('/api/blog?limit=3'),
        ])

        const [slidesData, productsData, categoriesData, testimonialsData, blogData] = await Promise.all([
          slidesRes.json(),
          productsRes.json(),
          categoriesRes.json(),
          testimonialsRes.json(),
          blogRes.json(),
        ])

        if (slidesData.slides?.length > 0) {
          setHeroSlides(slidesData.slides)
        }
        if (productsData.products?.length > 0) {
          setFeaturedProducts(productsData.products)
        }
        if (categoriesData.categories?.length > 0) {
          setCategories(categoriesData.categories)
        }
        if (testimonialsData.testimonials?.length > 0) {
          setTestimonials(testimonialsData.testimonials)
        }
        if (blogData.posts?.length > 0) {
          setBlogPosts(blogData.posts)
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Auto-advance hero slider
  useEffect(() => {
    if (heroSlides.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Handle responsive slides per view - more items on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(2.2) // Show 2.2 items on mobile for scrolling effect
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxProductSlide = Math.max(0, featuredProducts.length - slidesPerView)
  
  // Auto-scroll product slider
  useEffect(() => {
    const currentMaxSlide = Math.max(0, featuredProducts.length - slidesPerView)
    if (featuredProducts.length === 0 || currentMaxSlide <= 0) return
    const timer = setInterval(() => {
      setProductSlideIndex((prev) => {
        if (prev >= currentMaxSlide) {
          return 0 // Reset to start
        }
        return prev + 1
      })
    }, 4000) // Auto-scroll every 4 seconds
    return () => clearInterval(timer)
  }, [featuredProducts.length, slidesPerView])

  const nextProductSlide = useCallback(() => {
    setProductSlideIndex((prev) => Math.min(prev + 1, maxProductSlide))
  }, [maxProductSlide])

  const prevProductSlide = useCallback(() => {
    setProductSlideIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  return (
    <div className="min-h-screen bg-cream-DEFAULT grain-overlay">
      {/* Hero Slider Section */}
      <section className="hero-slider relative">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent"></div>
          </div>
        ))}
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container-elegant">
            <div className="max-w-2xl text-white">
              <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in-down">
                {heroSlides[currentSlide].subtitle}
              </p>
              <h1 
                key={`title-${currentSlide}`}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up"
              >
                {heroSlides[currentSlide].title}
              </h1>
              <p 
                key={`desc-${currentSlide}`}
                className="text-xl md:text-2xl text-cream-200 mb-8 animate-fade-in-up stagger-2"
              >
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
                <Link
                  href="/products"
                  className="btn-gold text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center justify-center"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-charcoal transition-all duration-300 inline-flex items-center justify-center backdrop-blur-sm"
                >
                  Our Heritage
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation - Hidden on mobile to prevent text overlap */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="slider-arrow absolute left-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex md:items-center md:justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-charcoal" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="slider-arrow absolute right-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex md:items-center md:justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-charcoal" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-cream-100 relative overflow-hidden">
        {/* Animated Tribal Pattern Background */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="tribal-pattern-scroll absolute inset-0 w-full" style={{ height: '200%' }}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="none">
              <defs>
                <pattern id="tribalPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  {/* Central Mandala/Dhokra inspired motif */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="25" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="15" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="5" fill="#8B6914"/>
                  
                  {/* Radiating tribal lines */}
                  <line x1="50" y1="15" x2="50" y2="0" stroke="#8B6914" strokeWidth="1.5"/>
                  <line x1="50" y1="85" x2="50" y2="100" stroke="#8B6914" strokeWidth="1.5"/>
                  <line x1="15" y1="50" x2="0" y2="50" stroke="#8B6914" strokeWidth="1.5"/>
                  <line x1="85" y1="50" x2="100" y2="50" stroke="#8B6914" strokeWidth="1.5"/>
                  
                  {/* Diagonal tribal accents */}
                  <line x1="25" y1="25" x2="15" y2="15" stroke="#8B6914" strokeWidth="1"/>
                  <line x1="75" y1="25" x2="85" y2="15" stroke="#8B6914" strokeWidth="1"/>
                  <line x1="25" y1="75" x2="15" y2="85" stroke="#8B6914" strokeWidth="1"/>
                  <line x1="75" y1="75" x2="85" y2="85" stroke="#8B6914" strokeWidth="1"/>
                  
                  {/* Dhokra-style decorative elements */}
                  <path d="M50 20 L55 30 L50 25 L45 30 Z" fill="#8B6914"/>
                  <path d="M50 80 L55 70 L50 75 L45 70 Z" fill="#8B6914"/>
                  <path d="M20 50 L30 45 L25 50 L30 55 Z" fill="#8B6914"/>
                  <path d="M80 50 L70 45 L75 50 L70 55 Z" fill="#8B6914"/>
                  
                  {/* Corner dots - tribal style */}
                  <circle cx="10" cy="10" r="3" fill="#8B6914"/>
                  <circle cx="90" cy="10" r="3" fill="#8B6914"/>
                  <circle cx="10" cy="90" r="3" fill="#8B6914"/>
                  <circle cx="90" cy="90" r="3" fill="#8B6914"/>
                  
                  {/* Small decorative rings */}
                  <circle cx="50" cy="10" r="4" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <circle cx="50" cy="90" r="4" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <circle cx="10" cy="50" r="4" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <circle cx="90" cy="50" r="4" fill="none" stroke="#8B6914" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tribalPattern)"/>
            </svg>
          </div>
        </div>
        
        {/* Full-width Sacred Geometry Strap - Outside container for full viewport width */}
        <div className="w-screen relative mb-14 z-20" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
          <p className="text-charcoal font-semibold tracking-widest uppercase mb-3 text-center text-lg">Curated Collections</p>
          {/* Sacred Geometry Pattern Strap */}
          <div className="relative w-full bg-cream-100 py-6 overflow-hidden">
            {/* Top Border - Dense Leaf/Vine Motifs */}
            <div className="absolute top-0 left-0 right-0 h-3 border-b border-brass-gold/30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                <defs>
                  <pattern id="topBorderPattern" x="0" y="0" width="30" height="12" patternUnits="userSpaceOnUse">
                    <path d="M5 6 L8 3 L10 6 L8 9 Z" fill="#C9A227" opacity="0.9"/>
                    <path d="M15 6 L18 3 L20 6 L18 9 Z" fill="#C9A227" opacity="0.9"/>
                    <path d="M25 6 L28 3 L30 6 L28 9 Z" fill="#C9A227" opacity="0.9"/>
                    <circle cx="10" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                    <circle cx="20" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topBorderPattern)"/>
              </svg>
            </div>
            
            {/* Main Pattern Band - Dense with Circles, Chakras, and Multi-patterns */}
            <div className="absolute top-3 left-0 right-0 h-16 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 64" preserveAspectRatio="none">
                <defs>
                  <pattern id="mainPatternBand" x="0" y="0" width="80" height="64" patternUnits="userSpaceOnUse">
                    {/* Central Chakra Circle */}
                    <g transform="translate(40, 32)">
                      <circle cx="0" cy="0" r="12" fill="none" stroke="#C9A227" strokeWidth="1.8"/>
                      <circle cx="0" cy="0" r="8" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                      <circle cx="0" cy="0" r="4" fill="#C9A227"/>
                      {/* 8 Petals around chakra */}
                      <ellipse cx="0" cy="-10" rx="2" ry="6" fill="#C9A227"/>
                      <ellipse cx="7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(45)"/>
                      <ellipse cx="10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(90)"/>
                      <ellipse cx="7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(135)"/>
                      <ellipse cx="0" cy="10" rx="2" ry="6" fill="#C9A227" transform="rotate(180)"/>
                      <ellipse cx="-7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(225)"/>
                      <ellipse cx="-10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(270)"/>
                      <ellipse cx="-7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(315)"/>
                    </g>
                    {/* Left Side - Nested Circles */}
                    <g transform="translate(10, 32)">
                      <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                      <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Right Side - Nested Circles */}
                    <g transform="translate(70, 32)">
                      <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                      <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Top Scroll Motifs */}
                    <g transform="translate(20, 16)">
                      <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    <g transform="translate(48, 16)">
                      <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Bottom Scroll Motifs */}
                    <g transform="translate(20, 48)">
                      <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    <g transform="translate(48, 48)">
                      <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Small decorative circles */}
                    <circle cx="15" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="65" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="15" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="65" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mainPatternBand)"/>
              </svg>
            </div>
            
            {/* Title in Center - with solid background above pattern */}
            <div className="relative z-20 flex items-center justify-center h-16">
              <div className="bg-cream-100 px-10 py-3 rounded-lg shadow-lg border-2 border-brass-gold/20">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
              Shop by Category
            </h2>
              </div>
            </div>
            
            {/* Lower Border - Dense Chain-like Diamond Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-3 border-t border-brass-gold/30 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                <defs>
                  <pattern id="bottomBorderPattern" x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                    <path d="M12.5 0 L20 6 L12.5 12 L5 6 Z" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                    <line x1="12.5" y1="0" x2="12.5" y2="12" stroke="#C9A227" strokeWidth="1"/>
                    <line x1="5" y1="6" x2="20" y2="6" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="12.5" cy="6" r="1.5" fill="#C9A227" opacity="0.8"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bottomBorderPattern)"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="container-elegant relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {categories.map((category, index) => (
              <Link
                key={category.id || index}
                href={`/collections/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-visible aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative Border Frame - Enhanced for Mobile Visibility */}
                <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                  {/* Top Border - Thicker on mobile */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`categoryTopBorder${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <line x1="0" y1="6" x2="3" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                          <line x1="22" y1="6" x2="25" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#categoryTopBorder${index})`}/>
                    </svg>
                  </div>
                  
                  {/* Right Border */}
                  <div className="absolute top-0 right-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`categoryRightBorder${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <line x1="6" y1="0" x2="6" y2="3" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                          <line x1="6" y1="22" x2="6" y2="25" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#categoryRightBorder${index})`}/>
                    </svg>
                  </div>
                  
                  {/* Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`categoryBottomBorder${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 9 L11 6 L7 3 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 9 L22 6 L18 3 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <line x1="0" y1="6" x2="3" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                          <line x1="22" y1="6" x2="25" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#categoryBottomBorder${index})`}/>
                    </svg>
                  </div>
                  
                  {/* Left Border */}
                  <div className="absolute top-0 left-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`categoryLeftBorder${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <line x1="6" y1="0" x2="6" y2="3" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                          <line x1="6" y1="22" x2="6" y2="25" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#categoryLeftBorder${index})`}/>
                    </svg>
                  </div>
                  
                  {/* Corner Decorations - Larger and more visible */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                      <circle cx="8" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="8" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                      <circle cx="8" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="8" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                      <circle cx="8" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="8" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                      <circle cx="8" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="8" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="8" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                      <circle cx="32" cy="32" r="2" fill="#C9A227" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                
                {/* Category Card Content */}
                <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 aspect-square border-2 border-brass-gold/30 bg-white">
                <Image
                  src={category.image || `/slide${index + 4}.webp`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10">
                    <h3 className="text-base md:text-xl font-serif font-semibold mb-1 group-hover:text-brass-gold transition-colors">
                    {category.name}
                  </h3>
                </div>
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Slider Section */}
      <section className="py-20 bg-cream-DEFAULT relative overflow-hidden">
        {/* Animated Mandala Pattern - Pulsing Wave Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="tribal-pattern-pulse absolute inset-0 opacity-[0.06]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="productMandalaPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                  {/* Large central mandala */}
                  <g transform="translate(90,90)">
                    {/* Outer ornate ring */}
                    <circle cx="0" cy="0" r="70" fill="none" stroke="#8B6914" strokeWidth="1" strokeDasharray="8 4"/>
                    <circle cx="0" cy="0" r="60" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="50" fill="none" stroke="#8B6914" strokeWidth="1"/>
                    
                    {/* 12 petals radiating outward */}
                    <g transform="rotate(0)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(30)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(60)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(90)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(120)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(150)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(180)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(210)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(240)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(270)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(300)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    <g transform="rotate(330)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#8B6914" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#8B6914" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#8B6914"/></g>
                    
                    {/* Inner decorative rings */}
                    <circle cx="0" cy="0" r="35" fill="none" stroke="#8B6914" strokeWidth="1" strokeDasharray="4 2"/>
                    <circle cx="0" cy="0" r="25" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#8B6914" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="5" fill="#8B6914"/>
                    
                    {/* 8 radiating spokes */}
                    <line x1="0" y1="0" x2="35" y2="0" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="24.7" y2="24.7" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="0" y2="35" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-24.7" y2="24.7" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-35" y2="0" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-24.7" y2="-24.7" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="0" y2="-35" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="24.7" y2="-24.7" stroke="#8B6914" strokeWidth="0.5" opacity="0.5"/>
                  </g>
                  
                  {/* Corner tribal knots */}
                  <g fill="none" stroke="#8B6914" strokeWidth="1">
                    {/* Top-left */}
                    <path d="M5 5 Q20 5 20 20 Q20 35 5 35 Q5 20 5 5"/>
                    <circle cx="12" cy="20" r="3"/>
                    
                    {/* Top-right */}
                    <path d="M175 5 Q160 5 160 20 Q160 35 175 35 Q175 20 175 5"/>
                    <circle cx="168" cy="20" r="3"/>
                    
                    {/* Bottom-left */}
                    <path d="M5 175 Q20 175 20 160 Q20 145 5 145 Q5 160 5 175"/>
                    <circle cx="12" cy="160" r="3"/>
                    
                    {/* Bottom-right */}
                    <path d="M175 175 Q160 175 160 160 Q160 145 175 145 Q175 160 175 175"/>
                    <circle cx="168" cy="160" r="3"/>
                  </g>
                  
                  {/* Edge decorative lines */}
                  <line x1="40" y1="0" x2="140" y2="0" stroke="#8B6914" strokeWidth="1" opacity="0.3"/>
                  <line x1="40" y1="180" x2="140" y2="180" stroke="#8B6914" strokeWidth="1" opacity="0.3"/>
                  <line x1="0" y1="40" x2="0" y2="140" stroke="#8B6914" strokeWidth="1" opacity="0.3"/>
                  <line x1="180" y1="40" x2="180" y2="140" stroke="#8B6914" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#productMandalaPattern)"/>
            </svg>
          </div>
          
          {/* Secondary floating dots layer */}
          <div className="tribal-pattern-drift absolute inset-0 opacity-[0.04]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="productFloatingDots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#8B6914"/>
                  <circle cx="25" cy="25" r="1.5" fill="#8B6914"/>
                  <circle cx="75" cy="25" r="1.5" fill="#8B6914"/>
                  <circle cx="25" cy="75" r="1.5" fill="#8B6914"/>
                  <circle cx="75" cy="75" r="1.5" fill="#8B6914"/>
                  <circle cx="50" cy="10" r="1" fill="#8B6914"/>
                  <circle cx="50" cy="90" r="1" fill="#8B6914"/>
                  <circle cx="10" cy="50" r="1" fill="#8B6914"/>
                  <circle cx="90" cy="50" r="1" fill="#8B6914"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#productFloatingDots)"/>
            </svg>
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-DEFAULT via-transparent to-cream-DEFAULT pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14">
            <div>
              <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">Handpicked for You</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
                Featured Products
              </h2>
            </div>
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <button
                onClick={prevProductSlide}
                disabled={productSlideIndex === 0}
                className={`slider-arrow ${productSlideIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Previous products"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProductSlide}
                disabled={productSlideIndex >= maxProductSlide}
                className={`slider-arrow ${productSlideIndex >= maxProductSlide ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Next products"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <Link
                href="/products"
                className="hidden md:flex items-center text-brass-gold hover:text-primary-dark font-semibold ml-4 animated-underline"
              >
                View All
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {/* Product Slider */}
          <div className="overflow-hidden -mx-2 md:-mx-3">
            <div 
              className="product-slider px-2 md:px-3"
              style={{ transform: `translateX(-${productSlideIndex * (100 / slidesPerView)}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="md:hidden inline-flex items-center btn-gold text-white px-8 py-4 rounded-xl font-semibold"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-sand-DEFAULT relative overflow-hidden">
        {/* Animated Circle Sacred Geometry Pattern - Rotating */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="tribal-pattern-rotate absolute opacity-[0.06]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="circleSacredGeometry" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  {/* Large central mandala circle */}
                  <g transform="translate(100,100)">
                    {/* Outer ornate ring */}
                    <circle cx="0" cy="0" r="80" fill="none" stroke="#7A5C10" strokeWidth="1.5" strokeDasharray="10 5"/>
                    <circle cx="0" cy="0" r="70" fill="none" stroke="#7A5C10" strokeWidth="1.8"/>
                    <circle cx="0" cy="0" r="60" fill="none" stroke="#7A5C10" strokeWidth="1.2"/>
                    
                    {/* 16 petals radiating outward */}
                    {[...Array(16)].map((_, i) => (
                      <g key={i} transform={`rotate(${i * 22.5})`}>
                        <ellipse cx="0" cy="-50" rx="4" ry="12" fill="none" stroke="#7A5C10" strokeWidth="1.2"/>
                        <line x1="0" y1="-62" x2="0" y2="-75" stroke="#7A5C10" strokeWidth="1"/>
                        <circle cx="0" cy="-78" r="2" fill="#7A5C10"/>
                      </g>
                    ))}
                    
                    {/* Inner decorative rings */}
                    <circle cx="0" cy="0" r="45" fill="none" stroke="#7A5C10" strokeWidth="1" strokeDasharray="5 3"/>
                    <circle cx="0" cy="0" r="35" fill="none" stroke="#7A5C10" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="25" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#7A5C10" strokeWidth="1.2"/>
                    <circle cx="0" cy="0" r="5" fill="#7A5C10"/>
                    
                    {/* 12 radiating spokes */}
                    {[...Array(12)].map((_, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="0"
                        x2={45 * Math.cos((i * 30) * Math.PI / 180)}
                        y2={45 * Math.sin((i * 30) * Math.PI / 180)}
                        stroke="#7A5C10"
                        strokeWidth="0.6"
                        opacity="0.6"
                      />
                    ))}
                  </g>
                  
                  {/* Corner smaller circles */}
                  <g transform="translate(30,30)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#7A5C10" strokeWidth="0.8"/>
                    <circle cx="0" cy="0" r="3" fill="#7A5C10"/>
                  </g>
                  <g transform="translate(170,30)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#7A5C10" strokeWidth="0.8"/>
                    <circle cx="0" cy="0" r="3" fill="#7A5C10"/>
                  </g>
                  <g transform="translate(30,170)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#7A5C10" strokeWidth="0.8"/>
                    <circle cx="0" cy="0" r="3" fill="#7A5C10"/>
                  </g>
                  <g transform="translate(170,170)">
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="8" fill="none" stroke="#7A5C10" strokeWidth="0.8"/>
                    <circle cx="0" cy="0" r="3" fill="#7A5C10"/>
                  </g>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circleSacredGeometry)"/>
            </svg>
          </div>
        </div>
        
        {/* Radial gradient overlay for depth - darker cream */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-sand-DEFAULT/70 to-sand-DEFAULT pointer-events-none z-[1]"></div>
        
        {/* Full-width Sacred Geometry Strap - Outside container for full viewport width */}
        <div className="w-screen relative mb-14" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
            <p className="text-charcoal font-semibold tracking-widest uppercase mb-3 text-center text-lg">Our Promise</p>
            {/* Sacred Geometry Pattern Strap */}
            <div className="relative w-full bg-sand-DEFAULT py-6 overflow-hidden">
              {/* Top Border - Dense Leaf/Vine Motifs */}
              <div className="absolute top-0 left-0 right-0 h-3 border-b border-brass-gold/30 z-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                  <defs>
                    <pattern id="topBorderPattern2" x="0" y="0" width="30" height="12" patternUnits="userSpaceOnUse">
                      <path d="M5 6 L8 3 L10 6 L8 9 Z" fill="#C9A227" opacity="0.9"/>
                      <path d="M15 6 L18 3 L20 6 L18 9 Z" fill="#C9A227" opacity="0.9"/>
                      <path d="M25 6 L28 3 L30 6 L28 9 Z" fill="#C9A227" opacity="0.9"/>
                      <circle cx="10" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                      <circle cx="20" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#topBorderPattern2)"/>
                </svg>
              </div>
              
              {/* Main Pattern Band - Dense with Circles, Chakras, and Multi-patterns */}
              <div className="absolute top-3 left-0 right-0 h-16 z-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 64" preserveAspectRatio="none">
                  <defs>
                    <pattern id="mainPatternBand2" x="0" y="0" width="80" height="64" patternUnits="userSpaceOnUse">
                      {/* Central Chakra Circle */}
                      <g transform="translate(40, 32)">
                        <circle cx="0" cy="0" r="12" fill="none" stroke="#C9A227" strokeWidth="1.8"/>
                        <circle cx="0" cy="0" r="8" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                        <circle cx="0" cy="0" r="4" fill="#C9A227"/>
                        {/* 8 Petals around chakra */}
                        <ellipse cx="0" cy="-10" rx="2" ry="6" fill="#C9A227"/>
                        <ellipse cx="7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(45)"/>
                        <ellipse cx="10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(90)"/>
                        <ellipse cx="7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(135)"/>
                        <ellipse cx="0" cy="10" rx="2" ry="6" fill="#C9A227" transform="rotate(180)"/>
                        <ellipse cx="-7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(225)"/>
                        <ellipse cx="-10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(270)"/>
                        <ellipse cx="-7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(315)"/>
                      </g>
                      {/* Left Side - Nested Circles */}
                      <g transform="translate(10, 32)">
                        <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                        <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      {/* Right Side - Nested Circles */}
                      <g transform="translate(70, 32)">
                        <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                        <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                        <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      {/* Top Scroll Motifs */}
                      <g transform="translate(20, 16)">
                        <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                        <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                        <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      <g transform="translate(48, 16)">
                        <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                        <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                        <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      {/* Bottom Scroll Motifs */}
                      <g transform="translate(20, 48)">
                        <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                        <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                        <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      <g transform="translate(48, 48)">
                        <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                        <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                        <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                      </g>
                      {/* Small decorative circles */}
                      <circle cx="15" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="65" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="15" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="65" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mainPatternBand2)"/>
              </svg>
            </div>
              
              {/* Title in Center - with solid background above pattern */}
              <div className="relative z-20 flex items-center justify-center h-16">
                <div className="bg-cream-100 px-10 py-3 rounded-lg shadow-lg border-2 border-brass-gold/20">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
              Why Choose BodhOm
            </h2>
                </div>
              </div>
              
              {/* Lower Border - Dense Chain-like Diamond Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-3 border-t border-brass-gold/30 z-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                  <defs>
                    <pattern id="bottomBorderPattern2" x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                      <path d="M12.5 0 L20 6 L12.5 12 L5 6 Z" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                      <line x1="12.5" y1="0" x2="12.5" y2="12" stroke="#C9A227" strokeWidth="1"/>
                      <line x1="5" y1="6" x2="20" y2="6" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="12.5" cy="6" r="1.5" fill="#C9A227" opacity="0.8"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#bottomBorderPattern2)"/>
              </svg>
            </div>
          </div>
          </div>
        
        <div className="container-elegant relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: <Hammer className="w-10 h-10 text-charcoal" />, title: 'Authentic Craftsmanship', desc: 'Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques passed down through generations.' },
              { icon: <Truck className="w-10 h-10 text-charcoal" />, title: 'Free Shipping', desc: 'Enjoy complimentary shipping on orders above ₹999 across India. Fast, secure, and carefully packaged delivery.' },
              { icon: <Award className="w-10 h-10 text-charcoal" />, title: 'Premium Quality', desc: 'Quality-checked products with 7-day return policy. Your complete satisfaction is our utmost priority.' },
            ].map((item, index) => (
              <div 
                key={index}
                className="relative text-center p-8 rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-500 card-glow border-2 border-brass-gold/30"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Decorative Border Frame */}
                <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`whyChooseTop${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <line x1="0" y1="6" x2="3" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                          <line x1="22" y1="6" x2="25" y2="6" stroke="#C9A227" strokeWidth="1" opacity="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#whyChooseTop${index})`}/>
                    </svg>
                  </div>
                  {/* Right Border */}
                  <div className="absolute top-0 right-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`whyChooseRight${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#whyChooseRight${index})`}/>
                    </svg>
                  </div>
                  {/* Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`whyChooseBottom${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 9 L11 6 L7 3 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 9 L22 6 L18 3 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#whyChooseBottom${index})`}/>
                    </svg>
                  </div>
                  {/* Left Border */}
                  <div className="absolute top-0 left-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`whyChooseLeft${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#whyChooseLeft${index})`}/>
                    </svg>
                  </div>
                  {/* Corner Decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                
                <div className="relative z-0">
                <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-cream-DEFAULT relative overflow-hidden">
        {/* Animated Lotus/Paisley Pattern - Floating Effect */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="tribal-pattern-float absolute inset-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="none">
              <defs>
                <pattern id="lotusPattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                  {/* Central Lotus Flower */}
                  <g transform="translate(75,75)">
                    {/* Outer petals */}
                    <ellipse cx="0" cy="-30" rx="8" ry="20" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                    <ellipse cx="0" cy="30" rx="8" ry="20" fill="none" stroke="#8B6914" strokeWidth="1.5" transform="rotate(180)"/>
                    <ellipse cx="-30" cy="0" rx="8" ry="20" fill="none" stroke="#8B6914" strokeWidth="1.5" transform="rotate(90)"/>
                    <ellipse cx="30" cy="0" rx="8" ry="20" fill="none" stroke="#8B6914" strokeWidth="1.5" transform="rotate(-90)"/>
                    
                    {/* Diagonal petals */}
                    <ellipse cx="-21" cy="-21" rx="6" ry="16" fill="none" stroke="#8B6914" strokeWidth="1.2" transform="rotate(-45 -21 -21)"/>
                    <ellipse cx="21" cy="-21" rx="6" ry="16" fill="none" stroke="#8B6914" strokeWidth="1.2" transform="rotate(45 21 -21)"/>
                    <ellipse cx="-21" cy="21" rx="6" ry="16" fill="none" stroke="#8B6914" strokeWidth="1.2" transform="rotate(45 -21 21)"/>
                    <ellipse cx="21" cy="21" rx="6" ry="16" fill="none" stroke="#8B6914" strokeWidth="1.2" transform="rotate(-45 21 21)"/>
                    
                    {/* Center circles */}
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="6" fill="none" stroke="#8B6914" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="2" fill="#8B6914"/>
                  </g>
                  
                  {/* Paisley corners */}
                  <g fill="none" stroke="#8B6914" strokeWidth="1.2">
                    <path d="M10 10 Q25 5 30 20 Q35 35 20 35 Q5 35 10 20 Q12 12 10 10"/>
                    <path d="M15 18 Q22 15 25 22"/>
                    
                    <path d="M140 10 Q125 5 120 20 Q115 35 130 35 Q145 35 140 20 Q138 12 140 10"/>
                    <path d="M135 18 Q128 15 125 22"/>
                    
                    <path d="M10 140 Q25 145 30 130 Q35 115 20 115 Q5 115 10 130 Q12 138 10 140"/>
                    <path d="M15 132 Q22 135 25 128"/>
                    
                    <path d="M140 140 Q125 145 120 130 Q115 115 130 115 Q145 115 140 130 Q138 138 140 140"/>
                    <path d="M135 132 Q128 135 125 128"/>
                  </g>
                  
                  {/* Decorative dots */}
                  <circle cx="75" cy="10" r="3" fill="#8B6914"/>
                  <circle cx="75" cy="140" r="3" fill="#8B6914"/>
                  <circle cx="10" cy="75" r="3" fill="#8B6914"/>
                  <circle cx="140" cy="75" r="3" fill="#8B6914"/>
                  
                  {/* Curved connecting lines */}
                  <path d="M45 10 Q50 25 55 10" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <path d="M95 10 Q100 25 105 10" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <path d="M45 140 Q50 125 55 140" fill="none" stroke="#8B6914" strokeWidth="1"/>
                  <path d="M95 140 Q100 125 105 140" fill="none" stroke="#8B6914" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lotusPattern)"/>
            </svg>
          </div>
        </div>
        
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brass-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brass-gold/5 rounded-full blur-3xl"></div>
        
        {/* Full-width Sacred Geometry Strap - Outside container for full viewport width - Above overlay */}
        <div className="w-screen relative mb-14 z-20" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
          <p className="text-charcoal font-semibold tracking-widest uppercase mb-3 text-center text-lg">What Our Customers Say</p>
          {/* Sacred Geometry Pattern Strap */}
          <div className="relative w-full bg-cream-DEFAULT py-6 overflow-hidden">
            {/* Top Border - Dense Leaf/Vine Motifs */}
            <div className="absolute top-0 left-0 right-0 h-3 border-b border-brass-gold/30 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                <defs>
                  <pattern id="topBorderPattern3" x="0" y="0" width="30" height="12" patternUnits="userSpaceOnUse">
                    <path d="M5 6 L8 3 L10 6 L8 9 Z" fill="#C9A227" opacity="0.9"/>
                    <path d="M15 6 L18 3 L20 6 L18 9 Z" fill="#C9A227" opacity="0.9"/>
                    <path d="M25 6 L28 3 L30 6 L28 9 Z" fill="#C9A227" opacity="0.9"/>
                    <circle cx="10" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                    <circle cx="20" cy="6" r="1.5" fill="#C9A227" opacity="0.7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topBorderPattern3)"/>
              </svg>
            </div>
            
            {/* Main Pattern Band - Dense with Circles, Chakras, and Multi-patterns */}
            <div className="absolute top-3 left-0 right-0 h-16 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 64" preserveAspectRatio="none">
                <defs>
                  <pattern id="mainPatternBand3" x="0" y="0" width="80" height="64" patternUnits="userSpaceOnUse">
                    {/* Central Chakra Circle */}
                    <g transform="translate(40, 32)">
                      <circle cx="0" cy="0" r="12" fill="none" stroke="#C9A227" strokeWidth="1.8"/>
                      <circle cx="0" cy="0" r="8" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                      <circle cx="0" cy="0" r="4" fill="#C9A227"/>
                      {/* 8 Petals around chakra */}
                      <ellipse cx="0" cy="-10" rx="2" ry="6" fill="#C9A227"/>
                      <ellipse cx="7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(45)"/>
                      <ellipse cx="10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(90)"/>
                      <ellipse cx="7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(135)"/>
                      <ellipse cx="0" cy="10" rx="2" ry="6" fill="#C9A227" transform="rotate(180)"/>
                      <ellipse cx="-7" cy="7" rx="2" ry="6" fill="#C9A227" transform="rotate(225)"/>
                      <ellipse cx="-10" cy="0" rx="2" ry="6" fill="#C9A227" transform="rotate(270)"/>
                      <ellipse cx="-7" cy="-7" rx="2" ry="6" fill="#C9A227" transform="rotate(315)"/>
                    </g>
                    {/* Left Side - Nested Circles */}
                    <g transform="translate(10, 32)">
                      <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                      <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Right Side - Nested Circles */}
                    <g transform="translate(70, 32)">
                      <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A227" strokeWidth="1.4"/>
                      <circle cx="0" cy="0" r="3" fill="none" stroke="#C9A227" strokeWidth="1"/>
                      <circle cx="0" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Top Scroll Motifs */}
                    <g transform="translate(20, 16)">
                      <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    <g transform="translate(48, 16)">
                      <path d="M0 0 Q3 -2 6 0 Q9 2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Bottom Scroll Motifs */}
                    <g transform="translate(20, 48)">
                      <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    <g transform="translate(48, 48)">
                      <path d="M0 0 Q3 2 6 0 Q9 -2 12 0" stroke="#C9A227" strokeWidth="1.4" fill="none"/>
                      <circle cx="3" cy="0" r="1" fill="#C9A227"/>
                      <circle cx="9" cy="0" r="1" fill="#C9A227"/>
                    </g>
                    {/* Small decorative circles */}
                    <circle cx="15" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="65" cy="8" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="15" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="65" cy="56" r="2" fill="none" stroke="#C9A227" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mainPatternBand3)"/>
              </svg>
            </div>
            
            {/* Title in Center - with solid background above pattern */}
            <div className="relative z-20 flex items-center justify-center h-16">
              <div className="bg-cream-100 px-10 py-3 rounded-lg shadow-lg border-2 border-brass-gold/20">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal">
              Testimonials
            </h2>
              </div>
            </div>
            
            {/* Lower Border - Dense Chain-like Diamond Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-3 border-t border-brass-gold/30 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 12" preserveAspectRatio="none">
                <defs>
                  <pattern id="bottomBorderPattern3" x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                    <path d="M12.5 0 L20 6 L12.5 12 L5 6 Z" fill="none" stroke="#C9A227" strokeWidth="1.2"/>
                    <line x1="12.5" y1="0" x2="12.5" y2="12" stroke="#C9A227" strokeWidth="1"/>
                    <line x1="5" y1="6" x2="20" y2="6" stroke="#C9A227" strokeWidth="1"/>
                    <circle cx="12.5" cy="6" r="1.5" fill="#C9A227" opacity="0.8"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bottomBorderPattern3)"/>
              </svg>
            </div>
            </div>
          </div>
        
        {/* Gradient overlay - moved below strap */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-DEFAULT/80 via-transparent to-cream-DEFAULT/80 pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="testimonial-card rounded-2xl p-8 relative border-2 border-brass-gold/30"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Decorative Border Frame */}
                <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`testimonialTop${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#testimonialTop${index})`}/>
                    </svg>
                  </div>
                  {/* Right Border */}
                  <div className="absolute top-0 right-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`testimonialRight${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#testimonialRight${index})`}/>
                    </svg>
                  </div>
                  {/* Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`testimonialBottom${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 9 L11 6 L7 3 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 9 L22 6 L18 3 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#testimonialBottom${index})`}/>
                    </svg>
                  </div>
                  {/* Left Border */}
                  <div className="absolute top-0 left-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id={`testimonialLeft${index}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#testimonialLeft${index})`}/>
                    </svg>
                  </div>
                  {/* Corner Decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                
                <div className="relative z-0">
                <div className="quote-mark absolute top-4 right-6">"</div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brass-gold text-brass-gold" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-charcoal-500 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>
                
                {/* Product Tag */}
                <p className="text-brass-gold text-sm font-medium mb-6">
                  Purchased: {testimonial.product}
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brass-gold to-primary-dark flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                    <p className="text-charcoal-400 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20 bg-cream-100">
        <div className="container-elegant">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14">
            <div>
              <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">Stories & Insights</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
                Latest from Our Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center text-brass-gold hover:text-primary-dark font-semibold animated-underline mt-6 md:mt-0"
            >
              View All Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Featured Blog Post */}
              <div className="lg:col-span-2 blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg relative border-2 border-brass-gold/30">
                {/* Decorative Border Frame */}
                <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                  {/* Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id="blogFeaturedTop" x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#blogFeaturedTop)"/>
                    </svg>
                  </div>
                  {/* Right Border */}
                  <div className="absolute top-0 right-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id="blogFeaturedRight" x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#blogFeaturedRight)"/>
                    </svg>
                  </div>
                  {/* Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-2.5 md:h-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                      <defs>
                        <pattern id="blogFeaturedBottom" x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                          <path d="M3 6 L7 9 L11 6 L7 3 Z" fill="#C9A227" opacity="1"/>
                          <path d="M14 6 L18 9 L22 6 L18 3 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#blogFeaturedBottom)"/>
                    </svg>
                  </div>
                  {/* Left Border */}
                  <div className="absolute top-0 left-0 bottom-0 w-2.5 md:w-3">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                      <defs>
                        <pattern id="blogFeaturedLeft" x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                          <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                          <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                          <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                          <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#blogFeaturedLeft)"/>
                    </svg>
                  </div>
                  {/* Corner Decorations */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                </div>
                
                <Link href={`/blog/${blogPosts[0].slug || blogPosts[0].id}`} className="relative z-0 block">
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={blogPosts[0].featured_image || '/slide6.webp'}
                      alt={blogPosts[0].title}
                      fill
                      className="object-cover blog-image"
                    />
                    <div className="absolute top-4 left-4 bg-brass-gold text-white px-4 py-1 rounded-full text-sm font-medium">
                      {blogPosts[0].category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-charcoal-400 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {blogPosts[0].published_at ? new Date(blogPosts[0].published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {blogPosts[0].read_time || '5 min read'}
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-charcoal mb-3 hover:text-brass-gold transition-colors">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-charcoal-400 leading-relaxed mb-4">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-brass-gold font-medium">
                      Read More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Secondary Blog Posts */}
              <div className="flex flex-col gap-8">
                {blogPosts.slice(1).map((post, postIndex) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug || post.id}`}
                    className="blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg relative border-2 border-brass-gold/30"
                  >
                    {/* Decorative Border Frame */}
                    <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                      {/* Top Border */}
                      <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`blogTop${postIndex}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                              <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                              <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                              <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                              <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#blogTop${postIndex})`}/>
                        </svg>
                      </div>
                      {/* Right Border */}
                      <div className="absolute top-0 right-0 bottom-0 w-2.5 md:w-3">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`blogRight${postIndex}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                              <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                              <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                              <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                              <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#blogRight${postIndex})`}/>
                        </svg>
                      </div>
                      {/* Bottom Border */}
                      <div className="absolute bottom-0 left-0 right-0 h-2.5 md:h-3">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`blogBottom${postIndex}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                              <path d="M3 6 L7 9 L11 6 L7 3 Z" fill="#C9A227" opacity="1"/>
                              <path d="M14 6 L18 9 L22 6 L18 3 Z" fill="#C9A227" opacity="1"/>
                              <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                              <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#blogBottom${postIndex})`}/>
                        </svg>
                      </div>
                      {/* Left Border */}
                      <div className="absolute top-0 left-0 bottom-0 w-2.5 md:w-3">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 200" preserveAspectRatio="none">
                          <defs>
                            <pattern id={`blogLeft${postIndex}`} x="0" y="0" width="12" height="25" patternUnits="userSpaceOnUse">
                              <path d="M6 3 L9 7 L6 11 L3 7 Z" fill="#C9A227" opacity="1"/>
                              <path d="M6 14 L9 18 L6 22 L3 18 Z" fill="#C9A227" opacity="1"/>
                              <circle cx="6" cy="8" r="1.5" fill="#C9A227" opacity="0.9"/>
                              <circle cx="6" cy="17" r="1.5" fill="#C9A227" opacity="0.9"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#blogLeft${postIndex})`}/>
                        </svg>
                      </div>
                      {/* Corner Decorations */}
                      <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                          <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                          <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                          <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                          <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                          <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                          <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                        </svg>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                          <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                          <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="relative z-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.featured_image || '/slide7.webp'}
                        alt={post.title}
                        fill
                        className="object-cover blog-image"
                      />
                      <div className="absolute top-4 left-4 bg-brass-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-charcoal-400 text-xs mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.read_time || '5 min read'}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-charcoal hover:text-brass-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-charcoal-400">No blog posts available yet.</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="md:hidden inline-flex items-center btn-gold text-white px-8 py-4 rounded-xl font-semibold"
            >
              View All Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-charcoal text-white relative overflow-hidden">
        {/* Animated White Tribal Pattern - Rotating Mandala Effect - Seamless */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="tribal-pattern-rotate absolute opacity-[0.04]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="whiteTribalPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                  {/* Large central mandala */}
                  <g transform="translate(90,90)">
                    {/* Outer ornate ring */}
                    <circle cx="0" cy="0" r="70" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 4"/>
                    <circle cx="0" cy="0" r="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="50" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
                    
                    {/* 12 petals radiating outward */}
                    <g transform="rotate(0)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(30)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(60)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(90)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(120)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(150)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(180)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(210)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(240)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(270)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(300)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    <g transform="rotate(330)"><ellipse cx="0" cy="-40" rx="6" ry="15" fill="none" stroke="#FFFFFF" strokeWidth="1.2"/><line x1="0" y1="-55" x2="0" y2="-70" stroke="#FFFFFF" strokeWidth="1"/><circle cx="0" cy="-72" r="2" fill="#FFFFFF"/></g>
                    
                    {/* Inner decorative rings */}
                    <circle cx="0" cy="0" r="35" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 2"/>
                    <circle cx="0" cy="0" r="25" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
                    <circle cx="0" cy="0" r="15" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
                    <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
                    
                    {/* 8 radiating spokes */}
                    <line x1="0" y1="0" x2="35" y2="0" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="24.7" y2="24.7" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="0" y2="35" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-24.7" y2="24.7" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-35" y2="0" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="-24.7" y2="-24.7" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="0" y2="-35" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="0" y1="0" x2="24.7" y2="-24.7" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5"/>
                  </g>
                  
                  {/* Corner tribal knots */}
                  <g fill="none" stroke="#FFFFFF" strokeWidth="1">
                    {/* Top-left */}
                    <path d="M5 5 Q20 5 20 20 Q20 35 5 35 Q5 20 5 5"/>
                    <circle cx="12" cy="20" r="3"/>
                    
                    {/* Top-right */}
                    <path d="M175 5 Q160 5 160 20 Q160 35 175 35 Q175 20 175 5"/>
                    <circle cx="168" cy="20" r="3"/>
                    
                    {/* Bottom-left */}
                    <path d="M5 175 Q20 175 20 160 Q20 145 5 145 Q5 160 5 175"/>
                    <circle cx="12" cy="160" r="3"/>
                    
                    {/* Bottom-right */}
                    <path d="M175 175 Q160 175 160 160 Q160 145 175 145 Q175 160 175 175"/>
                    <circle cx="168" cy="160" r="3"/>
                  </g>
                  
                  {/* Edge decorative lines */}
                  <line x1="40" y1="0" x2="140" y2="0" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
                  <line x1="40" y1="180" x2="140" y2="180" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
                  <line x1="0" y1="40" x2="0" y2="140" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
                  <line x1="180" y1="40" x2="180" y2="140" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#whiteTribalPattern)"/>
            </svg>
          </div>
          
          {/* Secondary floating elements */}
          <div className="tribal-pattern-float-slow absolute inset-0 opacity-[0.03]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="whiteFloatingDots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#FFFFFF"/>
                  <circle cx="25" cy="25" r="1.5" fill="#FFFFFF"/>
                  <circle cx="75" cy="25" r="1.5" fill="#FFFFFF"/>
                  <circle cx="25" cy="75" r="1.5" fill="#FFFFFF"/>
                  <circle cx="75" cy="75" r="1.5" fill="#FFFFFF"/>
                  <circle cx="50" cy="10" r="1" fill="#FFFFFF"/>
                  <circle cx="50" cy="90" r="1" fill="#FFFFFF"/>
                  <circle cx="10" cy="50" r="1" fill="#FFFFFF"/>
                  <circle cx="90" cy="50" r="1" fill="#FFFFFF"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#whiteFloatingDots)"/>
            </svg>
          </div>
        </div>
        
        {/* Gold ambient glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
        </div>
        
        {/* Vignette overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-charcoal/30 to-charcoal/60 pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brass-gold font-semibold tracking-widest uppercase mb-3 text-lg">Stay Connected</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-cream-200 font-medium mb-10">
              Get exclusive offers, artisan stories, and updates on new collections delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-charcoal-700 border border-charcoal-600 text-white placeholder-charcoal-400 focus:outline-none focus:border-brass-gold transition-colors"
              />
              <button className="btn-gold text-white px-8 py-4 rounded-xl font-semibold whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-charcoal-400 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}