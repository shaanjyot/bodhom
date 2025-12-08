'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  category: string
  author: string
  is_published: boolean
  published_at: string
  created_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?published=false')
      const data = await res.json()
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (id: string, is_published: boolean) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          is_published: !is_published,
          published_at: !is_published ? new Date().toISOString() : null
        }),
      })
      setPosts(posts.map(p => p.id === id ? { ...p, is_published: !is_published } : p))
    } catch (error) {
      console.error('Error toggling post status:', error)
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      setPosts(posts.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Blog Posts</h1>
          <p className="text-charcoal-400 mt-1">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-400 mb-4">No blog posts found</p>
            <Link href="/admin/blog/new" className="text-brass-gold hover:text-primary-dark font-medium">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-brass-gold/30 transition-colors">
                <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {post.featured_image ? (
                    <Image src={post.featured_image} alt={post.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">📝</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-charcoal truncate">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="text-charcoal-500 text-sm line-clamp-1 mb-2">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-charcoal-400">
                    {post.category && (
                      <span className="bg-cream-100 text-charcoal-500 px-2 py-1 rounded">{post.category}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    {post.author && <span>By {post.author}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => togglePublished(post.id, post.is_published)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.is_published
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={post.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {post.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
