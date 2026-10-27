'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customQuery.trim() || 'Hello, I would like assistance with selecting a luxury hamper curation.';
    window.open(`https://wa.me/919846002241?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
    setCustomQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Popover Dialogue Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-lg shadow-2xl border border-[#C5A869]/40 overflow-hidden animate-in slide-in-from-bottom-3 duration-200 text-left">
          {/* Header */}
          <div className="p-4 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-sm bg-[#183C2D] border border-[#C5A869] flex items-center justify-center text-[#D8B979]">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                </div>
                <span className="w-2.5 h-2.5 rounded-sm bg-[#25D366] absolute bottom-0 right-0 border border-[#0B1D15]" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide">Hampers Kochi Concierge</h4>
                <p className="text-[10px] text-[#D8B979]">Online &bull; Instant Reply</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F5] space-y-3">
            <div className="p-3 rounded bg-white border border-[#EFE9DC] text-xs text-[#38423D] leading-relaxed shadow-sm">
              Namaskaram! How may we assist your gifting celebration today? We craft bespoke hampers on pre-order with hand-delivery in Kochi and express all-India delivery.
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <input
                type="text"
                placeholder="Type your question or request..."
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#EFE9DC] bg-white focus:outline-none focus:border-[#C5A869]"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-3 rounded bg-[#25D366] text-white hover:bg-[#128C7E] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Consultation</span>
              </button>
            </form>
          </div>

          <div className="p-2.5 bg-[#F7F4EC] text-center text-[10px] text-[#68756F]">
            Direct line: +91 98460 02241 &bull; Fort Kochi Studio
          </div>
        </div>
      )}

      {/* Floating Trigger Button (Clean luxury rounded square) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-lg bg-[#0B1D15] text-[#D8B979] hover:text-[#FCFBF8] border-2 border-[#C5A869] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group relative cursor-pointer"
        aria-label="WhatsApp Concierge"
        title="Chat with Gifting Concierge"
      >
        <MessageSquare className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
        <span className="w-2.5 h-2.5 rounded-sm bg-[#25D366] absolute -top-1 -right-1 border border-[#0B1D15]" />
      </button>

    </div>
  );
}
