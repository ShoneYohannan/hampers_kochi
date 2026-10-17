'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Check
} from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-[#0B1D15] text-[#FCFBF8] border-t border-[#C5A869]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Privilege Club */}
        <div className="rounded-xl p-8 sm:p-10 bg-gradient-to-r from-[#10291E] via-[#183C2D]/60 to-[#10291E] border border-[#C5A869]/40 shadow-2xl mb-16 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1D15] border border-[#C5A869]/40 text-[#D8B979] text-xs uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Circle</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-white">
            Receive 10% Privilege on Your Inaugural Curation
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#EFE9DC]/80 font-light max-w-md mx-auto">
            Subscribe for private seasonal previews, festive bespoke catalog releases, and complimentary gift personalization.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 rounded bg-[#183C2D] border border-[#C5A869] text-xs text-[#EFE9DC] inline-flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-[#D8B979]" />
              <span>Welcome to The Circle! Use voucher code <strong className="text-[#D8B979] underline">ROYAL10</strong> at checkout for 10% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-[#0B1D15] border border-[#C5A869]/40 rounded px-4 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D8B979]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] rounded text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C5A869]/20 text-left">
          
          {/* Col 1: Brand & Atelier Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[#C5A869] font-medium uppercase mb-1">
                Haute Gifting Atelier
              </div>
              <h2 className="text-2xl font-serif-luxury tracking-widest text-[#FCFBF8] font-normal">
                THE KOCHI ATELIER
              </h2>
            </div>
            
            <p className="text-xs text-[#EFE9DC]/75 leading-relaxed font-light">
              Crafting transcendent luxury hampers inspired by the historic maritime splendour of 
              the Malabar coast. Sourced with honor, curated with precision, and delivered across India 
              with distinction.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#D8B979]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Hampers & Curations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DC]/80 font-light">
              <li><a href="#bestsellers" className="hover:text-[#D8B979] transition-colors">Bestseller Curations</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Wedding & Bridal Suites</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Anniversary & Romance Trunks</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Festive & Diwali Brass Hampers</a></li>
              <li><a href="#corporate" className="hover:text-[#D8B979] transition-colors">Executive Corporate Gifting</a></li>
              <li><a href="#bestsellers" className="hover:text-[#D8B979] transition-colors">Single-Estate Tea & Spices</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Pan-India (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DC]/80 font-light">
              <li><a href="#story" className="hover:text-[#D8B979] transition-colors">Our Craft & Story</a></li>
              <li><a href="#testimonials" className="hover:text-[#D8B979] transition-colors">Client Reviews</a></li>
              <li><span className="text-[#D8B979]">All India Express Shipping</span></li>
              <li><span className="text-[#EFE9DC]/60">Chilled Transit Protection</span></li>
              <li><span className="text-[#EFE9DC]/60">Track Your Consignment</span></li>
              <li><span className="text-[#EFE9DC]/60">Privacy & Terms of Atelier</span></li>
            </ul>
          </div>

          {/* Col 4: Studio Address & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Studio & Atelier
            </h4>
            
            <div className="space-y-2 text-xs text-[#EFE9DC]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D8B979] shrink-0 mt-0.5" />
                <span>
                  Atelier House, 4th Cross Road, Panampilly Nagar & Bastion Street, Fort Kochi, Kerala 682001
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D8B979] shrink-0" />
                <a href="tel:+919645556010" className="hover:text-[#D8B979]">+91 96455 56010</a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D8B979] shrink-0" />
                <a href="mailto:concierge@thekochiatelier.com" className="hover:text-[#D8B979]">
                  concierge@thekochiatelier.com
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#C5A869]">
              Studio Hours: Monday – Saturday, 9:30 AM – 8:00 PM IST
            </div>
          </div>

        </div>

        {/* Bottom Rights & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFE9DC]/60 gap-4">
          <div>
            &copy; 2026 The Kochi Atelier Ltd. Handcrafted in Kochi &bull; Delivered All Over India.
          </div>

          {/* Payment and Assurance Icons */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#D8B979]">&bull; 100% Secure Checkout</span>
            <span>UPI &bull; Netbanking &bull; Visa &bull; Mastercard &bull; Razorpay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
