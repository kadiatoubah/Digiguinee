import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Monitor, Save, LogOut } from 'lucide-react';

export default function SettingsPage({ settings, setSettings, setCurrentUser, showToast }) {
  const { theme, setTheme } = useTheme();

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const lockEnabled = fd.get('lockEnabled') === 'on';
    const pinCode = fd.get('pinCode');

    if (lockEnabled && (!pinCode || pinCode.length !== 4)) {
      showToast('Le code PIN doit faire 4 chiffres exactement.', 'error');
      return;
    }

    setSettings({
      userName: fd.get('userName'),
      currency: fd.get('currency'),
      goalAmount: Number(fd.get('goalAmount')) || 0,
      lockEnabled: lockEnabled,
      pinCode: pinCode || '0000'
    });
    showToast('Paramètres sauvegardés avec succès !');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Gérez votre profil et les préférences de l'application.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-8 flex flex-col">
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Profil Utilisateur</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom complet</label>
              <input 
                name="userName"
                defaultValue={settings.userName}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all text-sm"
                required
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700/50" />

        <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Préférences Financières</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <div>
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Devise principale</label>
               <select 
                 name="currency" 
                 defaultValue={settings.currency}
                 className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all text-sm appearance-none"
               >
                 <option value="FG">Franc Guinéen (FG)</option>
                 <option value="CFA">Franc CFA (CFA)</option>
                 <option value="€">Euro (€)</option>
                 <option value="$">US Dollar ($)</option>
               </select>
             </div>
             <div>
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Objectif global de caisse</label>
               <input 
                 name="goalAmount"
                 type="number"
                 defaultValue={settings.goalAmount}
                 className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all text-sm"
                 min="0"
               />
             </div>
           </div>
        </div>

        <hr className="border-gray-100 dark:border-gray-700/50" />

        <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Apparence</h3>
           <div className="grid grid-cols-3 gap-3">
             {[
               { id: 'light', icon: Sun, label: 'Clair' },
               { id: 'dark', icon: Moon, label: 'Sombre' },
               { id: 'system', icon: Monitor, label: 'Système' }
             ].map(t => {
               const Icon = t.icon;
               const isActive = theme === t.id;
               return (
                 <button
                   key={t.id}
                   type="button"
                   onClick={() => setTheme(t.id)}
                   className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all ${
                     isActive 
                     ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                     : 'border-transparent bg-gray-50 dark:bg-gray-900 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                   }`}
                 >
                   <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                   <span className="text-xs sm:text-sm font-semibold">{t.label}</span>
                 </button>
               )
             })}
           </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="button" onClick={() => window.alert("Verrouillage de l'application activable.")} className="hidden"></button>
        </div>

        <div>
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Sécurité</h3>
           <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4">
             <div className="flex items-center justify-between mb-4">
               <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">Verrouillage de l'application</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Demande un code PIN à l'ouverture.</p>
               </div>
               <label className="relative inline-flex items-center cursor-pointer">
                 <input type="checkbox" name="lockEnabled" defaultChecked={settings.lockEnabled} className="sr-only peer" />
                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-500"></div>
               </label>
             </div>
             
             <div>
               <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Code PIN (4 chiffres)</label>
               <input 
                 name="pinCode"
                 type="password"
                 maxLength="4"
                 defaultValue={settings.pinCode}
                 className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all text-sm tracking-widest font-mono"
                 placeholder="0000"
               />
             </div>
           </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {setCurrentUser && (
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
                  setCurrentUser(null);
                  showToast("Vous avez été déconnecté.", "success");
                }
              }}
              className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-500/10 dark:hover:bg-red-500/20 px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          )}

          <button type="submit" className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95">
            <Save className="w-5 h-5" />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
