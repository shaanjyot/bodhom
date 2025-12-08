import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch all hero slides
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams
    const activeOnly = searchParams.get('active') !== 'false'

    let query = supabase
      .from('hero_slides')
      .select('*')
      .order('sort_order', { ascending: true })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: slides, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ slides })
  } catch (error) {
    console.error('Slides fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new slide (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Get max sort_order
    const { data: lastSlide } = await supabase
      .from('hero_slides')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    body.sort_order = (lastSlide?.sort_order || 0) + 1

    const { data: slide, error } = await supabase
      .from('hero_slides')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ slide }, { status: 201 })
  } catch (error) {
    console.error('Slide creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update slide order (admin only)
export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { slides } = body // Array of { id, sort_order }

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json(
        { error: 'Invalid slides data' },
        { status: 400 }
      )
    }

    // Update each slide's sort order
    for (const slide of slides) {
      await supabase
        .from('hero_slides')
        .update({ sort_order: slide.sort_order })
        .eq('id', slide.id)
    }

    return NextResponse.json({ message: 'Slides reordered successfully' })
  } catch (error) {
    console.error('Slides reorder error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

