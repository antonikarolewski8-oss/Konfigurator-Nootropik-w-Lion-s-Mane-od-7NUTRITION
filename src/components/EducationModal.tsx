import React from 'react';
import { X, HelpCircle, Brain, Target, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EducationModalProps {
  onClose: () => void;
}

export default function EducationModal({ onClose }: EducationModalProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-brand-light">
            <div className="flex items-center gap-3 text-brand-dark">
              <HelpCircle size={24} className="text-brand-red" />
              <h2 className="text-xl font-bold">Jak to działa?</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-brand-dark rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
            <section>
              <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
                <Brain size={20} className="text-brand-red" />
                Czym jest ten konfigurator?
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                To inteligentne narzędzie stworzone przez <strong>7NUTRITION</strong>, które pomaga dobrać optymalną formę i sposób suplementacji grzybami Lion's Mane (Soplówka jeżowata) do Twojego unikalnego profilu poznawczego.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
                <Target size={20} className="text-brand-red" />
                Kiedy warto go użyć?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Gdy czujesz spadek koncentracji lub tzw. "mgłę mózgową".
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Przed intensywnymi okresami nauki lub pracy projektowej.
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                  Jeśli szukasz naturalnej alternatywy dla stymulantów.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-brand-dark mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-brand-red" />
                Proces w 3 krokach
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-brand-red font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Odpowiadasz na pytania</h4>
                    <p className="text-xs text-gray-500 mt-1">Zbieramy informacje o Twoim trybie życia, celach i doświadczeniu.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-brand-red font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Analizujemy profil</h4>
                    <p className="text-xs text-gray-500 mt-1">Nasz algorytm dopasowuje Twoje odpowiedzi do bazy wiedzy o nootropikach.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-brand-red font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-brand-dark">Otrzymujesz protokół</h4>
                    <p className="text-xs text-gray-500 mt-1">Dostajesz spersonalizowane rekomendacje produktów i nawyków.</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="text-xs text-yellow-800 leading-relaxed font-medium">
                <strong>Ważne:</strong> To są nasze sugestie oparte na Twoich odpowiedziach. Ostateczna decyzja należy do Ciebie. Suplementy diety nie mogą być stosowane jako substytut zróżnicowanej diety.
              </p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-dark text-white rounded-xl font-medium hover:bg-black transition-colors active:scale-95"
            >
              Rozumiem, zaczynajmy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
