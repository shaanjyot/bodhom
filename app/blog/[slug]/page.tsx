'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  category: string
  author: string
  author_image: string
  read_time: string
  published_at: string
  tags: string[]
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${slug}`)
      const data = await res.json()
      setPost(data.post)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT">
        <section className="relative bg-charcoal text-white pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-serif font-bold">Article Not Found</h1>
            <p className="text-cream-300 mt-4">The article you're looking for doesn't exist.</p>
            <Link href="/blog" className="inline-block mt-8 btn-gold text-white px-6 py-3 rounded-xl">
              Back to Blog
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        {post.featured_image && (
          <div className="absolute inset-0 opacity-30">
            <Image src={post.featured_image} alt="" fill className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/70 to-charcoal"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-cream-300 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
          {post.category && (
            <span className="inline-block bg-brass-gold text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-cream-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brass-gold flex items-center justify-center text-white font-semibold">
                {post.author?.charAt(0) || 'A'}
              </div>
              <span>{post.author}</span>
            </div>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {formatDate(post.published_at || post.slug)}
            </span>
            {post.read_time && (
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.read_time}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-soft-lg">
            <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div 
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal-500 prose-a:text-brass-gold prose-strong:text-charcoal"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-charcoal-400 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-4 py-2 bg-cream-200 text-charcoal-500 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-charcoal-400">Share this article</span>
            <div className="flex gap-3">
              <button className="p-2 bg-cream-200 rounded-full hover:bg-cream-300 transition-colors">
                <Share2 className="w-5 h-5 text-charcoal-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-soft">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brass-gold to-primary-dark flex items-center justify-center text-white text-2xl font-semibold">
              {post.author?.charAt(0) || 'A'}
            </div>
            <div>
              <h3 className="font-semibold text-charcoal text-lg">Written by {post.author}</h3>
              <p className="text-charcoal-400 mt-1">
                Sharing stories and insights about traditional Indian craftsmanship and the artisans behind BodhOm's collections.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-8 text-center">
            Continue Reading
          </h2>
          <div className="text-center">
            <Link href="/blog" className="btn-gold text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
