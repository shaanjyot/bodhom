'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/categories?active=true')
      const data = await res.json()
      if (data.categories && Array.isArray(data.categories)) {
        setCollections(data.categories)
      }
    } catch (error) {
      console.error('Error fetching collections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-brass-gold font-medium tracking-widest uppercase mb-4">Loading...</p>
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide2.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Curated for You</p>
          <div className="ethnic-title-wrapper">
            <h1 className="text-5xl md:text-6xl font-serif font-bold title-decorated animate-fade-in-up">
              Our Collections
            </h1>
          </div>
          <p className="text-xl text-cream-300 max-w-2xl mx-auto animate-fade-in-up stagger-2 mt-6">
            Explore our carefully curated collections of traditional brass and copper works
          </p>
        </div>
      </section>

      <div className="section-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <Link
                key={index}
                href={`/collections/${collection.slug}`}
                className="group bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500 overflow-hidden card-glow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={collection.image || `/slide${(index % 9)}.webp`}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Explore Collection</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-charcoal mb-2 group-hover:text-brass-gold transition-colors">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="text-charcoal-400 mb-4">
                      {collection.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
