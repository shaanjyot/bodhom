'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function EditReelPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    platform: 'instagram',
    product_link: '',
    thumbnail_url: '',
    is_active: true,
  })

  useEffect(() => {
    if (id) {
      fetchReel()
    }
  }, [id])

  const fetchReel = async () => {
    try {
      const res = await fetch(`/api/reels/${id}`)
      const data = await res.json()
      if (data.reel) {
        const r = data.reel
        setFormData({
          title: r.title || '',
          video_url: r.video_url || '',
          platform: r.platform || 'instagram',
          product_link: r.product_link || '',
          thumbnail_url: r.thumbnail_url || '',
          is_active: r.is_active ?? true,
        })
      }
    } catch (error) {
      console.error('Error fetching reel:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/reels/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/reels')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to update reel')
      }
    } catch (error) {
      console.error('Error updating reel:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this reel? This action cannot be undone.')) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/reels/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/admin/reels')
      } else {
        alert('Failed to delete reel')
      }
    } catch (error) {
      console.error('Error deleting reel:', error)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/reels" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal">Edit Reel</h1>
            <p className="text-charcoal-400 mt-1">Update reel information</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 disabled:opacity-50 flex items-center gap-2"
        >
          <Trash2 className="w-5 h-5" />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl shadow-soft p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Handcrafted Brass Diya Set"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Platform *</label>
            <select
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Video URL *</label>
            <input
              type="url"
              required
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              placeholder="https://www.instagram.com/reel/..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
            <p className="text-xs text-charcoal-400 mt-1">Paste the full URL of the Instagram/Facebook/YouTube reel or short</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Thumbnail URL (Optional)</label>
            <input
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
            <p className="text-xs text-charcoal-400 mt-1">Optional: URL to a thumbnail image for the reel</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Product Link (Optional)</label>
            <input
              type="url"
              value={formData.product_link}
              onChange={(e) => setFormData({ ...formData, product_link: e.target.value })}
              placeholder="/products/123 or https://..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
            <p className="text-xs text-charcoal-400 mt-1">Optional: Link to a product page related to this reel</p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
            />
            <span className="text-charcoal">Active (show on homepage)</span>
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/reels" className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-charcoal hover:bg-gray-50">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="btn-gold text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

