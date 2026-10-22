'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Bestsellers from '@/components/home/Bestsellers';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import CustomHamperBuilderModal from '@/components/ui/CustomHamperBuilderModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product, OccasionCategory } from '@/types';

function normalizeCategory(param: string | null): OccasionCategory {
  if (!param) return 'All';
  const decoded = decodeURIComponent(param).trim().toLowerCase();
  if (decoded === 'all' || decoded === 'all curated hampers') return 'All';
  if (decoded.includes('bestseller')) return 'Bestsellers';
  if (decoded.includes('limited') || decoded.includes('keepsake') || decoded.includes('rare') || decoded.includes('personalized')) return 'Personalized & Keepsakes';
  if (decoded.includes('gourmet') || decoded.includes('treat') || decoded.includes('sweet') || decoded.includes('tea')) return 'Gourmet & Sweets';
  if (decoded.includes('birthday')) return 'Birthday';
  if (decoded.includes('wedding') || decoded.includes('bridal')) return 'Wedding & Bridal';
  if (decoded.includes('anniversary') || decoded.includes('romance')) return 'Anniversary & Romance';
  if (decoded.includes('festive') || decoded.includes('traditional') || decoded.includes('celebration')) return 'Festive & Celebration';
  if (decoded.includes('corporate') || decoded.includes('executive')) return 'Corporate & Executive';
  return (param as OccasionCategory) || 'All';
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<OccasionCategory>(() =>
    normalizeCategory(searchParams.get('category'))
  );
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  useEffect(() => {
    const rawCat = searchParams.get('category');
    setSelectedCategory(normalizeCategory(rawCat));
  }, [searchParams]);

  useEffect(() => {
    const handleCategoryEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail !== undefined) {
        const cat = normalizeCategory(customEvent.detail);
        setSelectedCategory(cat);
        const catalogEl = document.getElementById('bestsellers');
        if (catalogEl) {
          catalogEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hamper-category-change', handleCategoryEvent);
    return () => window.removeEventListener('hamper-category-change', handleCategoryEvent);
  }, []);

  const handleCategorySelect = (category: OccasionCategory) => {
    setSelectedCategory(category);
    if (typeof window !== 'undefined') {
      const url = category === 'All' ? '/shop' : `/shop?category=${encodeURIComponent(category)}`;
      window.history.replaceState(null, '', url);
    }
  };

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      <Breadcrumbs items={[{ label: 'Shop Hampers' }]} />

      {/* Page Header with Subtle Floral Accents & Balanced Padding */}
      <div className="bg-[#0B1D15] text-[#FCFBF8] py-8 sm:py-10 md:py-12 border-b border-[#C5A869]/20 relative overflow-hidden">
        {/* Subtle, Tasteful Floral Vignettes in Background (Not Overdone) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Left Floral Bloom (Hydrangeas & Baby's Breath) */}
          <div className="absolute -left-12 -top-10 w-72 md:w-96 h-full opacity-20 mix-blend-screen filter saturate-150">
            <Image
              src="/images/1001373001.jpg.jpeg"
              alt="Fresh Botanical Floral Accents"
              fill
              className="object-cover object-left"
              priority
            />
          </div>

          {/* Right Floral Bloom (Silk Ribbon & Eucalyptus) */}
          <div className="absolute -right-12 -bottom-10 w-72 md:w-96 h-full opacity-20 mix-blend-screen filter saturate-150">
            <Image
              src="/images/1001373001.jpg.jpeg"
              alt="Botanical Hamper Elements"
              fill
              className="object-cover object-right rotate-180"
              priority
            />
          </div>

          {/* Multi-layered dark vignette ensuring text stays crisp and prominent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D15]/90 via-[#0B1D15]/85 to-[#0B1D15]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D15]/70 via-transparent to-[#0B1D15]" />
        </div>

        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/25 text-[10.5px] uppercase tracking-[0.22em] text-[#D8B979] font-medium mb-3">
            <span>❀</span>
            <span>Fresh Florals &amp; Curated Keepsakes</span>
            <span>❀</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#FCFBF8]">
            Curated Artisanal Hampers
          </h1>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#EFE9DC]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Handcrafted on pre-order in Fort Kochi with fresh botanical blooms, Kerala Kasavu textiles, single-estate tea,
            and hand-cast brass keepsakes. Delivered in luxury climate-controlled packaging across India.
          </p>
        </div>
      </div>

      {/* Full Product Catalog with Filter Tabs */}
      <Bestsellers
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

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

      <CustomHamperBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
      />

      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1D15] flex items-center justify-center text-[#D8B979]">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
