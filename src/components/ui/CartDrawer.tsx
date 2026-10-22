'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Sparkles, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingFee,
    freeShippingThreshold,
    setIsCheckoutOpen,
  } = useCart();

  const toast = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingDiff = freeShippingThreshold - subtotal;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (!success) {
      setCouponError(true);
      toast.error('Invalid privilege voucher code.');
      setTimeout(() => setCouponError(false), 2500);
    } else {
      toast.success(`Privilege Voucher "${couponInput.toUpperCase()}" Applied! 10% saved.`);
      setCouponInput('');
    }
  };

  const finalTotal = subtotal - discount + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[100vw] sm:w-[440px] max-w-full bg-white shadow-2xl flex flex-col justify-between border-l border-[#C5A869]/30">
          
          {/* Header */}
          <div className="p-5 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D8B979]" />
              <h2 className="text-lg font-serif-luxury tracking-wider">Your Shopping Bag</h2>
              <span className="text-xs bg-[#183C2D] text-[#D8B979] px-2 py-0.5 rounded-sm border border-[#C5A869]/30">
                {items.length} {items.length === 1 ? 'Curated Gift' : 'Curated Gifts'}
              </span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-sm text-[#EFE9DC]/75 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3.5 bg-[#F7F4EC] border-b border-[#EFE9DC] text-xs">
            {freeShippingDiff > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[#38423D]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Truck className="w-4 h-4 text-[#C5A869]" />
                    Add <strong className="text-[#0B1D15]">₹{freeShippingDiff.toLocaleString('en-IN')}</strong> more for Free All-India Delivery!
                  </span>
                  <span className="font-semibold text-[#0B1D15]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E1D6C2] h-2 rounded-sm overflow-hidden">
                  <div
                    className="bg-[#C5A869] h-full transition-all duration-500 rounded-sm"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#183C2D] font-medium">
                <Check className="w-4 h-4 text-[#C5A869]" />
                <span>You qualify for <strong>Complimentary All-India Express Delivery!</strong></span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-sm bg-[#F7F4EC] border border-[#EFE9DC] flex items-center justify-center text-[#C5A869]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif-luxury text-[#0B1D15]">Your Bag is Empty</h3>
                <p className="text-xs text-[#68756F] max-w-xs">
                  Explore our artisanal collections or design your own bespoke hamper from scratch.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded bg-[#0B1D15] text-[#FCFBF8] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                >
                  Explore Hampers
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-lg border border-[#EFE9DC] bg-white hover:border-[#C5A869]/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-28 rounded overflow-hidden bg-[#0B1D15] shrink-0 border border-[#C5A869]/20">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15]/60 to-transparent" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-serif-luxury text-[#0B1D15] font-normal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            removeFromCart(item.product.id);
                            toast.info(`Removed "${item.product.name}" from Bag`);
                          }}
                          className="text-[#68756F] hover:text-red-700 p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs font-semibold text-[#A88B4D] mt-0.5">
                        Price on Request
                      </div>

                      {item.recipientName && (
                        <div className="text-[10px] text-[#C5A869] font-medium mt-0.5">
                          For: {item.recipientName}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE9DC]/60">
                      <div className="flex items-center border border-[#EFE9DC] rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#0B1D15] hover:bg-[#F7F4EC]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#0B1D15] hover:bg-[#F7F4EC]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#183C2D]">
                        WhatsApp Quote
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout Actions */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FCFBF8] border-t border-[#EFE9DC] space-y-4">
              
              {/* Promo Coupon Form */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded bg-[#183C2D]/10 border border-[#183C2D]/30 text-xs text-[#183C2D]">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#C5A869]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-10%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] underline text-[#68756F] hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#C5A869] absolute left-2.5 top-3" />
                    <input
                      type="text"
                      placeholder="Enter promo voucher code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-2 py-2 rounded border border-[#EFE9DC] uppercase placeholder-normal focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded bg-[#0B1D15] text-[#FCFBF8] text-xs font-medium uppercase tracking-wider hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600">Invalid voucher code.</p>
              )}

              {/* Price on Request Notice */}
              <div className="space-y-1.5 text-xs text-[#38423D] pt-2 border-t border-[#EFE9DC]">
                <div className="flex justify-between items-center text-sm font-serif-luxury text-[#0B1D15] font-semibold pt-1">
                  <span>Atelier Pricing</span>
                  <span className="text-sm text-[#A88B4D]">Price on Request via WhatsApp</span>
                </div>
                <p className="text-[11px] text-[#68756F]">
                  Custom curations & bulk orders are finalized directly with our Fort Kochi concierge.
                </p>
              </div>

              {/* Checkout / Order on WhatsApp Buttons */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Inquire Pricing & Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#68756F] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Direct WhatsApp Concierge &bull; +91 96455 56010</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
