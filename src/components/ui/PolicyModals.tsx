'use client';

import React from 'react';
import { X, Shield, FileText, Truck } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'shipping' | null;

interface PolicyModalsProps {
  activePolicy: PolicyType;
  onClose: () => void;
}

export default function PolicyModals({ activePolicy, onClose }: PolicyModalsProps) {
  if (!activePolicy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1D15]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FCFBF8] text-[#141A17] rounded-xl border border-[#C5A869]/40 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-[#EFE9DC] flex items-center justify-between bg-[#F7F4EC]">
          <div className="flex items-center gap-2.5">
            {activePolicy === 'privacy' && <Shield className="w-5 h-5 text-[#C5A869]" />}
            {activePolicy === 'terms' && <FileText className="w-5 h-5 text-[#C5A869]" />}
            {activePolicy === 'shipping' && <Truck className="w-5 h-5 text-[#C5A869]" />}
            
            <h3 className="font-serif-luxury text-2xl text-[#0B1D15]">
              {activePolicy === 'privacy' && 'Privacy Policy'}
              {activePolicy === 'terms' && 'Terms & Conditions'}
              {activePolicy === 'shipping' && 'Shipping & Delivery Policy'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-[#EFE9DC] text-[#68756F] hover:text-[#0B1D15] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#38423D] font-light leading-relaxed">
          {activePolicy === 'privacy' && (
            <>
              <p>
                At <strong>HamPers Kochi (The Kochi Atelier)</strong>, we take the confidentiality of your personal and recipient information with utmost seriousness.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">1. Information We Collect</h4>
              <p>
                When you place a hamper inquiry or order, we collect sender names, contact numbers, billing addresses, and recipient delivery coordinates to orchestrate flawless doorstep handover.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">2. Recipient Confidentiality &amp; Gifting Privacy</h4>
              <p>
                We never disclose sender identity without authorization, nor do we disclose recipient details to third-party commercial marketing platforms. All custom wax-sealed letters remain private and strictly confidential.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">3. Data Security &amp; Payments</h4>
              <p>
                Financial transactions are processed via bank-grade encrypted UPI and Razorpay payment gateways. We never store credit card or CVV details on our servers.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">4. Inquiries</h4>
              <p>
                For questions regarding your data, contact our data officer at <em>concierge@thekochiatelier.com</em>.
              </p>
            </>
          )}

          {activePolicy === 'terms' && (
            <>
              <p>
                Welcome to <strong>HamPers Kochi</strong>. By engaging with our website and ordering bespoke curations, you agree to the following artisanal terms.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">1. Artisanal Natural Variations</h4>
              <p>
                Our brassware, Kasavu handloom textiles, and wooden trunks are handcrafted by traditional Kerala artisans. Subtle variations in metal patina, wood grain, or weave density celebrate the organic authenticity of genuine craftsmanship and are not considered flaws.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">2. Order Confirmation &amp; Calligraphy Proofing</h4>
              <p>
                Personalized wax-sealed calligraphy notes are drafted according to your provided text. Please ensure spelling and sentiment are accurate upon order confirmation.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">3. Corporate &amp; Bulk Orders</h4>
              <p>
                Bulk orders with custom logo foil debossing require an advance payment to initiate custom artisan dies. Production schedules are mutually agreed upon prior to dispatch.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">4. Governing Law</h4>
              <p>
                All disputes are subject to the exclusive jurisdiction of the competent courts in Kochi, Kerala, India.
              </p>
            </>
          )}

          {activePolicy === 'shipping' && (
            <>
              <p>
                We take immense pride in ensuring your luxury gift arrives in pristine, breathtaking condition, whether delivered around the corner in Fort Kochi or flown across the country.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">1. Delivery Zones &amp; Timelines</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Kochi &amp; Ernakulam:</strong> Handcrafted on pre-order with white-glove hand delivery upon completion or your preferred celebration date.</li>
                <li><strong>Kerala Statewide:</strong> 24 to 48 hours via express ground courier.</li>
                <li><strong>All-India Delivery:</strong> 2 to 4 business days via priority air express (BlueDart, DTDC Air, Delhivery).</li>
              </ul>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">2. Climate-Insulated Thermal Protection</h4>
              <p>
                Delicate chocolates, artisanal confections, and gourmet preserves are dispatched in thermal insulated foil liners with pharmaceutical-grade non-toxic reusable gel ice packs to ensure total temperature stability.
              </p>
              <h4 className="font-serif-luxury text-base text-[#0B1D15] font-semibold mt-4">3. Tracking &amp; Concierge Handover</h4>
              <p>
                Upon dispatch, our concierge shares live airway bill tracking directly to your WhatsApp and email.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#EFE9DC] bg-[#F7F4EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded bg-[#0B1D15] text-[#FCFBF8] text-xs uppercase tracking-[0.2em] hover:bg-[#183C2D] transition-colors"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
}
