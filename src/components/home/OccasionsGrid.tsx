'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { OCCASIONS_DATA } from '@/data/products';
import { OccasionCategory } from '@/types';

interface OccasionsGridProps {
  onSelectOccasion: (category: OccasionCategory) => void;
}

export default function OccasionsGrid({ onSelectOccasion }: OccasionsGridProps) {
  return (
    <section id="occasions" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-2">
            Curated By Milestone
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
            Curations for Every Cherished Occasion
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68756F] font-light">
            From intimate birthday celebrations to majestic grand weddings, each hamper is
            conceptually styled with purposeful keepsakes.
          </p>
        </div>

        {/* Occasions 6-grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {OCCASIONS_DATA.map((item) => (
            <div
              key={item.title}
              onClick={() => onSelectOccasion(item.category)}
              className="group relative rounded-md overflow-hidden bg-[#0B1D15] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-[#C5A869]/20"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} Luxury Gift Hamper Collection in Kochi`}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Dark Gradient Overlay for Editorial Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15] via-[#0B1D15]/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-300" />
                
                {/* Subtle Gold Border Hover Accent */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A869]/60 transition-colors duration-300 pointer-events-none" />
              </div>

              {/* Text content over card */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                    {item.itemCount}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-[#183C2D]/80 border border-[#C5A869]/40 flex items-center justify-center text-[#D8B979] group-hover:bg-[#C5A869] group-hover:text-[#0B1D15] transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8] font-normal leading-snug group-hover:text-[#D8B979] transition-colors">
                  {item.title}
                </h3>
                
                <p className="mt-1 text-xs text-[#EFE9DC]/75 line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
