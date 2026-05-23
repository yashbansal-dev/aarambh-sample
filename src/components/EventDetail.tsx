import React, { useState } from 'react';
import { Event } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

interface EventDetailProps {
  event: Event;
  isExternal: boolean;
  onBack: () => void;
  onRegister: (event: Event) => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({
  event,
  isExternal,
  onBack,
  onRegister,
}) => {
  const [isDescExpanded, setIsDescExpanded] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Breadcrumbs & Back button */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div className="text-xs font-black uppercase tracking-widest text-gray-500">
            <span onClick={onBack} className="hover:text-black cursor-pointer hover:underline">
              Home
            </span>{' '}
            &gt;{' '}
            <span onClick={onBack} className="hover:text-black cursor-pointer hover:underline">
              Events Page
            </span>{' '}
            &gt; <span className="text-black">{event.title}</span>
          </div>

          <button
            onClick={onBack}
            className="px-4 py-2 bg-white text-black font-bebas text-sm tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer"
          >
            ← BACK TO EVENTS
          </button>
        </div>

        {/* Main Event Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Huge Event Flyer Poster (5/12 width) */}
          <div className="lg:col-span-5 bg-white border-4 border-black p-3 shadow-[8px_8px_0px_#000000] relative">
            <div className="aspect-square border-2 border-black overflow-hidden bg-[#F5F1E5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 transform -rotate-6 bg-[#FF188C] text-white border-2 border-black px-3 py-1 font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_#000000]">
              LIMITED SLOTS
            </div>
          </div>

          {/* Right Column: Event Info details (7/12 width) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-5xl md:text-6xl font-bebas tracking-wide text-black leading-none uppercase">
                {event.title}
              </h2>
              <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                HOSTED BY {event.club}
              </p>
            </div>

            {/* Price section */}
            <div className="bg-white border-3 border-black p-4 flex items-center justify-between shadow-[4px_4px_0px_#000000]">
              <div>
                <span className="text-3xl font-black text-black">₹{event.price}</span>
                <span className="text-xs font-bold uppercase text-gray-600 ml-2">
                  (per person) inclusive of GST
                </span>
              </div>

              {/* Status indicator */}
              <span className="px-3 py-1 bg-[#FF9A00] text-black border-2 border-black font-extrabold text-xs uppercase tracking-widest shadow-[1px_1px_0px_#000000]">
                ACTIVE
              </span>
            </div>

            <p className="font-bold text-gray-800 uppercase tracking-tight text-sm leading-relaxed">
              {event.description}
            </p>

            {/* 4-Column Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-3 border-black bg-white shadow-[4px_4px_0px_#000000] divide-x-2 divide-y-2 sm:divide-y-0 divide-black font-extrabold text-xs text-center uppercase tracking-wider">
              {/* Venue */}
              <div className="p-4 bg-white flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-500 mb-1">VENUE</span>
                <span className="text-black text-sm">{event.venue}</span>
              </div>

              {/* Prize Pool */}
              <div className="p-4 bg-white flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-500 mb-1">PRIZE POOL</span>
                <span className="text-black text-sm">{event.prize}</span>
              </div>

              {/* Team Size */}
              <div className="p-4 bg-white flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-500 mb-1">TEAM SIZE</span>
                <span className="text-black text-sm">{event.teamSize} MEMBER(S)</span>
              </div>

              {/* Category */}
              <div className="p-4 bg-white flex flex-col justify-between">
                <span className="text-[10px] font-black text-gray-500 mb-1">CATEGORY</span>
                <span className="text-black text-sm">{event.category}</span>
              </div>
            </div>

            {/* Actions: Register / Share buttons */}
            <div className="flex gap-4 items-center">
              {/* Share button */}
              <button
                onClick={handleShare}
                className="w-14 h-14 bg-[#FF188C] text-white border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer relative"
                title="Share Event"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.028-2.014m0 0a3.5 3.5 0 10-4.028-2.014 3.5 3.5 0 004.028 2.014zm-4.028 4.516l4.028 2.014m0 0a3.5 3.5 0 104.028-2.014 3.5 3.5 0 00-4.028 2.014z" />
                </svg>
                
                {showShareToast && (
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-widest whitespace-nowrap border border-black shadow-[2px_2px_0px_#FF9A00]">
                    LINK COPIED!
                  </span>
                )}
              </button>

              {/* Register button */}
              <button
                onClick={() => onRegister(event)}
                className="flex-1 py-4 bg-[#FF9A00] text-black font-bebas text-2xl tracking-widest border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer uppercase text-center"
              >
                REGISTER NOW
              </button>
            </div>
          </div>
        </div>

        {/* TIMING SLOTS SECTION */}
        <div className="space-y-4 pt-4">
          <h3 className="text-3xl font-bebas tracking-wide text-black uppercase">
            EVENT SLOTS
          </h3>

          <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#000000] overflow-hidden rounded-none">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-[#0D21DD] border-b-2 border-black font-black text-xs uppercase tracking-widest text-white p-4 divide-x-2 divide-black/30">
              <div className="col-span-4 pl-2">LOCATION</div>
              <div className="col-span-4 pl-4">DATE</div>
              <div className="col-span-4 pl-4">TIMINGS</div>
            </div>

            {/* Table Body */}
            <div className="grid grid-cols-12 font-bold text-xs uppercase tracking-wide text-gray-800 p-4 divide-x-2 divide-black bg-white">
              <div className="col-span-4 pl-2 flex items-center">{event.venue}</div>
              <div className="col-span-4 pl-4 flex items-center">{event.date}</div>
              <div className="col-span-4 pl-4 flex items-center">{event.time}</div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION ACCORDION SECTION */}
        <div className="border-3 border-black bg-white shadow-[4px_4px_0px_#000000] overflow-hidden">
          <button
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="w-full p-5 border-b-2 border-black flex justify-between items-center bg-[#F5F1E5] font-bebas text-2xl tracking-widest text-black uppercase cursor-pointer"
          >
            <span>EVENT DESCRIPTION</span>
            <span>{isDescExpanded ? '▼' : '▶'}</span>
          </button>

          {isDescExpanded && (
            <div className="p-6 font-semibold text-gray-800 uppercase tracking-tight text-sm leading-relaxed space-y-4">
              <p>{event.longDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
