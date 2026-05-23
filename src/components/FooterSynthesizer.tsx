'use strict';

'use client';

import React, { useState, useEffect } from 'react';

export const FooterSynthesizer: React.FC = () => {
  // Simulating active audio frequency equalizer bar heights
  const [eqHeights, setEqHeights] = useState<number[]>([40, 60, 25, 80, 50, 70, 30, 90, 45, 65, 35, 75]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 85) + 15));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#0D21DD] border-t-4 border-black text-white font-sans z-10 relative select-none">
      
      {/* Ticker banner above the synthesizer deck */}
      <div className="h-12 border-b-4 border-black bg-black text-white flex items-center overflow-hidden">
        <div className="animate-scroll whitespace-nowrap py-1">
          {Array(8)
            .fill('★ RISE RUSH REVEL 🎸 RIVIERA 2026 💿 VIT VELLORE ')
            .map((txt, i) => (
              <span key={i} className="font-bebas text-xl tracking-widest text-white mr-12 inline-block">
                {txt}
              </span>
            ))}
        </div>
      </div>

      {/* Synthesizer Grid Layout (3 Columns on desktop) */}
      <div className="max-w-7xl mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ==================== LEFT COLUMN (4/12 Width): Digital Panel & Buttons ==================== */}
        <div className="lg:col-span-4 border-4 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Digital Neon Green Panel */}
            <div className="bg-black border-2 border-gray-800 p-3 text-center rounded-none">
              <span className="font-mono text-xs font-black tracking-widest text-[#FF9A00] animate-pulse block">
                NOW PLAYING - RIVIERA 2026
              </span>
            </div>

            {/* Mixer Knobs (4 cyan circles) */}
            <div className="grid grid-cols-4 gap-2 justify-items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full border-3 border-black bg-[#FF188C] relative flex items-center justify-center cursor-pointer hover:rotate-45 transition-transform duration-200">
                    {/* Tick line */}
                    <div className="absolute top-1 w-0.5 h-3 bg-black transform origin-bottom" />
                  </div>
                  <span className="text-[8px] font-black mt-1 uppercase">KNOB {i}</span>
                </div>
              ))}
            </div>

            {/* Action buttons grid */}
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <button
                  key={i}
                  className="py-1.5 bg-[#FF9A00] border-2 border-black font-mono text-[9px] font-black uppercase tracking-tight shadow-[2px_2px_0px_#000000] active:translate-y-[1px] active:shadow-none cursor-pointer"
                >
                  BTN {i + 1}
                </button>
              ))}
            </div>

            {/* 2 Horizontal Sliders */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-black w-8">VOL A</span>
                <input type="range" className="flex-1 accent-black h-1 bg-gray-200 border border-black cursor-pointer" defaultValue="70" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-black w-8">VOL B</span>
                <input type="range" className="flex-1 accent-black h-1 bg-gray-200 border border-black cursor-pointer" defaultValue="45" />
              </div>
            </div>

            {/* 6 Yellow buttons grid */}
            <div className="grid grid-cols-6 gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#FF9A00] border-2 border-black shadow-[1px_1px_0px_#000000] cursor-pointer hover:bg-black"
                />
              ))}
            </div>
          </div>

          {/* Underneath: Blue Riviera watermark box */}
          <div className="bg-[#0000FF] border-3 border-black p-3 text-center shadow-[3px_3px_0px_#000000]">
            <span className="font-caveat text-3xl font-black text-white tracking-widest block leading-none">
              Riviera
            </span>
          </div>
        </div>

        {/* ==================== MIDDLE COLUMN (4/12 Width): Contact, EQ & Socials ==================== */}
        <div className="lg:col-span-4 border-4 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between space-y-6">
          {/* Contact Details */}
          <div className="space-y-2 border-b-2 border-black pb-4 text-center sm:text-left">
            <h4 className="font-bebas text-lg tracking-widest text-[#FF188C] leading-none uppercase">
              CONVENOR DETAILS
            </h4>
            <div className="space-y-1">
              <p className="font-black text-sm text-black">Dr. Belwin Edward J.</p>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Convenor, Riviera 2026</p>
              <a
                href="mailto:convenor.riviera@vit.ac.in"
                className="text-xs font-black uppercase text-blue-600 hover:underline block pt-1"
              >
                convenor.riviera@vit.ac.in ↗
              </a>
            </div>
          </div>

          {/* Equalizer: Moving Yellow Bars inside Blue Box */}
          <div className="border-3 border-black bg-black p-4 flex flex-col justify-between h-40 shadow-inner">
            <span className="text-[9px] font-mono font-black tracking-widest text-gray-500 mb-2 uppercase block text-center">
              EQU FREQUENCY MONITOR
            </span>
            <div className="flex-1 flex items-end justify-between gap-1.5 px-2">
              {eqHeights.map((ht, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#FF9A00] border border-black transition-all duration-100"
                  style={{ height: `${ht}%` }}
                />
              ))}
            </div>
          </div>

          {/* Social Media Links (Small White squares with shadows) */}
          <div className="flex justify-center gap-4 pt-2">
            {[
              { icon: 'IG', link: 'https://instagram.com/' },
              { icon: 'IN', link: 'https://linkedin.com/' },
              { icon: 'YT', link: 'https://youtube.com/' },
              { icon: 'FB', link: 'https://facebook.com/' },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-bebas text-lg text-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ==================== RIGHT COLUMN (4/12 Width): Turntable & Control Pads ==================== */}
        <div className="lg:col-span-4 border-4 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row lg:flex-col justify-between gap-6">
          {/* Control items */}
          <div className="flex-1 space-y-4">
            {/* Top items */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-wider">SOUND DECK</span>
              <div className="flex gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gray-300 border border-black" />
                <div className="w-5 h-5 rounded-full bg-gray-300 border border-black" />
              </div>
            </div>

            {/* Yellow button matrix 2x3 */}
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-7 bg-[#FF9A00] border-2 border-black shadow-[1.5px_1.5px_0px_#000000] cursor-pointer hover:bg-black transition-colors"
                />
              ))}
            </div>

            {/* Vertical black sliders in white channels */}
            <div className="flex justify-between px-4 py-2 border-2 border-black bg-[#F5F1E5]">
              {[1, 2, 3].map((s) => (
                <div key={s} className="h-20 w-4 bg-white border border-black relative flex items-center justify-center">
                  {/* Sliding handle */}
                  <div
                    className="absolute w-6 h-3 bg-black border border-white cursor-pointer hover:scale-105"
                    style={{ bottom: `${s * 20}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right End: Turntable Deck */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center bg-[#0000FF] border-3 border-black p-4 shadow-[4px_4px_0px_#000000] relative">
            <div className="relative w-36 h-36 bg-black rounded-full flex items-center justify-center border-4 border-black animate-spin-slow cursor-pointer group">
              {/* Turntable tracks */}
              <div className="absolute inset-1.5 border border-gray-800 rounded-full" />
              <div className="absolute inset-5 border border-gray-700 rounded-full" />
              <div className="absolute inset-10 border border-gray-600 rounded-full" />
              
              {/* Inner yellow core */}
              <div className="w-12 h-12 rounded-full bg-[#FF9A00] border-2 border-black flex items-center justify-center text-center">
                <span className="font-bebas text-[9px] font-black text-black leading-none transform -rotate-12">
                  RISE RUSH
                </span>
              </div>

              {/* Center spindle */}
              <div className="absolute w-2 h-2 bg-white border border-black rounded-full" />
            </div>
            <span className="text-[8px] font-black text-white uppercase tracking-widest mt-2">
              ANALOG DECK CONTROL
            </span>
          </div>

        </div>

      </div>

      {/* Under-Footer copyright */}
      <div className="bg-black text-[#F5F1E5] p-4 text-center text-[10px] font-black uppercase tracking-widest border-t-4 border-black">
        <p>© 2026 VIT VELLORE. ALL RIGHTS RESERVED. MADE WITH ❤️ BY ANTIGRAVITY AI & THE RIVIERA TEAM</p>
      </div>

    </footer>
  );
};
