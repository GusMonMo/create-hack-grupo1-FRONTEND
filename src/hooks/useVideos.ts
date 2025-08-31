import { useState, useEffect } from 'react'
import { VideoService, Video, VideoCreateData } from '../services/videoService'

// Hook for fetching all videos
export const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await VideoService.getVideos()
      setVideos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch videos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos
  }
}

// Hook for fetching a single video
export const useVideo = (id: string | null) => {
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchVideo = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await VideoService.getVideoById(id)
        setVideo(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch video')
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])

  return {
    video,
    loading,
    error
  }
}

// Hook for video upload operations
export const useVideoUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadVideo = async (file: File, videoData: VideoCreateData): Promise<Video | null> => {
    try {
      setUploading(true)
      setError(null)
      const result = await VideoService.createVideo(file, videoData)
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload video')
      return null
    } finally {
      setUploading(false)
    }
  }

  return {
    uploadVideo,
    uploading,
    error,
    clearError: () => setError(null)
  }
}

// Hook for video deletion
export const useVideoDelete = () => {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteVideo = async (id: string): Promise<boolean> => {
    try {
      setDeleting(true)
      setError(null)
      await VideoService.deleteVideo(id)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete video')
      return false
    } finally {
      setDeleting(false)
    }
  }

  return {
    deleteVideo,
    deleting,
    error,
    clearError: () => setError(null)
  }
}
