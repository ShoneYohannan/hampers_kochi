'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import BrandStory from '@/components/home/BrandStory';
import InstagramGallery from '@/components/home/InstagramGallery';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product } from '@/types';

export default function StoryPage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full min-h-screen">
      <AnnouncementBar />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <Breadcrumbs items={[{ label: 'Our Story' }]} />

      {/* Brand Heritage Section */}
      <BrandStory />

      {/* Social Diary & Unboxing Gallery */}
      <InstagramGallery />

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
