'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'

interface Reel {
  id: string
  title: string
  video_url: string
  platform: string
  product_link?: string
  thumbnail_url?: string
  is_active: boolean
  sort_order: number
}

export default function ReelsPage() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReels()
  }, [])

  const fetchReels = async () => {
    try {
      const res = await fetch('/api/reels?active=false')
      const data = await res.json()
      setReels(data.reels || [])
    } catch (error) {
      console.error('Error fetching reels:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, is_active: boolean) => {
    try {
      await fetch(`/api/reels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !is_active }),
      })
      setReels(reels.map(r => r.id === id ? { ...r, is_active: !is_active } : r))
    } catch (error) {
      console.error('Error toggling reel status:', error)
    }
  }

  const deleteReel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reel?')) return
    
    try {
      await fetch(`/api/reels/${id}`, { method: 'DELETE' })
      setReels(reels.filter(r => r.id !== id))
    } catch (error) {
      console.error('Error deleting reel:', error)
    }
  }

  const updateSortOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/reels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: newOrder }),
      })
      fetchReels()
    } catch (error) {
      console.error('Error updating sort order:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Reels & Shorts</h1>
          <p className="text-charcoal-400 mt-1">Manage Instagram, Facebook, and YouTube reels</p>
        </div>
        <Link
          href="/admin/reels/new"
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Reel
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : reels.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-16 text-center">
          <p className="text-charcoal-400 mb-4">No reels found</p>
          <Link href="/admin/reels/new" className="text-brass-gold hover:text-primary-dark font-medium">
            Create your first reel
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reels
            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
            .map((reel, index) => (
            <div key={reel.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-64 relative bg-gray-100 flex-shrink-0">
                  {reel.thumbnail_url ? (
                    <img src={reel.thumbnail_url} alt={reel.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full min-h-[160px] flex items-center justify-center text-6xl opacity-50">
                      🎬
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-charcoal-400">#{index + 1}</span>
                        <h3 className="font-semibold text-charcoal text-lg">{reel.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          reel.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {reel.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-brass-gold/10 text-brass-gold capitalize">
                          {reel.platform}
                        </span>
                      </div>
                      <p className="text-sm text-charcoal-500 mt-2 break-all">
                        <span className="font-medium">URL:</span> {reel.video_url}
                      </p>
                      {reel.product_link && (
                        <p className="text-sm text-charcoal-400 mt-2">
                          <span className="font-medium">Product Link:</span> {reel.product_link}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 mr-2">
                        <button
                          onClick={() => updateSortOrder(reel.id, (reel.sort_order || 0) - 1)}
                          disabled={index === 0}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => updateSortOrder(reel.id, (reel.sort_order || 0) + 1)}
                          disabled={index === reels.length - 1}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        onClick={() => toggleActive(reel.id, reel.is_active)}
                        className={`p-2 rounded-lg transition-colors ${
                          reel.is_active
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {reel.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <Link
                        href={`/admin/reels/${reel.id}`}
                        className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deleteReel(reel.id)}
                        className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

