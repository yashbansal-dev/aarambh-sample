import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-black text-white h-20 px-4 md:px-8 flex items-center justify-between border-b-4 border-black">
      {/* Left: VIT Logo replica */}
      <div className="flex items-center gap-3">
        <svg className="h-10 w-auto" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Minimalist modern representation of VIT crest */}
          <rect x="5" y="5" width="40" height="40" rx="4" fill="white" />
          <circle cx="25" cy="25" r="12" stroke="black" strokeWidth="3" />
          <path d="M 20 20 L 30 30 M 30 20 L 20 30" stroke="black" strokeWidth="3" />
          <text x="55" y="28" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">VIT</text>
          <text x="55" y="42" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">Vellore Institute of Technology</text>
        </svg>
      </div>

      {/* Center: Riviera Logo */}
      <div className="select-none text-center">
        <span className="font-caveat text-4xl md:text-5xl font-black text-white tracking-widest">
          Riviera<span className="text-[#FF188C] font-sans text-xs align-super ml-1 font-bold">2026</span>
        </span>
      </div>

      {/* Right: Actions (Slogan representation) */}
      <div className="flex items-center gap-3">
        <span className="font-bebas text-lg tracking-widest text-[#FF9A00] hidden sm:inline-block">
          RISE • RUSH • REVEL
        </span>
      </div>
    </header>
  );
};
