import React from 'react'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'

export default function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map(t => (
        <div 
          key={t.id} 
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-soft-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-gray-700 flex items-center gap-3 px-5 py-4 rounded-2xl pointer-events-auto transform transition-all duration-300 translate-y-0 opacity-100"
        >
          {t.type === 'success' && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
          {t.type === 'error' && <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />}
          {t.type === 'info' && <Info className="w-6 h-6 text-blue-500 shrink-0" />}
          <span className="font-semibold text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  )
}
