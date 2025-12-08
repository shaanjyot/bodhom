import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// GET - Fetch page content
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const searchParams = request.nextUrl.searchParams

    const pageKey = searchParams.get('page')
    const sectionKey = searchParams.get('section')

    let query = supabase
      .from('page_content')
      .select('*')
      .eq('is_active', true)

    if (pageKey) {
      query = query.eq('page_key', pageKey)
    }

    if (sectionKey) {
      query = query.eq('section_key', sectionKey)
    }

    const { data: content, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If specific page and section requested, return single content
    if (pageKey && sectionKey && content?.length === 1) {
      return NextResponse.json({ content: content[0] })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create or update page content (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const { page_key, section_key, content } = body

    if (!page_key || !section_key || !content) {
      return NextResponse.json(
        { error: 'page_key, section_key, and content are required' },
        { status: 400 }
      )
    }

    // Upsert content
    const { data: result, error } = await supabase
      .from('page_content')
      .upsert(
        { page_key, section_key, content, is_active: true },
        { onConflict: 'page_key,section_key' }
      )
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ content: result })
  } catch (error) {
    console.error('Content save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

