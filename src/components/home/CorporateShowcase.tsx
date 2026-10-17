'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Briefcase, Building, CheckCircle2, Download, MessageSquare, Send, Sparkles } from 'lucide-react';

export default function CorporateShowcase() {
  const [formSent, setFormSent] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('25-50 Units');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setCompanyName('');
      setEmail('');
    }, 3000);
  };

  const corporateWhatsApp = encodeURIComponent(
    'Hello The Kochi Atelier Corporate Team, I would like to request your 2026 Corporate Luxury Gifting Catalogue and discuss a bulk curation.'
  );

  return (
    <section id="corporate" className="py-16 md:py-24 bg-[#0B1D15] text-[#FCFBF8] relative overflow-hidden border-b border-[#C5A869]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Features */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] text-xs uppercase tracking-[0.2em]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Enterprise & Executive Gifting</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal leading-tight">
              Bespoke Corporate Curations <br />
              <span className="italic font-light text-[#D8B979]">
                That Leave An Enduring Mark
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#EFE9DC]/80 font-light leading-relaxed">
              Elevate corporate milestones, client appreciation, and annual festive galas with
              distinguished luxury. We offer custom enterprise branding, debossed logo sleeves, 
              custom wax seals, and individual multi-address dispatch across India.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Custom 24k Gold Foil Company Logo Embossing',
                'Curated Single-Origin Coffees & Brass Artefacts',
                'Multi-Address Doorstep Delivery Across 28k+ Pincodes',
                'Dedicated Corporate Gifting Concierge Account Manager',
                'Volume Pricing & GST Compliant Invoicing',
                'Zero-Plastic Sustainable Luxury Packaging',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#EFE9DC]/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D8B979] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={`https://wa.me/919645556010?text=${corporateWhatsApp}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-[#0B1D15]" />
                <span>Chat with Corporate Specialist</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded bg-[#183C2D] border border-[#C5A869]/40 text-[#FCFBF8] hover:bg-[#23523E] font-medium text-xs uppercase tracking-[0.18em] transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#D8B979]" />
                <span>Download Lookbook PDF</span>
              </a>
            </div>

          </div>

          {/* Right Corporate Form / Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#10291E] p-8 rounded-xl border border-[#C5A869]/40 shadow-2xl relative">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C5A869]/20">
                <Building className="w-6 h-6 text-[#D8B979]" />
                <div>
                  <h3 className="text-xl font-serif-luxury text-white">Request Corporate Proposal</h3>
                  <p className="text-[11px] text-[#EFE9DC]/60">Receive a tailored quote within 2 business hours</p>
                </div>
              </div>

              {formSent ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#183C2D] border border-[#C5A869] text-[#D8B979] flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif-luxury text-white">Inquiry Received</h4>
                  <p className="text-xs text-[#EFE9DC]/80">
                    Our corporate concierge will reach out to you with sample options and bulk volume discounts.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#EFE9DC]/75 mb-1">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sterling Capital, Bangalore"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D8B979]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#EFE9DC]/75 mb-1">
                      Work Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="executive@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D8B979]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#EFE9DC]/75 mb-1">
                      Estimated Hamper Quantity
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#D8B979]"
                    >
                      <option value="10-25 Units">10 – 25 Units</option>
                      <option value="25-50 Units">25 – 50 Units</option>
                      <option value="50-150 Units">50 – 150 Units</option>
                      <option value="150+ Units">150+ Executive Units</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-medium text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}

              <div className="mt-4 pt-3 border-t border-[#C5A869]/15 text-center text-[10px] text-[#EFE9DC]/60">
                GST Invoice provided with all corporate orders &bull; NDA protected
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
