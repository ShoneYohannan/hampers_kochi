'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Curation & Keepsakes',
    question: 'What makes Hampers Kochi hampers unique and distinct from standard gift boxes?',
    answer:
      'Every hamper is curated and hand-assembled in our Kochi store. Rather than generic mass-market items, we curate heirloom-grade Kerala brassware (like handmade Vilakkus and Urulis), GI-tagged Balaramapuram Kasavu handlooms, single-origin high-grown Nilgiri teas, Wayanad artisanal chocolates, and handwritten calligraphy on handmade cotton paper, individually stamped with hot sealing wax.',
  },
  {
    category: 'Delivery & Shipping',
    question: 'What are your delivery timelines within Kochi and across India?',
    answer:
      'All Hampers Kochi creations are handcrafted on a pre-order basis to ensure optimal freshness and artisanal perfection. For Kochi and Ernakulam, pre-orders are hand-delivered upon completion or your preferred scheduled celebration date. For all-India delivery (including Bengaluru, Mumbai, Delhi NCR, Chennai, and Hyderabad), we dispatch via premium priority air express with thermal insulation and gel ice packs, arriving within 2 to 4 business days.',
  },
  {
    category: 'Personalization',
    question: 'Can I personalize my hamper with custom calligraphy notes and specific items?',
    answer:
      'Yes, each hamper includes a complimentary personalized wax-sealed parchment note written by our in-house calligrapher with your custom message (up to 50 characters). You can also customize trunk ribbons, brass keepsakes, tea blends, or add custom keepsakes by contacting our concierge on WhatsApp at +91 98460 02241.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FCFBF8] border-b border-[#EFE9DC]">
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#183C2D]/10 border border-[#C5A869]/30 text-[#A88B4D] text-xs uppercase tracking-[0.25em] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Answered Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68756F] font-light">
            Answers regarding our Kochi store craftsmanship, climate-protected all-India shipping,
            and custom personalization.
          </p>
        </div>

        {/* FAQ Accordion List (Top 3 questions only) */}
        <div className="max-w-4xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#C5A869] shadow-md'
                    : 'bg-white/70 border-[#EFE9DC] hover:border-[#C5A869]/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium block">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-[#0B1D15]">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#0B1D15] text-[#D8B979] rotate-180'
                        : 'bg-[#F7F4EC] text-[#68756F]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#38423D] font-light leading-relaxed border-t border-[#F7F4EC]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assistance Banner (Image 2: How Can We Help?) */}
        <div className="mt-12 text-center max-w-lg mx-auto p-6 rounded-xl bg-[#0B1D15] text-[#FCFBF8] border border-[#C5A869]/30 shadow-xl">
          <h4 className="font-serif-luxury text-xl text-[#FCFBF8] mb-1">
            Have a custom inquiry or special request?
          </h4>
          <p className="text-xs text-[#EFE9DC]/75 font-light mb-4">
            Our team at Hampers Kochi is available 7 days a week to assist with custom curations.
          </p>
          <a
            href="https://wa.me/919846002241?text=Hello%20Hampers%20Kochi%2C%20how%20can%20you%20help%20me%20with%20a%20luxury%20hamper%3F"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#D8B979] text-[#0B1D15] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#E6CE9F] transition-colors shadow-md cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>How Can We Help?</span>
          </a>
        </div>

      </div>
    </section>
  );
}
