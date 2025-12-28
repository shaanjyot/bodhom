import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch all reels
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams
    const activeOnly = searchParams.get('active') !== 'false'

    let query = supabase
      .from('reels')
      .select('*')
      .order('sort_order', { ascending: true })

    if (activeOnly) {
      query = query.eq('is_active', true)
    }

    const { data: reels, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ reels: reels || [] })
  } catch (error) {
    console.error('Reels fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create a new reel (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    // Get max sort_order
    const { data: lastReel } = await supabase
      .from('reels')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .single()

    body.sort_order = (lastReel?.sort_order || 0) + 1

    const { data: reel, error } = await supabase
      .from('reels')
      .insert(body)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ reel }, { status: 201 })
  } catch (error) {
    console.error('Reel creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

