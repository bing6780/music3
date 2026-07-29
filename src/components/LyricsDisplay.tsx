import { motion } from 'framer-motion'
import { Song } from '../types'
import { X } from 'lucide-react'

interface LyricsDisplayProps {
  song: Song
  isOpen: boolean
  onClose: () => void
  currentTime: number
}

export default function LyricsDisplay({ song, isOpen, onClose, currentTime }: LyricsDisplayProps) {
  if (!isOpen || !song.lyrics) return null

  const lyrics = song.lyrics.split('\n')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[80vh] bg-gradient-to-b from-primary-900/20 to-accent-900/20 rounded-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 glass border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{song.title}</h3>
            <p className="text-sm text-neutral-400">{song.artist}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={24} className="text-neutral-400" />
          </button>
        </div>

        {/* Lyrics */}
        <div className="overflow-y-auto h-[calc(80vh-120px)] p-8 space-y-6">
          {lyrics.map((line, index) => {
            const isActive = index < Math.floor(currentTime / 2) && index >= Math.floor(currentTime / 2) - 2
            
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isActive ? 1 : 0.4,
                  y: 0,
                }}
                transition={{ duration: 0.3 }}
                className={`text-center text-lg leading-relaxed transition-all ${
                  isActive
                    ? 'text-transparent bg-gradient-to-r from-primary-300 to-accent-300 bg-clip-text font-semibold text-xl'
                    : 'text-neutral-300'
                }`}
              >
                {line}
              </motion.p>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
