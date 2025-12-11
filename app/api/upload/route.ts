import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// Using single "bodhom" bucket with folder structure
const STORAGE_BUCKET = 'bodhom'

type StorageFolder = 'products' | 'slides' | 'blogs' | 'assets' | 'pages' | 'categories'

const ALLOWED_FOLDERS: StorageFolder[] = ['products', 'slides', 'blogs', 'assets', 'pages', 'categories']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = formData.get('bucket') as StorageFolder // Keep 'bucket' param name for backwards compatibility
    const subfolder = formData.get('folder') as string | null

    // Validate file
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate folder (backwards compatible - accepts 'bucket' param)
    if (!folder || !ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json(
        { error: 'Invalid folder. Allowed: products, slides, blogs, assets, pages, categories' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`
    // Use folder structure: bodhom/products/filename.jpg or bodhom/products/subfolder/filename.jpg
    const path = subfolder ? `${folder}/${subfolder}/${filename}` : `${folder}/${filename}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage (single "bodhom" bucket)
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path)

    return NextResponse.json({
      url: urlData.publicUrl,
      path: data.path,
      bucket: STORAGE_BUCKET,
      folder,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove a file from storage
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json(
        { error: 'path is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const { error } = await supabase.storage.from(STORAGE_BUCKET).remove([path])

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
