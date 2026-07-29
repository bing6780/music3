import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../../store/musicStore'
import SongCard from '../SongCard'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

interface PlaylistPageProps {
  playlistId: string
}

export default function PlaylistPage({ playlistId }: PlaylistPageProps) {
  const { t } = useTranslation()
  const { playlists, songs, deletePlaylist } = useMusicStore()

  const playlist = playlists.find((p) => p.id === playlistId)

  if (!playlist) {
    return <div className="p-6 text-white">Playlist not found</div>
  }

  const playlistSongs = songs.filter((s) => playlist.songs.includes(s.id))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-neutral-400">{playlist.description}</p>
          )}
          <p className="text-sm text-neutral-500 mt-2">{playlistSongs.length} songs</p>
        </div>
        <button
          onClick={() => deletePlaylist(playlist.id)}
          className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {playlistSongs.length === 0 ? (
        <div className="glass p-8 rounded-xl text-center">
          <p className="text-neutral-400">This playlist is empty. Add songs!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {playlistSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
