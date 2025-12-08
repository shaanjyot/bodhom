import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { createRazorpayOrder } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      items,
      customerInfo,
      shippingAddress,
      billingAddress,
    } = body

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      return NextResponse.json(
        { error: 'Customer information is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      // Verify product exists and is in stock
      const { data: product, error } = await supabase
        .from('products')
        .select('id, name, price, stock_quantity, images, thumbnail')
        .eq('id', item.id)
        .eq('is_active', true)
        .single()

      if (error || !product) {
        return NextResponse.json(
          { error: `Product ${item.name} not found` },
          { status: 400 }
        )
      }

      if (product.stock_quantity < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        )
      }

      subtotal += product.price * item.quantity
      orderItems.push({
        product_id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.thumbnail || product.images?.[0] || null,
      })
    }

    // Calculate shipping
    const shippingCost = subtotal >= 999 ? 0 : 99
    const total = subtotal + shippingCost

    // Generate order number
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    const orderNumber = `BDH${timestamp}${random}`

    // Create Razorpay order
    const { order: razorpayOrder, error: razorpayError } = await createRazorpayOrder({
      amount: Math.round(total * 100), // Convert to paise
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
      },
    })

    if (razorpayError || !razorpayOrder) {
      return NextResponse.json(
        { error: razorpayError || 'Failed to create payment order' },
        { status: 500 }
      )
    }

    // Create order in database with pending status
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        status: 'pending',
        payment_status: 'pending',
        payment_method: 'razorpay',
        razorpay_order_id: razorpayOrder.id,
        subtotal,
        shipping_cost: shippingCost,
        tax: 0,
        discount: 0,
        total,
        currency: 'INR',
        shipping_address: shippingAddress || billingAddress,
        billing_address: billingAddress,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items: orderItems,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

