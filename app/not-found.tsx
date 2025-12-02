'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sandstone-beige via-white to-sandstone-beige flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-brass-gold mb-4">404</h1>
          <h2 className="text-3xl font-serif font-bold text-deep-maroon mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-gradient-to-r from-brass-gold to-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-dark hover:to-brass-gold transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center bg-white border-2 border-brass-gold text-brass-gold px-8 py-4 rounded-lg font-semibold hover:bg-brass-gold hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

