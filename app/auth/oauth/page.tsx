'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function OAuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const provider = searchParams.get('provider')
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      setStatus('error')
      setMessage('Authentication failed. Please try again.')
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
      return
    }

    if (code && provider) {
      // Simulate OAuth callback processing
      handleOAuthCallback(provider, code)
    } else {
      setStatus('error')
      setMessage('Invalid authentication parameters.')
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    }
  }, [searchParams, router])

  const handleOAuthCallback = async (provider: string, code: string) => {
    try {
      // Simulate API call to verify OAuth token
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Exchange the code for tokens
      // 2. Get user info from the provider
      // 3. Create or update user in your database
      // 4. Create a session

      setStatus('success')
      setMessage(`Successfully authenticated with ${provider}!`)

      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      setStatus('error')
      setMessage('Authentication failed. Please try again.')
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sandstone-beige via-white to-sandstone-beige flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-elegant-lg p-8 text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-brass-gold to-primary-dark p-3 rounded-lg">
              <span className="text-white font-serif text-3xl font-bold">ब</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-deep-maroon">BodhOm</h1>
            </div>
          </Link>

          {/* Status Display */}
          <div className="py-8">
            {status === 'loading' && (
              <>
                <Loader2 className="w-16 h-16 text-brass-gold animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating...</h2>
                <p className="text-gray-600">Please wait while we verify your credentials.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle2 className="w-16 h-16 text-bodhi-green mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
                <p className="text-gray-600">{message}</p>
                <p className="text-sm text-gray-500 mt-2">Redirecting you now...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
                <p className="text-gray-600">{message}</p>
                <p className="text-sm text-gray-500 mt-2">Redirecting to login page...</p>
              </>
            )}
          </div>

          {/* Manual Redirect */}
          {status !== 'loading' && (
            <div className="mt-6">
              <Link
                href="/auth/login"
                className="text-brass-gold hover:text-primary-dark font-medium text-sm"
              >
                Go to Login Page →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

