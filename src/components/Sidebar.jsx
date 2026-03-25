// src/components/Sidebar.jsx
import React from 'react';
import { LayoutDashboard, ShoppingCart, Users, Settings, Share2, HelpCircle } from 'lucide-react';

export default function Sidebar({ page, setPage }) {
  const menuItems = [
    { id: 'home', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'vente', label: 'Ventes', icon: ShoppingCart },
    { id: 'tontine', label: 'Tontines', icon: Users },
    { id: 'publish', label: 'Partage Réseaux', icon: Share2 },
    { id: 'help', label: 'Guide & Vocal', icon: HelpCircle },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col hidden lg:flex sticky top-0 h-screen transition-colors duration-300">
      <div className="h-32 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 gap-3 bg-gradient-to-r from-brand-50 to-transparent dark:from-brand-900/10">
        <div className="w-20 h-20 relative flex-shrink-0">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain rounded-full border-2 border-brand-200 shadow-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 items-center justify-center text-white font-bold text-2xl shadow-glow">
            D
          </div>
        </div>
        <div>
          <span className="block font-black text-xl text-gray-900 dark:text-white tracking-tighter leading-none">DIGI-GUINEE</span>
          <span className="block text-xs font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest mt-1.5">SANS STRESS</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left font-semibold ${isActive
                ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
                }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <div className="text-xs text-center text-gray-400 dark:text-gray-500 font-medium">
          TontineApp v3.0 Premium
        </div>
      </div>
    </aside>
  );
}
