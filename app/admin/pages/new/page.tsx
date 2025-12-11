'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewPagePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    featured_image: '',
    is_published: false,
    show_in_menu: false,
    menu_order: 0,
    template: 'default',
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('file', files[0])
      formDataUpload.append('bucket', 'assets')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (res.ok) {
        const data = await res.json()
        setFormData((prev) => ({ ...prev, featured_image: data.url }))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        ...formData,
        menu_order: parseInt(formData.menu_order.toString()),
      }

      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/pages')
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to create page')
      }
    } catch (error) {
      console.error('Error creating page:', error)
      alert('Failed to create page')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/pages" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-charcoal" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">New Page</h1>
          <p className="text-charcoal-400 mt-1">Create a new website page</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Featured Image */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Featured Image</h2>
          <div className="flex items-start gap-4">
            {formData.featured_image ? (
              <div className="relative w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
                <Image src={formData.featured_image} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured_image: '' })}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brass-gold transition-colors">
                {uploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brass-gold"></div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Page Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-charcoal mb-2">Page Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">URL Slug</label>
              <div className="flex items-center">
                <span className="text-charcoal-400 mr-1">/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Template</label>
              <select
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              >
                <option value="default">Default</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
                <option value="full-width">Full Width</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-charcoal mb-2">Content</label>
              <textarea
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter page content (HTML supported)"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="Page title for search engines"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Meta Description</label>
              <textarea
                rows={2}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Brief description for search engines"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Publishing Options</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
              />
              <span className="text-charcoal">Publish page (make it publicly visible)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.show_in_menu}
                onChange={(e) => setFormData({ ...formData, show_in_menu: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
              />
              <span className="text-charcoal">Show in navigation menu</span>
            </label>
            {formData.show_in_menu && (
              <div className="ml-8">
                <label className="block text-sm font-medium text-charcoal mb-2">Menu Order</label>
                <input
                  type="number"
                  value={formData.menu_order}
                  onChange={(e) => setFormData({ ...formData, menu_order: parseInt(e.target.value) || 0 })}
                  className="w-24 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/pages" className="px-6 py-3 border border-gray-300 rounded-xl font-semibold text-charcoal hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="btn-gold text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Page'}
          </button>
        </div>
      </form>
    </div>
  )
}
