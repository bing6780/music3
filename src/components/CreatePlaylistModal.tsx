import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import { useMusicStore } from '../store/musicStore'

interface CreatePlaylistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePlaylistModal({ isOpen, onClose }: CreatePlaylistModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { createPlaylist } = useMusicStore()

  const handleCreate = () => {
    if (name.trim()) {
      createPlaylist(name, description)
      setName('')
      setDescription('')
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="glass p-6 rounded-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary-600 p-2 rounded-lg">
                  <Plus className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">New Playlist</h2>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Playlist Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My Awesome Playlist"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-50 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-50 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-neutral-300 hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!name.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
