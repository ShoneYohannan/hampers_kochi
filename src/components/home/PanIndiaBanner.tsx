'use client';

import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PanIndiaBanner() {
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const toast = useToast();

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincode.trim();
    if (clean.length === 6 && /^\d+$/.test(clean)) {
      if (clean.startsWith('682') || clean.startsWith('683') || clean.startsWith('680') || clean.startsWith('686')) {
        const msg = `PIN ${clean}: Eligible for Same-Day or Next-Day Hand-Delivery in Kochi & Central Kerala!`;
        setPincodeResult({ text: msg, isSuccess: true });
        toast.success(`Express Delivery verified for PIN ${clean}`);
      } else {
        const msg = `PIN ${clean}: Eligible for Express Air Delivery Pan-India (2 to 4 Days, Climate-Insulated)!`;
        setPincodeResult({ text: msg, isSuccess: true });
        toast.success(`Pan-India Express verified for PIN ${clean}`);
      }
    } else {
      const errMsg = 'Please enter a valid 6-digit Indian Postal PIN code (e.g. 682001 or 560001).';
      setPincodeResult({ text: errMsg, isSuccess: false });
      toast.error('Invalid PIN code. Please enter 6 digits.');
    }
  };

  return (
    <section id="delivery" className="py-14 bg-[#10291E] text-[#FCFBF8] border-b border-[#C5A869]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Description */}
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8B979] font-medium">
              <Truck className="w-4 h-4 text-[#D8B979]" />
              <span>Pan-India Logistics Network</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury font-normal leading-tight">
              From Our Kochi Atelier to Any Doorstep in India
            </h2>

            <p className="text-xs sm:text-sm text-[#EFE9DC]/80 font-light max-w-xl leading-relaxed">
              We ship across all 28 states and union territories — Mumbai, Bengaluru, Delhi NCR, 
              Hyderabad, Chennai, Kolkata, and beyond. Every hamper is packaged in cushioned, climate-sealed 
              chambers so chocolates arrive cold and brass arrives gleaming.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#EFE9DC]/70">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D8B979]" />
                Same-Day Dispatch in Kochi
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8B979]" />
                Full In-Transit Insurance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#D8B979]" />
                Live WhatsApp Dispatch Updates
              </span>
            </div>
          </div>

          {/* Right Pincode Checker Interactive Tool */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B1D15] p-6 rounded-lg border border-[#C5A869]/40 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#D8B979]" />
                <span className="text-xs uppercase tracking-wider font-medium text-white">
                  Check Delivery To Your Pincode
                </span>
              </div>

              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 682001 or 560001)"
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value.replace(/\D/g, ''));
                    setPincodeResult(null);
                  }}
                  className="flex-1 bg-[#10291E] border border-[#C5A869]/30 rounded px-3 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D8B979]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {pincodeResult && (
                <div
                  className={`mt-3 p-2.5 rounded text-xs leading-relaxed animate-in fade-in duration-200 border ${
                    pincodeResult.isSuccess
                      ? 'bg-[#183C2D] border-[#C5A869]/40 text-[#EFE9DC]'
                      : 'bg-[#291010] border-red-500/40 text-red-200'
                  }`}
                >
                  {pincodeResult.text}
                </div>
              )}

              <div className="mt-3 text-[10px] text-[#EFE9DC]/60 flex items-center justify-between">
                <span>Courier Partners: BlueDart Air, Delhivery Express, DTDC Prime</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
