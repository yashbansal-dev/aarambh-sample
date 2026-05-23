import React from 'react';
import { MerchItem } from '../data/mockData';

interface CartItem {
  product: MerchItem;
  quantity: number;
  selectedColor: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, color: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onCheckout,
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#F5F1E5] border-l-4 border-black flex flex-col z-10 shadow-[8px_0_0_0_#000000]">
        {/* Header */}
        <div className="p-6 border-b-4 border-black bg-[#0D21DD] flex items-center justify-between">
          <h2 className="text-3xl font-bebas tracking-wider text-white">YOUR CART</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-bold text-lg hover:bg-black hover:text-white hover:translate-y-[-2px] active:translate-y-[0px] shadow-[2px_2px_0px_0px_#000000] active:shadow-none transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <span className="text-5xl mb-4">🛒</span>
              <p className="text-xl font-bold uppercase tracking-tight">Your cart is empty!</p>
              <p className="text-sm text-gray-600 mt-1">Grab some awesome Riviera merch to fill it up.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${index}`}
                className="flex gap-4 p-4 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 border-2 border-black flex-shrink-0 bg-[#F5F1E5] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bebas text-xl leading-none text-black tracking-wide">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold uppercase text-gray-600">Color:</span>
                      <span
                        className="w-3 h-3 rounded-full border border-black"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-black">
                      ₹{item.product.price * item.quantity}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center border-2 border-black bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                        className="px-2 py-0.5 border-r-2 border-black font-bold hover:bg-red-200 transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3 font-extrabold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                        className="px-2 py-0.5 border-l-2 border-black font-bold hover:bg-green-200 transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t-4 border-black bg-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-black uppercase tracking-wider">Subtotal:</span>
              <span className="text-2xl font-black">₹{total}</span>
            </div>
            <p className="text-xs text-gray-600">
              *Inclusive of all local taxes. Standard shipping fees apply.
            </p>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-[#FF188C] text-white font-bebas text-2xl tracking-widest border-3 border-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#000000] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all cursor-pointer uppercase"
            >
              PLACE ORDER & PAY
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
