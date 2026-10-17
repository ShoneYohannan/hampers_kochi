'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, PhoneCall, ChevronRight } from 'lucide-react';

const MESSAGES = [
  {
    icon: Truck,
    text: 'Complimentary Express Delivery Pan-India on Orders Above ₹3,000',
    highlight: 'Code: ROYAL10 for 10% Off',
  },
  {
    icon: Sparkles,
    text: 'Handcrafted in Kochi — Delivered with Care to 28,000+ Indian Pincodes',
    highlight: 'Same-Day Delivery in Kochi',
  },
  {
    icon: ShieldCheck,
    text: 'Temperature-Insulated Packaging & 100% Damage-Free Transit Guarantee',
    highlight: 'Wax-Sealed Personalized Note Included',
  },
];

export default function AnnouncementBar() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeMsg = MESSAGES[currentIdx];
  const IconComponent = activeMsg.icon;

  return (
    <div className="bg-[#0B1D15] text-[#F7F4EC] border-b border-[#C5A869]/20 text-xs py-2.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left item: Phone concierge */}
        <div className="hidden lg:flex items-center gap-2 text-[#C5A869] font-medium tracking-wide">
          <PhoneCall className="w-3.5 h-3.5 text-[#D8B979]" />
          <span>Kochi Atelier Concierge:</span>
          <a
            href="https://wa.me/919645556010?text=Hello%20The%20Kochi%20Atelier,%20I%20would%20like%20assistance%20with%20a%20luxury%20hamper."
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#D8B979] underline underline-offset-2 transition-colors"
          >
            +91 96455 56010
          </a>
        </div>

        {/* Center: Rotating messages */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <IconComponent className="w-3.5 h-3.5 text-[#D8B979] shrink-0 animate-pulse" />
          <span className="font-light tracking-wide text-[#EFE9DC]">
            {activeMsg.text}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#C5A869]/15 text-[#D8B979] border border-[#C5A869]/30 text-[10px] font-medium tracking-wider uppercase">
            {activeMsg.highlight}
          </span>
        </div>

        {/* Right item: Delivery Assurance */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-[#EFE9DC]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A869] animate-ping" />
          <span className="tracking-wider uppercase text-[11px] font-medium text-[#D8B979]">
            All India Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
