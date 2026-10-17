'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Feather, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function BrandStory() {
  const pillars = [
    {
      icon: Award,
      title: 'Generational Craftsmanship',
      desc: 'We collaborate with heritage brass casters, weavers, and wood sculptors across Kerala to ensure heirloom-grade keepsakes.',
    },
    {
      icon: Feather,
      title: 'Bespoke Wax Seals & Calligraphy',
      desc: 'Every gift includes a handwritten parchment letter written with gold/sepia archival inks and stamped with traditional hot wax.',
    },
    {
      icon: ShieldCheck,
      title: 'Climate-Insulated Transit',
      desc: 'Pan-India shipping with thermal insulated foil lining and ice gel packs for fine chocolates and delicate confectionery.',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical & Single-Estate Sourcing',
      desc: 'Teas from high-altitude Nilgiri gardens, Wayanad coffee, and tellicherry peppercorns harvested from organic family farms.',
    },
  ];

  return (
    <section id="story" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Brand Portrait & Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-lg border border-[#C5A869]/30 transform -rotate-1 pointer-events-none" />
              
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl bg-[#0B1D15]">
                <Image
                  src="/images/1001877031.jpg.jpeg"
                  alt="Crafting Hampers at The Kochi Atelier"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15]/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#D8B979] font-medium">
                    The Fort Kochi Atelier
                  </div>
                  <h4 className="text-xl font-serif-luxury font-normal text-white mt-1">
                    Where Old-World Grace Meets Contemporary Haute Gifting
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium">
              Our Artisanal Heritage
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
              Gifting Elevated to a High Art Form
            </h2>

            <p className="text-base text-[#38423D] font-light leading-relaxed">
              Centuries ago, the historic port of Cochin welcomed ships from Venice, Lisbon, 
              and Arabia in search of fragrant spices, silks, and gold. That maritime legacy of 
              hospitality and treasured trade lives on at <strong>The Kochi Atelier</strong>.
            </p>

            <p className="text-sm text-[#68756F] font-light leading-relaxed">
              We reject mass-produced hampers. Each gift box is designed as a sensory journey — the 
              tactile luxury of velvet trunks, the intoxicating fragrance of whole cardamom and damask rose, 
              the warmth of cast brass, and the ceremonial elegance of breaking a wax seal.
            </p>

            <div className="pt-4 border-t border-[#EFE9DC] flex items-center gap-6">
              <div>
                <div className="text-2xl font-serif-luxury text-[#0B1D15] font-semibold">Fort Kochi</div>
                <div className="text-[11px] text-[#68756F] uppercase tracking-wider">Design Studio & Workshop</div>
              </div>
              <div className="w-[1px] h-10 bg-[#C5A869]/40" />
              <div>
                <div className="text-2xl font-serif-luxury text-[#0B1D15] font-semibold">Pan-India</div>
                <div className="text-[11px] text-[#68756F] uppercase tracking-wider">Climate-Protected Shipping</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-lg bg-white border border-[#EFE9DC] hover:border-[#C5A869] transition-all duration-300 shadow-sm hover:shadow-md text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B1D15] text-[#D8B979] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif-luxury text-[#0B1D15] font-normal mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#68756F] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
