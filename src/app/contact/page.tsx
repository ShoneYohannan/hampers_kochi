'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import FaqSection from '@/components/home/FaqSection';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product } from '@/types';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function ContactPage() {
  const { settings } = useCms();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Birthday',
    budget: '₹1,000 - ₹2,000',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneDisplay = settings?.phone || '+91 98460 02241';
  const cleanPhone = phoneDisplay.replace(/\s+/g, '');
  const emailDisplay = settings?.email || 'HampersKochi@gmail.com';
  const addressDisplay = settings?.address || "Seethy's tower, vallathol jn, Kakkanad.";
  const whatsappNumber = settings?.whatsapp || '919846002241';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Hamper Inquiry*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Occasion:* ${encodeURIComponent(formData.occasion)}%0A*Budget:* ${encodeURIComponent(formData.budget)}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <Breadcrumbs items={[{ label: 'Contact & Store Location' }]} />

      {/* Header */}
      <div className="bg-[#0B1D15] text-[#FCFBF8] py-14 md:py-20 border-b border-[#C5A869]/20 relative overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-3xl mx-auto relative z-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#D8B979] font-medium mb-2">
            Hampers Kochi Store
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#FCFBF8]">
            Connect With Our Hampers Store
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#EFE9DC]/75 font-light leading-relaxed">
            Whether you need a single custom anniversary chest or 500 corporate gift hampers,
            our gifting curators are at your service for personal consultations.
          </p>
        </div>
      </div>

      {/* Main Location & Contact Content */}
      <section className="py-16 md:py-24 bg-[#FCFBF8]">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            
            {/* Left: Hampers Store Location & Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-md bg-[#FAF8F5] border border-[#EFE9DC]">
                  <div className="w-10 h-10 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15]">
                      Store Address
                    </h3>
                    <p className="text-sm text-[#4A5550] mt-1 font-light leading-snug">
                      {addressDisplay}
                    </p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(addressDisplay)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A869] hover:text-[#0B1D15] underline underline-offset-4"
                    >
                      Get Driving Directions &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-md bg-[#FAF8F5] border border-[#EFE9DC]">
                  <div className="w-10 h-10 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15]">
                      Direct Telephone Concierge
                    </h3>
                    <p className="text-sm text-[#4A5550] mt-1 font-mono">
                      {phoneDisplay}
                    </p>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="inline-block mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A869] hover:text-[#0B1D15] underline underline-offset-4"
                    >
                      Call Store Now &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-md bg-[#FAF8F5] border border-[#EFE9DC]">
                  <div className="w-10 h-10 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15]">
                      Direct Email Inquiries
                    </h3>
                    <p className="text-sm text-[#4A5550] mt-1 font-mono">
                      {emailDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-md bg-[#FAF8F5] border border-[#EFE9DC]">
                  <div className="w-10 h-10 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15]">
                      Store Working Hours
                    </h3>
                    <p className="text-sm text-[#4A5550] mt-1 font-light">
                      Mon to Sun: 9:30 AM – 7:30 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Concierge Button */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20Hampers%20Kochi%2C%20I%20would%20like%20to%20consult%20regarding%20a%20luxury%20hamper.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-md bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Instant WhatsApp Concierge</span>
              </a>

              {/* Connect Section - Pinterest & Instagram */}
              <div className="p-6 rounded-md bg-[#FAF8F5] border border-[#EFE9DC] space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-semibold">
                    Connect &amp; Social
                  </span>
                  <h3 className="text-lg font-serif-luxury text-[#0B1D15] mt-0.5">
                    Explore Aesthetic Inspirations
                  </h3>
                  <p className="text-xs text-[#68756F] mt-1 font-light leading-relaxed">
                    Follow our daily store unboxings, custom wax-sealed calligraphy reels, and bridal moodboards across social channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Instagram Link */}
                  <a
                    href="https://www.instagram.com/hampers_kochi?srtk=MTR0NmdzYjF3ZzR3ZA=="
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded bg-white border border-[#EFE9DC] hover:border-[#C5A869] hover:bg-[#FAF6F0] transition-all group shadow-sm"
                    title="Follow Hampers Kochi on Instagram"
                  >
                    <div className="w-9 h-9 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center group-hover:bg-[#C5A869] group-hover:text-[#0B1D15] transition-colors shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#0B1D15] truncate">Instagram</div>
                      <div className="text-[11px] text-[#68756F] font-mono truncate">@hampers_kochi</div>
                    </div>
                  </a>

                  {/* Pinterest Link */}
                  <a
                    href="https://in.pinterest.com/hamperskochi/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded bg-white border border-[#EFE9DC] hover:border-[#E60023] hover:bg-[#FFF5F5] transition-all group shadow-sm"
                    title="Explore Hampers Kochi on Pinterest"
                  >
                    <div className="w-9 h-9 rounded-sm bg-[#0B1D15] text-[#D8B979] flex items-center justify-center group-hover:bg-[#E60023] group-hover:text-white transition-colors shrink-0">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12C24.017 5.367 18.644 0 12.017 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#0B1D15] truncate">Pinterest</div>
                      <div className="text-[11px] text-[#68756F] font-mono truncate">@hamperskochi</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Bespoke Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#EFE9DC] p-8 sm:p-10 rounded-md shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-semibold">
                Online Consultation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury text-[#0B1D15] mt-1">
                Request a Custom Hamper Proposal
              </h2>
              <p className="mt-2 text-sm text-[#68756F] font-light leading-relaxed">
                Tell us about your celebration, recipient preferences, or corporate requirements.
                We prepare complete visual mockups and pricing within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="mt-8 p-6 bg-[#0B1D15] text-[#FCFBF8] rounded-md text-center">
                  <h3 className="text-xl font-serif-luxury text-[#D8B979]">Inquiry Transmitted</h3>
                  <p className="mt-2 text-sm text-[#EFE9DC]/80 font-light">
                    Our master curator is reviewing your details and opening WhatsApp with your brief.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Menon"
                        className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                        Milestone Occasion
                      </label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                      >
                        <option value="Birthday">Birthday Celebration</option>
                        <option value="Wedding">Wedding & Bridal Suite</option>
                        <option value="Anniversary">Anniversary & Romance</option>
                        <option value="Corporate">Corporate & Executive</option>
                        <option value="Festive">Festive / Onam / Diwali / Christmas</option>
                        <option value="Other">Custom Curation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                      Approximate Budget Per Hamper
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                    >
                      <option value="₹1,000 - ₹2,000">₹1,000 – ₹2,000</option>
                      <option value="₹2,000 - ₹3,500">₹2,000 – ₹3,500</option>
                      <option value="₹3,500 - ₹6,000">₹3,500 – ₹6,000</option>
                      <option value="₹6,000 - ₹12,000">₹6,000 – ₹12,000</option>
                      <option value="₹12,000+">₹12,000+ (Royal Heirloom Chest)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] mb-2">
                      Hamper Customization Preferences
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify dietary restrictions, recipient preferences, delivery date, or special keepsake additions..."
                      className="w-full px-4 py-3 rounded bg-[#FCFBF8] border border-[#EFE9DC] focus:border-[#C5A869] outline-none text-sm text-[#0B1D15]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded bg-[#0B1D15] hover:bg-[#183C2D] text-[#FCFBF8] font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#C5A869]/30"
                  >
                    <Send className="w-4 h-4 text-[#D8B979]" />
                    <span>Submit Hamper Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </main>
  );
}
