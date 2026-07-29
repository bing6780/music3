import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'

interface HomePageProps {
  onNavigate?: (page: string) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useTranslation()
  const { songs, playHistory, favorites } = useMusicStore()

  const recentSongs = songs.filter((s) => playHistory.includes(s.id)).slice(0, 8)
  const favoriteSongs = songs.filter((s) => favorites.has(s.id)).slice(0, 8)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-2">
          Welcome to HarmonyX
        </h1>
        <p className="text-neutral-400">Discover and enjoy your favorite music</p>
      </div>

      {/* Recently Played */}
      {recentSongs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
            <button className="text-sm text-primary-400 hover:text-primary-300">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* Favorites */}
      {favoriteSongs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">{t('favorites.title')}</h2>
            <button
              onClick={() => onNavigate?.('favorites')}
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* All Songs */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">All Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {songs.slice(0, 12).map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
