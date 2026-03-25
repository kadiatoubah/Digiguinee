import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({ title, message, onConfirm, onCancel, confirmText = 'Confirmer', danger = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg w-full max-w-sm overflow-hidden transform scale-100 transition-all duration-200">
        <div className="p-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${danger ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'}`}>
             <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex flex-row-reverse gap-3 border-t border-gray-100 dark:border-gray-800">
          <button 
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-transform active:scale-95 ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-500 hover:bg-brand-600'}`}
          >
            {confirmText}
          </button>
          <button 
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
