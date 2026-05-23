'use strict';

'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Event } from '../data/mockData';
import { BlocksBackground } from './BlocksBackground';

// Dynamically import Three3DHero to avoid SSR canvas issues
const Three3DHero = dynamic(
  () => import('./Three3DHero').then((mod) => mod.Three3DHero),
  { ssr: false }
);

interface HomepageProps {}

export const Homepage: React.FC<HomepageProps> = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer calculation to Feb 26, 2026
  useEffect(() => {
    const targetDate = new Date('2026-02-26T09:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const categories = [
    'ADVENTURE SPORTS',
    'ART DRAMA',
    'CYBER ENGAGE',
    'DANCE',
    'INFORMAL',
    'MUSIC',
    'PRE RIVIERA',
    'PREMIUM',
    'QUIZ WORDS WORTH',
  ];

  const previousProshows = [
    { name: 'Armaan Malik', year: '2023', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80' },
    { name: 'Sonu Nigam', year: '2020', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=600&auto=format&fit=crop&q=80' },
    { name: 'Zakir Khan', year: '2022', img: 'https://images.unsplash.com/photo-1585699324551-f6c309eed262?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="flex flex-col w-full text-black bg-[#F5F1E5] overflow-x-hidden font-sans">
      {/* 3D Intro Animation (Grid reveal, extrusion & camera transitions) */}
      <Three3DHero />

      {/* ==================== 1. HERO SECTION (Dark Grid & Retro Console) ==================== */}
      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="w-full min-h-[90vh] py-12 px-4 md:px-8 flex flex-col items-center justify-center border-b-4 border-black relative overflow-hidden"
        style={{
          backgroundColor: '#F5F1E5'
        }}
      >
        <BlocksBackground />

        {/* Ticker banner immediately below header */}
        <div className="w-full max-w-6xl h-12 border-4 border-black bg-[#0D21DD] flex items-center overflow-hidden select-none shadow-[4px_4px_0px_#000000] mb-12 relative z-10">
          <div className="animate-scroll whitespace-nowrap py-1">
            {Array(6)
              .fill('★ EXPLORE WHAT\'S HAPPENING TODAY ↗ ★ INFUSION 8.0 INTERNATIONAL CULTURAL EXHIBIT ↗ ')
              .map((txt, i) => (
                <span key={i} className="font-extrabold text-sm tracking-widest text-white uppercase mr-8 inline-block">
                  {txt}
                </span>
              ))}
          </div>
        </div>

        {/* Main TV Console Container */}
        <div className="w-full max-w-4xl bg-white border-4 border-black p-4 md:p-6 shadow-[10px_10px_0px_#0D21DD] flex flex-col relative z-10 rounded-none">
          {/* Top Console Bezel Controls */}
          <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-black" />
              <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
              <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
            </div>
            {/* Play/Pause Buttons */}
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-[#FF188C] text-white border-2 border-black font-mono text-[10px] font-black uppercase tracking-tight shadow-[2px_2px_0px_#000000] active:translate-y-[2px] active:shadow-none cursor-pointer">
                PLAY ▶
              </button>
              <button className="px-3 py-1 bg-gray-300 border-2 border-black font-mono text-[10px] font-black uppercase tracking-tight shadow-[2px_2px_0px_#000000] cursor-pointer">
                PAUSE ⏸
              </button>
              <button className="px-3 py-1 bg-[#FF9A00] border-2 border-black font-mono text-[10px] font-black uppercase tracking-tight shadow-[2px_2px_0px_#000000] cursor-pointer">
                NEXT ⏭
              </button>
            </div>
          </div>

          {/* Console TV Screen Inner Area */}
          <div className="border-4 border-black p-6 bg-[#1A1A1A] text-center flex flex-col items-center justify-center relative min-h-[300px]">
            {/* Screen static reflection line overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />

            {/* Giant Riviera Brand Title */}
            <div className="mb-8">
              <span className="font-caveat text-7xl md:text-8xl font-black text-[#F5F1E5] tracking-widest block leading-none drop-shadow-[4px_4px_0px_#FF188C]">
                Riviera
              </span>
              <span className="font-bebas text-2xl tracking-widest text-[#FF9A00] block mt-1">
                VIT VELLORE FESTIVAL 2026
              </span>
            </div>

            {/* Digital Neon Green Countdown */}
            <div className="bg-black border-2 border-gray-800 px-6 py-4 mb-8 shadow-inner max-w-md w-full">
              <div className="font-mono text-xl md:text-3xl font-black tracking-widest text-[#81E600] flex justify-center gap-4">
                <span>{String(timeLeft.days).padStart(2, '0')}d</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span className="animate-pulse">:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">
                Time Remaining to Festival Kick-off
              </div>
            </div>

            {/* Orange/Brown action card container */}
            <div className="w-full max-w-md bg-[#8C6239] border-3 border-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col sm:flex-row gap-4 justify-center">
              {/* Events Action Button */}
              {/* Events Action Button */}
              <button 
                onClick={() => {
                  const proshowEl = document.getElementById('proshows-section');
                  if (proshowEl) proshowEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 bg-[#0D21DD] text-white font-bebas text-xl tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                <span className="w-5 h-5 rounded-full bg-white border border-black flex items-center justify-center text-[10px]">★</span>
                VIEW EVENTS
              </button>

              {/* Proshows Action Button */}
              <button
                onClick={() => {
                  const proshowEl = document.getElementById('proshows-section');
                  if (proshowEl) proshowEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 py-3 bg-[#FF9A00] text-black font-bebas text-xl tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                <span className="w-5 h-5 rounded-full bg-white border border-black flex items-center justify-center text-[10px]">⚙</span>
                PROSHOWS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. TAKEOVER SECTION (Headline & Collage) ==================== */}
      <section className="w-full py-16 px-4 md:px-8 border-b-4 border-black bg-[#F5F1E5]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-5xl md:text-7xl font-bebas text-black leading-tight uppercase">
              ONE UNFORGETTABLE<br />
              CAMPUS TAKEOVER.
            </h2>
            <div className="h-1 bg-black w-24" />
          </div>

          <div className="w-full md:w-1/2 flex items-center gap-4 overflow-hidden border-3 border-black p-4 bg-white shadow-[6px_6px_0px_#000000]">
            {/* Sliding collage simulated */}
            <div className="grid grid-cols-3 gap-2 flex-1 h-36">
              <div className="border-2 border-black overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" alt="drums" className="w-full h-full object-cover" />
              </div>
              <div className="border-2 border-black overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80" alt="singer" className="w-full h-full object-cover" />
              </div>
              <div className="border-2 border-black overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=80" alt="fireworks" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-Linked Parallax Ticker Background */}
      <div className="w-full overflow-hidden bg-white py-6 pointer-events-none relative select-none border-b-4 border-black flex flex-col gap-2">
        <div
          className="font-bebas text-[9vw] font-black text-black/5 leading-none whitespace-nowrap transition-transform duration-75"
          style={{ transform: `translate3d(-${scrollOffset * 0.22}px, 0, 0)` }}
        >
          RISE RUSH REVEL • RIVIERA 2026 • RISE RUSH REVEL • RIVIERA 2026 • RISE RUSH REVEL • RIVIERA 2026
        </div>
        <div
          className="font-bebas text-[9vw] font-black text-black/5 leading-none whitespace-nowrap transition-transform duration-75"
          style={{ transform: `translate3d(calc(-300px + ${scrollOffset * 0.22}px), 0, 0)` }}
        >
          VIT VELLORE • SPORTS CULTURAL FEST • VIT VELLORE • SPORTS CULTURAL FEST • VIT VELLORE • SPORTS CULTURAL FEST
        </div>
      </div>

      {/* ==================== 3. ABOUT VIT SECTION ==================== */}
      <section className="w-full py-16 px-4 md:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <span className="px-4 py-1.5 border-2 border-black rounded-full font-black text-xs uppercase tracking-widest text-black bg-[#F5F1E5] inline-block shadow-[2px_2px_0_#000000]">
              ABOUT VIT
            </span>
          </div>

          <p className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-black leading-relaxed max-w-3xl mx-auto">
            At VIT, we empower students through globally benchmarked{' '}
            <span className="px-3 py-1 bg-[#0D21DD] border-2 border-black rounded-full text-white inline-block text-lg md:text-2xl shadow-[2px_2px_0_#000000]">Education</span>
            , innovation driven{' '}
            <span className="px-3 py-1 bg-[#FF188C] border-2 border-black rounded-full text-white inline-block text-lg md:text-2xl shadow-[2px_2px_0_#000000]">Learning</span>
            , and a diverse campus culture. Supported by{' '}
            <span className="px-3 py-1 bg-[#FF9A00] border-2 border-black rounded-full text-black inline-block text-lg md:text-2xl shadow-[2px_2px_0_#000000]">Experienced</span>
            {' '}faculty, we foster excellence in teaching and research as a core institutional ethos.
          </p>
        </div>
      </section>

      {/* ==================== 4. INAUGURATION SECTION ==================== */}
      <section className="w-full border-b-4 border-black bg-[#F5F1E5]">
        {/* Upper ticker */}
        <div className="h-12 border-b-4 border-black bg-[#FF9A00] flex items-center overflow-hidden select-none">
          <div className="animate-scroll whitespace-nowrap py-1">
            {Array(8)
              .fill('✦ RIVIERA ✦ 2026 ✦ RIVIERA ✦ 2026 ✦ ')
              .map((txt, i) => (
                <span key={i} className="font-bebas text-2xl tracking-widest text-black mr-12 inline-block">
                  {txt}
                </span>
              ))}
          </div>
        </div>

        <div className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="px-4 py-1.5 border-2 border-black rounded-full font-black text-xs uppercase tracking-widest text-black bg-white inline-block shadow-[2px_2px_0_#000000]">
              INAUGURATION
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Mithali Raj Portrait */}
            <div className="md:col-span-5 bg-white border-4 border-black p-3 shadow-[8px_8px_0px_#0D21DD] relative flex flex-col justify-between">
              <div className="aspect-3/4 border-2 border-black overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1540747737956-37872404a821?w=600&auto=format&fit=crop&q=80"
                  alt="Mithali Raj"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="bg-[#FF9A00] border-t-2 border-black p-3 text-center">
                <span className="font-extrabold text-sm text-black tracking-widest uppercase">
                  MITHALI RAJ
                </span>
              </div>
            </div>

            {/* Right Column: Biography content */}
            <div className="md:col-span-7 flex flex-col justify-between p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#000000]">
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-bebas text-black leading-none uppercase">
                  KICKING IT OFF WITH EXCELLENCE
                </h3>

                <div>
                  <h4 className="font-black text-xs uppercase tracking-widest text-[#FF188C] mb-1">
                    CHIEF GUEST
                  </h4>
                  <p className="text-xl font-extrabold text-black uppercase">
                    Mithali Raj (Indian Cricketer)
                  </p>
                </div>

                <p className="font-bold text-gray-700 uppercase tracking-tight text-sm leading-relaxed">
                  We’re honored to welcome an icon of determination and leadership as our inaugural guest. Her remarkable journey marks a powerful beginning to Riviera, setting the stage for a celebration driven by grit and inspiration.
                </p>
              </div>

              {/* Brutalist outline border card frame at the bottom right */}
              <div className="mt-8 border-3 border-dashed border-black p-4 bg-[#F5F1E5] text-center select-none shadow-[2px_2px_0_#000000]">
                <span className="font-bebas text-lg tracking-widest text-black">
                  INAUGURATION CEREMONY • FEB 26 • 9:30 AM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
