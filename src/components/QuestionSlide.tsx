import React, { useEffect, useState } from 'react';
import { Question, Option } from '../data/questions';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface QuestionSlideProps {
  question: Question;
  currentAnswer: string | string[] | undefined;
  onAnswer: (ans: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
  step: number;
  totalSteps: number;
}

export default function QuestionSlide({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onBack,
  step,
  totalSteps,
}: QuestionSlideProps) {
  const [localAnswer, setLocalAnswer] = useState<string | string[]>(currentAnswer || (question.type === 'multi' ? [] : ''));
  const Icon = question.icon;

  // Update local state when prop changes (e.g., navigating back)
  useEffect(() => {
    setLocalAnswer(currentAnswer || (question.type === 'multi' ? [] : ''));
  }, [currentAnswer, question.id]);

  const handleSelect = (optionId: string) => {
    if (question.type === 'single') {
      setLocalAnswer(optionId);
      onAnswer(optionId);
    } else {
      const currentArr = Array.isArray(localAnswer) ? localAnswer : [];
      let newArr;
      if (currentArr.includes(optionId)) {
        newArr = currentArr.filter((id) => id !== optionId);
      } else {
        newArr = [...currentArr, optionId];
      }
      setLocalAnswer(newArr);
      onAnswer(newArr);
    }
  };

  const isSelected = (optionId: string) => {
    if (question.type === 'single') {
      return localAnswer === optionId;
    }
    return Array.isArray(localAnswer) && localAnswer.includes(optionId);
  };

  const canProceed = question.type === 'single' ? !!localAnswer : true; // Multi can be empty

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header & Progress */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-gray-400 hover:text-brand-dark transition-colors rounded-full hover:bg-gray-100"
            aria-label="Wróć"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Krok {step} z {totalSteps}
          </div>
          <div className="w-8"></div> {/* Spacer for balance */}
        </div>
        
        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-brand-red"
            initial={{ width: `${((step - 1) / totalSteps) * 100}%` }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-50 text-brand-red rounded-lg">
            <Icon size={24} />
          </div>
          <h2 className="text-xl font-bold text-brand-dark leading-tight">{question.title}</h2>
        </div>
        {question.subtitle && (
          <p className="text-sm text-brand-gray mb-4">{question.subtitle}</p>
        )}
      </div>

      {/* Options List - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar">
        <div className="space-y-3">
          {question.options.map((option: Option) => {
            const selected = isSelected(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group
                  ${selected 
                    ? 'border-brand-red bg-red-50/30 shadow-sm' 
                    : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                  ${question.type === 'multi' ? 'rounded-md' : 'rounded-full'}
                  ${selected ? 'border-brand-red bg-brand-red text-white' : 'border-gray-300 bg-white group-hover:border-gray-400'}
                `}>
                  {selected && <Check size={14} strokeWidth={3} />}
                </div>
                <div>
                  <div className={`font-semibold ${selected ? 'text-brand-dark' : 'text-gray-700'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1 leading-snug">
                      {option.description}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-8">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all
            ${canProceed 
              ? 'bg-brand-dark text-white hover:bg-black active:scale-[0.98] shadow-md' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          {step === totalSteps ? 'Analizuj wyniki' : 'Dalej'}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
