import React from 'react';
import { LayoutDashboard, ShoppingCart, Users, Settings, Share2, HelpCircle } from 'lucide-react';

export default function BottomNav({ page, setPage }) {
  const menuItems = [
    { id: 'home', label: 'Accueil', icon: LayoutDashboard },
    { id: 'vente', label: 'Ventes', icon: ShoppingCart },
    { id: 'tontine', label: 'Tontines', icon: Users },
    { id: 'publish', label: 'Partage', icon: Share2 },
    { id: 'help', label: 'Guide', icon: HelpCircle },
    { id: 'settings', label: 'Réglages', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-50 lg:hidden pb-safe h-16 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors duration-300">
      {menuItems.map(item => {
        const Icon = item.icon;
        const isActive = page === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
              isActive ? 'text-brand-600 dark:text-brand-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        )
      })}
    </div>
  );
}
