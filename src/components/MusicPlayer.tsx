import { useEffect, useRef, useState, useCallback } from 'react'
import { Play, Pause, SkipBack, SkipForward, Repeat2, Shuffle, Volume2, X, Music, Mic2 } from 'lucide-react'
import { useMusicStore } from '../store/musicStore'
import { motion } from 'framer-motion'
import { QueueManager } from '../lib/queueManager'
import LyricsDisplay from './LyricsDisplay'

export default function MusicPlayer() {
  const {
    songs,
    playbackState,
    play,
    pause,
    resume,
    seek,
    setVolume,
    setRepeat,
    toggleShuffle,
    addToHistory,
    updateStats,
    stats,
  } = useMusicStore()

  const audioRef = useRef<HTMLAudioElement>(null)
  const queueRef = useRef(new QueueManager(songs.map((s) => s.id)))
  const [isDragging, setIsDragging] = useState(false)
  const [showVisualizer, setShowVisualizer] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)

  const currentSong = songs.find((s) => s.id === playbackState.currentSongId)

  // Update queue when songs change
  useEffect(() => {
    queueRef.current.setQueue(songs.map((s) => s.id))
  }, [songs])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !currentSong) return

    if (playbackState.isPlaying) {
      audioRef.current.play().catch((e) => console.error('Play error:', e))
      addToHistory(currentSong.id)
    } else {
      audioRef.current.pause()
    }
  }, [playbackState.isPlaying, currentSong?.id])

  // Update shuffle in queue
  useEffect(() => {
    queueRef.current.setShuffle(playbackState.shuffle)
  }, [playbackState.shuffle])

  // Handle seeking
  useEffect(() => {
    if (!audioRef.current || isDragging) return
    audioRef.current.currentTime = playbackState.currentTime
  }, [playbackState.currentTime, isDragging])

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playbackState.volume
    }
  }, [playbackState.volume])

  const handleTimeUpdate = () => {
    if (!isDragging && audioRef.current) {
      seek(audioRef.current.currentTime)
    }
  }

  const handleNextTrack = useCallback(() => {
    let nextSongId: string | null
    if (playbackState.shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length)
      nextSongId = songs[randomIndex]?.id || null
    } else {
      nextSongId = queueRef.current.next()
    }
    if (nextSongId) {
      play(nextSongId)
    }
  }, [songs, playbackState.shuffle, play])

  const handlePreviousTrack = useCallback(() => {
    const prevSongId = queueRef.current.previous()
    if (prevSongId) {
      play(prevSongId)
    }
  }, [play])

  const handleEnded = useCallback(() => {
    if (playbackState.repeat === 'one' && currentSong) {
      play(currentSong.id)
    } else if (playbackState.repeat === 'all' && queueRef.current.getQueueLength() > 0) {
      const nextSongId = queueRef.current.next()
      if (nextSongId) {
        play(nextSongId)
      } else {
        // Wrap around to beginning
        queueRef.current.setQueue(songs.map((s) => s.id))
        const firstSong = queueRef.current.next()
        if (firstSong) play(firstSong)
      }
    } else {
      handleNextTrack()
    }
    // Update stats
    updateStats({
      totalSongsPlayed: stats.totalSongsPlayed + 1,
      lastListenedAt: Date.now(),
    })
  }, [playbackState.repeat, currentSong, play, handleNextTrack, stats, updateStats])

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (!currentSong) {
    return null
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="glass border-t border-white/10 p-4"
    >
      <div className="space-y-4">
        {/* Track Info */}
        <div className="flex items-center gap-4">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-16 h-16 rounded-lg object-cover shadow-lg"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-50 truncate">{currentSong.title}</p>
            <p className="text-xs text-neutral-400 truncate">{currentSong.artist}</p>
          </div>
          <button className="text-neutral-400 hover:text-neutral-200">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={currentSong.duration || 0}
            value={playbackState.currentTime}
            onChange={(e) => {
              setIsDragging(true)
              seek(Number(e.target.value))
            }}
            onMouseUp={() => setIsDragging(false)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-xs text-neutral-400">
            <span>{formatTime(playbackState.currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={toggleShuffle}
            className={`p-2 rounded-lg transition-all ${
              playbackState.shuffle
                ? 'bg-primary-600 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Shuffle size={18} />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousTrack}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => (playbackState.isPlaying ? pause() : resume())}
              className="p-3 bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-all"
            >
              {playbackState.isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-200"
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-neutral-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={playbackState.volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <button
              onClick={() => {
                const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all']
                const currentIndex = modes.indexOf(playbackState.repeat)
                const nextIndex = (currentIndex + 1) % modes.length
                setRepeat(modes[nextIndex])
              }}
              className={`p-2 rounded-lg transition-all ${
                playbackState.repeat !== 'off'
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Repeat2 size={18} />
            </button>
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-lg transition-all ${
                showLyrics
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Mic2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Lyrics Display */}
      {currentSong && (
        <LyricsDisplay
          song={currentSong}
          isOpen={showLyrics}
          onClose={() => setShowLyrics(false)}
          currentTime={playbackState.currentTime}
        />
      )}
    </motion.div>
  )
}
