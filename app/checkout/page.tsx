'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/store/cartStore'
import { ArrowLeft, Shield, Truck, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface AddressForm {
  name: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [sameAsBilling, setSameAsBilling] = useState(true)
  
  const [billingAddress, setBillingAddress] = useState<AddressForm>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  
  const [shippingAddress, setShippingAddress] = useState<AddressForm>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const total = getTotal()
  const shipping = total >= 999 ? 0 : 99
  const finalTotal = total + shipping

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart')
    }
  }, [items, orderComplete, router])

  const validateForm = () => {
    const required = ['name', 'phone', 'email', 'address', 'city', 'state', 'pincode']
    for (const field of required) {
      if (!billingAddress[field as keyof AddressForm]) {
        alert(`Please fill in ${field}`)
        return false
      }
    }
    if (!sameAsBilling) {
      for (const field of required) {
        if (!shippingAddress[field as keyof AddressForm]) {
          alert(`Please fill in shipping ${field}`)
          return false
        }
      }
    }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(billingAddress.email)) {
      alert('Please enter a valid email address')
      return false
    }
    // Phone validation
    if (!/^\d{10}$/.test(billingAddress.phone)) {
      alert('Please enter a valid 10-digit phone number')
      return false
    }
    return true
  }

  const initiatePayment = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      // Create order on backend
      const orderRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
          })),
          customerInfo: {
            name: billingAddress.name,
            email: billingAddress.email,
            phone: billingAddress.phone,
          },
          billingAddress,
          shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
        }),
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Initialize Razorpay
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BodhOm',
        description: 'Purchase from BodhOm',
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          setProcessing(true)
          try {
            // Verify payment
            const verifyRes = await fetch('/api/checkout/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData.orderId,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok && verifyData.success) {
              setOrderNumber(verifyData.orderNumber)
              setOrderComplete(true)
              clearCart()
            } else {
              throw new Error(verifyData.error || 'Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            alert('Payment verification failed. Please contact support.')
          } finally {
            setProcessing(false)
          }
        },
        prefill: {
          name: billingAddress.name,
          email: billingAddress.email,
          contact: billingAddress.phone,
        },
        notes: {
          address: `${billingAddress.address}, ${billingAddress.city}, ${billingAddress.state} - ${billingAddress.pincode}`,
        },
        theme: {
          color: '#B8860B',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response: any) {
        alert(`Payment failed: ${response.error.description}`)
        setLoading(false)
      })
      razorpay.open()
    } catch (error) {
      console.error('Payment initiation error:', error)
      alert(error instanceof Error ? error.message : 'Failed to initiate payment')
      setLoading(false)
    }
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-cream-300">Thank you for your purchase</p>
          </div>
        </section>
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
              Order #{orderNumber}
            </h2>
            <p className="text-charcoal-500 mb-6">
              We've sent a confirmation email to <strong>{billingAddress.email}</strong> with your order details.
            </p>
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <p className="text-charcoal-400 mb-2">Order Total</p>
              <p className="text-3xl font-bold text-charcoal">₹{finalTotal.toLocaleString()}</p>
            </div>
            <p className="text-charcoal-500 mb-8">
              Your order will be shipped within 2-3 business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/orders/${orderNumber}`}
                className="px-6 py-3 border-2 border-brass-gold text-brass-gold rounded-xl font-semibold hover:bg-brass-gold hover:text-white transition-colors"
              >
                View Order
              </Link>
              <Link
                href="/products"
                className="btn-gold text-white px-6 py-3 rounded-xl font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-cream-DEFAULT flex items-center justify-center">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brass-gold mx-auto mb-4"></div>
          <p className="text-xl text-charcoal">Verifying payment...</p>
          <p className="text-charcoal-400">Please don't close this window</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-DEFAULT">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      {/* Hero Section */}
      <section className="relative bg-charcoal text-white pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 to-charcoal"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/cart" className="inline-flex items-center text-cream-300 hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Checkout</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing & Shipping Forms */}
          <div className="space-y-8">
            {/* Billing Address */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-serif font-bold text-charcoal mb-6">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={billingAddress.name}
                    onChange={(e) => setBillingAddress({ ...billingAddress, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={billingAddress.email}
                    onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={billingAddress.phone}
                    onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-charcoal mb-2">Address *</label>
                  <textarea
                    required
                    rows={2}
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    placeholder="Street address, apartment, suite, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={billingAddress.city}
                    onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">State *</label>
                  <input
                    type="text"
                    required
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={billingAddress.pincode}
                    onChange={(e) => setBillingAddress({ ...billingAddress, pincode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold text-charcoal">Shipping Address</h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-brass-gold focus:ring-brass-gold"
                  />
                  <span className="text-sm text-charcoal">Same as billing</span>
                </label>
              </div>
              
              {!sameAsBilling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Email *</label>
                    <input
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">Address *</label>
                    <textarea
                      rows={2}
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">City *</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">State *</label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Pincode *</label>
                    <input
                      type="text"
                      value={shippingAddress.pincode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brass-gold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-soft-lg p-6 sticky top-24">
              <h2 className="text-xl font-serif font-bold text-charcoal mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-cream-100 rounded-lg flex items-center justify-center text-2xl">
                      🏺
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal truncate">{item.name}</p>
                      <p className="text-sm text-charcoal-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-charcoal">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-charcoal-500">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-charcoal">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={initiatePayment}
                disabled={loading}
                className="w-full btn-gold text-white py-4 px-6 rounded-xl font-semibold mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>Pay ₹{finalTotal.toLocaleString()}</>
                )}
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 justify-center text-sm text-charcoal-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brass-gold" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <p className="text-center text-xs text-charcoal-400 mt-4">
                  Powered by Razorpay • 100% Secure Payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

