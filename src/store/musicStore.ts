import { create } from 'zustand'
import { Song, Playlist, PlaybackState, UserPreferences, ListeningStats } from '../types'

interface MusicStore {
  // Songs
  songs: Song[]
  setSongs: (songs: Song[]) => void
  
  // Playlists
  playlists: Playlist[]
  createPlaylist: (name: string, description?: string) => void
  deletePlaylist: (id: string) => void
  addSongToPlaylist: (playlistId: string, songId: string) => void
  removeSongFromPlaylist: (playlistId: string, songId: string) => void
  
  // Favorites
  favorites: Set<string>
  toggleFavorite: (songId: string) => void
  isFavorite: (songId: string) => boolean
  
  // Playback
  playbackState: PlaybackState
  play: (songId: string) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  setRepeat: (repeat: 'off' | 'one' | 'all') => void
  toggleShuffle: () => void
  nextTrack: () => void
  previousTrack: () => void
  
  // User preferences
  preferences: UserPreferences
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'en' | 'vi') => void
  setAutoPlay: (autoPlay: boolean) => void
  setQuality: (quality: 'low' | 'medium' | 'high') => void
  
  // Listening stats
  stats: ListeningStats
  updateStats: (stats: Partial<ListeningStats>) => void
  
  // History
  playHistory: string[]
  addToHistory: (songId: string) => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const getStoredState = () => {
  try {
    const stored = localStorage.getItem('harmonyx-state')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const saveToStorage = (key: string, value: any) => {
  try {
    const current = getStoredState()
    localStorage.setItem('harmonyx-state', JSON.stringify({ ...current, [key]: value }))
  } catch {
    console.error('Failed to save to localStorage')
  }
}

const storedState = getStoredState()

export const useMusicStore = create<MusicStore>((set, get) => ({
  songs: storedState.songs || [],
  setSongs: (songs) => {
    set({ songs })
    saveToStorage('songs', songs)
  },

  playlists: storedState.playlists || [],
  createPlaylist: (name, description) => {
    const playlist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      songs: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    set((state) => {
      const newPlaylists = [...state.playlists, playlist]
      saveToStorage('playlists', newPlaylists)
      return { playlists: newPlaylists }
    })
  },

  deletePlaylist: (id) => {
    set((state) => {
      const newPlaylists = state.playlists.filter((p) => p.id !== id)
      saveToStorage('playlists', newPlaylists)
      return { playlists: newPlaylists }
    })
  },

  addSongToPlaylist: (playlistId, songId) => {
    set((state) => {
      const newPlaylists = state.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, songs: [...new Set([...p.songs, songId])], updatedAt: Date.now() }
          : p
      )
      saveToStorage('playlists', newPlaylists)
      return { playlists: newPlaylists }
    })
  },

  removeSongFromPlaylist: (playlistId, songId) => {
    set((state) => {
      const newPlaylists = state.playlists.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s !== songId), updatedAt: Date.now() }
          : p
      )
      saveToStorage('playlists', newPlaylists)
      return { playlists: newPlaylists }
    })
  },

  favorites: new Set(storedState.favorites || []),
  toggleFavorite: (songId) => {
    set((state) => {
      const newFavorites = new Set(state.favorites)
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId)
      } else {
        newFavorites.add(songId)
      }
      saveToStorage('favorites', Array.from(newFavorites))
      return { favorites: newFavorites }
    })
  },

  isFavorite: (songId) => get().favorites.has(songId),

  playbackState: storedState.playbackState || {
    currentSongId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    repeat: 'off',
    shuffle: false,
  },

  play: (songId) => {
    set((state) => {
      const newState = {
        playbackState: {
          ...state.playbackState,
          currentSongId: songId,
          isPlaying: true,
          currentTime: 0,
        },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  pause: () => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, isPlaying: false },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  resume: () => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, isPlaying: true },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  seek: (time) => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, currentTime: time },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  setVolume: (volume) => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, volume: Math.max(0, Math.min(1, volume)) },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  setRepeat: (repeat) => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, repeat },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  toggleShuffle: () => {
    set((state) => {
      const newState = {
        playbackState: { ...state.playbackState, shuffle: !state.playbackState.shuffle },
      }
      saveToStorage('playbackState', newState.playbackState)
      return newState
    })
  },

  nextTrack: () => {
    // Will be implemented with queue logic
    set((state) => state)
  },

  previousTrack: () => {
    // Will be implemented with queue logic
    set((state) => state)
  },

  preferences: storedState.preferences || {
    theme: 'dark',
    language: 'en',
    autoPlay: true,
    quality: 'high',
  },

  setTheme: (theme) => {
    set((state) => {
      const newPreferences = { ...state.preferences, theme }
      saveToStorage('preferences', newPreferences)
      return { preferences: newPreferences }
    })
  },

  setLanguage: (language) => {
    set((state) => {
      const newPreferences = { ...state.preferences, language }
      saveToStorage('preferences', newPreferences)
      return { preferences: newPreferences }
    })
  },

  setAutoPlay: (autoPlay) => {
    set((state) => {
      const newPreferences = { ...state.preferences, autoPlay }
      saveToStorage('preferences', newPreferences)
      return { preferences: newPreferences }
    })
  },

  setQuality: (quality) => {
    set((state) => {
      const newPreferences = { ...state.preferences, quality }
      saveToStorage('preferences', newPreferences)
      return { preferences: newPreferences }
    })
  },

  stats: storedState.stats || {
    totalListeningTime: 0,
    totalSongsPlayed: 0,
    favoriteGenres: [],
    lastListenedAt: 0,
  },

  updateStats: (stats) => {
    set((state) => {
      const newStats = { ...state.stats, ...stats }
      saveToStorage('stats', newStats)
      return { stats: newStats }
    })
  },

  playHistory: storedState.playHistory || [],
  addToHistory: (songId) => {
    set((state) => {
      const newHistory = [songId, ...state.playHistory.filter((id) => id !== songId)].slice(0, 50)
      saveToStorage('playHistory', newHistory)
      return { playHistory: newHistory }
    })
  },

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
