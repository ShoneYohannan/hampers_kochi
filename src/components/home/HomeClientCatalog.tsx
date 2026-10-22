'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import PressRecognition from '@/components/home/PressRecognition';
import OccasionsGrid from '@/components/home/OccasionsGrid';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import CustomHamperBuilderModal from '@/components/ui/CustomHamperBuilderModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product, OccasionCategory } from '@/types';

export default function HomeClientCatalog() {
  const router = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSelectOccasion = (category: OccasionCategory) => {
    router.push(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {/* Luxury Sticky Navbar with Clickable Page Navigation (Image 5) */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      {/* ── SECTION 1 (Image 2 & Image 1): Hero Banner & Press Accolades ── */}
      <Hero onOpenBuilder={() => setIsBuilderOpen(true)} />
      <PressRecognition />

      {/* ── SECTION 2 (Image 3 & Image 4): Curations for Every Cherished Occasion ── */}
      <OccasionsGrid onSelectOccasion={handleSelectOccasion} />

      {/* Complete Footer with zero orphan pages and working policy modals */}
      <Footer onOpenPolicy={(policy) => setActivePolicy(policy)} />

      {/* Interactive Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <CustomHamperBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
      />

      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}
