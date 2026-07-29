export interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: number
  coverUrl: string
  audioUrl: string
  lyrics?: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  songs: string[] // song IDs
  createdAt: number
  updatedAt: number
}

export interface PlaybackState {
  currentSongId: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  repeat: 'off' | 'one' | 'all'
  shuffle: boolean
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  language: 'en' | 'vi'
  autoPlay: boolean
  quality: 'low' | 'medium' | 'high'
}

export interface ListeningStats {
  totalListeningTime: number
  totalSongsPlayed: number
  favoriteGenres: string[]
  lastListenedAt: number
}
