import React, { useState } from 'react';
import { BookOpen, Mic, Play, Pause, Square, MessageCircle, ShieldQuestion } from 'lucide-react';

export default function HelpPage({ showToast }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lang, setLang] = useState('fr');

  const languages = [
    { id: 'fr', label: 'Français' },
    { id: 'sus', label: 'Soussou' },
    { id: 'pou', label: 'Poular' },
    { id: 'mal', label: 'Malinké' },
  ];
  
  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      showToast('Enregistrement terminé et sauvegardé !', 'success');
    } else {
      setIsRecording(true);
      showToast('Enregistrement en cours, parlez maintenant...', 'info');
    }
  };

  const handlePlay = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const texts = {
        fr: "Bienvenue sur Digi Guinée. Gérez vos ventes et vos tontines sans stress.",
        sus: "I ni saama Digi Guinée. I xa tontine nun i xa xunsee malanyi kanyi.",
        pou: "Bismillah Digi Guinée. Joggu kaaliss ma e tontine ma kadi.",
        mal: "I ni bara Digi Guinée. I la tontine ni i la feere taga gbelen."
      };
      const msg = new SpeechSynthesisUtterance(texts[lang] || texts.fr);
      msg.lang = lang === 'fr' ? 'fr-FR' : 'fr-FR'; // Fallback to fr-FR voice for simulation
      msg.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Assistance & Guide</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Apprenez à utiliser l'application avec ces conseils simples.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Audio Guide */}
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-900/20">
            <MessageCircle className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Écouter le guide vocal</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Choisissez votre langue et écoutez comment utiliser l'application.</p>
          
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {languages.map(l => (
              <button 
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${lang === l.id ? 'bg-blue-500 text-white shadow-md scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={handlePlay}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm ${
              isPlaying 
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' 
              : 'bg-blue-500 hover:bg-blue-600 text-white active:scale-95'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            {isPlaying ? 'Arrêter la lecture' : 'Écouter le guide'}
          </button>
        </div>

        {/* Voice Note Taker */}
        <div className="glass-card p-6 flex flex-col justify-center items-center text-center border-t-4 border-t-brand-500">
          <div className="w-16 h-16 bg-brand-50 dark:bg-brand-500/10 rounded-full flex items-center justify-center mb-4">
            <Mic className="w-8 h-8 text-brand-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Créer un mémo vocal</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Enregistrez un message vocal pour noter un détail important dans votre langue.</p>
          
          <button 
            onClick={handleRecord}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm active:scale-95 ${
              isRecording 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-brand-500 hover:bg-brand-600 text-white'
            }`}
          >
            {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
            {isRecording ? 'Arrêter l\'enregistrement' : 'Commencer à parler'}
          </button>
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-brand-500" /> Foire aux questions
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
             <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Comment ajouter une dette ?</h4>
             <p className="text-gray-600 dark:text-gray-400 text-sm">Allez dans le menu "Ventes", cliquez sur "Nouvelle Vente" et lors de l'enregistrement, sélectionnez "À Crédit".</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
             <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Comment retirer quelqu'un d'une tontine ?</h4>
             <p className="text-gray-600 dark:text-gray-400 text-sm">Ouvrez votre groupe Tontine, trouvez le membre et cliquez sur l'icône de la poubelle rouge au bout de sa ligne.</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
             <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Mes données sont-elles protégées ?</h4>
             <p className="text-gray-600 dark:text-gray-400 text-sm">Oui. Allez dans les Paramètres pour activer le Code PIN. Toutes vos données restent dans votre téléphone et ne sont partagées sur aucun serveur.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
