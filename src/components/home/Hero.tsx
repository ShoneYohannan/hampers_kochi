'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBuilder: () => void;
}

const HERO_IMAGES = [
  { src: '/images/1001373001.jpg.jpeg', alt: 'Royal Malabar Sovereign Trunk' },
  { src: '/images/1001629822.jpg.jpeg', alt: 'Grand Utsav Festive Chest' },
  { src: '/images/1001707222.jpg.jpeg', alt: 'Opulent Gold & Velvet Keepsake' },
  { src: '/images/1001483615.jpg.jpeg', alt: 'Travancore Grandeur Bridal Suite' },
];

export default function Hero({ onOpenBuilder }: HeroProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
        setFading(false);
      }, 600);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex flex-col lg:flex-row" style={{ minHeight: 'calc(100vh - 88px)' }}>

      {/* ── LEFT: Full-bleed image panel ── */}
      <div className="relative w-full lg:w-[55%] h-[55vw] sm:h-[70vw] lg:h-auto overflow-hidden bg-[#0B1D15] flex-shrink-0">
        <Image
          src={HERO_IMAGES[currentImg].src}
          alt={HERO_IMAGES[currentImg].alt}
          fill
          priority
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />

        {/* Subtle right-edge vignette for blending into the right panel */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#0B1D15] hidden lg:block" />

        {/* Image Dot Navigation */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setFading(true); setTimeout(() => { setCurrentImg(idx); setFading(false); }, 300); }}
              className={`transition-all duration-300 rounded-full ${
                currentImg === idx
                  ? 'w-6 h-1.5 bg-[#C5A869]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: Content panel ── */}
      <div className="relative w-full lg:w-[45%] bg-[#0B1D15] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-16 lg:py-0">

        {/* Decorative ambient glow */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A869]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#183C2D]/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg">

          {/* Label */}
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#C5A869] font-medium mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#C5A869]/60" />
            Luxury Hampers · Est. 2016
          </div>

          {/* Headline */}
          <h1 className="font-serif-luxury font-normal text-[#FCFBF8] leading-[1.1] tracking-tight">
            <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl mb-1">
              The Art of
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl italic text-[#C5A869] mb-1">
              Thoughtful
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-5xl xl:text-6xl">
              Gifting.
            </span>
          </h1>

          {/* Divider */}
          <div className="w-12 h-[1px] bg-[#C5A869]/50 my-7" />

          {/* Description */}
          <p className="text-[#EFE9DC]/75 text-sm sm:text-base font-light leading-relaxed max-w-sm">
            Hand-assembled hampers of single-estate teas, Belgian chocolate truffles,
            and artisanal provisions — wrapped in silk, finished with your own words.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href="#bestsellers"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C5A869] text-[#0B1D15] text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#D8B979] transition-all duration-300 group shadow-lg shadow-[#C5A869]/20"
            >
              <span>Explore Hampers</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#C5A869]/50 text-[#EFE9DC] text-[11px] font-medium tracking-[0.2em] uppercase hover:border-[#C5A869] hover:text-[#C5A869] transition-all duration-300 cursor-pointer"
            >
              Create Your Own
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-14 pt-8 border-t border-[#C5A869]/15 grid grid-cols-3 gap-6">
            <div>
              <div className="text-[#C5A869] text-lg sm:text-xl font-serif-luxury font-semibold">48 hrs</div>
              <div className="text-[#EFE9DC]/50 text-[10px] uppercase tracking-[0.2em] mt-0.5">Dispatch</div>
            </div>
            <div>
              <div className="text-[#C5A869] text-lg sm:text-xl font-serif-luxury font-semibold">Pan-India</div>
              <div className="text-[#EFE9DC]/50 text-[10px] uppercase tracking-[0.2em] mt-0.5">Delivery</div>
            </div>
            <div>
              <div className="text-[#C5A869] text-lg sm:text-xl font-serif-luxury font-semibold">Hand-tied</div>
              <div className="text-[#EFE9DC]/50 text-[10px] uppercase tracking-[0.2em] mt-0.5">In Atelier</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
