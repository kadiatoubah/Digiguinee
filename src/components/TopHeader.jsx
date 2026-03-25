import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Moon, Sun, Monitor, CheckCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function TopHeader({ setSidebarOpen, userName = "Utilisateur", hasNotifications = true, setPage }) {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <header className="h-16 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Mobile Logo Visibility */}
        <div className="flex lg:hidden items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-white dark:bg-gray-800 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain scale-[1.3] transform-gpu" onError={(e) => e.target.style.display='none'} />
          </div>
          <span className="font-black text-gray-900 dark:text-white tracking-tighter leading-none text-xl">DIGI-GUINEE</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 transition-colors w-64 focus-within:ring-2 focus-within:ring-brand-500/50">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none text-sm w-full dark:text-white" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={cycleTheme} className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Changer le thème">
          <ThemeIcon className="w-5 h-5" />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg border border-gray-100 dark:border-gray-700/50 overflow-hidden z-50 animate-[slideDown_0.2s_ease-out]">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                <span className="text-xs bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400 font-bold px-2 py-0.5 rounded-full">Nouveau</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Votre objectif a été atteint ! 🎉</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Arrivée à {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <button className="text-sm font-bold text-brand-500 hover:text-brand-600 dark:hover:text-brand-400">Marquer tout comme lu</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setPage('settings')}
          className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 p-1 rounded-xl transition-colors"
        >
           <div className="hidden sm:block text-right">
             <div className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{userName}</div>
             <div className="text-xs text-brand-500 font-medium leading-tight">Marchande</div>
           </div>
           <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/50 border-2 border-brand-200 dark:border-brand-800 flex items-center justify-center text-brand-700 dark:text-brand-400 font-black text-sm">
             {userName ? userName.charAt(0).toUpperCase() : 'M'}
           </div>
        </button>
      </div>
    </header>
  );
}
