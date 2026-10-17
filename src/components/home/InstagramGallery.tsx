'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramGallery() {
  const posts = [
    { image: '/images/1001483615.jpg.jpeg', handle: '@thekochiatelier', tag: '#BridalHamper' },
    { image: '/images/1001611483.jpg.jpeg', handle: '@thekochiatelier', tag: '#CoffeeCasket' },
    { image: '/images/1001707222.jpg.jpeg', handle: '@thekochiatelier', tag: '#VelvetRomance' },
    { image: '/images/1001981345.jpg.jpeg', handle: '@thekochiatelier', tag: '#RoyalTravancore' },
    { image: '/images/1002015494.jpg.jpeg', handle: '@thekochiatelier', tag: '#Chocolatier' },
    { image: '/images/1002029660.jpg.jpeg', handle: '@thekochiatelier', tag: '#CelebrationGold' },
  ];

  return (
    <section className="py-16 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-[#EFE9DC] gap-4">
          <div className="text-center sm:text-left">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1">
              Social Diary
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#0B1D15]">
              Moments of Grand Unboxing
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C5A869]/50 text-xs font-medium uppercase tracking-wider text-[#0B1D15] hover:bg-[#0B1D15] hover:text-[#FCFBF8] transition-all"
          >
            <InstagramIcon className="w-4 h-4 text-[#C5A869]" />
            <span>Follow @thekochiatelier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6-col Instagram image grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-md overflow-hidden bg-[#0B1D15] cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={post.image}
                alt="The Kochi Atelier Hamper Unboxing"
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              
              <div className="absolute inset-0 bg-[#0B1D15]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-[#D8B979] mb-1.5" />
                <span className="text-[10px] text-white font-medium tracking-wider">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
