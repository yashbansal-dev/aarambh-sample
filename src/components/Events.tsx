import React, { useState, useMemo } from 'react';
import { Event, mockEvents } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

interface EventsProps {
  isExternal: boolean;
  onSelectEvent: (event: Event) => void;
}

type CategoryType = 'ALL' | 'INFORMAL' | 'MANAGEMENT' | 'TECHNICAL' | 'CULTURAL' | 'CREATIVE' | 'SPORTS';

export const Events: React.FC<EventsProps> = ({ isExternal, onSelectEvent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('ALL');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(600); // Max price slider
  const [teamSizeFilter, setTeamSizeFilter] = useState<number | null>(null);

  // Sidebar accordions open states
  const [sidebarOpen, setSidebarOpen] = useState({
    category: true,
    price: true,
    dateTime: true,
    teamSize: true,
  });

  const categories: CategoryType[] = ['ALL', 'INFORMAL', 'MANAGEMENT', 'TECHNICAL', 'CULTURAL', 'CREATIVE', 'SPORTS'];

  // Handle active filter pills
  const handleDayToggle = (day: string) => {
    if (selectedDay === day) {
      setSelectedDay(null);
    } else {
      setSelectedDay(day);
    }
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((evt) => {
      // 1. Search text match
      const textMatch =
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category match
      const categoryMatch = selectedCategory === 'ALL' || evt.category === selectedCategory;

      // 3. Day match (Day 1: 26 Feb, Day 2: 27 Feb, Day 3: 28 Feb)
      let dayMatch = true;
      if (selectedDay) {
        if (selectedDay === 'Day 1' && !evt.date.includes('26')) dayMatch = false;
        if (selectedDay === 'Day 2' && !evt.date.includes('27')) dayMatch = false;
        if (selectedDay === 'Day 3' && !evt.date.includes('28')) dayMatch = false;
        if (selectedDay === 'Day 4' && !evt.date.includes('29') && !evt.date.includes('1')) dayMatch = false;
      }

      // 4. Price range match
      const priceMatch = evt.price <= priceRange;

      // 5. Team size match
      const teamMatch = teamSizeFilter === null || evt.teamSize === teamSizeFilter;

      // 6. External vs Internal filter representation
      // We display slightly adjusted prices or tag differences based on external access
      return textMatch && categoryMatch && dayMatch && priceMatch && teamMatch;
    });
  }, [searchTerm, selectedCategory, selectedDay, priceRange, teamSizeFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedDay(null);
    setPriceRange(600);
    setTeamSizeFilter(null);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row relative bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      {/* SIDEBAR FILTERS (Left 3/12 width on desktop) */}
      <aside className="w-full lg:w-80 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white flex flex-col z-10 relative">
        <div className="p-5 border-b-4 border-black flex justify-between items-center bg-black text-white">
          <h3 className="text-2xl font-bebas tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            FILTERS
          </h3>
          <button
            onClick={clearFilters}
            className="text-xs font-black uppercase text-[#FF9A00] hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="divide-y-2 divide-black overflow-y-auto">
          {/* Category Filter */}
          <div className="p-5">
            <button
              onClick={() => setSidebarOpen({ ...sidebarOpen, category: !sidebarOpen.category })}
              className="w-full flex items-center justify-between font-black uppercase tracking-tight text-sm text-black cursor-pointer"
            >
              <span>CATEGORY</span>
              <span>{sidebarOpen.category ? '▼' : '▶'}</span>
            </button>

            {sidebarOpen.category && (
              <div className="mt-4 space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#FF9A00] shadow-[2px_2px_0px_#000000]'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="p-5">
            <button
              onClick={() => setSidebarOpen({ ...sidebarOpen, price: !sidebarOpen.price })}
              className="w-full flex items-center justify-between font-black uppercase tracking-tight text-sm text-black cursor-pointer"
            >
              <span>PRICE RANGE</span>
              <span>{sidebarOpen.price ? '▼' : '▶'}</span>
            </button>

            {sidebarOpen.price && (
              <div className="mt-4 space-y-3">
                <input
                  type="range"
                  min="100"
                  max="600"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
                <div className="flex justify-between items-center text-xs font-extrabold">
                  <span>₹100</span>
                  <span className="bg-black text-white px-2 py-1">UP TO ₹{priceRange}</span>
                  <span>₹600</span>
                </div>
              </div>
            )}
          </div>

          {/* Team Size Filter */}
          <div className="p-5">
            <button
              onClick={() => setSidebarOpen({ ...sidebarOpen, teamSize: !sidebarOpen.teamSize })}
              className="w-full flex items-center justify-between font-black uppercase tracking-tight text-sm text-black cursor-pointer"
            >
              <span>TEAM SIZE</span>
              <span>{sidebarOpen.teamSize ? '▼' : '▶'}</span>
            </button>

            {sidebarOpen.teamSize && (
              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 6].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setTeamSizeFilter(teamSizeFilter === sz ? null : sz)}
                    className={`w-10 h-10 border-2 border-black flex items-center justify-center font-extrabold text-sm transition-all cursor-pointer ${
                      teamSizeFilter === sz
                        ? 'bg-[#FF188C] text-white shadow-[2px_2px_0px_#000000]'
                        : 'bg-white hover:bg-gray-100 text-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* EVENTS MAIN AREA (Right 9/12 width on desktop) */}
      <main className="flex-1 p-6 md:p-8 space-y-6 z-10 relative">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-1">
              Home &gt; {isExternal ? 'External Events' : 'Internal Events'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bebas tracking-wider text-black">
              {isExternal ? 'EXTERNAL EVENTS' : 'INTERNAL EVENTS'}
            </h2>
          </div>

          <span className="px-3 py-1.5 bg-[#0D21DD] text-white border-2 border-black font-extrabold text-xs uppercase tracking-widest self-start sm:self-center shadow-[2px_2px_0px_#000000]">
            {isExternal ? 'OPEN TO ALL' : 'VIT STUDENTS ONLY'}
          </span>
        </div>

        {/* Search & Day Pills Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-11 bg-white border-3 border-black text-black font-bold text-sm uppercase tracking-tight placeholder-gray-500 focus:outline-hidden focus:shadow-[4px_4px_0px_#000000] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all shadow-[2px_2px_0px_#000000]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Quick Filter Days / Tags */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['Day 1', 'Day 2', 'Day 3', 'Day 4'].map((day) => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`px-4 py-2 border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#FF9A00] text-black shadow-[2px_2px_0px_#000000]'
                    : 'bg-white hover:bg-gray-100 text-black'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Events Cards List */}
        {filteredEvents.length === 0 ? (
          <div className="py-20 text-center bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <span className="text-5xl">👀</span>
            <h4 className="text-2xl font-bebas tracking-wide mt-4 uppercase">No matching events found!</h4>
            <p className="text-sm font-bold uppercase text-gray-600 mt-1">Try resetting your filters or search keywords.</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-2.5 bg-black text-white font-bebas text-lg tracking-widest border-2 border-black shadow-[3px_3px_0px_#0D21DD] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="flex flex-col md:flex-row bg-white border-3 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer group"
              >
                {/* Left: Square Poster Flyer */}
                <div className="w-full md:w-64 h-64 md:h-auto border-b-3 md:border-b-0 md:border-r-3 border-black flex-shrink-0 overflow-hidden relative bg-[#F5F1E5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Right: Details content */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Top line (Title, club, price tag) */}
                  <div className="p-6 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-black group-hover:text-[#FF188C] transition-colors leading-none">
                          {evt.title}
                        </h3>
                        <p className="text-[10px] md:text-xs font-black uppercase text-gray-500 mt-1">
                          {evt.club}
                        </p>
                      </div>

                      {/* Neon Green Price Tag */}
                      <span className="px-3 py-1 bg-[#FF9A00] text-black border-2 border-black font-extrabold text-sm md:text-base shadow-[2px_2px_0px_#000000]">
                        ₹{evt.price}
                      </span>
                    </div>

                    <p className="font-bold text-gray-700 uppercase tracking-tight text-sm leading-relaxed pt-2">
                      {evt.description}
                    </p>
                  </div>

                  {/* Bottom info divided into 4 grid boxes */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 border-t-3 border-black text-center font-extrabold text-xs divide-x-2 divide-y-2 sm:divide-y-0 divide-black bg-[#F5F1E5]">
                    {/* Time */}
                    <div className="p-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider text-black bg-white">
                      <span>⏰</span>
                      <span>{evt.time.split(' - ')[0]}</span>
                    </div>

                    {/* Date */}
                    <div className="p-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider text-black bg-white">
                      <span>📅</span>
                      <span>{evt.date}</span>
                    </div>

                    {/* Team Size */}
                    <div className="p-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider text-black bg-white">
                      <span>👥</span>
                      <span>SIZE: {evt.teamSize}</span>
                    </div>

                    {/* Category */}
                    <div className="p-3.5 flex items-center justify-center gap-1.5 uppercase tracking-wider text-white bg-[#0D21DD] border-t-2 sm:border-t-0 border-black col-span-2 sm:col-span-1">
                      <span>🏷️</span>
                      <span>{evt.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
