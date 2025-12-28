import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-br from-brass-gold to-primary-dark p-1.5 sm:p-2 rounded-lg">
                <span className="text-white font-serif text-xl sm:text-2xl font-bold">ब</span>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">BodhOm</h3>
                <p className="text-[10px] sm:text-xs text-charcoal-300">Traditional Craftsmanship</p>
              </div>
            </Link>
            <p className="text-charcoal-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Preserving the rich heritage of Odisha's brass and copper craftsmanship.
              Each piece is handcrafted with love, passed down through generations of master artisans.
            </p>
            <div className="flex space-x-2 sm:space-x-3">
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'All Products', href: '/products' },
                { name: 'Collections', href: '/collections' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Blog', href: '/blog' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-charcoal-300 hover:text-brass-gold transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 text-white relative inline-block">
              Customer Service
              <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: 'Shipping Policy', href: '/shipping' },
                { name: 'Returns & Exchanges', href: '/returns' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Track Order', href: '/track-order' },
                { name: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-charcoal-300 hover:text-brass-gold transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 md:mb-6 text-white relative inline-block">
              Get in Touch
              <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-6 sm:w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Phone</p>
                  <span className="text-white text-xs sm:text-sm">+91 98765 43210</span>
                </div>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Email</p>
                  <span className="text-white text-xs sm:text-sm">info@bodhom.in</span>
                </div>
              </li>
              <li className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Location</p>
                  <span className="text-white text-xs sm:text-sm">Odisha, India</span>
                </div>
              </li>
            </ul>
            <p className="text-charcoal-400 text-[10px] sm:text-xs mt-4 sm:mt-6">
              Mon - Sat: 9:00 AM - 7:00 PM IST
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-charcoal-400 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Copyright BodhOm. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/terms" className="text-charcoal-400 hover:text-brass-gold text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-charcoal-400 hover:text-brass-gold text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
