import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-brass-gold to-primary-dark p-2 rounded-lg">
                <span className="text-white font-serif text-2xl font-bold">ब</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">BodhOm</h3>
                <p className="text-xs text-charcoal-300">Traditional Craftsmanship</p>
              </div>
            </Link>
            <p className="text-charcoal-300 text-sm mb-6 leading-relaxed">
              Preserving the rich heritage of Odisha's brass and copper craftsmanship.
              Each piece is handcrafted with love, passed down through generations of master artisans.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center text-charcoal-300 hover:bg-brass-gold hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-3">
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
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-brass-gold"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                  <span className="text-white text-sm">+91 98765 43210</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Email</p>
                  <span className="text-white text-sm">info@bodhom.in</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brass-gold" />
                </div>
                <div>
                  <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Location</p>
                  <span className="text-white text-sm">Odisha, India</span>
                </div>
              </li>
            </ul>
            <p className="text-charcoal-400 text-xs mt-6">
              Mon - Sat: 9:00 AM - 7:00 PM IST
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-charcoal-400 text-sm text-center md:text-left">
              © 2025 The Explorer. Developed by Shantanu Goswami
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-charcoal-400 hover:text-brass-gold text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-charcoal-400 hover:text-brass-gold text-sm transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
