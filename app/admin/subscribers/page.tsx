'use client'

import { useState, useEffect } from 'react'
import { Mail, Download, Trash2 } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  is_active: boolean
  created_at: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/newsletter?active=false')
      const data = await res.json()
      setSubscribers(data.subscribers || [])
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportSubscribers = () => {
    const activeEmails = subscribers
      .filter((s) => s.is_active)
      .map((s) => s.email)
      .join('\n')
    
    const blob = new Blob([activeEmails], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const activeCount = subscribers.filter((s) => s.is_active).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Newsletter Subscribers</h1>
          <p className="text-charcoal-400 mt-1">
            {activeCount} active subscribers
          </p>
        </div>
        <button
          onClick={exportSubscribers}
          className="btn-gold text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export Emails
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-soft p-16 text-center">
          <Mail className="w-16 h-16 text-cream-400 mx-auto mb-4" />
          <p className="text-charcoal-400">No subscribers yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-semibold text-charcoal-400">Email</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-charcoal-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-charcoal-400">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-charcoal-400" />
                      <span className="text-charcoal">{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subscriber.is_active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-charcoal-500">
                    {formatDate(subscriber.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-charcoal-400 text-sm">Total Subscribers</p>
          <p className="text-3xl font-bold text-charcoal mt-1">{subscribers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-charcoal-400 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-soft p-6">
          <p className="text-charcoal-400 text-sm">Unsubscribed</p>
          <p className="text-3xl font-bold text-charcoal-400 mt-1">{subscribers.length - activeCount}</p>
        </div>
      </div>
    </div>
  )
}

