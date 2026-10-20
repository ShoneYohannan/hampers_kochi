'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import PressRecognition from '@/components/home/PressRecognition';
import OccasionsGrid from '@/components/home/OccasionsGrid';
import Bestsellers from '@/components/home/Bestsellers';
import BrandStory from '@/components/home/BrandStory';
import CorporateShowcase from '@/components/home/CorporateShowcase';
import PanIndiaBanner from '@/components/home/PanIndiaBanner';
import FaqSection from '@/components/home/FaqSection';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import PolicyModals, { PolicyType } from '@/components/ui/PolicyModals';
import { Product, OccasionCategory } from '@/types';

export default function HomeClientCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<OccasionCategory>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const handleSelectOccasion = (category: OccasionCategory) => {
    setSelectedCategory(category);
    const element = document.getElementById('bestsellers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Luxury Sticky Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Hero Section with keyword-rich H1 and fast-loading visual */}
      <Hero />

      {/* Press Recognition Marquee: Forbes India, Vogue, Architectural Digest, Elle Decor */}
      <PressRecognition />

      {/* Occasions Grid with Filter Hooks */}
      <OccasionsGrid onSelectOccasion={handleSelectOccasion} />

      {/* Bestsellers Product Catalog with Category Tabs */}
      <Bestsellers
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      {/* Brand Heritage & Master Curator / Author Bio Section */}
      <BrandStory />

      {/* Corporate & Executive Gifting Showcase */}
      <CorporateShowcase />

      {/* Pan-India Express Delivery & Pincode Checker */}
      <PanIndiaBanner />

      {/* Customer Testimonials & Verified Google Reviews */}
      <Testimonials />

      {/* Social Diary & Unboxing Gallery */}
      <InstagramGallery />

      {/* FAQ Section with interactive accordion matching FAQPage Schema */}
      <FaqSection />

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

      <PolicyModals
        activePolicy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}
