'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

// Types for API data
export interface HeroSlide {
  id: string
  image: string
  title: string
  subtitle: string
  description: string
  button_text?: string
  button_link?: string
}

export interface Product {
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

export interface Category {
  id: string
  name: string
  slug: string
  image?: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  initials: string
  rating: number
  text: string
  product: string
  avatar?: string
}

export interface BlogPost {
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

export interface Reel {
  id: string
  title: string
  video_url: string
  platform: string
  product_link?: string
  thumbnail_url?: string
}

// Fallback data
const fallbackSlides: HeroSlide[] = [
  {
    id: '1',
    image: '/slide0.webp',
    title: 'Ancient Artistry',
    subtitle: 'From the Heart of Odisha',
    description: 'Discover handcrafted brass and copper treasures, each piece telling a story of centuries-old tradition.',
  },
]

const fallbackCategories: Category[] = [
  { id: '1', name: 'Brass Utensils', image: '/slide4.webp', slug: 'brass-utensils' },
  { id: '2', name: 'Copper Cookware', image: '/slide5.webp', slug: 'copper-cookware' },
  { id: '3', name: 'Pooja Items', image: '/slide6.webp', slug: 'pooja-items' },
  { id: '4', name: 'Home Decor', image: '/slide7.webp', slug: 'home-decor' },
]

interface HomePageContextType {
  // Hero Slider
  heroSlides: HeroSlide[]
  currentSlide: number
  setCurrentSlide: (index: number) => void
  nextHeroSlide: () => void
  prevHeroSlide: () => void
  
  // Categories
  categories: Category[]
  
  // Featured Products
  featuredProducts: Product[]
  productSlideIndex: number
  slidesPerView: number
  sliderGap: number
  slideWidth: number
  maxProductSlide: number
  sliderRef: React.RefObject<HTMLDivElement>
  nextProductSlide: () => void
  prevProductSlide: () => void
  
  // Testimonials
  testimonials: Testimonial[]
  testimonialSlideIndex: number
  maxTestimonialSlide: number
  nextTestimonialSlide: () => void
  prevTestimonialSlide: () => void
  
  // Reels
  reels: Reel[]
  
  // Blog
  blogPosts: BlogPost[]
  
  // Newsletter
  newsletterEmail: string
  setNewsletterEmail: (email: string) => void
  newsletterSubmitting: boolean
  newsletterMessage: string
  handleNewsletterSubmit: (e: React.FormEvent) => void
  
  // Loading
  loading: boolean
}

const HomePageContext = createContext<HomePageContextType | undefined>(undefined)

export function HomePageProvider({ children }: { children: ReactNode }) {
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(fallbackSlides)
  
  // Product Slider State
  const [productSlideIndex, setProductSlideIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(3)
  const [sliderGap, setSliderGap] = useState(32)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(0)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  
  // Testimonial Slider State
  const [testimonialSlideIndex, setTestimonialSlideIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  
  // Other Data
  const [categories, setCategories] = useState<Category[]>(fallbackCategories)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [reels, setReels] = useState<Reel[]>([])
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState('')
  
  // Loading State
  const [loading, setLoading] = useState(true)

  // Fetch all data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [slidesRes, productsRes, categoriesRes, testimonialsRes, blogRes, reelsRes] = await Promise.all([
          fetch('/api/slides'),
          fetch('/api/products?featured=true&limit=6'),
          fetch('/api/categories'),
          fetch('/api/testimonials'),
          fetch('/api/blog?limit=5'),
          fetch('/api/reels'),
        ])

        const [slidesData, productsData, categoriesData, testimonialsData, blogData, reelsData] = await Promise.all([
          slidesRes.json(),
          productsRes.json(),
          categoriesRes.json(),
          testimonialsRes.json(),
          blogRes.json(),
          reelsRes.json(),
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
        if (reelsData.reels?.length > 0) {
          setReels(reelsData.reels)
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
    const updateSlider = () => {
      if (!sliderRef.current) return
      
      const containerWidth = sliderRef.current.offsetWidth
      let newSlidesPerView = 3
      let gap = 32
      
      if (window.innerWidth < 640) {
        newSlidesPerView = 2
        gap = 16
      } else if (window.innerWidth < 1024) {
        newSlidesPerView = 2
        gap = 24
      }
      
      setSlidesPerView(newSlidesPerView)
      setSliderGap(gap)
      const totalGaps = gap * (newSlidesPerView - 1)
      const calculatedWidth = (containerWidth - totalGaps) / newSlidesPerView
      setSlideWidth(calculatedWidth)
    }
    
    updateSlider()
    window.addEventListener('resize', updateSlider)
    
    if (featuredProducts.length > 0) {
      setTimeout(updateSlider, 100)
    }
    
    return () => window.removeEventListener('resize', updateSlider)
  }, [featuredProducts.length])

  const maxProductSlide = Math.max(0, Math.ceil(featuredProducts.length / slidesPerView) - 1)
  
  // Auto-scroll product slider
  useEffect(() => {
    const currentMaxSlide = Math.max(0, Math.ceil(featuredProducts.length / slidesPerView) - 1)
    if (featuredProducts.length === 0 || currentMaxSlide <= 0) return
    const timer = setInterval(() => {
      setProductSlideIndex((prev) => {
        if (prev >= currentMaxSlide) return 0
        return prev + 1
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [featuredProducts.length, slidesPerView])

  const nextProductSlide = useCallback(() => {
    setProductSlideIndex((prev) => Math.min(prev + 1, maxProductSlide))
  }, [maxProductSlide])

  const prevProductSlide = useCallback(() => {
    setProductSlideIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const maxTestimonialSlide = Math.max(0, testimonials.length - 1)
  
  const nextTestimonialSlide = useCallback(() => {
    setTestimonialSlideIndex((prev) => Math.min(prev + 1, maxTestimonialSlide))
  }, [maxTestimonialSlide])

  const prevTestimonialSlide = useCallback(() => {
    setTestimonialSlideIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  // Auto-scroll testimonial slider
  useEffect(() => {
    if (testimonials.length === 0 || maxTestimonialSlide <= 0) return
    const timer = setInterval(() => {
      setTestimonialSlideIndex((prev) => {
        if (prev >= maxTestimonialSlide) return 0
        return prev + 1
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length, maxTestimonialSlide])

  // Hero slider controls
  const nextHeroSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [heroSlides.length])

  const prevHeroSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [heroSlides.length])

  // Newsletter handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterSubmitting(true)
    setNewsletterMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })

      const data = await res.json()

      if (res.ok) {
        setNewsletterMessage(data.message || 'Successfully subscribed!')
        setNewsletterEmail('')
      } else {
        setNewsletterMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setNewsletterMessage('Failed to subscribe. Please try again.')
    } finally {
      setNewsletterSubmitting(false)
      setTimeout(() => setNewsletterMessage(''), 5000)
    }
  }

  const value: HomePageContextType = {
    heroSlides,
    currentSlide,
    setCurrentSlide,
    nextHeroSlide,
    prevHeroSlide,
    categories,
    featuredProducts,
    productSlideIndex,
    slidesPerView,
    sliderGap,
    slideWidth,
    maxProductSlide,
    sliderRef,
    nextProductSlide,
    prevProductSlide,
    testimonials,
    testimonialSlideIndex,
    maxTestimonialSlide,
    nextTestimonialSlide,
    prevTestimonialSlide,
    reels,
    blogPosts,
    newsletterEmail,
    setNewsletterEmail,
    newsletterSubmitting,
    newsletterMessage,
    handleNewsletterSubmit,
    loading,
  }

  return (
    <HomePageContext.Provider value={value}>
      {children}
    </HomePageContext.Provider>
  )
}

export function useHomePage() {
  const context = useContext(HomePageContext)
  if (context === undefined) {
    throw new Error('useHomePage must be used within a HomePageProvider')
  }
  return context
}

