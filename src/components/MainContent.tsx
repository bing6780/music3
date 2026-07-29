import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../store/musicStore'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import LibraryPage from './pages/LibraryPage'
import SettingsPage from './pages/SettingsPage'
import PlaylistPage from './pages/PlaylistPage'
import SearchResultsPage from './pages/SearchResultsPage'
import SearchBar from './SearchBar'

interface MainContentProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function MainContent({ currentPage, onNavigate }: MainContentProps) {
  const { t } = useTranslation()

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={onNavigate} />
      case 'explore':
        return <ExplorePage />
      case 'search':
        return <SearchResultsPage />
      case 'favorites':
        return <FavoritesPage />
      case 'library':
        return <LibraryPage />
      case 'settings':
        return <SettingsPage />
      default:
        if (currentPage.startsWith('playlist-')) {
          const playlistId = currentPage.replace('playlist-', '')
          return <PlaylistPage playlistId={playlistId} />
        }
        return <HomePage onNavigate={onNavigate} />
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header with Search */}
      <div className="glass border-b border-white/10 p-4 md:p-6">
        <div className="flex items-center justify-between gap-4 mb-4 md:hidden">
          <h2 className="text-lg font-bold truncate">HarmonyX</h2>
        </div>
        <SearchBar onSearch={onNavigate} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>
    </div>
  )
}
