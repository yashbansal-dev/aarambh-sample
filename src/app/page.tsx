'use strict';

'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Homepage } from '../components/Homepage';
import { FooterSynthesizer } from '../components/FooterSynthesizer';
import { CustomCursor } from '../components/CustomCursor';
import { About } from '../components/About';
import { Events } from '../components/Events';
import { EventDetail } from '../components/EventDetail';
import { Merch } from '../components/Merch';
import { Team } from '../components/Team';
import { FAQs } from '../components/FAQs';
import { Announcements } from '../components/Announcements';
import { CartDrawer } from '../components/CartDrawer';
import { Event, MerchItem } from '../data/mockData';

interface CartItem {
  product: MerchItem;
  quantity: number;
  selectedColor: string;
}

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Modals simulation state
  const [registrationModalEvent, setRegistrationModalEvent] = useState<Event | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (product: MerchItem, quantity: number, selectedColor: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, color: string, delta: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === id && item.selectedColor === color
      );

      if (existingIdx === -1) return prev;

      const updated = [...prev];
      const newQty = updated[existingIdx].quantity + delta;

      if (newQty <= 0) {
        updated.splice(existingIdx, 1);
      } else {
        updated[existingIdx].quantity = newQty;
      }
      return updated;
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
    setCart([]);
  };

  const handleRegisterEvent = (event: Event) => {
    setRegistrationModalEvent(event);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navigation tab handling
  const handleTabChange = (tab: string) => {
    if (tab === 'events-internal') {
      setSelectedEvent(null);
    } else if (tab === 'events-external') {
      setSelectedEvent(null);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentTab(currentTab === 'events-internal' ? 'events-internal-detail' : 'events-external-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setCurrentTab(currentTab === 'events-internal-detail' ? 'events-internal' : 'events-external');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1E5] text-black">
      {/* Sticky Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
      />

      {/* Main page content renderer */}
      <main className="flex-1 flex flex-col">
        {currentTab === 'home' && <Homepage onNavigateToTab={handleTabChange} onSelectEvent={handleSelectEvent} />}
        {currentTab === 'about' && <About />}
        
        {currentTab === 'events-internal' && (
          <Events isExternal={false} onSelectEvent={handleSelectEvent} />
        )}
        {currentTab === 'events-external' && (
          <Events isExternal={true} onSelectEvent={handleSelectEvent} />
        )}

        {currentTab === 'events-internal-detail' && selectedEvent && (
          <EventDetail
            event={selectedEvent}
            isExternal={false}
            onBack={handleBackToEvents}
            onRegister={handleRegisterEvent}
          />
        )}
        {currentTab === 'events-external-detail' && selectedEvent && (
          <EventDetail
            event={selectedEvent}
            isExternal={true}
            onBack={handleBackToEvents}
            onRegister={handleRegisterEvent}
          />
        )}

        {currentTab === 'merch' && <Merch onAddToCart={handleAddToCart} />}
        {currentTab === 'team' && <Team />}
        {currentTab === 'faqs' && <FAQs />}
        {currentTab === 'announcements' && <Announcements />}
      </main>

      {/* Synthesizer Footer */}
      <FooterSynthesizer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />

      {/* MODAL SIMULATION: EVENT REGISTRATION SUCCESS PASS */}
      {registrationModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <div className="w-full max-w-md bg-[#F5F1E5] border-4 border-black p-6 shadow-[8px_8px_0_0_#000000] relative space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h3 className="font-bebas text-3xl tracking-wide text-black uppercase">
                  REGISTRATION COMPLETED!
                </h3>
                <p className="text-[10px] font-black text-gray-500 uppercase mt-0.5">
                  Secure Entry Pass Generated
                </p>
              </div>
              <button
                onClick={() => setRegistrationModalEvent(null)}
                className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all cursor-pointer shadow-[1px_1px_0_#000000]"
              >
                ✕
              </button>
            </div>

            {/* Pass details styled like ticket */}
            <div className="border-3 border-dashed border-black bg-white p-5 space-y-4 shadow-[2px_2px_0_#000000]">
              <div className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-[10px] font-black text-gray-500">EVENT</span>
                <span className="text-sm font-black text-black">{registrationModalEvent.title}</span>
              </div>
              
              <div className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-[10px] font-black text-gray-500">PASS TYPE</span>
                <span className="text-xs font-extrabold px-2 py-0.5 bg-[#FF9A00] border border-black shadow-[1px_1px_0_#000000]">
                  {registrationModalEvent.category} PASS
                </span>
              </div>

              <div className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-[10px] font-black text-gray-500">VENUE</span>
                <span className="text-xs font-black text-black">{registrationModalEvent.venue}</span>
              </div>

              <div className="flex justify-between border-b border-black/10 pb-3">
                <span className="text-[10px] font-black text-gray-500">DATE & TIME</span>
                <span className="text-xs font-black text-black">
                  {registrationModalEvent.date} @ {registrationModalEvent.time.split(' - ')[0]}
                </span>
              </div>

              {/* Barcode/QR Representation */}
              <div className="pt-2 flex flex-col items-center space-y-1 select-none">
                <div className="h-10 w-full flex items-center justify-center gap-[3px] bg-black p-1">
                  {Array(22)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white h-full"
                        style={{ width: `${(i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 1) * 2}px` }}
                      />
                    ))}
                </div>
                <span className="text-[8px] font-mono tracking-[4px] text-gray-600">
                  *RIVIERA2026-{registrationModalEvent.id.toUpperCase()}*
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setRegistrationModalEvent(null)}
                className="flex-1 py-3 bg-[#FF9A00] text-black font-bebas text-lg tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer"
              >
                DOWNLOAD PASS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SIMULATION: MERCHANDISE ORDER CHECKOUT SUCCESS */}
      {showCheckoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans">
          <div className="w-full max-w-md bg-[#F5F1E5] border-4 border-black p-6 shadow-[8px_8px_0_0_#000000] relative space-y-6">
            <div className="flex justify-between items-start border-b-2 border-black pb-4">
              <div>
                <h3 className="font-bebas text-3xl tracking-wide text-black uppercase">
                  ORDER PLACED SUCCESSFULLY!
                </h3>
                <p className="text-[10px] font-black text-gray-500 uppercase mt-0.5">
                  Receipt generated
                </p>
              </div>
              <button
                onClick={() => setShowCheckoutSuccess(false)}
                className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center font-bold hover:bg-black hover:text-white transition-all cursor-pointer shadow-[1px_1px_0_#000000]"
              >
                ✕
              </button>
            </div>

            <div className="border-3 border-dashed border-black bg-white p-5 space-y-4 shadow-[2px_2px_0_#000000] text-center">
              <span className="text-5xl block animate-bounce">🎉</span>
              <p className="text-sm font-bold uppercase tracking-tight text-black">
                Thank you for your purchase!
              </p>
              <p className="text-xs uppercase font-extrabold text-gray-600 max-w-xs mx-auto leading-relaxed">
                Your order is confirmed. Bring the order reference barcode below to the Riviera Merchandise Desk in front of foodys 1 to collect your items.
              </p>

              <div className="pt-2 flex flex-col items-center space-y-1 select-none">
                <div className="h-10 w-full flex items-center justify-center gap-[3px] bg-black p-1">
                  {Array(22)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-white h-full"
                        style={{ width: `${(i % 4 === 0 ? 3 : i % 2 === 0 ? 1 : 2) * 2}px` }}
                      />
                    ))}
                </div>
                <span className="text-[8px] font-mono tracking-[4px] text-gray-600">
                  *ORDER-{Math.floor(100000 + Math.random() * 900000)}*
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckoutSuccess(false)}
              className="w-full py-3 bg-[#0D21DD] text-white font-bebas text-lg tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer"
            >
              CLOSE WINDOW
            </button>
          </div>
        </div>
      )}

      {/* Custom Cursor follower */}
      <CustomCursor />

      {/* Screen glow overlay */}
      <div className="fixed inset-0 pointer-events-none screen-glow z-[9997]" />
    </div>
  );
}
