'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function CustomHamperEnquiry() {
  const { settings } = useCms();
  const whatsappNumber = settings?.whatsapp || '919645556010';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi, I am interested in creating a personalised hamper. Could you help me choose the perfect gift?')}`;

  return (
    <section className="py-16 md:py-24 bg-[#F8F5EE] border-y border-[#E8E1D4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-normal text-[#0B2118] mb-4">
          Create a Personalised Hamper
        </h2>
        <p className="text-base sm:text-lg text-[#77766F] font-light max-w-2xl mx-auto mb-8">
          Looking for something special? Tell us what you have in mind, and our team will help you choose the perfect gift.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold uppercase tracking-wider rounded transition-colors shadow-lg"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Customise on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
