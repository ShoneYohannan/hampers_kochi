'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Feather, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

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
      desc: 'All-India shipping with thermal insulated foil lining and ice gel packs for fine chocolates and delicate confectionery.',
    },
    {
      icon: HeartHandshake,
      title: 'Ethical & Single-Estate Sourcing',
      desc: 'Teas from high-altitude Nilgiri gardens, Wayanad coffee, and tellicherry peppercorns harvested from organic family farms.',
    },
  ];

  return (
    <section id="story" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Brand Portrait & Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded border border-[#C5A869]/30 transform -rotate-1 pointer-events-none" />
              
              <div className="relative aspect-[3/4] rounded overflow-hidden shadow-2xl bg-[#0B1D15]">
                <Image
                  src="/images/1001877031.jpg.jpeg"
                  alt="Crafting luxury hampers inside Hampers Kochi store in Kerala"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15]/85 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-[#D8B979] font-medium">
                    Hampers Kochi Store
                  </div>
                  <h3 className="text-xl font-serif-luxury font-normal text-white mt-1">
                    Hampers Kochi · Handcrafted in Kochi
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium">
              My Hampers Kochi Story
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
              The Threads of Yesterday
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#38423D] font-light leading-relaxed">
              <p>
                The Arabian Sea does not forget the waves that shaped its shore, nor do we forget the late-night tea, the rustle of satin ribbons, and the shared dreams of 2010.
              </p>
              <p>
                During our post-graduation years from 2010 to 2012, we didn’t just study; we built a universe out of nothing. We were a team bound not by contracts, but by an unspoken promise to bring joy to people’s milestones. Our part-time event company was an exhausting, exhilarating whirlwind. Together with my best friends, we learned the choreographies of human happiness. We saw it in the relieved smiles of hosts and the glowing eyes of guests. We were a great team—seamless, intuitive, and profoundly dedicated to the personal touch.
              </p>
              <p className="font-serif-luxury italic text-[#0B1D15] text-base sm:text-lg">
                Then, life shifted gears.
              </p>
              <p>
                Post-graduation demanded a permanent anchor, and we poured our collective ambition into the demanding, beautiful chaos of a full-time restaurant business. The event company slowly quieted down, its grand stages dismantled. Yet, passion is a stubborn thing. It refuses to be entirely put out. Even as the restaurant kitchen hummed, we kept a quiet sanctuary for our first love. We became the secret keepers of intimate celebrations—crafting bespoke giveaways, gentle return gifts, and deeply personal keepsakes for brides, grooms, and their emotional parents.
              </p>
              <p className="italic text-[#183C2D]">
                We wrapped memories in linen and twine, unable to let go of the magic we created together.
              </p>
              <p>
                Then came the turning point—a gentle, persistent push from the very friends who knew my soul, and a regular customer who saw the poetry in my hands. They looked at the boxes of carefully curated joy and said, &ldquo;This is who you are.&rdquo;
              </p>
              <p className="font-medium text-[#0B1D15]">
                From that beautiful spark of encouragement, my second venture was born: <strong>Hampers Kochi</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EFE9DC] flex items-center gap-6">
              <div>
                <div className="text-2xl font-serif-luxury text-[#0B1D15] font-semibold">Kochi, Kerala</div>
                <div className="text-[11px] text-[#68756F] uppercase tracking-wider">Hampers Store &amp; Workshop</div>
              </div>
              <div className="w-[1px] h-10 bg-[#C5A869]/40" />
              <div>
                <div className="text-2xl font-serif-luxury text-[#0B1D15] font-semibold">All-India</div>
                <div className="text-[11px] text-[#68756F] uppercase tracking-wider">Express Delivery</div>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 pb-16 border-b border-[#EFE9DC]">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded bg-white border border-[#EFE9DC] hover:border-[#C5A869] transition-all duration-300 shadow-sm hover:shadow-md text-left"
              >
                <div className="w-12 h-12 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center mb-4">
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

        {/* ── AUTHOR / MASTER CURATOR BIO SECTION (SEO & Trust E-E-A-T) ── */}
        <div id="curator" className="pt-16">
          <div className="bg-[#0B1D15] text-[#FCFBF8] rounded-xl p-8 sm:p-12 lg:p-16 border border-[#C5A869]/30 relative overflow-hidden shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Curator Portrait */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-lg p-1.5 border-2 border-[#D8B979] shadow-2xl overflow-hidden bg-[#183C2D]">
                  <Image
                    src="/images/1001436447.jpg.jpeg"
                    alt="Ann, Master Curator and Founder of HamPers Kochi"
                    fill
                    className="object-cover rounded"
                    sizes="200px"
                  />
                </div>

                <div className="mt-5 space-y-1">
                  <h3 className="text-2xl font-serif-luxury text-[#FCFBF8] font-normal">
                    Ann &amp; The Hampers Kochi Curators
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D8B979] font-medium">
                    Founder &amp; Master Curator
                  </p>
                  <p className="text-[11px] text-[#EFE9DC]/60 font-light">
                    Kochi, Kerala &bull; 10+ Years in Haute Gifting
                  </p>
                </div>
              </div>

              {/* Curator Bio & Statement */}
              <div className="lg:col-span-8 space-y-4 text-left border-t lg:border-t-0 lg:border-l border-[#C5A869]/20 pt-6 lg:pt-0 lg:pl-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] text-[11px] uppercase tracking-[0.2em]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Curator&apos;s Heritage Note</span>
                </div>

                <blockquote className="font-serif-luxury text-xl sm:text-2xl text-[#FCFBF8] font-normal italic leading-relaxed">
                  &ldquo;A luxury gift is an enduring covenant of respect, cultural heritage, and heartfelt warmth between people.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-[#EFE9DC]/80 font-light leading-relaxed">
                  Growing up surrounded by the spice auctions of Mattancherry and the bell-metal craft of Mannar,
                  I founded <strong>HamPers Kochi</strong> to bridge traditional Kerala heritage arts with modern 
                  luxury. Every single element inside our hampers—from the wild cardamom 
                  chocolates to the handwoven Kasavu silks—is directly sourced from multigenerational artisan families.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#D8B979]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0" />
                    <span>Direct Artisan Partnership Across Kerala</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0" />
                    <span>Authentic Hot Wax Calligraphy Seals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0" />
                    <span>Climate-Guaranteed Thermal Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0" />
                    <span>Personalized Consultation for Every Client</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <a
                    href="https://wa.me/919846002241?text=Hello%20Ann%2C%20I%20would%20love%20to%20consult%20with%20you%20regarding%20a%20luxury%20hamper."
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-sm bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2 shadow-md"
                  >
                    <span>Consult with the Curator</span>
                  </a>
                  <a
                    href="https://www.instagram.com/hampers_kochi?srtk=MTR0NmdzYjF3ZzR3ZA=="
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#EFE9DC]/70 hover:text-[#D8B979] underline transition-colors"
                  >
                    View Store Journal on Instagram
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
