import React from 'react';
import { Star } from 'lucide-react';

export default function PressRecognition() {
  const publications = [
    { name: 'Forbes India', label: 'Artisanal Luxury' },
    { name: 'Vogue India', label: 'Bridal Gifting' },
    { name: 'Architectural Digest', label: 'Heritage Craft' },
    { name: 'Elle Decor', label: 'Haute Living' },
  ];

  return (
    <section className="bg-[#0B1D15] text-[#FCFBF8] border-y border-[#C5A869]/25 py-6 sm:py-8 relative overflow-hidden">
      {/* Decorative ambient subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A869_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Section Header */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="w-2 h-2 rounded-sm bg-[#D8B979]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D8B979] font-medium">
              Editorial Recognition
            </span>
          </div>

          {/* Clean Publication Badges — No dummy text paragraphs */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 text-[#FCFBF8]">
            {publications.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-start group">
                <span className="font-serif-luxury text-base sm:text-lg tracking-wide text-white group-hover:text-[#D8B979] transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#D8B979]/80 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Acclaimed Stars */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex text-[#D8B979]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D8B979]" />
              ))}
            </div>
            <span className="ml-1 text-[11px] uppercase tracking-wider text-[#D8B979] font-medium">
              National Acclaim
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
