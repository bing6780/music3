import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'

export default function FavoritesPage() {
  const { t } = useTranslation()
  const { songs, favorites } = useMusicStore()

  const favoriteSongs = songs.filter((s) => favorites.has(s.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-4xl font-bold text-white mb-8">{t('favorites.title')}</h1>

      {favoriteSongs.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center">
          <p className="text-neutral-400">No favorite songs yet. Add songs to your favorites!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
