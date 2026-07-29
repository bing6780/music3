import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function SearchResultsPage() {
  const { songs, searchQuery } = useMusicStore()

  const results = songs.filter((song) => {
    const query = searchQuery.toLowerCase()
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Search Results
        </h1>
        <p className="text-neutral-400">
          {results.length === 0 ? 'No results found' : `Found ${results.length} song${results.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="glass p-12 rounded-xl text-center">
          <Zap className="mx-auto mb-4 text-neutral-500" size={48} />
          <p className="text-neutral-400">
            Try searching for songs, artists, or albums
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
