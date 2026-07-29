import { Music, Home, Compass, Library, Settings, Heart, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../store/musicStore'
import { useState } from 'react'
import CreatePlaylistModal from './CreatePlaylistModal'

interface SidebarProps {
  onClose?: () => void
  onNavigate?: (page: string) => void
  currentPage?: string
}

export default function Sidebar({ onClose, onNavigate, currentPage = 'home' }: SidebarProps) {
  const { t } = useTranslation()
  const { playlists } = useMusicStore()
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const handleNavClick = (tab: string) => {
    onNavigate?.(tab)
    onClose?.()
  }

  return (
    <div className="glass w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-3 rounded-xl">
          <Music className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">HarmonyX</h1>
          <p className="text-xs text-neutral-400">Music Player</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="space-y-1">
          {[
            { id: 'home', label: t('nav.home'), icon: Home },
            { id: 'explore', label: t('nav.explore'), icon: Compass },
            { id: 'favorites', label: t('favorites.title'), icon: Heart },
            { id: 'library', label: t('nav.library'), icon: Library },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentPage === id
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-300 hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Playlists */}
        <div className="pt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase">
              {t('playlist.title')}
            </h3>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="text-neutral-400 hover:text-neutral-200 p-1 rounded hover:bg-white/10 transition-all"
              title="Create playlist"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {playlists.length === 0 ? (
              <p className="text-xs text-neutral-500 px-4 py-2">No playlists yet</p>
            ) : (
              playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handleNavClick(`playlist-${playlist.id}`)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all truncate ${
                    currentPage === `playlist-${playlist.id}`
                      ? 'bg-primary-600/30 text-primary-300'
                      : 'text-neutral-400 hover:bg-white/5'
                  }`}
                >
                  {playlist.name}
                </button>
              ))
            )}
          </div>
        </div>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => handleNavClick('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentPage === 'settings'
              ? 'bg-primary-600 text-white'
              : 'text-neutral-300 hover:bg-white/10'
          }`}
        >
          <Settings size={20} />
          <span className="text-sm font-medium">{t('settings.title')}</span>
        </button>
      </div>

      <CreatePlaylistModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  )
}
