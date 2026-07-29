import { useTranslation } from 'react-i18next'
import { useMusicStore } from '../../store/musicStore'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { t } = useTranslation()
  const {
    preferences,
    setTheme,
    setLanguage,
    setAutoPlay,
    setQuality,
    stats,
  } = useMusicStore()

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600)
    const minutes = Math.floor((ms % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-8">{t('settings.title')}</h1>

        {/* Audio & Preferences */}
        <div className="glass p-6 rounded-xl mb-6 space-y-6">
          <h2 className="text-xl font-semibold text-white">{t('player.play')}</h2>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              {t('settings.theme')}
            </label>
            <div className="flex gap-3">
              {(['light', 'dark'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setTheme(theme)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    preferences.theme === theme
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                >
                  {t(`settings.${theme}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              {t('settings.language')}
            </label>
            <div className="flex gap-3">
              {(['en', 'vi'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    preferences.language === lang
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-3">
              {t('settings.quality')}
            </label>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setQuality(quality)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    preferences.quality === quality
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                  }`}
                >
                  {t(`settings.${quality}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Play */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-300">
              {t('settings.autoPlay')}
            </label>
            <button
              onClick={() => setAutoPlay(!preferences.autoPlay)}
              className={`px-4 py-2 rounded-lg transition-all ${
                preferences.autoPlay
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/10 text-neutral-300'
              }`}
            >
              {preferences.autoPlay ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="glass p-6 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold text-white mb-6">{t('stats.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-neutral-400 mb-2">{t('stats.totalTime')}</p>
              <p className="text-2xl font-bold text-primary-300">
                {formatTime(stats.totalListeningTime)}
              </p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-neutral-400 mb-2">{t('stats.totalSongs')}</p>
              <p className="text-2xl font-bold text-accent-300">{stats.totalSongsPlayed}</p>
            </div>

            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-neutral-400 mb-2">{t('stats.favoriteGenres')}</p>
              <p className="text-sm font-semibold text-neutral-300">
                {stats.favoriteGenres.length === 0
                  ? 'None yet'
                  : stats.favoriteGenres.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
