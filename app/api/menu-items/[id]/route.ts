import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch a single menu item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    return NextResponse.json({ menuItem })
  } catch (error) {
    console.error('Menu item fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update a menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params
    const body = await request.json()

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .update(body)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ menuItem })
  } catch (error) {
    console.error('Menu item update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete a menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    const { id } = params

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' })
  } catch (error) {
    console.error('Menu item delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
