import React, { useState } from 'react';
import { Lock, Phone, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.phone && formData.password) {
      // Mock validation
      onAuthSuccess({
        id: Date.now().toString(),
        name: isLogin ? 'Profil Utilisateur' : (formData.name || 'Nouvel Utilisateur'),
        phone: formData.phone
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Visual Section - Hidden on small screens */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-700 to-brand-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl animate-pulse"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain rounded-full border-4 border-white/20 shadow-2xl" onError={(e) => e.target.style.display='none'} />
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter">DIGI-GUINEE</h1>
              <p className="text-accent-400 text-xs font-bold tracking-[0.2em] uppercase">Gère ton argent sans stress</p>
            </div>
          </div>
          <p className="text-brand-100 text-lg max-w-md leading-relaxed">
            La plateforme intelligente conçue pour l'excellence de votre gestion financière.
          </p>
        </div>

        <div className="relative z-10 glass border-0 bg-white/10 p-8 rounded-3xl max-w-sm">
          <div className="flex gap-4 mb-4">
            <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">💎</span>
            <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">🇬🇳</span>
          </div>
          <p className="text-white font-medium">L'outil indispensable pour les entrepreneures de demain.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden text-center mb-10">
            <img src="/logo.png" alt="Logo" className="w-28 h-28 object-contain mx-auto rounded-full border-2 border-brand-100 shadow-lg" onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }} />
            <div className="hidden w-24 h-24 bg-brand-600 rounded-full mx-auto items-center justify-center text-white font-black text-2xl shadow-glow">D</div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-4 tracking-tighter">DIGI-GUINEE</h1>
          </div>

          <div className="text-center lg:text-left mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {isLogin ? 'Bon retour !' : 'Créer un compte'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {isLogin ? 'Connectez-vous pour accéder à votre espace' : 'Quelques informations pour démarrer'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom complet</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    placeholder="Ex: Aminata Diallo"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Numéro de téléphone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="6X XX XX XX"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••"
                  className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl pl-11 pr-4 py-3 sm:py-3.5 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white transition-all"
                />
              </div>
              {isLogin && (
                <div className="text-right mt-2">
                  <a href="#" className="text-brand-500 text-sm font-medium hover:underline">Mot de passe oublié ?</a>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-3.5 sm:py-4 font-bold text-base shadow-soft-lg transition-transform active:scale-95 mt-6"
            >
              {isLogin ? (
                <><LogIn className="w-5 h-5" /> Se Connecter</>
              ) : (
                <><UserPlus className="w-5 h-5" /> S'inscrire</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
             <span className="text-gray-500 dark:text-gray-400">
               {isLogin ? "Nouveau sur Digi Guinée ?" : "Déjà un compte ?"}
             </span>
             <button 
               onClick={() => setIsLogin(!isLogin)}
               className="ml-2 font-bold text-brand-500 hover:underline"
             >
               {isLogin ? "Créer un compte" : "Se connecter"}
             </button>
          </div>

        </div>
      </div>

    </div>
  );
}
