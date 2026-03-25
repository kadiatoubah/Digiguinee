import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Delete } from 'lucide-react';

export default function LockScreen({ expectedPin, onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === expectedPin) {
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 800);
      }
    }
  }, [pin, expectedPin, onUnlock]);

  const handlePadClick = (num) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
          {pin.length === 4 && pin === expectedPin ? (
            <Unlock className="w-8 h-8 text-white" />
          ) : (
            <Lock className="w-8 h-8 text-white" />
          )}
        </div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">TontineApp</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Entrez votre code pour déverrouiller</p>
      </div>

      <div className={`flex gap-4 mb-10 transition-transform ${error ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
        {[0, 1, 2, 3].map(i => (
          <div 
            key={i} 
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              i < pin.length 
              ? (error ? 'bg-red-500' : 'bg-brand-500') 
              : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handlePadClick(num.toString())}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-800 text-2xl font-black text-gray-900 dark:text-white shadow-soft hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:scale-90 flex items-center justify-center border border-gray-100 dark:border-gray-700/50"
          >
             {num}
          </button>
        ))}
        <div />
        <button
          onClick={() => handlePadClick('0')}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-gray-800 text-2xl font-black text-gray-900 dark:text-white shadow-soft hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:scale-90 flex items-center justify-center border border-gray-100 dark:border-gray-700/50"
        >
           0
        </button>
        <button
          onClick={handleDelete}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-soft hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-90 flex items-center justify-center border border-gray-200 dark:border-gray-700/50"
        >
           <Delete className="w-6 h-6" />
        </button>
      </div>
      
      {error && <p className="mt-8 text-red-500 font-bold animate-pulse">Code PIN incorrect</p>}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
