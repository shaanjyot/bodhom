import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch all menu items
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams

    const location = searchParams.get('location') || 'header'
    const activeOnly = searchParams.get('active') !== 'false'

    let query = supabase
      .from('menu_items')
      .select('*')
      .eq('menu_location', location)
      .order('sort_order', { ascending: true })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: menuItems, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ menuItems })
  } catch (error) {
    console.error('Menu items fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new menu item (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Get max sort_order for the location
    const { data: lastItem } = await supabase
      .from('menu_items')
      .select('sort_order')
      .eq('menu_location', body.menu_location || 'header')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    body.sort_order = (lastItem?.sort_order || 0) + 1

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ menuItem }, { status: 201 })
  } catch (error) {
    console.error('Menu item creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Reorder menu items
export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { items } = body // Array of { id, sort_order }

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid items data' },
        { status: 400 }
      )
    }

    // Update each item's sort order
    for (const item of items) {
      await supabase
        .from('menu_items')
        .update({ sort_order: item.sort_order })
        .eq('id', item.id)
    }

    return NextResponse.json({ message: 'Menu items reordered successfully' })
  } catch (error) {
    console.error('Menu items reorder error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
