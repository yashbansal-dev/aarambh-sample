import React from 'react';
import { mockAnnouncements } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

export const Announcements: React.FC = () => {
  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10 pb-12">
        {/* Title */}
        <div className="space-y-3 border-b-2 border-black pb-4">
          <span className="px-3 py-1 bg-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-widest">
            FESTIVAL BULLETINS
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-black leading-none uppercase">
            LATEST ANNOUNCEMENTS
          </h2>
        </div>

        {/* Gallery grid (3-column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockAnnouncements.map((item) => (
            <div
              key={item.id}
              className="bg-white border-3 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[10px_10px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Image & Badges */}
              <div className="aspect-video border-b-3 border-black overflow-hidden relative bg-[#F5F1E5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Tag Badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#FF9A00] text-black border-2 border-black font-extrabold text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
                  {item.tag}
                </span>

                {/* Date Badge */}
                <span className="absolute bottom-3 right-3 px-3 py-1 bg-[#FF188C] text-white border-2 border-black font-extrabold text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
                  {item.date}
                </span>
              </div>

              {/* Contents */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bebas tracking-wide text-black group-hover:text-[#0D21DD] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <div className="h-0.5 bg-black/10 w-16" />
                </div>

                <p className="font-bold text-gray-700 uppercase tracking-tight text-xs leading-relaxed">
                  {item.content}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-black transition-colors">
                    Official Bulletin ID: #{item.id} • Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
