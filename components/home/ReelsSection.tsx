'use client'

import Link from 'next/link'
import { useHomePage } from '@/contexts/HomePageContext'

// Helper function to convert video URLs to embed URLs
function getEmbedUrl(url: string, platform: string): string {
  try {
    if (platform === 'youtube') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      const videoId = match && match[2].length === 11 ? match[2] : null
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`
      }
    } else if (platform === 'instagram') {
      const reelMatch = url.match(/instagram\.com\/reel\/([^/?]+)/)
      if (reelMatch) {
        return `https://www.instagram.com/reel/${reelMatch[1]}/embed/`
      }
      const postMatch = url.match(/instagram\.com\/p\/([^/?]+)/)
      if (postMatch) {
        return `https://www.instagram.com/p/${postMatch[1]}/embed/`
      }
    } else if (platform === 'facebook') {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=500&height=500&autoplay=true&mute=true&appId`
    }
    return url
  } catch (error) {
    return url
  }
}

export default function ReelsSection() {
  const { reels } = useHomePage()

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#8B1538] relative overflow-hidden">
      {/* Deep Golden Sacred Geometry Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="tribal-pattern-rotate absolute opacity-[0.4]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="journeySacredGeometry" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <g transform="translate(100,100)">
                  <circle cx="0" cy="0" r="80" fill="none" stroke="#C9A227" strokeWidth="2.5" strokeDasharray="10 5"/>
                  <circle cx="0" cy="0" r="70" fill="none" stroke="#C9A227" strokeWidth="2.8"/>
                  <circle cx="0" cy="0" r="60" fill="none" stroke="#C9A227" strokeWidth="2.2"/>
                  <circle cx="0" cy="0" r="45" fill="none" stroke="#C9A227" strokeWidth="1.8" strokeDasharray="5 3"/>
                  <circle cx="0" cy="0" r="35" fill="none" stroke="#C9A227" strokeWidth="2.2"/>
                  <circle cx="0" cy="0" r="25" fill="none" stroke="#C9A227" strokeWidth="1.8"/>
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#C9A227" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="5" fill="#C9A227"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#journeySacredGeometry)"/>
          </svg>
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B1538]/75 via-[#8B1538]/80 to-[#6B0F2A]/85 pointer-events-none z-[1]"></div>
      
      <div className="container-elegant relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
            Follow Our Journey
          </h2>
          <p className="text-brass-gold text-sm sm:text-base md:text-lg lg:text-xl">
            See our products in action
          </p>
        </div>

        {/* Reels Carousel */}
        <div className="relative">
          {reels.length > 0 ? (
            <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-2 sm:-mx-4 px-2 sm:px-4 md:-mx-6 md:px-6">
              <div className="flex gap-3 sm:gap-4 md:gap-6 pb-4" style={{ width: 'max-content' }}>
                {reels.map((reel) => (
                  <div 
                    key={reel.id}
                    className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] lg:w-[360px]"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-brass-gold/30 hover:shadow-xl transition-shadow">
                      {/* Video Embed Area */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <iframe
                          src={getEmbedUrl(reel.video_url, reel.platform)}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                          allowFullScreen
                          loading="lazy"
                          scrolling="no"
                          title={reel.title}
                          style={{ 
                            pointerEvents: 'auto', 
                            objectFit: 'contain',
                            clipPath: 'inset(0 0 15% 0)',
                            transform: 'scale(1.18)',
                            transformOrigin: 'top center'
                          }}
                        />
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-4 bg-white">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-serif text-lg font-semibold text-charcoal line-clamp-2 flex-1">
                            {reel.title}
                          </h3>
                          <div className="ml-3 flex-shrink-0 bg-brass-gold text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md capitalize">
                            {reel.platform}
                          </div>
                        </div>
                        {reel.product_link && (
                          <Link 
                            href={reel.product_link}
                            className="inline-block text-brass-gold hover:text-white bg-white hover:bg-brass-gold border border-brass-gold px-4 py-2 rounded-lg text-sm font-semibold transition-all w-full text-center"
                          >
                            View Product
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cream-200">No reels available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

