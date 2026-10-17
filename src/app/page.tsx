'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import OccasionsGrid from '@/components/home/OccasionsGrid';
import Bestsellers from '@/components/home/Bestsellers';
import HamperBuilderPromo from '@/components/home/HamperBuilderPromo';
import BrandStory from '@/components/home/BrandStory';
import CorporateShowcase from '@/components/home/CorporateShowcase';
import PanIndiaBanner from '@/components/home/PanIndiaBanner';
import Testimonials from '@/components/home/Testimonials';
import InstagramGallery from '@/components/home/InstagramGallery';
import QuickViewModal from '@/components/ui/QuickViewModal';
import SearchModal from '@/components/ui/SearchModal';
import WishlistModal from '@/components/ui/WishlistModal';
import CustomHamperBuilderModal from '@/components/ui/CustomHamperBuilderModal';
import { Product, OccasionCategory } from '@/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<OccasionCategory>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const handleSelectOccasion = (category: OccasionCategory) => {
    setSelectedCategory(category);
    const element = document.getElementById('bestsellers');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FCFBF8]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Luxury Sticky Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBuilder={() => setIsBuilderOpen(true)}
      />

      {/* Hero Section */}
      <Hero onOpenBuilder={() => setIsBuilderOpen(true)} />

      {/* Curated Occasions Grid */}
      <OccasionsGrid onSelectOccasion={handleSelectOccasion} />

      {/* Product Catalog & Bestsellers with Category Filters */}
      <Bestsellers
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onQuickView={(product) => setQuickViewProduct(product)}
      />

      {/* Create Your Own Hamper Interactive Promo */}
      <HamperBuilderPromo onOpenBuilder={() => setIsBuilderOpen(true)} />

      {/* The Kochi Atelier Brand Heritage & Craftsmanship */}
      <BrandStory />

      {/* Corporate & Executive Gifting Showcase */}
      <CorporateShowcase />

      {/* Pan-India Express Delivery & Pincode Checker */}
      <PanIndiaBanner />

      {/* Customer Testimonials & Verified Reviews */}
      <Testimonials />

      {/* Social Diary & Unboxing Gallery */}
      <InstagramGallery />

      {/* Complete Footer */}
      <Footer />

      {/* Modals & Overlays */}
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
    </main>
  );
}
