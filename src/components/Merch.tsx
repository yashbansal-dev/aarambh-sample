import React, { useState } from 'react';
import { MerchItem, mockMerch } from '../data/mockData';
import { ContourBackground } from './ContourBackground';

interface MerchProps {
  onAddToCart: (product: MerchItem, quantity: number, selectedColor: string) => void;
}

export const Merch: React.FC<MerchProps> = ({ onAddToCart }) => {
  const [activeItem, setActiveItem] = useState<MerchItem>(mockMerch[0]);
  const [selectedColor, setSelectedColor] = useState<string>(mockMerch[0].colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [showToast, setShowToast] = useState(false);

  const handleProductSelect = (item: MerchItem) => {
    setActiveItem(item);
    setSelectedColor(item.colors[0]);
    setQuantity(1);
  };

  const handleAddToCartClick = () => {
    onAddToCart(activeItem, quantity, selectedColor);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex-1 p-6 md:p-12 relative overflow-hidden bg-[#F5F1E5] font-sans border-b-4 border-black min-h-screen">
      <ContourBackground />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Title */}
        <div className="space-y-3 border-b-2 border-black pb-4">
          <span className="px-3 py-1 bg-black text-white border-2 border-black font-extrabold text-xs uppercase tracking-widest">
            FESTIVAL STORE
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wider text-black leading-none uppercase">
            RIVIERA MERCHANDISE
          </h2>
        </div>

        {/* E-Commerce Showcase & Catalog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: ACTIVE PRODUCT DETAILED SHOWCASE (7/12 width) */}
          <div className="lg:col-span-7 bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000000] relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Product Visual (5/12 of showcase) */}
              <div className="md:col-span-5 space-y-4">
                <div className="aspect-square border-3 border-black bg-[#F5F1E5] overflow-hidden relative group">
                  {/* Color overlay to simulate customization */}
                  <div
                    className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none transition-all duration-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeItem.image}
                    alt={activeItem.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                </div>

                {/* Info block */}
                <p className="text-[10px] text-gray-500 font-extrabold text-center uppercase tracking-widest">
                  *Color overlay applied based on selection
                </p>
              </div>

              {/* Product Customizer details (7/12 of showcase) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bebas tracking-wide text-black leading-none uppercase">
                    {activeItem.name}
                  </h3>
                  <div className="text-2xl font-black text-[#FF188C]">
                    ₹{activeItem.price}
                  </div>
                </div>

                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider leading-relaxed">
                  {activeItem.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black block">
                    SELECT COLOR
                  </span>
                  <div className="flex gap-2">
                    {activeItem.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-3 transition-transform duration-200 cursor-pointer ${
                          selectedColor === color ? 'border-black scale-110' : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-black block">
                    SELECT SIZE
                  </span>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 border-2 border-black flex items-center justify-center font-extrabold text-xs transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#FF9A00] text-black shadow-[2px_2px_0px_#000000]'
                            : 'bg-white hover:bg-gray-100 text-black'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart button */}
                <div className="flex gap-4 pt-2">
                  {/* Quantity box */}
                  <div className="flex items-center border-3 border-black bg-[#F5F1E5]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full border-r-2 border-black font-extrabold text-lg hover:bg-red-200 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 font-black text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full border-l-2 border-black font-extrabold text-lg hover:bg-green-200 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add button */}
                  <button
                    onClick={handleAddToCartClick}
                    className="flex-1 py-3.5 bg-[#FF188C] text-white font-bebas text-xl tracking-widest border-3 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer uppercase text-center relative"
                  >
                    ADD TO CART
                    
                    {showToast && (
                      <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-widest whitespace-nowrap border border-black shadow-[2px_2px_0px_#FF9A00]">
                        ADDED TO CART! 🛒
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CATALOG GALLERY (5/12 width) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-3xl font-bebas tracking-wide text-black uppercase border-b-2 border-black pb-2">
              CATALOG ITEMS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockMerch.map((item) => {
                const isActive = activeItem.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleProductSelect(item)}
                    className={`border-3 border-black p-4 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between ${
                      isActive ? 'bg-[#0D21DD]/10 border-[#0D21DD]' : 'bg-white'
                    }`}
                  >
                    <div className="aspect-square border-2 border-black overflow-hidden bg-[#F5F1E5] mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bebas text-lg tracking-wide text-black truncate leading-none">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-sm text-black">
                          ₹{item.price}
                        </span>
                        <span className="text-[10px] font-black uppercase text-gray-500 hover:text-black">
                          Customize →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
