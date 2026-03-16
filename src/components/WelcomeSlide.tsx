import React from 'react';
import { Brain, ArrowRight, Info } from 'lucide-react';

interface WelcomeSlideProps {
  onStart: () => void;
  onShowEdu: () => void;
}

export default function WelcomeSlide({ onStart, onShowEdu }: WelcomeSlideProps) {
  return (
    <div className="flex flex-col h-full p-8 text-center justify-between">
      <div className="flex justify-end">
        <button 
          onClick={onShowEdu}
          className="text-brand-gray hover:text-brand-red transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Jak to działa?"
          title="Jak to działa?"
        >
          <Info size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
          <Brain size={40} className="text-brand-red" />
        </div>
        
        <h2 className="text-3xl font-bold text-brand-dark mb-4 leading-tight">
          Odkryj Swój Potencjał z <span className="text-brand-red">Lion's Mane</span>
        </h2>
        
        <p className="text-brand-gray mb-8 max-w-sm mx-auto leading-relaxed">
          Odpowiedz na kilka pytań, a my dobierzemy idealną suplementację grzybami funkcjonalnymi do Twojego trybu pracy i celów poznawczych.
        </p>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-dark text-white font-semibold rounded-xl overflow-hidden transition-all hover:bg-black hover:shadow-lg hover:shadow-black/20 active:scale-95 w-full max-w-xs"
        >
          <span className="relative z-10">Rozpocznij konfigurację</span>
          <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-dark opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>

      <div className="text-xs text-gray-400 mt-4">
        Zajmie to mniej niż 2 minuty.
      </div>
    </div>
  );
}
