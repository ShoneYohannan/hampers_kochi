'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenBuilder?: () => void;
}

const HERO_IMAGES = [
  {
    src: '/images/front.jpg',
    alt: 'The Signature Kerala Kasavu & Jasmine Grand Festive Hamper with Brass Keepsake and Artisanal Delicacies',
    pos: 'center 40%',
  },
  {
    src: '/images/1002090346.jpg.jpeg',
    alt: 'Handcrafted Heritage Wicker Hamper with Fresh Exotic Florals and Artisanal Chocolates from Kochi',
    pos: 'center',
  },
  {
    src: '/images/1001726475.jpg.jpeg',
    alt: 'Royal Kerala Kasavu Silk Handloom & Single-Origin Chocolate Luxury Suite Hamper',
    pos: 'center',
  },
  {
    src: '/images/1001981345.jpg.jpeg',
    alt: 'Traditional Malabar Wicker Casket with Hand-Cast Brass Vilakku Lamp and High-Grown Nilgiri Teas',
    pos: 'center 40%',
  },
  {
    src: '/images/celebration-birthday-hamper.jpg',
    alt: 'Bespoke Celebration Hamper with Fresh Botanical Accents and Gourmet Artisanal Bakes',
    pos: 'center 30%',
  },
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
    <section id="home" className="relative w-full flex flex-col lg:flex-row overflow-hidden" style={{ minHeight: 'calc(100vh - 88px)' }}>

      {/* ── LEFT: Full-bleed image panel (fills edge-to-edge, zero left blank space) ── */}
      <div className="relative w-full lg:w-[55%] h-[55vw] sm:h-[70vw] lg:h-auto overflow-hidden bg-[#0B1D15] flex-shrink-0">
        <Image
          src={HERO_IMAGES[currentImg].src}
          alt={HERO_IMAGES[currentImg].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
          style={{ objectPosition: HERO_IMAGES[currentImg].pos }}
        />

        {/* Subtle right-edge vignette for blending into the right panel */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-[#0B1D15] hidden lg:block" />

        {/* Image Indicators (Clean architectural lines, no pill shapes) */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 z-10">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setFading(true); setTimeout(() => { setCurrentImg(idx); setFading(false); }, 300); }}
              className={`transition-all duration-300 rounded-sm cursor-pointer ${currentImg === idx
                ? 'w-7 h-1.5 bg-[#D8B979]'
                : 'w-2 h-1.5 bg-white/40 hover:bg-white/80'
                }`}
              aria-label={`View curation visual ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT: Content panel (Clean solid dark forest green, no AI purple/gradient blobs) ── */}
      <div className="relative w-full lg:w-[45%] bg-[#0B1D15] flex flex-col justify-center px-8 sm:px-12 lg:pl-20 xl:pl-28 2xl:pl-36 lg:pr-10 xl:pr-16 py-16 lg:py-0">

        <div className="relative z-10 max-w-xl">

          {/* Label */}
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D8B979] font-medium mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D8B979]/60" />
            HamPers Kochi
          </div>

          {/* Headline - Direct, clear, concrete, no vague poetic fluff */}
          <h1 className="font-serif-luxury font-normal text-[#FCFBF8] leading-[1.08] tracking-tight">
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-1">
              From Milestones to
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl italic text-[#D8B979] mb-1">
              &ldquo;Thinking of You&rdquo; Moments
            </span>
          </h1>

          {/* Divider */}
          <div className="w-14 h-[1px] bg-[#D8B979]/60 my-7" />

          {/* Description - Clear, factual, specific */}
          <p className="text-[#EFE9DC]/90 text-base sm:text-lg font-light leading-relaxed max-w-md">
            Beautiful gifting for every chapter of life. From milestone celebrations to simple &ldquo;thinking of you&rdquo; moments, we curate aesthetic hampers tailored to every aspect of your life. Every box is handcrafted with care, blending unique keepsakes and delightful treats to tell your story perfectly. Open for pre-orders with express delivery.
          </p>

          {/* CTAs: Crisp rectangular buttons, no pill shapes */}
          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#D8B979] text-[#0B1D15] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#E6CE9F] transition-all duration-300 group shadow-md rounded-sm"
            >
              <span>Explore Hampers</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {onOpenBuilder && (
              <button
                onClick={onOpenBuilder}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#D8B979] text-[#D8B979] hover:bg-[#D8B979] hover:text-[#0B1D15] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-sm rounded-sm"
              >
                <span>Customize Hamper</span>
              </button>
            )}

            <a
              href="https://wa.me/919846002241?text=Hello%20Hampers%20Kochi%2C%20I%20would%20like%20to%20pre-order%20a%20luxury%20hamper."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer shadow-sm rounded-sm"
            >
              <span>Pre-Order on WhatsApp</span>
            </a>
          </div>

          {/* Stats row - Pre-Order & All-India Delivery */}
          <div className="mt-14 pt-8 pb-6 sm:pb-10 border-t border-[#C5A869]/15 grid grid-cols-3 gap-6">
            <div>
              <div className="text-[#D8B979] text-xl sm:text-2xl font-serif-luxury font-semibold">Pre-Order</div>
              <div className="text-[#EFE9DC]/60 text-[10px] uppercase tracking-[0.2em] mt-0.5">Handcrafted Only</div>
            </div>
            <div>
              <div className="text-[#D8B979] text-xl sm:text-2xl font-serif-luxury font-semibold">All-India</div>
              <div className="text-[#EFE9DC]/60 text-[10px] uppercase tracking-[0.2em] mt-0.5">Express Delivery</div>
            </div>
            <div>
              <div className="text-[#D8B979] text-xl sm:text-2xl font-serif-luxury font-semibold">5.0 / 5.0</div>
              <div className="text-[#EFE9DC]/60 text-[10px] uppercase tracking-[0.2em] mt-0.5">Google Rating</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
