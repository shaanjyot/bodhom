'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useHomePage } from '@/contexts/HomePageContext'

export default function CategoriesSection() {
  const { categories } = useHomePage()

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-cream-100 relative overflow-hidden overflow-y-hidden">
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
      
      {/* Full-width Sacred Geometry Strap */}
      <div className="w-full relative mb-6 sm:mb-8 z-20 overflow-hidden">
        <p className="text-charcoal font-semibold tracking-widest uppercase mb-1.5 sm:mb-2 text-center text-xs sm:text-sm px-4">Curated Collections</p>
        {/* Sacred Geometry Pattern Strap */}
        <div className="relative w-full bg-cream-100 py-4 sm:py-5 overflow-hidden">
          {/* Top Border - Gold Line */}
          <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="catTopGold" x="0" y="0" width="25" height="10" patternUnits="userSpaceOnUse">
                  <path d="M4 5 L7 2 L10 5 L7 8 Z" fill="#C9A227" opacity="0.9"/>
                  <path d="M15 5 L18 2 L21 5 L18 8 Z" fill="#C9A227" opacity="0.9"/>
                  <circle cx="12.5" cy="5" r="1" fill="#C9A227" opacity="0.7"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#catTopGold)"/>
            </svg>
          </div>
          {/* Top Border - Maroon Line */}
          <div className="absolute top-2 sm:top-2.5 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="catTopMaroon" x="0" y="0" width="30" height="10" patternUnits="userSpaceOnUse">
                  <path d="M7.5 5 L10 2 L12.5 5 L10 8 Z" fill="#8B1538" opacity="0.85"/>
                  <path d="M22.5 5 L25 2 L27.5 5 L25 8 Z" fill="#8B1538" opacity="0.85"/>
                  <circle cx="5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                  <circle cx="17.5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#catTopMaroon)"/>
            </svg>
          </div>
          
          {/* Title in Center */}
          <div className="relative z-20 flex items-center justify-center py-3 sm:py-4 px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-charcoal text-center">
              Explore our categories
            </h2>
          </div>
          
          {/* Bottom Border - Maroon Line */}
          <div className="absolute bottom-2 sm:bottom-2.5 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="catBottomMaroon" x="0" y="0" width="30" height="10" patternUnits="userSpaceOnUse">
                  <path d="M7.5 5 L10 8 L12.5 5 L10 2 Z" fill="#8B1538" opacity="0.85"/>
                  <path d="M22.5 5 L25 8 L27.5 5 L25 2 Z" fill="#8B1538" opacity="0.85"/>
                  <circle cx="5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                  <circle cx="17.5" cy="5" r="1.5" fill="#8B1538" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#catBottomMaroon)"/>
            </svg>
          </div>
          {/* Bottom Border - Gold Line */}
          <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 z-0">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 10" preserveAspectRatio="none">
              <defs>
                <pattern id="catBottomGold" x="0" y="0" width="25" height="10" patternUnits="userSpaceOnUse">
                  <path d="M4 5 L7 8 L10 5 L7 2 Z" fill="#C9A227" opacity="0.9"/>
                  <path d="M15 5 L18 8 L21 5 L18 2 Z" fill="#C9A227" opacity="0.9"/>
                  <circle cx="12.5" cy="5" r="1" fill="#C9A227" opacity="0.7"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#catBottomGold)"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="container-elegant relative z-10 overflow-y-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 relative z-10">
          {categories.map((category, index) => (
            <Link
              key={category.id || index}
              href={`/collections/${category.slug || category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-visible aspect-square"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Decorative Border Frame */}
              <div className="absolute -inset-1 md:-inset-1.5 z-10 pointer-events-none">
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-2.5 md:h-3">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <defs>
                      <pattern id={`categoryTopBorder${index}`} x="0" y="0" width="25" height="12" patternUnits="userSpaceOnUse">
                        <path d="M3 6 L7 3 L11 6 L7 9 Z" fill="#C9A227" opacity="1"/>
                        <path d="M14 6 L18 3 L22 6 L18 9 Z" fill="#C9A227" opacity="1"/>
                        <circle cx="8" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
                        <circle cx="17" cy="6" r="1.5" fill="#C9A227" opacity="0.9"/>
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
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#categoryLeftBorder${index})`}/>
                  </svg>
                </div>
                
                {/* Corner Decorations */}
                {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-8 h-8 md:w-10 md:h-10`}>
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
                      <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
                      <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
                    </svg>
                  </div>
                ))}
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
  )
}

