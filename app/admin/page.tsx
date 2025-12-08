'use client'

import { useState, useEffect } from 'react'
import { Package, ShoppingCart, DollarSign, Users, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  recentOrders: any[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    recentOrders: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch products count
      const productsRes = await fetch('/api/products?limit=1')
      const productsData = await productsRes.json()

      // Fetch orders
      const ordersRes = await fetch('/api/orders?limit=10')
      const ordersData = await ordersRes.json()

      // Calculate stats
      const totalRevenue = ordersData.orders?.reduce(
        (sum: number, order: any) => 
          order.payment_status === 'paid' ? sum + parseFloat(order.total) : sum,
        0
      ) || 0

      const pendingOrders = ordersData.orders?.filter(
        (order: any) => order.status === 'pending'
      ).length || 0

      setStats({
        totalProducts: productsData.total || 0,
        totalOrders: ordersData.total || 0,
        totalRevenue,
        pendingOrders,
        recentOrders: ordersData.orders?.slice(0, 5) || [],
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      href: '/admin/orders',
    },
    {
      title: 'Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-brass-gold',
      href: '/admin/orders',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'bg-orange-500',
      href: '/admin/orders?status=pending',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-charcoal mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-soft-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-charcoal-400 text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-charcoal">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-charcoal">Recent Orders</h2>
          <Link 
            href="/admin/orders"
            className="text-brass-gold hover:text-primary-dark font-medium text-sm"
          >
            View All →
          </Link>
        </div>

        {stats.recentOrders.length === 0 ? (
          <p className="text-charcoal-400 text-center py-8">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Order #</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Payment</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-charcoal-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-charcoal">
                      {order.order_number}
                    </td>
                    <td className="py-3 px-4 text-sm text-charcoal-500">
                      {order.customer_name}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-charcoal">
                      ₹{parseFloat(order.total).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${order.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : ''}
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : ''}
                        ${order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${order.payment_status === 'failed' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link 
                        href={`/admin/orders/${order.id}`}
                        className="text-brass-gold hover:text-primary-dark"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          href="/admin/products/new"
          className="bg-brass-gold text-white rounded-xl p-6 text-center hover:bg-primary-dark transition-colors"
        >
          <Package className="w-8 h-8 mx-auto mb-2" />
          <span className="font-semibold">Add New Product</span>
        </Link>
        <Link
          href="/admin/slides/new"
          className="bg-charcoal text-white rounded-xl p-6 text-center hover:bg-charcoal-700 transition-colors"
        >
          <Users className="w-8 h-8 mx-auto mb-2" />
          <span className="font-semibold">Add Hero Slide</span>
        </Link>
        <Link
          href="/admin/blog/new"
          className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700 transition-colors"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <span className="font-semibold">Write Blog Post</span>
        </Link>
      </div>
    </div>
  )
}

