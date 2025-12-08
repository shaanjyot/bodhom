'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, X, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function EditSlidePage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    button_text: '',
    button_link: '',
    is_active: true,
  })

  useEffect(() => {
    if (id) {
      fetchSlide()
    }
  }, [id])

  const fetchSlide = async () => {
    try {
      const res = await fetch(`/api/slides/${id}`)
      const data = await res.json()
      if (data.slide) {
        const s = data.slide
        setFormData({
          title: s.title || '',
          subtitle: s.subtitle || '',
          description: s.description || '',
          button_text: s.button_text || '',
          button_link: s.button_link || '',
          is_active: s.is_active ?? true,
        })
        setImage(s.image || '')
      }
    } catch (error) {
      console.error('Error fetching slide:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', 'slides')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setImage(data.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await fetch(`/api/slides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image }),
      })

      if (res.ok) {
        router.push('/admin/slides')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to update slide')
      }
    } catch (error) {
      console.error('Error updating slide:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    
    setDeleting(true)
    try {
      const res = await fetch(`/api/slides/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/admin/slides')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete slide')
      }
    } catch (error) {
      console.error('Error deleting slide:', error)
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
          <Link href="/admin/slides" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6 text-charcoal" />
          </Link>
          <div>
            <h1 className="text-3xl font-serif font-bold text-charcoal">Edit Slide</h1>
            <p className="text-charcoal-400 mt-1">Update slide content</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Trash2 className="w-5 h-5" />
          {deleting ? 'Deleting...' : 'Delete Slide'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Slide Image</h2>
          {image ? (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100">
              <Image src={image} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setImage('')}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="block aspect-[16/9] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brass-gold">
              {uploading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <span className="text-charcoal-400">Click to upload</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Button Text</label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Button Link</label>
              <input
                type="text"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              />
            </div>
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
          <Link href="/admin/slides" className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-charcoal hover:bg-gray-50">
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
