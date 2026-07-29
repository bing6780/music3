import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'

export default function ExplorePage() {
  const { songs } = useMusicStore()

  // Group songs by artist
  const artistGroups = songs.reduce(
    (acc, song) => {
      const key = song.artist
      if (!acc[key]) acc[key] = []
      acc[key].push(song)
      return acc
    },
    {} as Record<string, typeof songs>
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Explore</h1>
        <p className="text-neutral-400">Discover music by your favorite artists</p>
      </div>

      {Object.entries(artistGroups).map(([artist, artistSongs]) => (
        <motion.section key={artist} variants={item}>
          <h2 className="text-2xl font-bold text-white mb-4">{artist}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {artistSongs.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        </motion.section>
      ))}
    </motion.div>
  )
}
