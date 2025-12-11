'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, Menu } from 'lucide-react'

interface Page {
  id: string
  title: string
  slug: string
  is_published: boolean
  show_in_menu: boolean
  template: string
  updated_at: string
}

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/pages?published=false')
      const data = await res.json()
      setPages(data.pages || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !currentStatus }),
      })
      setPages(pages.map(p => p.id === id ? { ...p, is_published: !currentStatus } : p))
    } catch (error) {
      console.error('Error updating page:', error)
    }
  }

  const deletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    
    try {
      await fetch(`/api/pages/${id}`, { method: 'DELETE' })
      setPages(pages.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting page:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Pages</h1>
          <p className="text-charcoal-400 mt-1">Manage website pages</p>
        </div>
        <Link
          href="/admin/pages/new"
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Page
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-12 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">No Pages Yet</h3>
          <p className="text-charcoal-400 mb-6">Create your first page to get started</p>
          <Link
            href="/admin/pages/new"
            className="btn-gold text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Page
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">Slug</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">Template</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-charcoal">Status</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-charcoal">In Menu</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-charcoal">{page.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-charcoal-400 bg-gray-100 px-2 py-1 rounded">
                      /{page.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-charcoal-500 capitalize">{page.template}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => togglePublished(page.id, page.is_published)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        page.is_published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {page.is_published ? (
                        <>
                          <Eye className="w-3 h-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {page.show_in_menu ? (
                      <span className="inline-flex items-center gap-1 text-brass-gold">
                        <Menu className="w-4 h-4" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-charcoal-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-2 text-charcoal-400 hover:text-charcoal hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Page"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/admin/pages/${page.id}`}
                        className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="p-2 text-charcoal-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
