'use client'

import { useHomePage } from '@/contexts/HomePageContext'

export default function NewsletterSection() {
  const {
    newsletterEmail,
    setNewsletterEmail,
    newsletterSubmitting,
    newsletterMessage,
    handleNewsletterSubmit,
  } = useHomePage()

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-charcoal text-white relative overflow-hidden">
      {/* Animated White Tribal Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="tribal-pattern-rotate absolute opacity-[0.04]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="whiteTribalPattern" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                <g transform="translate(90,90)">
                  <circle cx="0" cy="0" r="70" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 4"/>
                  <circle cx="0" cy="0" r="60" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="50" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="35" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 2"/>
                  <circle cx="0" cy="0" r="25" fill="none" stroke="#FFFFFF" strokeWidth="1.5"/>
                  <circle cx="0" cy="0" r="15" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
                  <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#whiteTribalPattern)"/>
          </svg>
        </div>
        
        {/* Floating dots */}
        <div className="tribal-pattern-float-slow absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="whiteFloatingDots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="#FFFFFF"/>
                <circle cx="25" cy="25" r="1.5" fill="#FFFFFF"/>
                <circle cx="75" cy="25" r="1.5" fill="#FFFFFF"/>
                <circle cx="25" cy="75" r="1.5" fill="#FFFFFF"/>
                <circle cx="75" cy="75" r="1.5" fill="#FFFFFF"/>
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
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-charcoal/30 to-charcoal/60 pointer-events-none z-[1]"></div>
      
      <div className="container-elegant relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brass-gold font-semibold tracking-widest uppercase mb-2 sm:mb-3 text-xs sm:text-sm md:text-base lg:text-lg">Stay Connected</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 sm:mb-4">
            Join Our Community
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream-200 font-medium mb-6 sm:mb-8 md:mb-10">
            Get exclusive offers, artisan stories, and updates on new collections delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-charcoal-700 border border-charcoal-600 text-white placeholder-charcoal-400 focus:outline-none focus:border-brass-gold transition-colors"
            />
            <button 
              type="submit"
              disabled={newsletterSubmitting}
              className="btn-gold text-white px-8 py-4 rounded-xl font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {newsletterMessage && (
            <p className={`text-sm mt-4 ${newsletterMessage.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
              {newsletterMessage}
            </p>
          )}
          <p className="text-charcoal-400 text-sm mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

