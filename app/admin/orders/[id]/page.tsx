'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Package, Truck, CreditCard, MapPin } from 'lucide-react'

interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total: number
  subtotal: number
  shipping_cost: number
  discount: number
  status: string
  payment_status: string
  payment_method: string
  razorpay_payment_id: string
  created_at: string
  items: any[]
  shipping_address: any
  billing_address: any
  notes: string
}

export default function OrderDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchOrder()
    }
  }, [id])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`)
      const data = await res.json()
      setOrder(data.order)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (status: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrder()
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass-gold"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-400">Order not found</p>
        <Link href="/admin/orders" className="text-brass-gold hover:text-primary-dark mt-4 inline-block">
          ← Back to Orders
        </Link>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'shipped': return 'bg-blue-100 text-blue-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-6 h-6 text-charcoal" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-serif font-bold text-charcoal">Order {order.order_number}</h1>
          <p className="text-charcoal-400 mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <select
          value={order.status}
          onChange={(e) => updateStatus(e.target.value)}
          className={`px-4 py-2 rounded-lg font-medium ${getStatusColor(order.status)}`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-brass-gold" />
              <h2 className="text-xl font-semibold text-charcoal">Order Items</h2>
            </div>
            <div className="space-y-4">
              {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-cream-100 rounded-lg flex items-center justify-center text-2xl">
                    🏺
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-charcoal">{item.name}</p>
                    <p className="text-sm text-charcoal-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-charcoal">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-sm text-charcoal-400">₹{item.price.toLocaleString()} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-5 h-5 text-brass-gold" />
                <h3 className="font-semibold text-charcoal">Shipping Address</h3>
              </div>
              {order.shipping_address && (
                <div className="text-charcoal-500 text-sm space-y-1">
                  <p className="font-medium text-charcoal">{order.shipping_address.name}</p>
                  <p>{order.shipping_address.address}</p>
                  <p>{order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}</p>
                  <p>{order.shipping_address.phone}</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-brass-gold" />
                <h3 className="font-semibold text-charcoal">Billing Address</h3>
              </div>
              {order.billing_address && (
                <div className="text-charcoal-500 text-sm space-y-1">
                  <p className="font-medium text-charcoal">{order.billing_address.name}</p>
                  <p>{order.billing_address.address}</p>
                  <p>{order.billing_address.city}, {order.billing_address.state} {order.billing_address.pincode}</p>
                  <p>{order.billing_address.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-charcoal-500">
                <span>Subtotal</span>
                <span>₹{parseFloat(order.subtotal as any).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal-500">
                <span>Shipping</span>
                <span>{order.shipping_cost > 0 ? `₹${order.shipping_cost}` : 'Free'}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-charcoal">
                <span>Total</span>
                <span>₹{parseFloat(order.total as any).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-brass-gold" />
              <h3 className="font-semibold text-charcoal">Payment Details</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-400">Method</span>
                <span className="text-charcoal font-medium">{order.payment_method || 'Razorpay'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-400">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 
                  order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {order.payment_status}
                </span>
              </div>
              {order.razorpay_payment_id && (
                <div className="flex justify-between">
                  <span className="text-charcoal-400">Payment ID</span>
                  <span className="text-charcoal text-xs">{order.razorpay_payment_id}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="font-semibold text-charcoal mb-4">Customer Details</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium text-charcoal">{order.customer_name}</p>
              <p className="text-charcoal-400">{order.customer_email}</p>
              <p className="text-charcoal-400">{order.customer_phone}</p>
            </div>
          </div>

          {order.notes && (
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h3 className="font-semibold text-charcoal mb-4">Order Notes</h3>
              <p className="text-charcoal-500 text-sm">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
