'use client';

import React, { useState, Suspense } from 'react';
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

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as OccasionCategory) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<OccasionCategory>(initialCategory);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      <Breadcrumbs items={[{ label: 'Shop Hampers' }]} />

      {/* Page Header */}
      <div className="bg-[#0B1D15] text-[#FCFBF8] py-12 md:py-16 border-b border-[#C5A869]/20 relative overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-3xl mx-auto relative z-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#D8B979] font-medium mb-2">
            The Complete Atelier Collection
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#FCFBF8]">
            Curated Artisanal Hampers
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#EFE9DC]/75 font-light leading-relaxed">
            Handcrafted on pre-order in Fort Kochi with Kerala Kasavu textiles, single-estate tea,
            and hand-cast brass keepsakes. Delivered in luxury climate-controlled packaging across India.
          </p>
        </div>
      </div>

      {/* Full Product Catalog with Filter Tabs */}
      <Bestsellers
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
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
