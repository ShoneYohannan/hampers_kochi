'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Award, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onOpenBuilder: () => void;
}

export default function Hero({ onOpenBuilder }: HeroProps) {
  return (
    <section className="relative bg-[#0B1D15] text-[#FCFBF8] overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#C5A869]/20">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#183C2D]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C5A869]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183C2D]/80 border border-[#C5A869]/40 text-[#D8B979] text-xs font-medium tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B979]" />
              <span>Haute Gifting &bull; Pan-India Express Delivery</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-luxury font-normal leading-[1.15] tracking-tight text-[#FCFBF8]">
              The Art of Thoughtful Gifting, <br className="hidden sm:inline" />
              <span className="italic font-light text-[#D8B979]">
                Curated for Rare Moments.
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#EFE9DC]/80 font-light leading-relaxed max-w-2xl">
              Handcrafted in Fort Kochi with rare Malabar spices, single-estate teas, 
              Belgian chocolate truffles, and heirloom brass keepsakes. Each curation is tied with 
              pure silk ribbons and sealed with custom wax calligraphy.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#bestsellers"
                className="px-7 py-3.5 rounded-sm bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-lg hover:shadow-[#C5A869]/30 flex items-center gap-2 group"
              >
                <span>Explore Curations</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 rounded-sm bg-[#183C2D]/60 hover:bg-[#183C2D] border border-[#C5A869]/50 text-[#FCFBF8] text-xs sm:text-sm font-medium tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D8B979]" />
                <span>Create Custom Hamper</span>
              </button>
            </div>

            {/* Key Trust Highlights */}
            <div className="pt-6 border-t border-[#C5A869]/20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#EFE9DC]/75">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D8B979] shrink-0" />
                <span>Pan-India Delivery (28k+ Pincodes)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D8B979] shrink-0" />
                <span>Damage-Proof Chilled Transit</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-[#D8B979] shrink-0" />
                <span>Wax-Sealed Calligraphy Note</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Gold decorative border frame */}
              <div className="absolute -inset-2.5 rounded-lg border border-[#C5A869]/40 opacity-70 transform rotate-1 pointer-events-none" />
              
              {/* Main Luxury Image Card */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-[#10291E] border border-[#C5A869]/30 aspect-[4/5] group">
                <Image
                  src="/images/1001373001.jpg.jpeg"
                  alt="The Royal Malabar Sovereign Trunk"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15] via-transparent to-black/30" />

                {/* Floating Badge: Signature Hamper */}
                <div className="absolute top-4 left-4 bg-[#0B1D15]/90 backdrop-blur-md border border-[#C5A869]/50 px-3 py-1.5 rounded text-[11px] font-medium tracking-wider text-[#D8B979] uppercase flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#D8B979] animate-pulse" />
                  Signature Atelier Edition
                </div>

                {/* Floating Badge: Delivery */}
                <div className="absolute top-4 right-4 bg-[#C5A869] text-[#0B1D15] px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-md">
                  Express Pan-India
                </div>

                {/* Bottom Card Details */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-left bg-gradient-to-t from-[#0B1D15] via-[#0B1D15]/90 to-transparent">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium mb-1">
                    Featured Masterpiece
                  </div>
                  <h3 className="text-xl font-serif-luxury text-[#FCFBF8] font-normal leading-snug">
                    The Royal Malabar Sovereign Trunk
                  </h3>
                  <p className="text-xs text-[#EFE9DC]/75 line-clamp-1 mt-0.5">
                    Brass keepsake, Belgian spice truffles & Nilgiri single-estate tea
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#C5A869]/20">
                    <div>
                      <span className="text-lg font-serif-luxury text-[#D8B979] font-semibold">
                        ₹6,499
                      </span>
                      <span className="text-xs text-[#EFE9DC]/50 line-through ml-2">
                        ₹7,999
                      </span>
                    </div>
                    <a
                      href="#bestsellers"
                      className="text-xs text-[#FCFBF8] hover:text-[#D8B979] underline underline-offset-4 tracking-wider uppercase font-medium flex items-center gap-1"
                    >
                      <span>View Hamper</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Floating secondary badge: Handcrafted seal */}
              <div className="absolute -bottom-5 -left-5 bg-[#0B1D15] border border-[#C5A869] p-3 rounded-lg shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#183C2D] border border-[#C5A869] flex items-center justify-center text-[#D8B979] shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-serif-luxury text-white font-semibold">100% Handcrafted</div>
                  <div className="text-[10px] text-[#C5A869] tracking-wider uppercase">Fort Kochi Studio</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Statistics Banner */}
        <div className="mt-14 pt-8 border-t border-[#C5A869]/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif-luxury text-[#D8B979] font-semibold">15,000+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#EFE9DC]/70">Curations Delivered</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif-luxury text-[#D8B979] font-semibold">28,000+</div>
            <div className="text-[11px] uppercase tracking-wider text-[#EFE9DC]/70">Indian Pincodes Served</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif-luxury text-[#D8B979] font-semibold">4.9 / 5.0</div>
            <div className="text-[11px] uppercase tracking-wider text-[#EFE9DC]/70">Client Satisfaction</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-serif-luxury text-[#D8B979] font-semibold">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-[#EFE9DC]/70">Damage-Free Guarantee</div>
          </div>
        </div>

      </div>
    </section>
  );
}
