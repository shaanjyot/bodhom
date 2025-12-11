import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch all pages
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams

    const publishedOnly = searchParams.get('published') !== 'false'
    const menuOnly = searchParams.get('menu') === 'true'

    let query = supabase
      .from('pages')
      .select('*')
      .order('menu_order', { ascending: true })

    if (publishedOnly) {
      query = query.eq('is_published', true)
    }

    if (menuOnly) {
      query = query.eq('show_in_menu', true)
    }

    const { data: pages, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Pages fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new page (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const { data: page, error } = await supabase
      .from('pages')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    console.error('Page creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
