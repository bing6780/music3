import { Search, X } from 'lucide-react'
import { useMusicStore } from '../store/musicStore'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface SearchBarProps {
  onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useMusicStore()
  const { t } = useTranslation()

  // Navigate to search results when query changes
  useEffect(() => {
    if (searchQuery) {
      onSearch?.('search')
    }
  }, [searchQuery, onSearch])

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
      <input
        type="text"
        placeholder={t('nav.search') + '...'}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-50 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}
