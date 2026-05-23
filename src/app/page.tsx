'use strict';

'use client';

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Homepage } from '../components/Homepage';
import { FooterSynthesizer } from '../components/FooterSynthesizer';
import { CustomCursor } from '../components/CustomCursor';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E5] text-black">
      {/* Sticky Header */}
      <Navbar />

      {/* Main page content renderer */}
      <main className="flex-1 flex flex-col">
        <Homepage />
      </main>

      {/* Synthesizer Footer */}
      <FooterSynthesizer />

      {/* Custom Cursor follower */}
      <CustomCursor />

      {/* Screen glow overlay */}
      <div className="fixed inset-0 pointer-events-none screen-glow z-[9997]" />
    </div>
  );
}
