'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  FileText,
  Truck
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import { PolicyType } from '@/components/ui/PolicyModals';

interface FooterProps {
  onOpenPolicy?: (policy: PolicyType) => void;
}

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export default function Footer({ onOpenPolicy }: FooterProps) {
  const [currentYear, setCurrentYear] = useState('2026');
  const { settings } = useCms();

  React.useEffect(() => {
    setCurrentYear(String(new Date().getFullYear()));
  }, []);

  const whatsappNumber = settings?.whatsapp || '919645556010';
  const mapsUrl = 'https://www.google.com/maps/place/HamPers+Kochi/@10.0354402,76.3371076,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080d0061e38933:0x15372481079d8544!8m2!3d10.0354402!4d76.3371076!16s%2Fg%2F11wqv83_n0?entry=ttu';

  return (
    <footer id="contact" className="bg-[#0B1D15] text-[#FCFBF8] border-t border-[#C5A869]/30 pt-16 pb-10">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#C5A869]/20">

          {/* Brand & Socials */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif-luxury tracking-widest text-[#FCFBF8] font-normal">
              HamPers Kochi
            </h2>
            <p className="text-xs text-[#E8E1D4]/75 leading-relaxed font-light">
              Haute luxury gift hampers curated in Kochi, Kerala. Heirloom brass keepsakes,
              single-estate teas, and artisanal chocolates delivered across India with care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/hampers_kochi/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                aria-label="Follow HamPers Kochi on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="Direct WhatsApp Concierge"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-sm bg-[#183C2D] border border-[#C5A869]/30 flex items-center justify-center hover:bg-[#D8B979] hover:text-[#0B1D15] transition-colors"
                aria-label="HamPers Kochi on Google Maps"
                title="Locate on Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Hampers */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#E8E1D4]/80 font-light">
              <li><a href="#bestsellers" className="hover:text-[#C5A869] transition-colors">Signature Bestsellers</a></li>
              <li><a href="#occasions" className="hover:text-[#C5A869] transition-colors">Occasion Curations</a></li>
              <li><a href="#bestsellers" className="hover:text-[#C5A869] transition-colors">Bridal &amp; Wedding Suites</a></li>
              <li><a href="#corporate" className="hover:text-[#C5A869] transition-colors">Corporate &amp; Executive Trunks</a></li>
              <li><a href="#bestsellers" className="hover:text-[#C5A869] transition-colors">Festive Brass Keepsakes</a></li>
              <li><Link href="/cms" className="hover:text-[#C5A869] transition-colors text-[#D8B979]/80 font-medium">Atelier CMS Portal</Link></li>
            </ul>
          </div>

          {/* Information & Links (Zero orphan pages) */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Atelier Information
            </h4>
            <ul className="space-y-2 text-xs text-[#E8E1D4]/80 font-light">
              <li><a href="#story" className="hover:text-[#C5A869] transition-colors">Our Kochi Heritage Story</a></li>
              <li><a href="#curator" className="hover:text-[#C5A869] transition-colors">Meet the Master Curator</a></li>
              <li><a href="#faq" className="hover:text-[#C5A869] transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#delivery" className="hover:text-[#C5A869] transition-colors">Pan-India Pincode Checker</a></li>
              <li><a href="#testimonials" className="hover:text-[#C5A869] transition-colors">Customer Reviews &amp; Testimonials</a></li>
              <li><a href="/sitemap.xml" className="hover:text-[#C5A869] transition-colors text-[11px] opacity-75">XML Sitemap</a></li>
            </ul>
          </div>

          {/* Contact & Studio Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              Atelier Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-[#E8E1D4]/80 font-light">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A869] shrink-0" />
                <a
                  href={`tel:${(settings?.phone || '+91 96455 56010').replace(/\s+/g, '')}`}
                  className="hover:text-[#C5A869] transition-colors font-medium whitespace-nowrap"
                >
                  {settings?.phone || '+91 96455 56010'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A869] shrink-0" />
                <a
                  href={`mailto:${settings?.email || 'concierge@thekochiatelier.com'}`}
                  className="hover:text-[#C5A869] transition-colors font-medium truncate"
                >
                  {settings?.email || 'concierge@thekochiatelier.com'}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A869] shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#C5A869] transition-colors leading-relaxed"
                >
                  HamPers Kochi, Fort Kochi / Ernakulam, Kerala 682001
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Policy Links (No dead '#' links) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFE9DC]/60 gap-4">
          <div>
            &copy; {currentYear} HamPers Kochi &bull; The Kochi Atelier. Handcrafted in Kerala, Delivered Across India.
          </div>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-[#C5A869] transition-colors cursor-pointer text-xs"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-[#C5A869] transition-colors cursor-pointer text-xs"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={() => onOpenPolicy?.('shipping')}
              className="hover:text-[#C5A869] transition-colors cursor-pointer text-xs"
            >
              Shipping Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
