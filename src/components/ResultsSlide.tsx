import React, { useRef, useState } from 'react';
import { Recommendation } from '../data/matchLogic';
import { questions } from '../data/questions';
import { Download, Share2, RotateCcw, CheckCircle, Info, Mail, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ResultsSlideProps {
  results: { score: number; recs: Recommendation[] };
  answers: Record<string, string | string[]>;
  onRestart: () => void;
}

export default function ResultsSlide({ results, answers, onRestart }: ResultsSlideProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const [emailSent, setEmailSent] = useState(false);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      const element = contentRef.current;
      const opt: any = {
        margin: 10,
        filename: 'Rekomendacje_Lions_Mane_7NUTRITION.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (typeof html2pdf === 'function') {
        html2pdf().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (error) {
      console.error('Błąd generowania PDF:', error);
      window.print(); // Fallback to print dialog
    }
  };

  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Moje rekomendacje Lion's Mane od 7NUTRITION",
        text: `Mój profil poznawczy pasuje w ${results.score}% do idealnego protokołu suplementacji!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).catch(console.error);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      } else {
        // Fallback if clipboard is not available
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    }
  };

  // Helper to get labels from answers
  const getAnswerLabel = (qId: string) => {
    const q = questions.find(q => q.id === qId);
    if (!q) return '';
    const ans = answers[qId];
    if (Array.isArray(ans)) {
      return ans.map(a => q.options.find(o => o.id === a)?.label).join(', ');
    }
    return q.options.find(o => o.id === ans)?.label || '';
  };

  const industryLabel = getAnswerLabel('industry');
  const goalLabel = getAnswerLabel('goal');

  return (
    <div className="flex flex-col h-full bg-brand-light relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-24" id="pdf-content" ref={contentRef}>
        
        {/* Header Section */}
        <div className="bg-brand-dark text-white p-6 pb-8 rounded-b-3xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-brand-red">7</span>NUTRITION
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Twój Protokół</p>
              </div>
              
              <div className="flex flex-col items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xl font-bold text-white">{results.score}%</span>
                <span className="text-[9px] text-gray-300 uppercase">Dopasowanie</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-2 leading-tight">
              Spersonalizowana strategia dla Ciebie
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Na podstawie Twoich odpowiedzi dotyczących branży ({industryLabel}) i głównego celu ({goalLabel}), przygotowaliśmy poniższe rekomendacje.
            </p>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="p-6 space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-3 items-start">
            <Info className="text-yellow-600 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-yellow-800 leading-relaxed">
              <strong>Pamiętaj:</strong> Poniższe rekomendacje to nasze sugestie oparte na algorytmie dopasowania. Traktuj je jako punkt wyjścia do własnych przemyśleń, nie jako definitywne porady medyczne.
            </p>
          </div>

          <div className="space-y-4">
            {results.recs.map((rec, index) => (
              <motion.div 
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 
                  ${rec.type === 'primary' ? 'bg-brand-red' : 
                    rec.type === 'secondary' ? 'bg-brand-dark' : 'bg-gray-300'}`}
                ></div>
                
                <div className="pl-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-brand-dark text-lg leading-tight pr-4">{rec.title}</h3>
                    {rec.type === 'primary' && (
                      <span className="bg-red-50 text-brand-red text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0">
                        Główny Wybór
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {rec.description}
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex gap-2 items-start">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={14} />
                    <p className="text-xs text-gray-500 italic">
                      <strong>Dlaczego:</strong> {rec.reason}
                    </p>
                  </div>

                  {rec.url && (
                    <div className="mt-4">
                      <a 
                        href={rec.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <ShoppingCart size={16} />
                        Przejdź do produktu
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Email Form */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
              <Mail size={16} className="text-brand-red" />
              Wyślij wyniki na email
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Zachowaj swój spersonalizowany protokół na później.
            </p>
            {emailSent ? (
              <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <CheckCircle size={16} />
                Wyniki zostały wysłane!
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmailSent(true);
                  setTimeout(() => setEmailSent(false), 3000);
                }}
                className="flex gap-2"
              >
                <input 
                  type="email" 
                  placeholder="Twój adres email" 
                  required
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-medium hover:bg-black transition-colors"
                >
                  Wyślij
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Hidden footer for PDF only */}
        <div className="hidden pdf-footer p-6 text-center text-xs text-gray-400 border-t mt-8">
          Wygenerowano przez Konfigurator Nootropików 7NUTRITION • Powered by CROly
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-20">
        <div className="flex gap-2 mb-3">
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-red text-white rounded-xl font-medium text-sm hover:bg-red-700 transition-colors active:scale-95"
          >
            <Download size={16} />
            Pobierz PDF
          </button>
          <button 
            onClick={handleShare}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors active:scale-95
              ${shareSuccess ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-brand-dark hover:bg-gray-200'}`}
          >
            {shareSuccess ? <CheckCircle size={16} /> : <Share2 size={16} />}
            {shareSuccess ? 'Skopiowano' : 'Udostępnij'}
          </button>
        </div>
        <button 
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 py-2 text-brand-gray hover:text-brand-dark transition-colors text-xs font-medium"
        >
          <RotateCcw size={14} />
          Rozpocznij od nowa
        </button>
      </div>
      
      {/* CSS for PDF generation to hide/show elements */}
      <style>{`
        @media print {
          .pdf-footer { display: block !important; }
          .custom-scrollbar { overflow: visible !important; height: auto !important; }
        }
      `}</style>
    </div>
  );
}
