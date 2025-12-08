import { createClient } from './client'

export type StorageBucket = 'products' | 'slides' | 'blogs' | 'assets'

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export async function uploadFile(
  bucket: StorageBucket,
  file: File,
  folder?: string
): Promise<UploadResult> {
  const supabase = createClient()
  
  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${randomString}.${extension}`
  const path = folder ? `${folder}/${filename}` : filename

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    return { url: '', path: '', error: error.message }
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path)

  return { url: urlData.publicUrl, path: data.path }
}

export async function uploadMultipleFiles(
  bucket: StorageBucket,
  files: File[],
  folder?: string
): Promise<UploadResult[]> {
  const results = await Promise.all(
    files.map((file) => uploadFile(bucket, file, folder))
  )
  return results
}

export async function deleteFile(
  bucket: StorageBucket,
  path: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function deleteMultipleFiles(
  bucket: StorageBucket,
  paths: string[]
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove(paths)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function listFiles(
  bucket: StorageBucket,
  folder?: string
): Promise<{ files: any[]; error?: string }> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
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

