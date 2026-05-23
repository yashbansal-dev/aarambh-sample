import React from 'react';
import { ContourBackground } from './ContourBackground';

export const About: React.FC = () => {
  const stats = [
    { value: '40,000+', label: 'ATTENDEES', bg: '#FF9A00', textColor: 'text-black', borderCol: 'border-black/20', descColor: 'text-black', desc: 'Students from all over India' },
    { value: '150+', label: 'EVENTS', bg: '#0D21DD', textColor: 'text-white', borderCol: 'border-white/20', descColor: 'text-white/80', desc: 'Cultural, technical & informal' },
    { value: '15+', label: 'SPORTS', bg: '#FF188C', textColor: 'text-white', borderCol: 'border-white/20', descColor: 'text-white/80', desc: 'Track, court & field championships' },
    { value: '₹20L+', label: 'PRIZE POOL', bg: '#030404', textColor: 'text-[#FF9A00]', borderCol: 'border-white/20', descColor: 'text-white/70', desc: 'Up for grabs across categories' },
  ];

  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans">
      <ContourBackground />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <span className="px-3 py-1 bg-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-widest">
            THE LEGACY
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-black">
            ABOUT RIVIERA
          </h2>
          <div className="h-1 bg-black w-24" />
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] space-y-6">
            <h3 className="text-3xl font-bebas tracking-wide text-black uppercase">
              RISE • RUSH • REVEL
            </h3>
            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm leading-relaxed">
              Riviera is the annual International Sports and Cultural Carnival of Vellore Institute of Technology. Initiated in 2002, it has grown exponentially into a massive platform celebrating arts, sports, gaming, debate, and music.
            </p>
            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm leading-relaxed">
              For four days, the campus transforms into a vibrant canvas of colors, sound, and camaraderie. With thousands of external participants representing 700+ colleges across India and overseas, Riviera represents the peak of youth empowerment.
            </p>
          </div>

          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] space-y-6">
            <h3 className="text-3xl font-bebas tracking-wide text-black uppercase">
              RETRO PUNK THEME
            </h3>
            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm leading-relaxed">
              The 2026 iteration breaks free from clean templates. Inspired by the raw grit of Neo-Brutalism and Pop Punk art, we pay homage to analog retro print posters, high contrast borders, and electric colors.
            </p>
            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm leading-relaxed">
              From heavy, solid outline buttons to offset blocks and flat shadows, every visual coordinate matches the rebel vibe of youth sports and performing arts.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-6 pt-6">
          <h3 className="text-3xl font-bebas tracking-widest text-black">RIVIERA BY THE NUMBERS</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="border-3 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all text-center flex flex-col justify-between"
                style={{ backgroundColor: stat.bg }}
              >
                <div>
                  <div className={`text-4xl md:text-5xl font-bebas leading-none mb-2 ${stat.textColor}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-black tracking-widest uppercase mb-4 ${stat.textColor}`}>
                    {stat.label}
                  </div>
                </div>
                <p className={`text-xs font-bold uppercase tracking-wider border-t pt-4 ${stat.borderCol} ${stat.descColor}`}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
