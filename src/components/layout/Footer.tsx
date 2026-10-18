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
  Check,
  X
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useCms } from '@/context/CmsContext';

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

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState('2026');
  const toast = useToast();
  const { settings } = useCms();

  React.useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      toast.success('Welcome to The Atelier Circle! Code ROYAL10 copied.');
    } else {
      toast.error('Please enter a valid email address.');
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
              <Link
                href="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-block group"
              >
                <h2 className="text-2xl font-serif-luxury tracking-widest text-[#FCFBF8] font-normal group-hover:text-[#C5A869] transition-colors">
                  THE KOCHI ATELIER
                </h2>
              </Link>
            </div>
            
            <p className="text-xs text-[#EFE9DC]/75 leading-relaxed font-light">
              Crafting transcendent luxury gift hampers inspired by the historic maritime splendour of 
              the Malabar coast. Sourced with honor, curated with precision, and delivered across India 
              with distinction.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#D8B979]">
              <a
                href="https://www.instagram.com/hampers_kochi/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                aria-label="Instagram"
                title="Follow on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                aria-label="Facebook"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://wa.me/919645556010"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
                title="WhatsApp Concierge"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Curated Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Curated Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DC]/80 font-light">
              <li><a href="#bestsellers" className="hover:text-[#D8B979] transition-colors">Bestseller Curations</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Wedding & Bridal Suites</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Anniversary & Romance Trunks</a></li>
              <li><a href="#occasions" className="hover:text-[#D8B979] transition-colors">Festive & Traditional Hampers</a></li>
              <li><a href="#corporate" className="hover:text-[#D8B979] transition-colors">Executive Corporate Gifting</a></li>
              <li><a href="#bestsellers" className="hover:text-[#D8B979] transition-colors">Single-Estate Tea & Spices</a></li>
            </ul>
          </div>

          {/* Col 3: Client Concierge (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#EFE9DC]/80 font-light">
              <li><a href="#story" className="hover:text-[#D8B979] transition-colors">Our Craft & Story</a></li>
              <li><a href="#testimonials" className="hover:text-[#D8B979] transition-colors">Client Reviews</a></li>
              <li><a href="#delivery" className="hover:text-[#D8B979] transition-colors">All India Express Shipping</a></li>
              <li><a href="#delivery" className="hover:text-[#D8B979] transition-colors">Chilled Transit Protection</a></li>
              <li>
                <a
                  href="https://wa.me/919645556010?text=Hello%20Concierge,%20I%20would%20like%20to%20track%20my%20consignment."
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D8B979] transition-colors flex items-center gap-1"
                >
                  <span>Track Consignment</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => setTermsModalOpen(true)}
                  className="hover:text-[#D8B979] transition-colors text-left cursor-pointer"
                >
                  Privacy & Terms of Atelier
                </button>
              </li>
              <li className="pt-1 border-t border-[#C5A869]/15">
                <Link
                  href="/cms"
                  className="text-[#D8B979] hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Sparkles className="w-3 h-3 text-[#C5A869]" />
                  <span>Client Atelier CMS Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Address & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Studio & Atelier
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#EFE9DC]/80 font-light">
              <a
                href="https://maps.google.com/?q=Panampilly+Nagar+Kochi+Kerala"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2 hover:text-[#D8B979] transition-colors"
                title="View on Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#D8B979] shrink-0 mt-0.5" />
                <span>
                  Atelier House, 4th Cross Road, Panampilly Nagar & Bastion Street, Fort Kochi, Kerala 682001
                </span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D8B979] shrink-0" />
                <a
                  href={`tel:${(settings?.phone || '+91 96455 56010').replace(/\s+/g, '')}`}
                  className="hover:text-[#D8B979] transition-colors font-medium whitespace-nowrap font-mono"
                  title="Call Phone Concierge"
                >
                  {settings?.phone || '+91 96455 56010'}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D8B979] shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'concierge@thekochiatelier.com'}`}
                  className="hover:text-[#D8B979] transition-colors font-medium whitespace-nowrap truncate max-w-[240px]"
                  title="Send Email"
                >
                  {settings?.email || 'concierge@thekochiatelier.com'}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#C5A869]">
              Studio Hours: {settings?.studioHours || 'Monday – Saturday, 9:30 AM – 8:00 PM IST'}
            </div>
          </div>

        </div>

        {/* Bottom Rights & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFE9DC]/60 gap-4">
          <div>
            &copy; {currentYear} The Kochi Atelier Ltd. Handcrafted in Kochi &bull; Delivered All Over India.
          </div>

          {/* Payment and Assurance Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="text-[#D8B979]">&bull; 100% Secure WhatsApp Ordering</span>
            <span>UPI &bull; Netbanking &bull; Visa &bull; Mastercard &bull; Razorpay</span>
          </div>
        </div>

      </div>

      {/* Atelier Privacy & Terms Modal */}
      {termsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
          <div
            className="relative bg-[#0B1D15] border border-[#C5A869]/40 rounded-xl max-w-xl w-full p-6 sm:p-8 text-left shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#C5A869]/20">
              <h3 className="text-xl font-serif-luxury text-white">Atelier Standards & Terms</h3>
              <button
                onClick={() => setTermsModalOpen(false)}
                className="p-1 rounded-full text-[#EFE9DC]/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#EFE9DC]/80 space-y-3 font-light leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>
                <strong>Handcrafted Curations:</strong> Every gift curation from The Kochi Atelier is assembled by master artisans. Perishable confectionery and chocolates are temperature-shielded with ice packs for climate-safe pan-India transit.
              </p>
              <p>
                <strong>Dispatch & Delivery:</strong> Express dispatches occur within 24 to 48 hours from our Fort Kochi studio. BlueDart Air and premium couriers deliver within 2 to 4 business days to 28,000+ Indian postal codes.
              </p>
              <p>
                <strong>Client Confidentiality & Privacy:</strong> Recipient names, custom calligraphy notes, and corporate data remain strictly confidential. We never disclose client gifting lists to third parties.
              </p>
              <p>
                <strong>Damage-Free Guarantee:</strong> If any curation suffers transit damage, we immediately dispatch an artisan replacement upon receipt of unboxing photos via our WhatsApp concierge (+91 96455 56010).
              </p>
            </div>

            <div className="pt-3 border-t border-[#C5A869]/20 text-right">
              <button
                onClick={() => setTermsModalOpen(false)}
                className="px-6 py-2.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
