'use client';

import React from 'react';
import { Gift, Box, Cookie, Feather, Stamp, ArrowRight } from 'lucide-react';

interface HamperBuilderPromoProps {
  onOpenBuilder: () => void;
}

export default function HamperBuilderPromo({ onOpenBuilder }: HamperBuilderPromoProps) {
  const steps = [
    {
      num: '01',
      title: 'Choose Trunk or Casket',
      icon: Box,
      desc: 'Handmade emerald velvet casket, vintage wicker trunk, or matte gold embossed box.',
    },
    {
      num: '02',
      title: 'Select Artisanal Treats',
      icon: Cookie,
      desc: 'Belgian truffles, single-estate pekoe teas, saffron honey, or spiced roasted nuts.',
    },
    {
      num: '03',
      title: 'Add Keepsakes & Accents',
      icon: Stamp,
      desc: 'Hand-cast brass nilavilakku, artisanal soy candle, or kasavu handloom stole.',
    },
    {
      num: '04',
      title: 'Wax Seal Calligraphy',
      icon: Feather,
      desc: 'Your personalized message penned by our in-house master calligrapher on cotton paper.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0B1D15] text-[#FCFBF8] relative overflow-hidden border-b border-[#C5A869]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] text-xs uppercase tracking-[0.2em] mb-3">
            <Gift className="w-3.5 h-3.5 text-[#D8B979]" />
            <span>Interactive Custom Atelier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal leading-tight">
            The Bespoke Atelier: <br className="hidden sm:inline" />
            <span className="italic font-light text-[#D8B979]">
              Create Your Own Hamper
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#EFE9DC]/80 font-light">
            Design an entirely custom luxury hamper in four intuitive steps. Select your favorite
            casket, artisanal confections, and bespoke finishing touches.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded bg-[#10291E] border border-[#C5A869]/30 hover:border-[#D8B979] transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#C5A869] tracking-widest">
                      STEP {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-sm bg-[#0B1D15] border border-[#C5A869]/40 flex items-center justify-center text-[#D8B979] group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-serif-luxury text-white mb-2 font-normal">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#EFE9DC]/75 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C5A869]/15 text-[11px] text-[#D8B979] font-medium tracking-wide">
                  Customizable Options &rarr;
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Box */}
        <div className="rounded p-8 bg-[#10291E] border border-[#C5A869]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
              Ready to craft an unforgettable personal hamper?
            </h3>
            <p className="text-xs sm:text-sm text-[#EFE9DC]/80">
              Live pricing calculation, custom wax seal colors & express delivery across India.
            </p>
          </div>

          <button
            onClick={onOpenBuilder}
            className="px-8 py-4 rounded-sm bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center gap-2 group cursor-pointer shrink-0"
          >
            <Gift className="w-4 h-4" />
            <span>Launch Hamper Builder</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
