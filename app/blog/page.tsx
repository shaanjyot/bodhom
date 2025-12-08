'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  category: string
  author: string
  read_time: string
  published_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [search, category])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (category) params.set('category', category)

      const res = await fetch(`/api/blog?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['Craftsmanship', 'Knowledge', 'Lifestyle', 'Culture', 'News']

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/slide6.webp')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brass-gold font-medium tracking-widest uppercase mb-4 animate-fade-in">Our Journal</p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 animate-fade-in-up">
            Stories & Insights
          </h1>
          <p className="text-xl text-cream-300 max-w-2xl mx-auto">
            Discover the art, heritage, and traditions behind our handcrafted brass and copper treasures.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                !category ? 'bg-brass-gold text-white' : 'bg-white text-charcoal hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  category === cat ? 'bg-brass-gold text-white' : 'bg-white text-charcoal hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-400 text-lg">No articles found</p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-brass-gold hover:text-primary-dark font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug || post.id}`}
                className={`group bg-white rounded-2xl shadow-soft hover:shadow-soft-lg overflow-hidden transition-all duration-300 ${
                  index === 0 && !search && !category ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  index === 0 && !search && !category ? 'h-80 md:h-full' : 'h-48'
                }`}>
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cream-200 to-cream-100 flex items-center justify-center">
                      <span className="text-6xl">📝</span>
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-4 left-4 bg-brass-gold text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className={`p-6 ${index === 0 && !search && !category ? 'md:p-8' : ''}`}>
                  <div className="flex items-center gap-4 text-charcoal-400 text-sm mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.published_at || post.slug)}
                    </span>
                    {post.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time}
                      </span>
                    )}
                  </div>
                  <h2 className={`font-serif font-bold text-charcoal group-hover:text-brass-gold transition-colors mb-3 ${
                    index === 0 && !search && !category ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className={`text-charcoal-500 mb-4 ${
                      index === 0 && !search && !category ? 'line-clamp-4' : 'line-clamp-2'
                    }`}>
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-brass-gold font-medium">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

