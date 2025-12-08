'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, X, Star, Eye, EyeOff } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  location: string
  initials: string
  rating: number
  text: string
  product: string
  is_active: boolean
  sort_order: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    initials: '',
    rating: 5,
    text: '',
    product: '',
    is_active: true,
    sort_order: 0,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?active=false')
      const data = await res.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial)
      setFormData({
        name: testimonial.name,
        location: testimonial.location || '',
        initials: testimonial.initials || '',
        rating: testimonial.rating || 5,
        text: testimonial.text,
        product: testimonial.product || '',
        is_active: testimonial.is_active,
        sort_order: testimonial.sort_order || 0,
      })
    } else {
      setEditingTestimonial(null)
      setFormData({
        name: '',
        location: '',
        initials: '',
        rating: 5,
        text: '',
        product: '',
        is_active: true,
        sort_order: testimonials.length + 1,
      })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTestimonial(null)
  }

  const generateInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        ...formData,
        initials: formData.initials || generateInitials(formData.name),
      }

      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial.id}` : '/api/testimonials'
      const method = editingTestimonial ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        fetchTestimonials()
        closeModal()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to save testimonial')
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (id: string, is_active: boolean) => {
    try {
      await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !is_active }),
      })
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_active: !is_active } : t))
    } catch (error) {
      console.error('Error toggling testimonial status:', error)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      setTestimonials(testimonials.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Testimonials</h1>
          <p className="text-charcoal-400 mt-1">Manage customer reviews</p>
        </div>
        <button
          onClick={() => openModal()}
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-16 text-center">
          <p className="text-charcoal-400 mb-4">No testimonials found</p>
          <button onClick={() => openModal()} className="text-brass-gold hover:text-primary-dark font-medium">
            Add your first testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brass-gold to-primary-dark flex items-center justify-center text-white font-semibold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">{testimonial.name}</h3>
                    {testimonial.location && (
                      <p className="text-sm text-charcoal-400">{testimonial.location}</p>
                    )}
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  testimonial.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {testimonial.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-charcoal-500 text-sm line-clamp-4 mb-4">"{testimonial.text}"</p>
              
              {testimonial.product && (
                <p className="text-xs text-charcoal-400 mb-4">
                  Product: <span className="font-medium">{testimonial.product}</span>
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleActive(testimonial.id, testimonial.is_active)}
                  className={`p-2 rounded-lg transition-colors ${
                    testimonial.is_active
                      ? 'text-green-600 hover:bg-green-50'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {testimonial.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => openModal(testimonial)}
                  className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-charcoal">
                {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Initials</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.initials}
                    onChange={(e) => setFormData({ ...formData, initials: e.target.value.toUpperCase() })}
                    placeholder={generateInitials(formData.name) || 'AB'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Mumbai, Maharashtra"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${rating <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Review Text *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Product Purchased</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  placeholder="Brass Diya Set"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
                />
                <span className="text-charcoal">Active (visible on website)</span>
              </label>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-semibold text-charcoal hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-gold text-white px-4 py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingTestimonial ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
