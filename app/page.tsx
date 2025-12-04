'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, ArrowLeft, Star, ShoppingCart, Heart, Quote, ChevronLeft, ChevronRight, Calendar, Clock, User } from 'lucide-react'
import { useCart } from '@/store/cartStore'

// Hero slider images from /public folder
const heroSlides = [
  {
    id: 1,
    image: '/slide0.webp',
    title: 'Ancient Artistry',
    subtitle: 'From the Heart of Odisha',
    description: 'Discover handcrafted brass and copper treasures, each piece telling a story of centuries-old tradition.',
  },
  {
    id: 2,
    image: '/slide1.webp',
    title: 'Timeless Elegance',
    subtitle: 'Handcrafted with Love',
    description: 'Experience the warmth of traditional Indian craftsmanship in every detail.',
  },
  {
    id: 3,
    image: '/slide2.webp',
    title: 'Sacred Traditions',
    subtitle: 'For Your Pooja Space',
    description: 'Elevate your spiritual practice with authentic ritual items crafted by master artisans.',
  },
  {
    id: 4,
    image: '/slide3.webp',
    title: 'Home Decor',
    subtitle: 'Artisan Collections',
    description: 'Transform your living spaces with pieces that blend tradition with contemporary aesthetics.',
  },
]

// Mock product data with local images
const featuredProducts = [
  {
    id: '1',
    name: 'Traditional Brass Diya Set',
    price: 1299,
    originalPrice: 1999,
    image: '/slide0.webp',
    rating: 4.5,
    reviews: 128,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Copper Water Pot (Tamra Lota)',
    price: 2499,
    originalPrice: 3499,
    image: '/slide1.webp',
    rating: 4.8,
    reviews: 89,
    badge: 'New',
  },
  {
    id: '3',
    name: 'Brass Pooja Thali Set',
    price: 1899,
    originalPrice: 2599,
    image: '/slide2.webp',
    rating: 4.6,
    reviews: 156,
    badge: 'Popular',
  },
  {
    id: '4',
    name: 'Handcrafted Brass Urli',
    price: 3499,
    originalPrice: 4999,
    image: '/slide3.webp',
    rating: 4.7,
    reviews: 203,
    badge: 'Featured',
  },
  {
    id: '5',
    name: 'Copper Kalash with Stand',
    price: 4299,
    originalPrice: 5999,
    image: '/slide4.webp',
    rating: 4.9,
    reviews: 67,
    badge: 'Premium',
  },
  {
    id: '6',
    name: 'Brass Ganesha Idol',
    price: 1599,
    originalPrice: 2299,
    image: '/slide5.webp',
    rating: 4.5,
    reviews: 312,
    badge: 'Best Seller',
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    initials: 'PS',
    rating: 5,
    text: 'The brass diya set I purchased is absolutely stunning! The craftsmanship is impeccable, and it arrived beautifully packaged. It has become the centerpiece of my pooja room.',
    product: 'Brass Diya Set',
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    location: 'Ahmedabad, Gujarat',
    initials: 'RP',
    rating: 5,
    text: 'I have been searching for authentic Odisha brass work for years. BodhOm exceeded my expectations. The quality is museum-worthy, and the customer service was exceptional.',
    product: 'Copper Water Pot',
  },
  {
    id: 3,
    name: 'Anita Krishnan',
    location: 'Chennai, Tamil Nadu',
    initials: 'AK',
    rating: 5,
    text: 'Every piece I have bought tells a story. You can feel the heritage and dedication of the artisans. The brass urli is now a conversation starter at every gathering.',
    product: 'Brass Urli',
  },
]

// Blog posts data with local images
const blogPosts = [
  {
    id: 1,
    title: 'The Art of Dhokra: An Ancient Lost-Wax Technique',
    excerpt: 'Discover the 4,000-year-old metal casting tradition that continues to thrive in Odisha villages, creating intricate tribal art pieces.',
    image: '/slide6.webp',
    category: 'Craftsmanship',
    author: 'Shantanu Goswami',
    date: 'Nov 28, 2025',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Brass vs Copper: Understanding Traditional Metals',
    excerpt: 'Learn about the unique properties, health benefits, and spiritual significance of brass and copper in Indian culture.',
    image: '/slide7.webp',
    category: 'Knowledge',
    author: 'Shantanu Goswami',
    date: 'Nov 22, 2025',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Setting Up Your Perfect Pooja Room',
    excerpt: 'Expert tips on creating a sacred space that honors tradition while fitting modern home aesthetics.',
    image: '/slide8.webp',
    category: 'Lifestyle',
    author: 'Shantanu Goswami',
    date: 'Nov 15, 2025',
    readTime: '6 min read',
  },
]

// Categories with local images
const categories = [
  { name: 'Brass Utensils', image: '/slide4.webp', count: 45 },
  { name: 'Copper Cookware', image: '/slide5.webp', count: 32 },
  { name: 'Pooja Items', image: '/slide6.webp', count: 67 },
  { name: 'Home Decor', image: '/slide7.webp', count: 28 },
]

// Product Card Component
function ProductCard({ product, index }: { product: typeof featuredProducts[0], index: number }) {
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
              src={product.image}
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
                    i < Math.floor(product.rating)
                      ? 'fill-brass-gold text-brass-gold'
                      : 'text-cream-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-charcoal-400">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-charcoal">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-charcoal-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
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

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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

        {/* Arrow Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="slider-arrow absolute left-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-charcoal" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="slider-arrow absolute right-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-charcoal" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-cream-100">
        <div className="container-elegant">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3 animate-fade-in">Curated Collections</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            <div className="section-divider mt-6"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-brass-gold transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-cream-300 text-sm">{category.count} items</p>
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
      <section className="py-20 bg-cream-DEFAULT">
        <div className="container-elegant">
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
      <section className="py-20 bg-sand-DEFAULT">
        <div className="container-elegant">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">Our Promise</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Why Choose BodhOm
            </h2>
            <div className="section-divider mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '✨', title: 'Authentic Craftsmanship', desc: 'Each piece is handcrafted by skilled artisans from Odisha, preserving traditional techniques passed down through generations.' },
              { icon: '🚚', title: 'Free Shipping', desc: 'Enjoy complimentary shipping on orders above ₹999 across India. Fast, secure, and carefully packaged delivery.' },
              { icon: '💎', title: 'Premium Quality', desc: 'Quality-checked products with 7-day return policy. Your complete satisfaction is our utmost priority.' },
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl bg-white shadow-soft hover:shadow-soft-lg transition-all duration-500 card-glow"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">{item.icon}</span>
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
        <div className="absolute top-0 left-0 w-64 h-64 bg-brass-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brass-gold/5 rounded-full blur-3xl"></div>
        
        <div className="container-elegant relative z-10">
          <div className="text-center mb-14">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-3">What Our Customers Say</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Testimonials
            </h2>
            <div className="section-divider mt-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Blog Post */}
            <div className="lg:col-span-2 blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg">
              <Link href={`/blog/${blogPosts[0].id}`}>
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={blogPosts[0].image}
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
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogPosts[0].readTime}
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
                  href={`/blog/${post.id}`}
                  className="blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
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
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brass-gold rounded-full blur-3xl"></div>
        </div>
        
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
