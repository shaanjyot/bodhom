'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-serif font-bold text-deep-maroon mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-8">
          We encountered an error. Please try again or contact support if the problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-gradient-to-r from-brass-gold to-primary-dark text-white px-8 py-4 rounded-lg font-semibold hover:from-primary-dark hover:to-brass-gold transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  )
}

