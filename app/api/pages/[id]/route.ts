import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch a single page by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params

    // Check if it's a UUID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    let query = supabase.from('pages').select('*')
    
    if (isUUID) {
      query = query.eq('id', id)
    } else {
      query = query.eq('slug', id)
    }

    const { data: page, error } = await query.single()

    if (error) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Page fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update a page
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params
    const body = await request.json()

    // Generate slug from title if title changed and slug not provided
    if (body.title && !body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const { data: page, error } = await supabase
      .from('pages')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Page update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete a page
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Page deleted successfully' })
  } catch (error) {
    console.error('Page delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
