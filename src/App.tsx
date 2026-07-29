import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n/config'
import { useMusicStore } from './store/musicStore'
import Layout from './components/Layout'
import { loadSampleData } from './data/sampleSongs'

export default function App() {
  const { songs, setSongs, preferences } = useMusicStore()

  // Initialize sample data on first load
  useEffect(() => {
    if (songs.length === 0) {
      const sampleSongs = loadSampleData()
      setSongs(sampleSongs)
    }
  }, [])

  // Set theme on preference change
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [preferences.theme])

  // Set language
  useEffect(() => {
    i18n.changeLanguage(preferences.language)
    localStorage.setItem('i18n-language', preferences.language)
  }, [preferences.language])

  return (
    <I18nextProvider i18n={i18n}>
      <Layout />
    </I18nextProvider>
  )
}
