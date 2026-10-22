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
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-[#EFE9DC] gap-4">
          <div className="text-center sm:text-left">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1">
              Social Diary
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#0B1D15]">
              Moments of Grand Unboxing
            </h2>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <a
              href="https://www.instagram.com/hampers_kochi?srtk=MTR0NmdzYjF3ZzR3ZA=="
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm border border-[#C5A869]/50 text-xs font-medium uppercase tracking-wider text-[#0B1D15] hover:bg-[#0B1D15] hover:text-[#FCFBF8] transition-all"
              title="Follow @hampers_kochi on Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-[#C5A869]" />
              <span>@hampers_kochi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://in.pinterest.com/hamperskochi/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-sm border border-[#C5A869]/50 text-xs font-medium uppercase tracking-wider text-[#0B1D15] hover:bg-[#E60023] hover:text-white hover:border-[#E60023] transition-all"
              title="Explore hamperskochi on Pinterest"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12C24.017 5.367 18.644 0 12.017 0z" />
              </svg>
              <span>Pinterest</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
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
                alt={`${post.tag.replace('#', '')} Unboxing Moment - HamPers Kochi Luxury Gifting Atelier`}
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
