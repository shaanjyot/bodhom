'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useHomePage } from '@/contexts/HomePageContext'

function BlogCardBorder({ postIndex }: { postIndex: number }) {
  return (
    <div className="absolute -inset-1 sm:-inset-1.5 z-10 pointer-events-none">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2.5 sm:h-3">
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
      <div className="absolute top-0 right-0 bottom-0 w-2.5 sm:w-3">
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
      <div className="absolute bottom-0 left-0 right-0 h-2.5 sm:h-3">
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
      <div className="absolute top-0 left-0 bottom-0 w-2.5 sm:w-3">
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
      {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10`}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="12" fill="none" stroke="#C9A227" strokeWidth="2" opacity="0.9"/>
            <circle cx="20" cy="20" r="6" fill="#C9A227" opacity="0.7"/>
            <path d="M20 8 L20 14 M20 26 L20 32 M8 20 L14 20 M26 20 L32 20" stroke="#C9A227" strokeWidth="1.5" opacity="0.8"/>
          </svg>
        </div>
      ))}
    </div>
  )
}

export default function BlogSection() {
  const { blogPosts } = useHomePage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-slide on mobile
  useEffect(() => {
    if (!isMobile || blogPosts.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= blogPosts.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(timer)
  }, [isMobile, blogPosts.length])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= blogPosts.length - 1 ? 0 : prev + 1))
  }, [blogPosts.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? blogPosts.length - 1 : prev - 1))
  }, [blogPosts.length])

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-cream-100 relative overflow-hidden">
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
      <div className="container-elegant relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 sm:mb-12 md:mb-14">
          <div>
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-2 sm:mb-3 text-xs sm:text-sm">Stories & Insights</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-3 sm:mb-4">
              Latest from Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden lg:flex items-center text-brass-gold hover:text-primary-dark font-semibold animated-underline mt-6 lg:mt-0"
          >
            View All Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        {blogPosts.length > 0 ? (
          <>
            {/* Mobile/Tablet Auto-Sliding Carousel */}
            <div className="lg:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {blogPosts.map((post, postIndex) => (
                    <div key={post.id} className="flex-shrink-0 w-full px-2">
                      <Link
                        href={`/blog/${post.slug || post.id}`}
                        className="blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg relative border-2 border-brass-gold/30 transition-all duration-300 block w-full min-h-[380px] sm:min-h-[420px]"
                      >
                        <BlogCardBorder postIndex={postIndex + 100} />
                        
                        <div className="relative z-0 flex flex-col h-full">
                          <div className="relative overflow-hidden h-48 sm:h-56">
                            <Image
                              src={post.featured_image || `/slide${(postIndex % 9) + 1}.webp`}
                              alt={post.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover blog-image transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute top-3 left-3 bg-brass-gold text-white px-2.5 py-1 rounded-full text-xs font-medium">
                              {post.category}
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-charcoal-400 text-xs mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.read_time || '5 min read'}
                              </span>
                            </div>
                            <h3 className="font-serif font-bold text-charcoal hover:text-brass-gold transition-colors text-base sm:text-lg mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-charcoal-400 leading-relaxed line-clamp-2 text-sm mb-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-brass-gold font-medium mt-auto text-sm">
                              Read More <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              {blogPosts.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-brass-gold hover:text-white transition-all"
                    aria-label="Previous blog"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-brass-gold hover:text-white transition-all"
                    aria-label="Next blog"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              {/* Pagination Dots - Minimalistic dash/circle - Hidden on mobile */}
              {blogPosts.length > 1 && (
                <div className="hidden sm:flex justify-center items-center gap-1 md:gap-1.5 mt-4">
                  {blogPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`transition-all duration-300 ${
                        i === currentSlide 
                          ? 'w-4 md:w-6 h-[3px] md:h-1 bg-brass-gold rounded-full' 
                          : 'w-1 md:w-1.5 h-1 md:h-1.5 bg-charcoal/30 hover:bg-charcoal/50 rounded-full'
                      }`}
                      aria-label={`Go to blog ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
              {blogPosts.map((post, postIndex) => {
                const isFirst = postIndex === 0
                const colSpan = isFirst ? 'md:col-span-2 lg:col-span-2' : ''
                const rowSpan = isFirst ? 'md:row-span-2' : ''
                const heightClass = isFirst ? 'h-full min-h-[400px] md:min-h-[500px]' : 'h-full min-h-[300px] md:min-h-[350px]'
                
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug || post.id}`}
                    className={`blog-card rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-soft-lg relative border-2 border-brass-gold/30 transition-all duration-300 hover:scale-[1.02] ${colSpan} ${rowSpan} ${heightClass}`}
                  >
                    <BlogCardBorder postIndex={postIndex} />
                    
                    <div className="relative z-0 flex flex-col h-full">
                      <div className={`relative overflow-hidden ${isFirst ? 'h-80 lg:h-96' : 'h-56'}`}>
                        <Image
                          src={post.featured_image || `/slide${(postIndex % 9) + 1}.webp`}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover blog-image transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-brass-gold text-white px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </div>
                      </div>
                      <div className={`flex-1 flex flex-col ${isFirst ? 'p-8' : 'p-6'}`}>
                        <div className={`flex items-center gap-3 text-charcoal-400 ${isFirst ? 'text-sm mb-4' : 'text-xs mb-3'}`}>
                          <span className="flex items-center gap-1">
                            <Calendar className={isFirst ? 'w-4 h-4' : 'w-3 h-3'} />
                            {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className={isFirst ? 'w-4 h-4' : 'w-3 h-3'} />
                            {post.read_time || '5 min read'}
                          </span>
                        </div>
                        <h3 className={`font-serif font-bold text-charcoal hover:text-brass-gold transition-colors ${isFirst ? 'text-2xl mb-3' : 'text-lg'} ${!isFirst && 'line-clamp-2'}`}>
                          {post.title}
                        </h3>
                        {isFirst && (
                          <>
                            <p className="text-charcoal-400 leading-relaxed mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-2 text-brass-gold font-medium mt-auto">
                              Read More <ArrowRight className="w-4 h-4" />
                            </div>
                          </>
                        )}
                        {!isFirst && (
                          <p className="text-charcoal-400 leading-relaxed mt-2 line-clamp-2 text-sm">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal-400">No blog posts available yet.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="lg:hidden inline-flex items-center btn-gold text-white px-8 py-4 rounded-xl font-semibold"
          >
            View All Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

