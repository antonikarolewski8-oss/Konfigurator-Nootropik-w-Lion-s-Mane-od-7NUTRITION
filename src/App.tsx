/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { questions } from './data/questions';
import { generateRecommendations, Recommendation } from './data/matchLogic';
import WelcomeSlide from './components/WelcomeSlide';
import QuestionSlide from './components/QuestionSlide';
import AnalysisSlide from './components/AnalysisSlide';
import ResultsSlide from './components/ResultsSlide';
import EmbedModal from './components/EmbedModal';
import EducationModal from './components/EducationModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState(-1); // -1: Welcome, 0-6: Questions, 7: Analysis, 8: Results
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showEduModal, setShowEduModal] = useState(false);
  const [results, setResults] = useState<{ score: number; recs: Recommendation[] } | null>(null);

  useEffect(() => {
    // Check if embedded
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embed') === 'true') {
      setIsEmbedded(true);
    }
  }, []);

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === questions.length - 1) {
      // Go to analysis
      setCurrentStep(questions.length);
    }
  };

  useEffect(() => {
    if (currentStep === questions.length) {
      const timer = setTimeout(() => {
        try {
          const generated = generateRecommendations(answers);
          setResults(generated);
          setCurrentStep(questions.length + 1); // Go to results
        } catch (error) {
          console.error("Error generating recommendations:", error);
          // Fallback to ensure the user doesn't get stuck
          setResults({ score: 85, recs: [] });
          setCurrentStep(questions.length + 1);
        }
      }, 2500); // Fake loading time for analysis
      return () => clearTimeout(timer);
    }
  }, [currentStep, answers]);

  const handleBack = () => {
    if (currentStep > -1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(-1);
    setResults(null);
  };

  // Slide transition variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Determine direction based on previous step (simplified)
  const direction = 1; // Always slide left for simplicity, or we can track prevStep

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isEmbedded ? 'bg-transparent' : 'bg-brand-light'}`}>
      
      {!isEmbedded && (
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-brand-dark tracking-tight">
            <span className="text-brand-red">7</span>NUTRITION
          </h1>
          <p className="text-sm text-brand-gray mt-1 font-medium uppercase tracking-wider">Kreator Nootropików</p>
        </header>
      )}

      <div className="w-full max-w-[600px] relative">
        <div className="slide-container bg-white">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === -1 && (
              <motion.div
                key="welcome"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <WelcomeSlide onStart={handleStart} onShowEdu={() => setShowEduModal(true)} />
              </motion.div>
            )}

            {currentStep >= 0 && currentStep < questions.length && (
              <motion.div
                key={`q-${currentStep}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <QuestionSlide
                  question={questions[currentStep]}
                  currentAnswer={answers[questions[currentStep].id]}
                  onAnswer={(ans) => handleAnswer(questions[currentStep].id, ans)}
                  onNext={handleNext}
                  onBack={handleBack}
                  step={currentStep + 1}
                  totalSteps={questions.length}
                />
              </motion.div>
            )}

            {currentStep === questions.length && (
              <motion.div
                key="analysis"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <AnalysisSlide />
              </motion.div>
            )}

            {currentStep === questions.length + 1 && results && (
              <motion.div
                key="results"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <ResultsSlide 
                  results={results} 
                  answers={answers} 
                  onRestart={handleRestart} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isEmbedded && (
          <button
            onClick={() => setShowEmbedModal(true)}
            className="absolute -bottom-16 right-0 flex items-center gap-2 px-4 py-2 bg-white text-brand-dark rounded-full shadow-md hover:shadow-lg transition-all text-sm font-medium border border-gray-100"
          >
            <svg xmlns="http://www.w3.org/.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            Osadź (Embed)
          </button>
        )}
      </div>

      <footer className={`mt-12 text-center ${isEmbedded ? 'fixed bottom-4 w-full' : ''}`}>
        <a 
          href="https://wearecroly.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-brand-gray hover:text-brand-red transition-colors inline-flex items-center gap-1"
        >
          Powered by <span className="font-semibold">CROly</span>
        </a>
      </footer>

      {showEmbedModal && <EmbedModal onClose={() => setShowEmbedModal(false)} />}
      {showEduModal && <EducationModal onClose={() => setShowEduModal(false)} />}
    </div>
  );
}
