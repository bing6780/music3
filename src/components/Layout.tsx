import { useState } from 'react'
import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import MainContent from './MainContent'
import { Menu, X } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="flex h-screen bg-neutral-900 text-neutral-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 rounded-lg hover:bg-primary-700"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-screen transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-40`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} onNavigate={setCurrentPage} currentPage={currentPage} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainContent currentPage={currentPage} onNavigate={setCurrentPage} />
        <MusicPlayer />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 md:hidden bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
