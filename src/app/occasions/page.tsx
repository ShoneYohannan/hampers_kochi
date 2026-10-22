'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import OccasionsGrid from '@/components/home/OccasionsGrid';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product, OccasionCategory } from '@/types';

export default function OccasionsPage() {
  const router = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSelectOccasion = (category: OccasionCategory) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <Breadcrumbs items={[{ label: 'Milestone Occasions' }]} />

      {/* Header */}
      <div className="bg-[#0B1D15] text-[#FCFBF8] py-14 md:py-20 border-b border-[#C5A869]/20 relative overflow-hidden">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 text-center max-w-3xl mx-auto relative z-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#D8B979] font-medium mb-2">
            Curated Gifting Traditions
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#FCFBF8]">
            Hampers for Every Milestone Occasion
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#EFE9DC]/75 font-light leading-relaxed">
            Every celebration deserves a meaningful tribute. Explore our hand-assembled caskets
            curated for birthdays, grand wedding suites, anniversaries, and festive celebrations.
          </p>
        </div>
      </div>

      {/* Occasions 6-grid */}
      <OccasionsGrid onSelectOccasion={handleSelectOccasion} />

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
