'use client';

import React, { useState, useEffect } from 'react';
import { useCms } from '@/context/CmsContext';

export default function AnnouncementBar() {
  const { announcements, settings } = useCms();
  const [currentIdx, setCurrentIdx] = useState(0);

  const messages = announcements.length > 0 ? announcements : [
    'HAND-TIED IN OUR KOCHI ATELIER · DELIVERED ACROSS INDIA WITHIN 48 HOURS',
  ];

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [messages.length]);

  const activeIdx = currentIdx % messages.length;

  return (
    <div className="bg-[#0B1D15] text-[#EFE9DC] border-b border-[#C5A869]/20 text-[11px] py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: EST branding */}
        <div className="hidden sm:flex items-center gap-1.5 text-[#C5A869] tracking-[0.2em] uppercase font-medium shrink-0">
          <span>Est. 2016</span>
          <span className="text-[#C5A869]/40">·</span>
          <span>Kochi</span>
        </div>

        {/* Center: Rotating message */}
        <div className="flex-1 text-center tracking-[0.18em] uppercase font-light text-[#C5A869] transition-all duration-500 px-4 line-clamp-1">
          {messages[activeIdx]}
        </div>

        {/* Right: Phone */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="tracking-[0.15em] text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors"
            title="Call The Kochi Atelier"
          >
            {settings.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
