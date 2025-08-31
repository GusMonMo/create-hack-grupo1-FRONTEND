import { supabase } from '@/lib/supabase'

export interface Video {
  id: string
  title: string
  description?: string
  file_path: string
  file_size: number
  mime_type: string
  created_at: string
  updated_at: string
}

export interface VideoCreateData {
  title: string
  description?: string
}

export class VideoService {
  // Get all videos
  static async getVideos(): Promise<Video[]> {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('media_type', 'video')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error fetching videos: ${error.message}`)
    }

    return data || []
  }

  // Get video by ID
  static async getVideoById(id: string): Promise<Video | null> {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('id', id)
      .eq('media_type', 'video')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Video not found
      }
      throw new Error(`Error fetching video: ${error.message}`)
    }

    return data
  }

  // Upload and create video record
  static async createVideo(file: File, videoData: VideoCreateData): Promise<Video> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `videos/${fileName}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      // Create database record
      const { data, error } = await supabase
        .from('media')
        .insert({
          title: videoData.title,
          description: videoData.description,
          media_type: 'video',
          file_path: publicUrl,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single()

      if (error) {
        // Clean up uploaded file if database insert fails
        await supabase.storage.from('media').remove([filePath])
        throw new Error(`Database error: ${error.message}`)
      }

      return data
    } catch (error) {
      throw new Error(`Failed to create video: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  // Delete video
  static async deleteVideo(id: string): Promise<void> {
    // First get the video to find the file path
    const video = await this.getVideoById(id)
    if (!video) {
      throw new Error('Video not found')
    }

    // Extract file path from URL for storage deletion
    const urlParts = video.file_path.split('/')
    const filePath = `videos/${urlParts[urlParts.length - 1]}`

    // Delete from database
    const { error: dbError } = await supabase
      .from('media')
      .delete()
      .eq('id', id)

    if (dbError) {
      throw new Error(`Database deletion failed: ${dbError.message}`)
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('media')
      .remove([filePath])

    if (storageError) {
      console.warn('Storage deletion failed:', storageError.message)
    }
  }
}
