import React, { useState } from 'react';
import { mockFAQs } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

export const FAQs: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10 pb-12">
        {/* Title */}
        <div className="space-y-3 border-b-2 border-black pb-4 text-center">
          <span className="px-3 py-1 bg-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-widest">
            QUESTIONS
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-black leading-none uppercase">
            FREQUENTLY ASKED
          </h2>
          <div className="h-0.5 bg-black/20 w-32 mx-auto" />
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {mockFAQs.map((faq) => {
            const isOpen = expandedId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white border-3 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col"
              >
                {/* FAQ Header Row */}
                <div
                  onClick={() => handleToggle(faq.id)}
                  className="flex items-stretch justify-between cursor-pointer min-h-[72px]"
                >
                  {/* Left Column: Question text (and active border highlight) */}
                  <div className="flex items-center flex-1">
                    {/* Active Row Accent Bar */}
                    <div
                      className={`w-3 self-stretch transition-all duration-200 ${
                        isOpen ? 'bg-[#0D21DD]' : 'bg-transparent border-r-2 border-black/10'
                      }`}
                    />

                    <h3 className="p-5 font-bold uppercase tracking-tight text-xs md:text-sm text-black flex-1 select-none pr-8">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Right Column: Index Tag or Close X */}
                  <div
                    className={`w-16 md:w-20 flex-shrink-0 flex items-center justify-center font-bebas text-xl md:text-2xl border-l-3 border-black select-none transition-colors duration-200 ${
                      isOpen ? 'bg-black text-white' : 'bg-[#F5F1E5] text-black'
                    }`}
                  >
                    {isOpen ? '✕' : faq.index}
                  </div>
                </div>

                {/* FAQ Collapsible Answer Body */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-60 border-t-3 border-black' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 bg-white font-semibold text-gray-700 uppercase tracking-tight text-xs md:text-sm leading-relaxed pr-20 pl-8">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
