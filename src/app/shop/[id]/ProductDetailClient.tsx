'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product } from '@/types';
import { ALL_PRODUCTS } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCms } from '@/context/CmsContext';
import {
  Heart,
  MessageSquare,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  ChevronRight,
  Package,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { settings, products } = useCms();

  const [activeImage, setActiveImage] = useState(product.image);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [calligraphyNote, setCalligraphyNote] = useState('');

  const isFavorite = isInWishlist(product.id);
  const gallery = [product.image];

  const whatsappNumber = settings?.whatsapp || '919846002241';
  const pool = products && products.length > 0 ? products : ALL_PRODUCTS;
  const relatedProducts = pool.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const orderMessage = `*Price & Order Inquiry for ${product.name}*%0A*Product ID:* ${product.id}${calligraphyNote ? `%0A*Calligraphy Note:* ${encodeURIComponent(calligraphyNote)}` : ''}%0A%0APlease share the price and delivery timeline to my location.`;

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <Breadcrumbs
        items={[
          { label: 'Shop Hampers', href: '/shop' },
          { label: product.name },
        ]}
      />

      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-16 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Gallery Column */}
            <div className={`lg:col-span-7 flex flex-col-reverse ${gallery.length > 1 ? 'sm:flex-row' : ''} gap-4`}>
              {/* Thumbnail Strip (only if multiple genuine photos exist) */}
              {gallery.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImage === img
                          ? 'border-[#C5A869] shadow-md scale-105'
                          : 'border-[#EFE9DC] hover:border-[#C5A869]/50'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} gallery image ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Preview */}
              <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#0B1D15] border border-[#C5A869]/20 shadow-xl">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-center"
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all cursor-pointer shadow-lg ${
                    isFavorite
                      ? 'bg-[#C5A869] text-[#0B1D15]'
                      : 'bg-[#0B1D15]/80 text-[#FCFBF8] hover:text-[#D8B979]'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Product Meta Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-semibold bg-[#0B1D15] px-2.5 py-1 rounded-sm">
                    {product.category}
                  </span>
                  {product.isBestseller && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8B979] font-medium border border-[#C5A869]/30 px-2 py-0.5 rounded-sm">
                      Signature Curation
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif-luxury font-normal text-[#0B1D15] leading-tight">
                  {product.name}
                </h1>

                <p className="mt-2 text-sm text-[#68756F] font-light leading-relaxed">
                  {product.subtitle || product.description}
                </p>

                {/* Price Display: Contact on WhatsApp for Prices */}
                <div className="mt-5 pb-5 border-b border-[#EFE9DC]">
                  <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#0B1D15]">
                    Contact on WhatsApp for Prices
                  </span>
                </div>

                {/* Calligraphy personalization input (50 character limit) */}
                <div className="mt-6 p-4 rounded-md bg-[#FAF8F5] border border-[#EFE9DC]">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs uppercase tracking-[0.15em] font-semibold text-[#0B1D15] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Complimentary Calligraphy Keepsake Note</span>
                    </label>
                    <span className="text-[11px] text-[#A88B4D] font-mono">
                      {calligraphyNote.length}/50 letters
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={50}
                    value={calligraphyNote}
                    onChange={(e) => setCalligraphyNote(e.target.value.slice(0, 50))}
                    placeholder="Enter your bespoke message (max 50 letters)..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#FCFBF8] border border-[#EFE9DC] text-xs text-[#0B1D15] focus:border-[#C5A869] outline-none"
                  />
                  <p className="mt-1 text-[11px] text-[#68756F]">
                    Handwritten with gold ink on handmade Kerala cotton rag paper with royal wax seal (max 50 letters).
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${orderMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-6 rounded bg-[#25D366] hover:bg-[#128C7E] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Contact WhatsApp for Price & Pre-Order</span>
                  </a>

                  <Link
                    href="/shop"
                    className="w-full py-3 px-6 rounded bg-[#FAF8F5] hover:bg-[#EFE9DC] text-[#0B1D15] text-xs font-semibold uppercase tracking-wider text-center transition-colors border border-[#EFE9DC]"
                  >
                    Continue Browsing Catalog
                  </Link>
                </div>

                {/* Assurance Badges */}
                <div className="mt-8 grid grid-cols-2 gap-3 pt-6 border-t border-[#EFE9DC] text-xs text-[#4A5550]">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C5A869] shrink-0" />
                    <span>All-India Express Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A869] shrink-0" />
                    <span>Pre-Order Artisanal Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C5A869] shrink-0" />
                    <span>Climate-Controlled Packing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A869] shrink-0" />
                    <span>HamPers Kochi Craft</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Hamper Composition & Craft */}
          <div className="mt-16 pt-12 border-t border-[#EFE9DC] grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl font-serif-luxury text-[#0B1D15]">
                Curator’s Bespoke Composition
              </h2>
              <p className="text-sm text-[#4A5550] font-light leading-relaxed">
                {product.detailedDescription || product.description}
              </p>

              <div className="p-5 rounded-md bg-[#FAF8F5] border border-[#EFE9DC] space-y-2">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A88B4D]">
                  Tailored Inclusions & Customization
                </h3>
                <p className="text-xs text-[#505D56] font-light leading-relaxed">
                  Every curation from our Hampers Kochi store is customized to your celebration. Inclusions, keepsakes, and confections can be tailored or upgraded upon direct WhatsApp consultation.
                </p>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-md border border-[#EFE9DC] space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0B1D15]">
                Hampers Kochi Specifications
              </h3>
              <div className="divide-y divide-[#EFE9DC] text-xs">
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#68756F]">Origin</span>
                  <span className="font-medium text-[#0B1D15] text-right">Hand-Crafted in Fort Kochi</span>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#68756F]">Fulfillment</span>
                  <span className="font-medium text-[#0B1D15] text-right">Pre-Order Only &bull; All-India Express</span>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#68756F]">Personalization</span>
                  <span className="font-medium text-[#0B1D15] text-right">Handwritten Calligraphy Card (50 Letters)</span>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <span className="text-[#68756F]">Pricing & Quotes</span>
                  <span className="font-medium text-[#183C2D] text-right">Direct via WhatsApp Concierge</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Hampers */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#EFE9DC]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                    Complementary Curations
                  </span>
                  <h2 className="text-2xl font-serif-luxury text-[#0B1D15]">
                    Patrons Also Admired
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#C5A869] hover:text-[#0B1D15] transition-colors"
                >
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/shop/${rel.id}`}
                    className="group bg-[#FCFBF8] border border-[#EFE9DC] rounded-md overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0B1D15]">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-serif-luxury text-[#0B1D15] group-hover:text-[#C5A869] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-[#A88B4D]">
                        Contact on WhatsApp for Price
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

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
