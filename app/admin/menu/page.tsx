'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, GripVertical, ExternalLink, Save } from 'lucide-react'

interface MenuItem {
  id: string
  title: string
  url: string
  menu_location: string
  sort_order: number
  is_active: boolean
  open_in_new_tab: boolean
}

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    title: '',
    url: '',
    menu_location: 'header',
    is_active: true,
    open_in_new_tab: false,
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu-items?active=false')
      const data = await res.json()
      setMenuItems(data.menuItems || [])
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMenuItem = async () => {
    if (!newItem.title || !newItem.url) {
      alert('Please fill in title and URL')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })

      if (res.ok) {
        fetchMenuItems()
        setNewItem({
          title: '',
          url: '',
          menu_location: 'header',
          is_active: true,
          open_in_new_tab: false,
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error adding menu item:', error)
    } finally {
      setSaving(false)
    }
  }

  const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
    try {
      await fetch(`/api/menu-items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      fetchMenuItems()
      setEditingItem(null)
    } catch (error) {
      console.error('Error updating menu item:', error)
    }
  }

  const deleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return

    try {
      await fetch(`/api/menu-items/${id}`, { method: 'DELETE' })
      setMenuItems(menuItems.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting menu item:', error)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    await updateMenuItem(id, { is_active: !currentStatus })
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, is_active: !currentStatus } : item
    ))
  }

  const moveItem = async (id: string, direction: 'up' | 'down') => {
    const index = menuItems.findIndex(item => item.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === menuItems.length - 1)
    ) {
      return
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newItems = [...menuItems]
    const [movedItem] = newItems.splice(index, 1)
    newItems.splice(newIndex, 0, movedItem)

    // Update sort_order
    const updates = newItems.map((item, i) => ({ id: item.id, sort_order: i + 1 }))
    
    setMenuItems(newItems)

    try {
      await fetch('/api/menu-items', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updates }),
      })
    } catch (error) {
      console.error('Error reordering menu items:', error)
      fetchMenuItems()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Menu Items</h1>
          <p className="text-charcoal-400 mt-1">Manage navigation menu</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Menu Item
        </button>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Add Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Title *</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  placeholder="Menu item title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">URL *</label>
                <input
                  type="text"
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  placeholder="/page-slug or https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                <select
                  value={newItem.menu_location}
                  onChange={(e) => setNewItem({ ...newItem, menu_location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                >
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.open_in_new_tab}
                  onChange={(e) => setNewItem({ ...newItem, open_in_new_tab: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
                />
                <span className="text-sm text-charcoal">Open in new tab</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-charcoal hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addMenuItem}
                disabled={saving}
                className="btn-gold text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? 'Adding...' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-charcoal mb-4">Edit Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">URL</label>
                <input
                  type="text"
                  value={editingItem.url}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brass-gold"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingItem.open_in_new_tab}
                  onChange={(e) => setEditingItem({ ...editingItem, open_in_new_tab: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
                />
                <span className="text-sm text-charcoal">Open in new tab</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-charcoal hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => updateMenuItem(editingItem.id, editingItem)}
                className="btn-gold text-white px-6 py-2 rounded-lg font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : menuItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-12 text-center">
          <div className="text-6xl mb-4">🔗</div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">No Menu Items Yet</h3>
          <p className="text-charcoal-400 mb-6">Add menu items to build your navigation</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-12 px-4 py-4"></th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">Title</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal">URL</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-charcoal">Location</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-charcoal">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-charcoal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {menuItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={index === 0}
                        className="text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={index === menuItems.length - 1}
                        className="text-charcoal-400 hover:text-charcoal disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-charcoal">{item.title}</span>
                    {item.open_in_new_tab && (
                      <ExternalLink className="w-3 h-3 inline-block ml-1 text-charcoal-400" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-charcoal-400 bg-gray-100 px-2 py-1 rounded">
                      {item.url}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-charcoal-500 capitalize">{item.menu_location}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(item.id, item.is_active)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.is_active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-charcoal-400 hover:text-brass-gold hover:bg-cream-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteMenuItem(item.id)}
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
