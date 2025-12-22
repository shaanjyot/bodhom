'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ArrowLeft, Star, ShoppingCart, Heart, Quote, ChevronLeft, ChevronRight, Calendar, Clock, User, Hammer, Truck, Award } from 'lucide-react'
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
  const productImage = product.thumbnail || product.images?.[0] || '/slide0.webp'
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
        <div className="p-5">
          <h3 className="font-serif text-lg font-semibold text-charcoal mb-2 group-hover:text-brass-gold transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'fill-brass-gold text-brass-gold'
                      : 'text-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-charcoal-400">
              {product.rating || 0} ({product.reviews_count || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-charcoal">
              ₹{product.price.toLocaleString()}
            </span>
            {product.original_price && (
              <span className="text-sm text-charcoal-400 line-through">
                ₹{product.original_price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-gold text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
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

  // Handle responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1)
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
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-transparent to-cream-100 pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3 animate-fade-in">Curated Collections</p>
            {/* Decorative Pattern Above Title */}
            <div className="flex justify-center mb-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 6 30 12 Q35 18 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Floral Rosette */}
                <g transform="translate(60, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Decorative Leaves */}
                <path d="M80 12 L95 8 L90 12 L95 16 Z" fill="currentColor"/>
                <path d="M100 12 L115 8 L110 12 L115 16 Z" fill="currentColor"/>
                {/* Center Large Floral */}
                <g transform="translate(160, 12)">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="0" cy="-5" r="2.5" fill="currentColor"/>
                  <circle cx="5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="0" cy="5" r="2.5" fill="currentColor"/>
                  <circle cx="-5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="0" cy="0" r="2" fill="currentColor"/>
                </g>
                {/* Right Decorative Leaves */}
                <path d="M240 12 L225 8 L230 12 L225 16 Z" fill="currentColor"/>
                <path d="M220 12 L205 8 L210 12 L205 16 Z" fill="currentColor"/>
                {/* Right Floral Rosette */}
                <g transform="translate(260, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 6 290 12 Q285 18 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            {/* Decorative Pattern Below Title */}
            <div className="flex justify-center mt-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 18 30 12 Q35 6 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Small Flowers */}
                <g transform="translate(55, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Horizontal Line with Dots */}
                <line x1="70" y1="12" x2="140" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="85" cy="12" r="2" fill="currentColor"/>
                <circle cx="105" cy="12" r="2" fill="currentColor"/>
                <circle cx="125" cy="12" r="2" fill="currentColor"/>
                {/* Center Diamond Motif */}
                <g transform="translate(160, 12)">
                  <path d="M0 -8 L8 0 L0 8 L-8 0 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M0 -4 L4 0 L0 4 L-4 0 Z" fill="currentColor"/>
                </g>
                {/* Right Horizontal Line with Dots */}
                <line x1="180" y1="12" x2="250" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="195" cy="12" r="2" fill="currentColor"/>
                <circle cx="215" cy="12" r="2" fill="currentColor"/>
                <circle cx="235" cy="12" r="2" fill="currentColor"/>
                {/* Right Small Flowers */}
                <g transform="translate(265, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 18 290 12 Q285 6 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {categories.map((category, index) => (
              <Link
                key={category.id || index}
                href={`/collections/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={category.image || `/slide${index + 4}.webp`}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-brass-gold transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-4">
                  <ArrowRight className="w-5 h-5 text-white" />
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
          <div className="overflow-hidden">
            <div 
              className="product-slider"
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
        {/* Animated Geometric Tribal Pattern - Diagonal Movement */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <div className="tribal-pattern-diagonal absolute" style={{ width: '200%', height: '200%', top: '-50%', left: '-50%' }}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" preserveAspectRatio="none">
              <defs>
                <pattern id="geometricTribalPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  {/* Central diamond with tribal fill */}
                  <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="none" stroke="#7A5C10" strokeWidth="2"/>
                  <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="none" stroke="#7A5C10" strokeWidth="1.5"/>
                  <path d="M50 30 L70 50 L50 70 L30 50 Z" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                  <circle cx="50" cy="50" r="8" fill="none" stroke="#7A5C10" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="3" fill="#7A5C10"/>
                  
                  {/* Corner stepped pyramids - Odisha temple style */}
                  <g fill="#7A5C10">
                    <rect x="0" y="0" width="15" height="5"/>
                    <rect x="3" y="5" width="9" height="4"/>
                    <rect x="5" y="9" width="5" height="3"/>
                    
                    <rect x="85" y="0" width="15" height="5"/>
                    <rect x="88" y="5" width="9" height="4"/>
                    <rect x="90" y="9" width="5" height="3"/>
                    
                    <rect x="0" y="95" width="15" height="5"/>
                    <rect x="3" y="91" width="9" height="4"/>
                    <rect x="5" y="88" width="5" height="3"/>
                    
                    <rect x="85" y="95" width="15" height="5"/>
                    <rect x="88" y="91" width="9" height="4"/>
                    <rect x="90" y="88" width="5" height="3"/>
                  </g>
                  
                  {/* Tribal dots arrangement */}
                  <circle cx="50" cy="5" r="2" fill="#7A5C10"/>
                  <circle cx="50" cy="95" r="2" fill="#7A5C10"/>
                  <circle cx="5" cy="50" r="2" fill="#7A5C10"/>
                  <circle cx="95" cy="50" r="2" fill="#7A5C10"/>
                  
                  {/* Connecting tribal lines */}
                  <line x1="15" y1="15" x2="25" y2="25" stroke="#7A5C10" strokeWidth="1"/>
                  <line x1="85" y1="15" x2="75" y2="25" stroke="#7A5C10" strokeWidth="1"/>
                  <line x1="15" y1="85" x2="25" y2="75" stroke="#7A5C10" strokeWidth="1"/>
                  <line x1="85" y1="85" x2="75" y2="75" stroke="#7A5C10" strokeWidth="1"/>
                  
                  {/* Small decorative crescents */}
                  <path d="M25 50 Q30 45 35 50 Q30 55 25 50" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                  <path d="M65 50 Q70 45 75 50 Q70 55 65 50" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                  <path d="M50 25 Q45 30 50 35 Q55 30 50 25" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                  <path d="M50 65 Q45 70 50 75 Q55 70 50 65" fill="none" stroke="#7A5C10" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#geometricTribalPattern)"/>
            </svg>
          </div>
        </div>
        
        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-sand-DEFAULT/50 to-sand-DEFAULT pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">Our Promise</p>
            {/* Decorative Pattern Above Title */}
            <div className="flex justify-center mb-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 6 30 12 Q35 18 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Floral Rosette */}
                <g transform="translate(60, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Decorative Leaves */}
                <path d="M80 12 L95 8 L90 12 L95 16 Z" fill="currentColor"/>
                <path d="M100 12 L115 8 L110 12 L115 16 Z" fill="currentColor"/>
                {/* Center Large Floral */}
                <g transform="translate(160, 12)">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="0" cy="-5" r="2.5" fill="currentColor"/>
                  <circle cx="5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="0" cy="5" r="2.5" fill="currentColor"/>
                  <circle cx="-5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="0" cy="0" r="2" fill="currentColor"/>
                </g>
                {/* Right Decorative Leaves */}
                <path d="M240 12 L225 8 L230 12 L225 16 Z" fill="currentColor"/>
                <path d="M220 12 L205 8 L210 12 L205 16 Z" fill="currentColor"/>
                {/* Right Floral Rosette */}
                <g transform="translate(260, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 6 290 12 Q285 18 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Why Choose BodhOm
            </h2>
            {/* Decorative Pattern Below Title */}
            <div className="flex justify-center mt-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 18 30 12 Q35 6 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Small Flowers */}
                <g transform="translate(55, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Horizontal Line with Dots */}
                <line x1="70" y1="12" x2="140" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="85" cy="12" r="2" fill="currentColor"/>
                <circle cx="105" cy="12" r="2" fill="currentColor"/>
                <circle cx="125" cy="12" r="2" fill="currentColor"/>
                {/* Center Diamond Motif */}
                <g transform="translate(160, 12)">
                  <path d="M0 -8 L8 0 L0 8 L-8 0 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M0 -4 L4 0 L0 4 L-4 0 Z" fill="currentColor"/>
                </g>
                {/* Right Horizontal Line with Dots */}
                <line x1="180" y1="12" x2="250" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="195" cy="12" r="2" fill="currentColor"/>
                <circle cx="215" cy="12" r="2" fill="currentColor"/>
                <circle cx="235" cy="12" r="2" fill="currentColor"/>
                {/* Right Small Flowers */}
                <g transform="translate(265, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 18 290 12 Q285 6 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { icon: <Hammer className="w-10 h-10 text-charcoal" />, title: 'Authentic Craftsmanship', desc: 'Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques passed down through generations.' },
              { icon: <Truck className="w-10 h-10 text-charcoal" />, title: 'Free Shipping', desc: 'Enjoy complimentary shipping on orders above ₹999 across India. Fast, secure, and carefully packaged delivery.' },
              { icon: <Award className="w-10 h-10 text-charcoal" />, title: 'Premium Quality', desc: 'Quality-checked products with 7-day return policy. Your complete satisfaction is our utmost priority.' },
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-500 card-glow"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold text-charcoal mb-3">{item.title}</h3>
                <p className="text-charcoal-400 leading-relaxed">{item.desc}</p>
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
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-DEFAULT/80 via-transparent to-cream-DEFAULT/80 pointer-events-none z-[1]"></div>
        
        <div className="container-elegant relative z-10">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">What Our Customers Say</p>
            {/* Decorative Pattern Above Title */}
            <div className="flex justify-center mb-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 6 30 12 Q35 18 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Floral Rosette */}
                <g transform="translate(60, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Decorative Leaves */}
                <path d="M80 12 L95 8 L90 12 L95 16 Z" fill="currentColor"/>
                <path d="M100 12 L115 8 L110 12 L115 16 Z" fill="currentColor"/>
                {/* Center Large Floral */}
                <g transform="translate(160, 12)">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="0" cy="-5" r="2.5" fill="currentColor"/>
                  <circle cx="5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="0" cy="5" r="2.5" fill="currentColor"/>
                  <circle cx="-5" cy="0" r="2.5" fill="currentColor"/>
                  <circle cx="3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="3.5" r="1.5" fill="currentColor"/>
                  <circle cx="-3.5" cy="-3.5" r="1.5" fill="currentColor"/>
                  <circle cx="0" cy="0" r="2" fill="currentColor"/>
                </g>
                {/* Right Decorative Leaves */}
                <path d="M240 12 L225 8 L230 12 L225 16 Z" fill="currentColor"/>
                <path d="M220 12 L205 8 L210 12 L205 16 Z" fill="currentColor"/>
                {/* Right Floral Rosette */}
                <g transform="translate(260, 12)">
                  <circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="-4" r="2" fill="currentColor"/>
                  <circle cx="4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="4" r="2" fill="currentColor"/>
                  <circle cx="-4" cy="0" r="2" fill="currentColor"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 6 290 12 Q285 18 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Testimonials
            </h2>
            {/* Decorative Pattern Below Title */}
            <div className="flex justify-center mt-4">
              <svg width="320" height="24" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-gold">
                {/* Left Spiral */}
                <path d="M20 12 Q25 18 30 12 Q35 6 40 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="15" cy="12" r="3" fill="currentColor"/>
                {/* Left Small Flowers */}
                <g transform="translate(55, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Left Horizontal Line with Dots */}
                <line x1="70" y1="12" x2="140" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="85" cy="12" r="2" fill="currentColor"/>
                <circle cx="105" cy="12" r="2" fill="currentColor"/>
                <circle cx="125" cy="12" r="2" fill="currentColor"/>
                {/* Center Diamond Motif */}
                <g transform="translate(160, 12)">
                  <path d="M0 -8 L8 0 L0 8 L-8 0 Z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M0 -4 L4 0 L0 4 L-4 0 Z" fill="currentColor"/>
                </g>
                {/* Right Horizontal Line with Dots */}
                <line x1="180" y1="12" x2="250" y2="12" stroke="currentColor" strokeWidth="1"/>
                <circle cx="195" cy="12" r="2" fill="currentColor"/>
                <circle cx="215" cy="12" r="2" fill="currentColor"/>
                <circle cx="235" cy="12" r="2" fill="currentColor"/>
                {/* Right Small Flowers */}
                <g transform="translate(265, 12)">
                  <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
                </g>
                {/* Right Spiral */}
                <path d="M300 12 Q295 18 290 12 Q285 6 280 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="305" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="testimonial-card rounded-2xl p-8 relative"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
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
              <div className="lg:col-span-2 blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg">
                <Link href={`/blog/${blogPosts[0].slug || blogPosts[0].id}`}>
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
                {blogPosts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug || post.id}`}
                    className="blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg"
                  >
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
        {/* Animated White Tribal Pattern - Rotating Mandala Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="tribal-pattern-rotate absolute inset-0 opacity-[0.04]">
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
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">Stay Connected</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-cream-300 mb-10">
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