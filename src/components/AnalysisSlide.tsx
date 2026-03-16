import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Database, Cpu, CheckCircle2 } from 'lucide-react';

export default function AnalysisSlide() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { icon: Database, text: 'Przetwarzanie odpowiedzi...' },
    { icon: Cpu, text: 'Analiza profilu poznawczego...' },
    { icon: Brain, text: 'Dopasowywanie protokołu...' },
    { icon: CheckCircle2, text: 'Gotowe!' }
  ];

  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 30) setStage(0);
      else if (newProgress < 60) setStage(1);
      else if (newProgress < 90) setStage(2);
      else setStage(3);

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = stages[stage].icon;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
      <div className="relative w-32 h-32 mb-8">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-4 border-gray-100 border-t-brand-red border-r-brand-red opacity-50"
        />
        {/* Inner rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-4 border-gray-100 border-b-brand-dark border-l-brand-dark opacity-30"
        />
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-brand-dark">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentIcon size={40} className={stage === 3 ? "text-green-500" : "text-brand-red"} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-brand-dark mb-2">Analizujemy Twój profil</h2>
      
      <div className="h-6 mb-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-brand-gray font-medium"
          >
            {stages[stage].text}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-xs bg-gray-100 h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-red to-brand-dark"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
      <div className="mt-2 text-xs text-gray-400 font-mono">{Math.round(progress)}%</div>
    </div>
  );
}
