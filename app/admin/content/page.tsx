'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, X } from 'lucide-react'

interface ContentSection {
  id: string
  page_key: string
  section_key: string
  content: any
}

export default function ContentManagementPage() {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editingContent, setEditingContent] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content')
      const data = await res.json()
      setSections(data.content || [])
      
      // Initialize editing content
      const contentMap: Record<string, string> = {}
      data.content?.forEach((section: ContentSection) => {
        contentMap[`${section.page_key}-${section.section_key}`] = JSON.stringify(section.content, null, 2)
      })
      setEditingContent(contentMap)
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSection = async (pageKey: string, sectionKey: string) => {
    const key = `${pageKey}-${sectionKey}`
    setSaving(key)
    
    try {
      const content = JSON.parse(editingContent[key])
      
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_key: pageKey,
          section_key: sectionKey,
          content,
        }),
      })
      
      fetchContent()
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Failed to save. Make sure JSON is valid.')
    } finally {
      setSaving(null)
    }
  }

  const predefinedSections = [
    { page: 'home', section: 'hero', label: 'Home - Hero Section' },
    { page: 'home', section: 'why_choose_us', label: 'Home - Why Choose Us' },
    { page: 'home', section: 'newsletter', label: 'Home - Newsletter' },
    { page: 'about', section: 'story', label: 'About - Our Story' },
    { page: 'about', section: 'values', label: 'About - Our Values' },
    { page: 'contact', section: 'info', label: 'Contact - Information' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Page Content</h1>
          <p className="text-charcoal-400 mt-1">Edit website content sections</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {predefinedSections.map(({ page, section, label }) => {
            const key = `${page}-${section}`
            const existingSection = sections.find(
              (s) => s.page_key === page && s.section_key === section
            )
            
            return (
              <div key={key} className="bg-white rounded-xl shadow-soft p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-charcoal">{label}</h2>
                  <button
                    onClick={() => saveSection(page, section)}
                    disabled={saving === key}
                    className="btn-gold text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving === key ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
                <div className="text-sm text-charcoal-400 mb-2">
                  Page: <code className="bg-gray-100 px-1 rounded">{page}</code> | 
                  Section: <code className="bg-gray-100 px-1 rounded">{section}</code>
                </div>
                <textarea
                  value={editingContent[key] || '{}'}
                  onChange={(e) => setEditingContent({ ...editingContent, [key]: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  placeholder={`{
  "title": "Section Title",
  "content": "Your content here..."
}`}
                />
              </div>
            )
          })}

          {/* Display any additional sections from database */}
          {sections
            .filter((s) => !predefinedSections.find(
              (p) => p.page === s.page_key && p.section === s.section_key
            ))
            .map((section) => {
              const key = `${section.page_key}-${section.section_key}`
              return (
                <div key={key} className="bg-white rounded-xl shadow-soft p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-charcoal">
                      {section.page_key} - {section.section_key}
                    </h2>
                    <button
                      onClick={() => saveSection(section.page_key, section.section_key)}
                      disabled={saving === key}
                      className="btn-gold text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                  <textarea
                    value={editingContent[key] || '{}'}
                    onChange={(e) => setEditingContent({ ...editingContent, [key]: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  />
                </div>
              )
            })}

          <div className="bg-cream-100 rounded-xl p-6">
            <h3 className="font-semibold text-charcoal mb-2">💡 Content Format Guide</h3>
            <p className="text-charcoal-500 text-sm mb-4">
              Content is stored as JSON. Each section can have different structure based on your needs.
            </p>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto">
{`// Example for "Why Choose Us" section:
{
  "title": "Why Choose BodhOm",
  "subtitle": "Our Promise",
  "items": [
    {
      "icon": "✨",
      "title": "Authentic Craftsmanship",
      "description": "Each piece is handcrafted..."
    }
  ]
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

