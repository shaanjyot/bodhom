import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch all testimonials
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams
    const activeOnly = searchParams.get('active') !== 'false'

    let query = supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: testimonials, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new testimonial (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Generate initials from name if not provided
    if (!body.initials && body.name) {
      body.initials = body.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    // Get max sort_order
    const { data: lastTestimonial } = await supabase
      .from('testimonials')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    body.sort_order = (lastTestimonial?.sort_order || 0) + 1

    const { data: testimonial, error } = await supabase
      .from('testimonials')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (error) {
    console.error('Testimonial creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

