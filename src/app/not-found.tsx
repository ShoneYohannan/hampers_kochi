'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, MessageSquare, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B1D15] text-[#FCFBF8] flex flex-col justify-between font-sans-clean selection:bg-[#C5A869]/25 selection:text-[#FCFBF8]">
      
      {/* Header Bar */}
      <header className="p-6 border-b border-[#C5A869]/20 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="font-serif-luxury text-[#EFE9DC] text-2xl tracking-wide italic group-hover:text-[#C5A869] transition-colors">
            hampers<span className="text-[#C5A869] not-italic">_</span>kochi
          </span>
        </Link>

        <a
          href="https://wa.me/919846002241"
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-[0.2em] text-[#D8B979] hover:text-white transition-colors flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Concierge</span>
        </a>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] text-xs uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5" />
            <span>404 &bull; Curation Undiscovered</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-normal leading-tight text-[#FCFBF8]">
            The Requested Page <br />
            <span className="italic text-[#D8B979]">Could Not Be Found</span>
          </h1>

          <p className="text-sm sm:text-base text-[#EFE9DC]/75 font-light leading-relaxed max-w-md mx-auto">
            Perhaps this bespoke creation has been archived, or the link has drifted like spice winds across the Malabar coast. Allow us to guide you back to our active collections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>

            <Link
              href="/#bestsellers"
              className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#183C2D] border border-[#C5A869]/40 text-[#FCFBF8] hover:bg-[#23523E] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8B979]" />
              <span>Explore Bestsellers</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-[#C5A869]/15">
            <p className="text-xs text-[#EFE9DC]/60">
              Need immediate assistance? Speak directly with our concierge at{' '}
              <a href="tel:+919846002241" className="text-[#D8B979] underline hover:text-white">
                +91 98460 02241
              </a>
            </p>
          </div>

        </div>
      </main>

      {/* Footer minimal */}
      <footer className="p-6 border-t border-[#C5A869]/15 text-center text-xs text-[#EFE9DC]/50">
        &copy; 2026 HamPers Kochi. Handcrafted in Kochi, Delivered Across India.
      </footer>

    </div>
  );
}
