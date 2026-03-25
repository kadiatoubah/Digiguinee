import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "Bienvenue sur Digi Guinée",
    description: "La plateforme premium pour gérer vos finances personnelles et suivre vos ventes au quotidien, avec simplicité et élégance.",
    icon: "💎",
    color: "from-brand-400 to-brand-600",
    bgClass: "bg-brand-50 dark:bg-brand-900/20"
  },
  {
    id: 2,
    title: "Vos Tontines, Sécurisées",
    description: "Organisez vos groupes d'épargne solidaire. Suivez les cotisations de chaque membre et le bénéficiaire en temps réel.",
    icon: "🤝",
    color: "from-blue-400 to-blue-600",
    bgClass: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: 3,
    title: "Boostez vos Ventes",
    description: "Partagez vos produits sur WhatsApp en un clic, fixez-vous des objectifs et célébrez vos réussites !",
    icon: "🚀",
    color: "from-purple-400 to-purple-600",
    bgClass: "bg-purple-50 dark:bg-purple-900/20"
  }
];

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-white dark:bg-gray-900 flex flex-col transition-opacity duration-700 ${isRendered ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Top action: Skip */}
      <div className="flex justify-end p-6">
        <button 
          onClick={skip}
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold text-sm transition-colors px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Passer
        </button>
      </div>

      {/* Main Content Carousel */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden relative">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div key={slide.id} className="min-w-full flex flex-col items-center justify-center px-8 text-center">
                 
                 {/* Animated Icon Container */}
                 <div className={`relative mb-12 transition-all duration-700 delay-300 transform ${isActive ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'}`}>
                   <div className={`absolute inset-0 bg-gradient-to-tr ${slide.color} blur-3xl opacity-20 dark:opacity-40 animate-pulse rounded-full scale-150`}></div>
                   <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full ${slide.bgClass} flex items-center justify-center text-6xl sm:text-7xl shadow-glow relative z-10 border-4 border-white dark:border-gray-800`}>
                     {slide.icon}
                   </div>
                 </div>

                 {/* Text Content */}
                 <div className="max-w-md mx-auto">
                   <h1 className={`text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4 transition-all duration-700 delay-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                     {slide.title}
                   </h1>
                   <p className={`text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed transition-all duration-700 delay-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                     {slide.description}
                   </p>
                 </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12 sm:pb-16 flex flex-col items-center gap-8">
        
        {/* Pagination Dots */}
        <div className="flex gap-3">
          {SLIDES.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-brand-500' : 'w-2 bg-gray-200 dark:bg-gray-700'}`}
            ></div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={nextSlide}
          className="w-full max-w-sm bg-brand-500 hover:bg-brand-600 text-white py-4 rounded-2xl font-black text-lg shadow-soft-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          {currentSlide === SLIDES.length - 1 ? (
            <>
              Commencer <Check className="w-6 h-6" />
            </>
          ) : (
            <>
              Suivant <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
