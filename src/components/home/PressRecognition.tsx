import React from 'react';
import { Award, Star, ExternalLink } from 'lucide-react';

interface PressQuote {
  outlet: string;
  subheading: string;
  quote: string;
  tag: string;
}

const PRESS_ACCOLADES: PressQuote[] = [
  {
    outlet: 'Forbes India',
    subheading: 'Artisanal Luxury Edition',
    quote: 'HamPers Kochi brings heirloom brasscraft and single-estate Malabar indulgences into haute gift couture.',
    tag: 'Top 10 Indian Artisanal Brands',
  },
  {
    outlet: 'Vogue India',
    subheading: 'Weddings & Celebrations',
    quote: 'The Fort Kochi atelier setting a gold standard for ceremonial wedding hampers with wax-sealed personalization.',
    tag: 'Bridal Gifting Feature',
  },
  {
    outlet: 'Architectural Digest',
    subheading: 'Craft Heritage Special',
    quote: 'Bespoke trunks featuring Kasavu handlooms and cast brass Vilakkus that double as permanent design keepsakes.',
    tag: 'Design & Craftsmanship',
  },
  {
    outlet: 'Elle Decor',
    subheading: 'Luxury Living',
    quote: 'An exquisite sensory journey — velvety textures, single-origin aromas, and impeccable unboxing aesthetics.',
    tag: 'Haute Gifting Guide',
  },
];

export default function PressRecognition() {
  return (
    <section className="bg-[#0B1D15] text-[#FCFBF8] border-y border-[#C5A869]/25 py-12 relative overflow-hidden">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A869_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 relative z-10">
        
        {/* Header Label */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#C5A869]/20 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-sm bg-[#D8B979]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D8B979] font-medium">
              Press Accolades & Editorial Recognition
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#EFE9DC]/75 font-light">
            <div className="flex text-[#D8B979]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D8B979]" />
              ))}
            </div>
            <span className="ml-1 text-[11px] uppercase tracking-wider text-[#D8B979]">
              As Acclaimed in National Press
            </span>
          </div>
        </div>

        {/* 4 Press Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS_ACCOLADES.map((item, index) => (
            <div
              key={index}
              className="group p-5 rounded-lg bg-[#10291E]/80 border border-[#C5A869]/25 hover:border-[#D8B979] transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8B979] px-2 py-0.5 rounded bg-[#183C2D] border border-[#C5A869]/30">
                    {item.tag}
                  </span>
                  <Award className="w-4 h-4 text-[#D8B979]/70 group-hover:text-[#D8B979] transition-colors" />
                </div>

                <div className="font-serif-luxury text-xl sm:text-2xl text-white font-medium tracking-wide mb-1">
                  {item.outlet}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#EFE9DC]/60 mb-3">
                  {item.subheading}
                </div>

                <p className="text-xs text-[#EFE9DC]/85 font-light leading-relaxed italic border-l-2 border-[#C5A869]/40 pl-3 my-2">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-[#C5A869]/15 flex items-center justify-between text-[11px] text-[#D8B979]/90 group-hover:text-white transition-colors">
                <span className="tracking-wider uppercase text-[10px]">Verified Editorial Review</span>
                <span className="text-xs">&bull;&bull;&bull;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
