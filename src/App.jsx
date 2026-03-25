import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useToast } from './hooks/useToast'
import { useTheme } from './hooks/useTheme'

import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import TopHeader from './components/TopHeader'
import Toast from './components/Toast'
import LockScreen from './components/LockScreen'
import Onboarding from './components/Onboarding'

import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import VentePage from './pages/VentePage'
import TontinePage from './pages/TontinePage'
import SettingsPage from './pages/SettingsPage'
import PublishPage from './pages/PublishPage'
import HelpPage from './pages/HelpPage'

export default function App() {
  const [page, setPage] = useState('home')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const { toasts, showToast } = useToast()
  
  // Theme hook initialisation
  useTheme() 

  const [settings, setSettings] = useLocalStorage('tk_settings', {
    userName: 'Aminata Sylla',
    currency: 'FG',
    goalAmount: 5000000,
    lockEnabled: false,
    pinCode: '0000'
  })

  const [onboardingCompleted, setOnboardingCompleted] = useLocalStorage('tk_onboarding_completed', false)
  const [currentUser, setCurrentUser] = useLocalStorage('tk_user', null)

  // Shared states across pages
  const [ventes, setVentes] = useLocalStorage('tk_ventes', [])
  const [tontines, setTontines] = useLocalStorage('tk_tontines', [])

  useEffect(() => {
    // Reveal app instantly if lock is not enabled
    if (!settings.lockEnabled) {
      setIsUnlocked(true)
    }
  }, [settings.lockEnabled])

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage ventes={ventes} tontines={tontines} settings={settings} setPage={setPage} showToast={showToast} />
      case 'vente':
        return <VentePage ventes={ventes} setVentes={setVentes} settings={settings} showToast={showToast} />
      case 'tontine':
        return <TontinePage tontines={tontines} setTontines={setTontines} settings={settings} showToast={showToast} />
      case 'publish':
        return <PublishPage settings={settings} showToast={showToast} />
      case 'help':
        return <HelpPage showToast={showToast} />
      case 'settings':
        return <SettingsPage settings={settings} setSettings={setSettings} setCurrentUser={setCurrentUser} showToast={showToast} />
      default:
        return <HomePage ventes={ventes} tontines={tontines} settings={settings} setPage={setPage} showToast={showToast} />
    }
  }

  if (!onboardingCompleted) {
    return <Onboarding onComplete={() => setOnboardingCompleted(true)} />
  }

  if (!currentUser) {
    return <AuthPage onAuthSuccess={(user) => {
      setCurrentUser(user);
      setSettings({...settings, userName: user.name});
    }} />
  }

  if (settings.lockEnabled && !isUnlocked) {
    return <LockScreen expectedPin={settings.pinCode} onUnlock={() => setIsUnlocked(true)} />
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full transition-colors duration-300 font-sans">
      <Sidebar page={page} setPage={setPage} />
      <Toast toasts={toasts} />
      
      <main className="flex-1 flex flex-col min-h-screen min-w-0 pb-16 lg:pb-0 relative">
        <TopHeader userName={settings.userName} setPage={setPage} />
        <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {renderPage()}
        </div>
      </main>

      <BottomNav page={page} setPage={setPage} />
    </div>
  )
}
