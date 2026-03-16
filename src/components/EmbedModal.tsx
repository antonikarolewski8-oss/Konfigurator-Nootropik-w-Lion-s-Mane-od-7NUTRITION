import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EmbedModalProps {
  onClose: () => void;
}

export default function EmbedModal({ onClose }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const [size, setSize] = useState<'400' | '600' | '800'>('600');

  const appUrl = window.location.origin + window.location.pathname;

  const embedCode = `<div style="max-width: ${size}px; margin: 0 auto;">
  <iframe 
    src="${appUrl}?embed=true" 
    width="${size}" 
    height="${size}" 
    frameborder="0" 
    style="border: 1px solid #e5e7eb; border-radius: 16px; display: block; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    loading="lazy">
  </iframe>
  <div style="text-align: center; margin-top: 12px; font-size: 14px;">
    <a href="https://wearecroly.com" target="_blank" rel="noopener" style="color: #6b7280; text-decoration: none; font-family: sans-serif;">Powered by CROly</a>
  </div>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-brand-dark">Osadź Konfigurator</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-brand-dark rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-brand-gray mb-6">
              Skopiuj poniższy kod, aby osadzić ten konfigurator na swojej stronie internetowej lub blogu. Aplikacja automatycznie dostosuje się do wybranego rozmiaru, zachowując proporcje kwadratu.
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-dark mb-2">Wybierz rozmiar (px)</label>
              <div className="flex gap-3">
                {(['400', '600', '800'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-all
                      ${size === s 
                        ? 'border-brand-red bg-red-50 text-brand-red' 
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {s} x {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-xl text-xs text-gray-700 font-mono overflow-x-auto border border-gray-200 whitespace-pre-wrap break-all">
                {embedCode}
              </pre>
              <button
                onClick={handleCopy}
                className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                  ${copied 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Skopiowano!' : 'Kopiuj kod'}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand-dark text-white rounded-lg font-medium hover:bg-black transition-colors"
            >
              Zamknij
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
