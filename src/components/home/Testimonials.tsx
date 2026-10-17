'use client';

import React from 'react';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1">
            Words From Our Patrons
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15]">
            Loved by Discerning Connoisseurs Across India
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-[#D8B979]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D8B979]" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#0B1D15]">4.9 out of 5</span>
            <span className="text-xs text-[#68756F]">&bull; 1,400+ Verified Reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-lg bg-white border border-[#EFE9DC] hover:border-[#C5A869]/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                {/* Top Row: Stars + Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D8B979]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D8B979]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#C5A869]/30" />
                </div>

                {/* Hamper tag */}
                <div className="inline-block px-2 py-0.5 rounded bg-[#F7F4EC] text-[#0B1D15] text-[10px] font-medium mb-3 border border-[#EFE9DC]">
                  {t.hamperName}
                </div>

                {/* Review Text */}
                <p className="text-xs text-[#38423D] font-light leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author & City */}
              <div className="mt-6 pt-4 border-t border-[#EFE9DC]">
                <div className="flex items-center gap-1.5 text-xs font-serif-luxury font-semibold text-[#0B1D15]">
                  <span>{t.name}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#68756F] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#C5A869]" />
                  <span>{t.location}</span>
                </div>
                <div className="text-[10px] text-[#C5A869] font-medium mt-1">
                  {t.occasion}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-8 border-t border-[#EFE9DC] grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs text-[#38423D]">
          <div className="space-y-1">
            <span className="font-serif-luxury text-base text-[#0B1D15] font-semibold block">Pan-India Express</span>
            <span className="text-[#68756F]">Air courier with live SMS & tracking</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-base text-[#0B1D15] font-semibold block">Climate Insulated</span>
            <span className="text-[#68756F]">Chilled packaging for chocolates</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-base text-[#0B1D15] font-semibold block">Artisan Sourced</span>
            <span className="text-[#68756F]">Direct from heritage Kerala craftspeople</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury text-base text-[#0B1D15] font-semibold block">Bespoke Monogramming</span>
            <span className="text-[#68756F]">Hand-calligraphed wax sealed notes</span>
          </div>
        </div>

      </div>
    </section>
  );
}
