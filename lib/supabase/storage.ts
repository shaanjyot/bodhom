import { createClient } from './client'

// Using single "bodhom" bucket with folder structure
export const STORAGE_BUCKET = 'bodhom'

export type StorageFolder = 'products' | 'slides' | 'blogs' | 'assets' | 'pages' | 'categories'

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export async function uploadFile(
  folder: StorageFolder,
  file: File,
  subfolder?: string
): Promise<UploadResult> {
  const supabase = createClient()
  
  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${randomString}.${extension}`
  const path = subfolder ? `${folder}/${subfolder}/${filename}` : `${folder}/${filename}`

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { url: '', path: '', error: error.message }
  }

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path)

  return { url: urlData.publicUrl, path: data.path }
}

export async function uploadMultipleFiles(
  folder: StorageFolder,
  files: File[],
  subfolder?: string
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadFile(folder, file, subfolder))
  )
  return results
}

export async function deleteFile(
  path: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([path])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteMultipleFiles(
  paths: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove(paths)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export function getPublicUrl(path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function listFiles(
  folder?: string
): Promise<{ files: any[]; error?: string }> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(folder || '', {
      limit: 100,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (error) {
    return { files: [], error: error.message }
  }

  return { files: data || [] }
}

// Helper function to get image dimensions (for optimization)
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality?: number
): string {
  // Supabase storage image transformation
  const params = new URLSearchParams()
  if (width) params.set('width', width.toString())
  if (height) params.set('height', height.toString())
  if (quality) params.set('quality', quality.toString())
  
  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
}

