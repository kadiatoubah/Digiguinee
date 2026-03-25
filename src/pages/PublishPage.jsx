import React, { useState } from 'react';
import { Share2, Image as ImageIcon, Send } from 'lucide-react';
import { fmt } from '../utils';

export default function PublishPage({ settings, showToast }) {
  const currency = settings?.currency || 'FG';
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleShare = async () => {
    if (!productName.trim()) return showToast('Veuillez entrer un nom de produit.', 'error');

    const textPayload = `🌟 *Nouveau Produit Disponible !* 🌟\n\n🛍️ *${productName}*\n💰 Prix : *${fmt(price, currency)}*\n\n📝 Détails : ${description}\n\nContactez-moi vite pour commander ! 📱`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Produit: ${productName}`,
          text: textPayload,
        });
        showToast('Partage réussi !');
      } catch (err) {
        console.error('Erreur de partage:', err);
      }
    } else {
      // Fallback to WhatsApp wa.me link
      const encodedText = encodeURIComponent(textPayload);
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
      showToast('Redirection vers WhatsApp...', 'info');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Réseaux Sociaux</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm sm:text-base">Mettez en avant vos produits et publiez-les directement sur WhatsApp et Facebook.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col h-full">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Créer une publication</h3>
           <div className="space-y-4 flex-1">
             <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nom de l'article *</label>
                <input 
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white"
                  placeholder="Ex: Tissu Bazin Riche"
                  value={productName} onChange={e => setProductName(e.target.value)}
                />
             </div>
             <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Prix de vente ({currency})</label>
                <input 
                  type="number"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white"
                  placeholder="Ex: 150000"
                  value={price} onChange={e => setPrice(e.target.value)}
                />
             </div>
             <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message d'accroche</label>
                <textarea 
                  rows="4"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/50 dark:text-white resize-none"
                  placeholder="Détails du produit, couleurs disponibles, tailles..."
                  value={description} onChange={e => setDescription(e.target.value)}
                />
             </div>
           </div>
           
           <button 
             onClick={handleShare}
             className="mt-6 w-full bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-soft transition-transform active:scale-95"
           >
             <Share2 className="w-5 h-5" /> Publier sur mes réseaux
           </button>
        </div>

        <div className="glass-card p-6 border-l-4 border-l-brand-500 flex flex-col bg-brand-50/50 dark:bg-brand-900/10">
           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aperçu du message</h3>
           <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 font-sans text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200">
             {productName ? (
               `🌟 *Nouveau Produit Disponible !* 🌟\n\n🛍️ *${productName}*\n💰 Prix : *${fmt(price, currency)}*\n\n📝 Détails : ${description}\n\nContactez-moi vite pour commander ! 📱`
             ) : (
               <div className="text-gray-400 dark:text-gray-500 italic flex items-center justify-center h-full text-center">
                 Remplissez le formulaire pour voir un aperçu de votre publication WhatsApp ici.
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
