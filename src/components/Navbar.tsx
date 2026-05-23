import React, { useState } from 'react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onCartOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  cartCount,
  onCartOpen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'HOME', desc: 'Rise Rush Revel festival core' },
    { id: 'about', label: 'ABOUT', desc: 'The story behind the storm' },
    { id: 'events-internal', label: 'INTERNAL EVENTS', desc: 'Exclusively for VIT students' },
    { id: 'events-external', label: 'EXTERNAL EVENTS', desc: 'Open for all college students' },
    { id: 'merch', label: 'MERCH', desc: 'Grab limited edition festival gear' },
    { id: 'team', label: 'TEAM', desc: 'The brains behind the spectacle' },
    { id: 'faqs', label: 'FAQS', desc: 'Got questions? We have answers' },
    { id: 'announcements', label: 'ANNOUNCEMENTS', desc: 'Latest festival alerts & stars' },
  ];

  const handleMenuClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
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
        <div 
          onClick={() => onTabChange('home')}
          className="cursor-pointer select-none text-center"
        >
          <span className="font-caveat text-4xl md:text-5xl font-black text-white tracking-widest hover:text-[#FF9A00] transition-colors">
            Riviera<span className="text-[#FF188C] font-sans text-xs align-super ml-1 font-bold">2026</span>
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon (Merchandise) */}
          <button
            onClick={onCartOpen}
            className="relative p-2.5 bg-white border-2 border-black text-black hover:bg-[#FF188C] hover:text-white transition-colors cursor-pointer hidden sm:flex"
            title="Open Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF188C] text-white border-2 border-black font-extrabold text-xs w-6 h-6 flex items-center justify-center rounded-none shadow-[1px_1px_0px_#000000]">
                {cartCount}
              </span>
            )}
          </button>

          {/* PROSHOW ticket button */}
          <button
            onClick={() => handleMenuClick('announcements')}
            className="h-11 px-4 bg-[#FF9A00] text-black font-bebas text-xl tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
          >
            {/* Wavy side ticket edges Representation */}
            <span className="opacity-40 font-mono text-xs">●</span>
            <span>PROSHOW</span>
            <span className="opacity-40 font-mono text-xs">●</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-11 h-11 bg-white text-black border-2 border-black flex flex-col justify-center items-center gap-1.5 shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="w-5 h-0.5 bg-black" />
            <span className="w-5 h-0.5 bg-black" />
            <span className="w-5 h-0.5 bg-black" />
          </button>
        </div>
      </header>

      {/* Full-Screen Menu Overlay (Neo-Brutalist Grid) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0D21DD] flex flex-col text-white font-sans">
          {/* Header of Overlay */}
          <div className="h-20 px-4 md:px-8 border-b-4 border-black flex items-center justify-between bg-[#0D21DD]">
            <span className="font-caveat text-4xl text-white font-black">
              Riviera<span className="font-sans text-xs align-super ml-0.5">2026</span>
            </span>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-11 h-11 bg-white border-2 border-black flex items-center justify-center font-bold text-lg hover:bg-black hover:text-white hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* 2x4 Card Grid (brutalist rectangles with black borders) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-b-4 border-black overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id || 
                (item.id === 'events-internal' && currentTab === 'events-internal-detail') ||
                (item.id === 'events-external' && currentTab === 'events-external-detail');

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`group relative text-left p-8 border-b-2 md:border-b-4 border-black/30 md:odd:border-r-4 flex flex-col justify-between hover:bg-white hover:text-black transition-all cursor-pointer ${
                    isActive ? 'bg-[#FF9A00] font-black text-black' : 'bg-transparent text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-3xl md:text-4xl font-bebas tracking-widest text-inherit flex items-center gap-2 group-hover:scale-105 group-hover:text-black transition-all duration-200">
                      {isActive && <span className="text-inherit">➔</span>}
                      {item.label}
                    </h3>

                    {/* Rotating SVG shape or Arrow */}
                    <div className="w-10 h-10 border-2 border-black bg-white rounded-none flex items-center justify-center group-hover:bg-[#FF188C] group-hover:text-white transition-all shadow-[2px_2px_0px_#000000] group-hover:shadow-[3px_3px_0px_#000000]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-tight text-white/60 mt-4 group-hover:text-black/70 transition-colors">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Footer of menu */}
          <div className="p-6 bg-[#0D21DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xl">
              <span>RISE</span>
              <span className="text-white">★</span>
              <span>RUSH</span>
              <span className="text-white">★</span>
              <span>REVEL</span>
            </div>
            <p className="text-xs uppercase font-extrabold tracking-wider">
              February 26 - March 1, 2026 • VIT Vellore Campus
            </p>
          </div>
        </div>
      )}
    </>
  );
};
