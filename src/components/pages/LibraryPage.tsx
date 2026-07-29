import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'

export default function LibraryPage() {
  const { t } = useTranslation()
  const { songs, playHistory } = useMusicStore()

  const librarySongs = songs.filter((s) => playHistory.includes(s.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-4xl font-bold text-white mb-8">{t('nav.library')}</h1>

      {librarySongs.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center">
          <p className="text-neutral-400">Your library is empty. Start playing songs!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {librarySongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
