'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react'

interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  button_text: string
  button_link: string
  is_active: boolean
  sort_order: number
}

export default function SlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/slides?active=false')
      const data = await res.json()
      setSlides(data.slides || [])
    } catch (error) {
      console.error('Error fetching slides:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, is_active: boolean) => {
    try {
      await fetch(`/api/slides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !is_active }),
      })
      setSlides(slides.map(s => s.id === id ? { ...s, is_active: !is_active } : s))
    } catch (error) {
      console.error('Error toggling slide status:', error)
    }
  }

  const deleteSlide = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    
    try {
      await fetch(`/api/slides/${id}`, { method: 'DELETE' })
      setSlides(slides.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting slide:', error)
    }
  }

  const updateSortOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/slides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sort_order: newOrder }),
      })
      fetchSlides()
    } catch (error) {
      console.error('Error updating sort order:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Hero Slides</h1>
          <p className="text-charcoal-400 mt-1">Manage homepage slider content</p>
        </div>
        <Link
          href="/admin/slides/new"
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Slide
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : slides.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-16 text-center">
          <p className="text-charcoal-400 mb-4">No slides found</p>
          <Link href="/admin/slides/new" className="text-brass-gold hover:text-primary-dark font-medium">
            Create your first slide
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {slides
            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
            .map((slide, index) => (
            <div key={slide.id} className="bg-white rounded-xl shadow-soft overflow-hidden">
              <div className="flex items-stretch">
                <div className="w-64 relative bg-gray-100 flex-shrink-0">
                  {slide.image ? (
                    <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full min-h-[160px] flex items-center justify-center text-6xl opacity-50">
                      🖼️
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-charcoal-400">#{index + 1}</span>
                        <h3 className="font-semibold text-charcoal text-lg">{slide.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          slide.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {slide.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {slide.subtitle && (
                        <p className="text-brass-gold font-medium">{slide.subtitle}</p>
                      )}
                      {slide.description && (
                        <p className="text-charcoal-500 text-sm mt-2 line-clamp-2">{slide.description}</p>
                      )}
                      {slide.button_text && (
                        <p className="text-sm text-charcoal-400 mt-2">
                          Button: <span className="font-medium">{slide.button_text}</span> → {slide.button_link}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 mr-2">
                        <button
                          onClick={() => updateSortOrder(slide.id, (slide.sort_order || 0) - 1)}
                          disabled={index === 0}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => updateSortOrder(slide.id, (slide.sort_order || 0) + 1)}
                          disabled={index === slides.length - 1}
                          className="p-1 text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        onClick={() => toggleActive(slide.id, slide.is_active)}
                        className={`p-2 rounded-lg transition-colors ${
                          slide.is_active
                            ? 'text-green-600 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {slide.is_active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                      <Link
                        href={`/admin/slides/${slide.id}`}
                        className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deleteSlide(slide.id)}
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
