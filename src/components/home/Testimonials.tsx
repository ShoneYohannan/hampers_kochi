'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle, ExternalLink, Camera } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#D8B979]/20 border border-[#D8B979]/40 text-[#96742E] text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D8B979] text-[#D8B979]" />
            <span>Google Reviews · HamPers Kochi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
            Loved by Discerning Connoisseurs Across India
          </h2>
          
          {/* Authentic 5.0 Google Rating link */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <div className="flex text-[#D8B979]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D8B979]" />
              ))}
            </div>
            <span className="text-sm sm:text-base font-bold text-[#0B1D15]">5.0 out of 5 Rating</span>
            <span className="text-xs sm:text-sm text-[#505D56]">&bull; Verified Google Reviews</span>
            <a
              href="https://maps.app.goo.gl/Vg7xrXyXNX2B2zfDA?g_st=ac"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#96742E] hover:text-[#0B1D15] font-semibold underline underline-offset-4 ml-1 transition-colors"
            >
              <span>Read on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Testimonials Grid with Real Client Hamper Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group rounded-lg bg-white border border-[#E8E1D4] hover:border-[#D8B979] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden text-left"
            >
              {/* Client Hamper Photo from Real Order */}
              {t.image && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B1D15]">
                  <Image
                    src={t.image}
                    alt={t.hamperName}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Real Photo Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider font-medium">
                    <Camera className="w-3 h-3 text-[#D8B979]" />
                    <span>Real Delivered Hamper</span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs font-serif-luxury truncate drop-shadow">
                    {t.hamperName}
                  </div>
                </div>
              )}

              {/* Review Text Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Top: 5 Stars + Quote */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#D8B979]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D8B979]" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#D8B979]/40" />
                  </div>

                  {/* Hamper occasion tag */}
                  <div className="inline-block px-2.5 py-1 rounded bg-[#F7F4EC] text-[#96742E] text-[11px] font-semibold mb-3 border border-[#E8E1D4]">
                    {t.occasion}
                  </div>

                  {/* Review Text — perfectly balanced, not too small, not too large */}
                  <p className="text-[14px] sm:text-[15px] text-[#1F2923] font-normal leading-relaxed line-clamp-6">
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-5 pt-3.5 border-t border-[#EFE9DC]">
                  <div className="flex items-center gap-1.5 text-base font-serif-luxury font-bold text-[#0B1D15]">
                    <span>{t.name}</span>
                    <CheckCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                  </div>
                  <div className="text-xs text-[#505D56] font-medium mt-0.5">
                    {t.location}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-[#E8E1D4] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1.5 p-4 rounded-xl bg-white/70 border border-[#E8E1D4]">
            <span className="font-serif-luxury text-lg sm:text-xl text-[#0B1D15] font-semibold block">Pan-India Express</span>
            <span className="text-xs sm:text-sm text-[#505D56] block leading-relaxed">Air courier with live tracking to 28,000+ pincodes</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-white/70 border border-[#E8E1D4]">
            <span className="font-serif-luxury text-lg sm:text-xl text-[#0B1D15] font-semibold block">Climate Insulated</span>
            <span className="text-xs sm:text-sm text-[#505D56] block leading-relaxed">Chilled thermal packs for fine Belgian chocolates</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-white/70 border border-[#E8E1D4]">
            <span className="font-serif-luxury text-lg sm:text-xl text-[#0B1D15] font-semibold block">Artisan Sourced</span>
            <span className="text-xs sm:text-sm text-[#505D56] block leading-relaxed">Direct from heritage Kerala craftspeople & weavers</span>
          </div>
          <div className="space-y-1.5 p-4 rounded-xl bg-white/70 border border-[#E8E1D4]">
            <span className="font-serif-luxury text-lg sm:text-xl text-[#0B1D15] font-semibold block">Wax-Sealed Notes</span>
            <span className="text-xs sm:text-sm text-[#505D56] block leading-relaxed">Hand-lettered calligraphy on handmade cotton paper</span>
          </div>
        </div>

      </div>
    </section>
  );
}
