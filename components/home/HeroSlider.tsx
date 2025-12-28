'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useHomePage } from '@/contexts/HomePageContext'

export default function HeroSlider() {
  const { heroSlides, currentSlide, setCurrentSlide, nextHeroSlide, prevHeroSlide } = useHomePage()

  return (
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
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-2 sm:mb-4 text-xs sm:text-sm animate-fade-in-down">
              {heroSlides[currentSlide]?.subtitle}
            </p>
            <h1 
              key={`title-${currentSlide}`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-3 sm:mb-4 md:mb-6 leading-tight animate-fade-in-up"
            >
              {heroSlides[currentSlide]?.title}
            </h1>
            <p 
              key={`desc-${currentSlide}`}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream-200 mb-4 sm:mb-6 md:mb-8 leading-relaxed animate-fade-in-up stagger-2 max-w-3xl"
            >
              {heroSlides[currentSlide]?.description}
            </p>
            <div className="animate-fade-in-up stagger-3">
              <Link
                href="/products"
                className="btn-gold text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold inline-flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Navigation - Minimalistic dash/circle dots */}
      <div className="absolute bottom-3 sm:bottom-5 md:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 sm:gap-1 md:gap-1.5 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide 
                ? 'w-2 sm:w-4 md:w-6 h-[2px] sm:h-[3px] md:h-1 bg-brass-gold rounded-full' 
                : 'w-[3px] sm:w-1 md:w-1.5 h-[3px] sm:h-1 md:h-1.5 bg-white/50 hover:bg-white/80 rounded-full'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation - Hidden on mobile/tablet to prevent text overlap */}
      <button
        onClick={prevHeroSlide}
        className="slider-arrow absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex lg:items-center lg:justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
      </button>
      <button
        onClick={nextHeroSlide}
        className="slider-arrow absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 hidden lg:flex lg:items-center lg:justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-charcoal" />
      </button>
    </section>
  )
}

