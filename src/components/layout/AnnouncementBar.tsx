'use client';

import React, { useState, useEffect } from 'react';
import { useCms } from '@/context/CmsContext';

export default function AnnouncementBar() {
  const { announcements, settings } = useCms();
  const [currentIdx, setCurrentIdx] = useState(0);

  const rawMessages = announcements.length > 0 ? announcements : [
    'HAND-TIED IN OUR KOCHI ATELIER · DELIVERED ACROSS INDIA WITHIN 48 HOURS',
  ];

  const messages = rawMessages
    .map((m) =>
      typeof m === 'string'
        ? m
            .replace(/\s*·\s*CODE:\s*ROYAL10\s*FOR\s*10%\s*OFF/gi, '')
            .replace(/CODE:\s*ROYAL10\s*FOR\s*10%\s*OFF/gi, '')
            .trim()
        : ''
    )
    .filter(Boolean);

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [messages.length]);

  const activeIdx = currentIdx % messages.length;
  const cleanPhone = (settings?.phone || '+91 96455 56010').replace(/\s+/g, '');
  const displayPhone = settings?.phone || '+91 96455 56010';

  return (
    <div className="bg-[#0B1D15] text-[#EFE9DC] border-b border-[#C5A869]/20 py-2.5 px-4 sm:px-6 lg:px-5 xl:px-8">
      <div className="w-full flex items-center justify-between">
        {/* Left: EST branding — aligned to left edge */}
        <div className="hidden sm:flex items-center gap-2 text-[#D8B979] tracking-[0.2em] uppercase font-semibold text-xs shrink-0">
          <span>Est. 2016</span>
          <span className="text-[#D8B979]/40">·</span>
          <span>Kochi</span>
        </div>

        {/* Center: Rotating message — clear readable text */}
        <div className="flex-1 text-center tracking-[0.16em] uppercase font-medium text-[#D8B979] text-xs sm:text-sm px-4 line-clamp-1">
          {messages[activeIdx]}
        </div>

        {/* Right: Phone */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href={`tel:${cleanPhone}`}
            className="tracking-[0.15em] text-[#EFE9DC] hover:text-[#D8B979] transition-colors font-mono font-medium text-xs sm:text-sm"
            title="Call The Kochi Atelier"
          >
            {displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
}
