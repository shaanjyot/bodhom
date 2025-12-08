import crypto from 'crypto'

// Razorpay API base URL
const RAZORPAY_API_URL = 'https://api.razorpay.com/v1'

// Create Basic Auth header
function getAuthHeader(): string {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!
  const keySecret = process.env.RAZORPAY_KEY_SECRET!
  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
  return `Basic ${credentials}`
}

export interface CreateOrderParams {
  amount: number // Amount in paise (multiply INR by 100)
  currency?: string
  receipt: string
  notes?: Record<string, string>
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  created_at: number
}

export interface VerifyPaymentParams {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

// Create a Razorpay order
export async function createRazorpayOrder(
  params: CreateOrderParams
): Promise<{ order: RazorpayOrder | null; error: string | null }> {
  try {
    const response = await fetch(`${RAZORPAY_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency || 'INR',
        receipt: params.receipt,
        notes: params.notes || {},
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { order: null, error: error.error?.description || 'Failed to create order' }
    }

    const order = await response.json()
    return { order, error: null }
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return { order: null, error: 'Failed to create payment order' }
  }
}

// Verify Razorpay payment signature
export function verifyPaymentSignature(params: VerifyPaymentParams): boolean {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = params
    const keySecret = process.env.RAZORPAY_KEY_SECRET!

    // Create the signature verification string
    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    // Generate HMAC SHA256 signature
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex')

    // Compare signatures
    return expectedSignature === razorpay_signature
  } catch (error) {
    console.error('Payment verification error:', error)
    return false
  }
}

// Verify webhook signature
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!

    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex')

    return expectedSignature === signature
  } catch (error) {
    console.error('Webhook verification error:', error)
    return false
  }
}

// Fetch payment details
export async function fetchPaymentDetails(paymentId: string): Promise<{
  payment: any | null
  error: string | null
}> {
  try {
    const response = await fetch(`${RAZORPAY_API_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        Authorization: getAuthHeader(),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      return { payment: null, error: error.error?.description || 'Failed to fetch payment' }
    }

    const payment = await response.json()
    return { payment, error: null }
  } catch (error) {
    console.error('Fetch payment error:', error)
    return { payment: null, error: 'Failed to fetch payment details' }
  }
}

// Refund a payment
export async function refundPayment(
  paymentId: string,
  amount?: number, // Amount in paise, if not provided full refund
  notes?: Record<string, string>
): Promise<{ refund: any | null; error: string | null }> {
  try {
    const body: any = { notes: notes || {} }
    if (amount) body.amount = amount

    const response = await fetch(
      `${RAZORPAY_API_URL}/payments/${paymentId}/refund`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      return { refund: null, error: error.error?.description || 'Failed to process refund' }
    }

    const refund = await response.json()
    return { refund, error: null }
  } catch (error) {
    console.error('Refund error:', error)
    return { refund: null, error: 'Failed to process refund' }
  }
}

// Get Razorpay checkout options for client
export function getRazorpayCheckoutOptions(
  order: RazorpayOrder,
  customerInfo: {
    name: string
    email: string
    phone: string
  },
  options?: {
    description?: string
    image?: string
    theme?: { color: string }
  }
) {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: 'BodhOm',
    description: options?.description || 'Purchase from BodhOm',
    image: options?.image || '/logo.png',
    order_id: order.id,
    prefill: {
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.phone,
    },
    notes: {
      receipt: order.receipt,
    },
    theme: options?.theme || {
      color: '#B8860B', // brass-gold color
    },
  }
}

