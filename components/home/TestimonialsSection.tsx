'use client'

import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight, Hammer, ShieldCheck, Recycle, Award, User } from 'lucide-react'
import { useHomePage } from '@/contexts/HomePageContext'

const features = [
  { title: "Brass, Copper & Bronze", desc: "Hand crafted with timeless strength & shine.", icon: "hammer" },
  { title: "ISO Certified (9001:2015)", desc: "Committed to global quality & excellence.", icon: "iso" },
  { title: "Recyclable & Eco Friendly", desc: "Hand crafted for a greener planet.", icon: "recycle" },
  { title: "Durable & Authentic", desc: "Timeless Hand made to last generations.", icon: "durable" },
  { title: "Handmade, Made In India", desc: "Crafted by Indian artisans for the world.", icon: "handmade" }
]

function FeatureIcon({ icon }: { icon: string }) {
  const iconClass = "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#8B1538]"
  switch (icon) {
    case 'hammer': return <Hammer className={iconClass} />
    case 'iso': return <ShieldCheck className={iconClass} />
    case 'recycle': return <Recycle className={iconClass} />
    case 'durable': return <Award className={iconClass} />
    case 'handmade': return <User className={iconClass} />
    default: return null
  }
}

export default function TestimonialsSection() {
  const {
    testimonials,
    testimonialSlideIndex,
    maxTestimonialSlide,
    nextTestimonialSlide,
    prevTestimonialSlide,
  } = useHomePage()

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-cream-100 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
                  
      {/* Full-width Sacred Geometry Strap with Title */}
      <div className="w-full relative mb-6 sm:mb-8 z-20 overflow-hidden">
        <p className="text-charcoal font-semibold tracking-widest uppercase mb-1.5 sm:mb-2 text-center text-xs sm:text-sm px-4">Craftsmanship Excellence</p>
        <div className="relative w-full bg-cream-100 py-4 sm:py-5 overflow-hidden">
          {/* Top Border - Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="legacyTopGold" x="0" y="0" width="25" height="10" patternUnits="userSpaceOnUse">
                  <path d="M4 5 L7 2 L10 5 L7 8 Z" fill="#C9A227" opacity="0.9"/>
                  <path d="M15 5 L18 2 L21 5 L18 8 Z" fill="#C9A227" opacity="0.9"/>
                  <circle cx="12.5" cy="5" r="1" fill="#C9A227" opacity="0.7"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#legacyTopGold)"/>
            </svg>
          </div>
          {/* Top Border - Maroon Line */}
          <div className="absolute top-2 sm:top-2.5 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="legacyTopMaroon" x="0" y="0" width="30" height="10" patternUnits="userSpaceOnUse">
                  <path d="M7.5 5 L10 2 L12.5 5 L10 8 Z" fill="#8B1538" opacity="0.85"/>
                  <path d="M22.5 5 L25 2 L27.5 5 L25 8 Z" fill="#8B1538" opacity="0.85"/>
                  <circle cx="5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                  <circle cx="17.5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#legacyTopMaroon)"/>
            </svg>
          </div>
          
          {/* Title in Center */}
          <div className="relative z-20 flex items-center justify-center py-3 sm:py-4 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-charcoal text-center">
              The Legacy of Craftsmanship
            </h2>
          </div>

          {/* Bottom Border - Maroon Line */}
          <div className="absolute bottom-2 sm:bottom-2.5 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="legacyBottomMaroon" x="0" y="0" width="30" height="10" patternUnits="userSpaceOnUse">
                  <path d="M7.5 5 L10 8 L12.5 5 L10 2 Z" fill="#8B1538" opacity="0.85"/>
                  <path d="M22.5 5 L25 8 L27.5 5 L25 2 Z" fill="#8B1538" opacity="0.85"/>
                  <circle cx="5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                  <circle cx="17.5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#legacyBottomMaroon)"/>
            </svg>
          </div>
          {/* Bottom Border - Gold Line */}
          <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="legacyBottomGold" x="0" y="0" width="25" height="10" patternUnits="userSpaceOnUse">
                  <path d="M4 5 L7 8 L10 5 L7 2 Z" fill="#C9A227" opacity="0.9"/>
                  <path d="M15 5 L18 8 L21 5 L18 2 Z" fill="#C9A227" opacity="0.9"/>
                  <circle cx="12.5" cy="5" r="1" fill="#C9A227" opacity="0.7"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#legacyBottomGold)"/>
            </svg>
          </div>
        </div>
      </div>
        
      <div className="container-elegant relative z-10">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Column - Features */}
          <div className="w-full">
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3 sm:gap-4 py-4 sm:py-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#8B1538]/20">
                      <FeatureIcon icon={feature.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#8B1538] mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-charcoal-600">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                  {index < features.length - 1 && (
                    <div className="relative h-4 my-2">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 16" preserveAspectRatio="none">
                        <defs>
                          <pattern id={`separatorPattern${index}`} x="0" y="0" width="40" height="16" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="8" r="2" fill="#C9A227" opacity="0.6"/>
                            <path d="M10 8 L30 8" stroke="#C9A227" strokeWidth="1" opacity="0.4"/>
                            <path d="M5 8 L8 5 L11 8 L8 11 Z" fill="#C9A227" opacity="0.5"/>
                            <path d="M29 8 L32 5 L35 8 L32 11 Z" fill="#C9A227" opacity="0.5"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#separatorPattern${index})`}/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Testimonials Slider */}
          <div className="w-full flex flex-col">
            <div className="relative flex-1 min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full overflow-hidden">
              <div className="overflow-hidden h-full w-full relative">
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(-${testimonialSlideIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={testimonial.id}
                      className="flex-shrink-0 w-full h-full px-2 sm:px-3"
                    >
                      <div className="testimonial-card rounded-2xl p-3 md:p-4 relative border-2 border-brass-gold/30 bg-transparent h-full flex flex-col w-full">
                        {/* Image */}
                        {testimonial.product && (
                          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mt-4 md:mt-6 mb-3 rounded-full overflow-hidden">
                            <Image
                              src={testimonial.avatar || `/slide${(index % 9) + 1}.webp`}
                              alt={testimonial.product}
                              fill
                              sizes="(max-width: 768px) 128px, 160px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Rating */}
                        <div className="flex items-center justify-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-brass-gold text-brass-gold" />
                          ))}
                        </div>
                        
                        {/* Testimonial Text */}
                        <p className="text-charcoal-500 leading-relaxed mb-2 text-sm md:text-base text-center">
                          "{testimonial.text}"
                        </p>
                        
                        {/* Author & Product */}
                        <div className="flex flex-col items-center gap-2 mt-0">
                          <p className="text-brass-gold text-base md:text-lg font-medium text-center">
                            Purchased: {testimonial.product}
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-brass-gold to-primary-dark flex items-center justify-center text-white font-semibold text-base md:text-lg">
                              {testimonial.initials}
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal text-base md:text-lg">{testimonial.name}</h4>
                              <p className="text-charcoal-400 text-sm md:text-base">{testimonial.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevTestimonialSlide}
                    disabled={testimonialSlideIndex === 0}
                    className="slider-arrow absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 sm:-translate-x-4 bg-white/90 hover:bg-white border border-brass-gold/30 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    aria-label="Previous testimonials"
                  >
                    <ChevronLeft className="w-5 h-5 text-charcoal" />
                  </button>
                  <button
                    onClick={nextTestimonialSlide}
                    disabled={testimonialSlideIndex >= maxTestimonialSlide}
                    className="slider-arrow absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 sm:translate-x-4 bg-white/90 hover:bg-white border border-brass-gold/30 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    aria-label="Next testimonials"
                  >
                    <ChevronRight className="w-5 h-5 text-charcoal" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

