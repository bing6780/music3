import { Play, Heart } from 'lucide-react'
import { Song } from '../types'
import { useMusicStore } from '../store/musicStore'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface SongCardProps {
  song: Song
}

export default function SongCard({ song }: SongCardProps) {
  const { play, toggleFavorite, isFavorite } = useMusicStore()
  const [isHovered, setIsHovered] = useState(false)
  const isFav = isFavorite(song.id)

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      className="glass p-4 rounded-xl cursor-pointer group"
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isHovered && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => play(song.id)}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full">
              <Play size={24} className="text-white fill-white" />
            </div>
          </motion.button>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-neutral-50 truncate group-hover:text-primary-300">
          {song.title}
        </h3>
        <p className="text-sm text-neutral-400 truncate">{song.artist}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-neutral-500">{formatDuration(song.duration)}</span>
          <button
            onClick={() => toggleFavorite(song.id)}
            className={`p-2 rounded-lg transition-all ${
              isFav
                ? 'bg-primary-600/30 text-primary-300'
                : 'text-neutral-400 hover:text-primary-300'
            }`}
          >
            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function formatDuration(seconds: number) {
  if (!isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}
