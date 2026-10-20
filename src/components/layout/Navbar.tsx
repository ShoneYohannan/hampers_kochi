'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  Heart,
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCms } from '@/context/CmsContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onSelectOccasion?: (occasion: string) => void;
}

export default function Navbar({ onOpenSearch, onOpenWishlist }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [occasionsDropdown, setOccasionsDropdown] = useState(false);

  const { wishlistCount } = useWishlist();
  const { settings } = useCms();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shopLinks = [
    { label: 'All Curated Hampers', href: '#bestsellers' },
    { label: 'Bestseller Curations', href: '#bestsellers' },
    { label: 'Rare Limited Editions', href: '#bestsellers' },
    { label: 'Gourmet Treats & Teas', href: '#bestsellers' },
  ];

  const occasionLinks = [
    { label: 'Birthday Celebrations', href: '#occasions' },
    { label: 'Wedding & Bridal Suite', href: '#occasions' },
    { label: 'Anniversary & Romance', href: '#occasions' },
    { label: 'Festive & Traditional Brass', href: '#occasions' },
    { label: 'Corporate & Executive Gifting', href: '#corporate' },
  ];

  const cleanPhone = (settings?.phone || '+91 96455 56010').replace(/\s+/g, '');
  const displayPhone = settings?.phone || '+91 96455 56010';
  const whatsappNumber = settings?.whatsapp || '919645556010';

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D15]/98 backdrop-blur-md shadow-lg border-b border-[#C5A869]/20 py-3'
          : 'bg-[#0B1D15] border-b border-[#C5A869]/15 py-3.5 sm:py-4'
      }`}
    >
      {/* Full-width container with responsive padding to prevent overflow on laptops */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between gap-3 lg:gap-4 xl:gap-6">

          {/* Logo / Wordmark - Aligned to left edge */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 group flex items-center gap-2"
          >
            <span className="font-serif-luxury text-[#FCFBF8] text-2xl sm:text-3xl lg:text-[28px] xl:text-[30px] tracking-wide italic group-hover:text-[#D8B979] transition-colors whitespace-nowrap">
              hampers<span className="text-[#D8B979] not-italic">_</span>kochi
            </span>
          </Link>

          {/* Desktop Navigation — Perfectly Scaled Responsive Typography */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-7 text-xs xl:text-[13px] 2xl:text-[14px] uppercase tracking-[0.09em] xl:tracking-[0.12em] font-semibold text-[#FCFBF8]">

            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#D8B979] transition-colors py-1 whitespace-nowrap"
            >
              Home
            </Link>

            {/* Shop Hampers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <button
                onClick={() => scrollToSection('bestsellers')}
                className="flex items-center gap-1.5 hover:text-[#D8B979] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                <span>Shop Hampers</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdown ? 'rotate-180 text-[#D8B979]' : ''}`} />
              </button>
              {shopDropdown && (
                <div className="absolute top-full -left-4 w-60 bg-[#0B1D15] border border-[#C5A869]/25 shadow-2xl py-2 rounded-sm animate-in fade-in slide-in-from-top-1 duration-150">
                  {shopLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setShopDropdown(false)}
                      className="block px-5 py-2.5 text-[#EFE9DC]/90 hover:text-[#D8B979] hover:bg-[#183C2D]/50 transition-colors text-xs tracking-[0.15em] whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Occasions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOccasionsDropdown(true)}
              onMouseLeave={() => setOccasionsDropdown(false)}
            >
              <button
                onClick={() => scrollToSection('occasions')}
                className="flex items-center gap-1.5 hover:text-[#D8B979] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                <span>Occasions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${occasionsDropdown ? 'rotate-180 text-[#D8B979]' : ''}`} />
              </button>
              {occasionsDropdown && (
                <div className="absolute top-full -left-4 w-64 bg-[#0B1D15] border border-[#C5A869]/25 shadow-2xl py-2 rounded-sm animate-in fade-in slide-in-from-top-1 duration-150">
                  {occasionLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOccasionsDropdown(false)}
                      className="block px-5 py-2.5 text-[#EFE9DC]/90 hover:text-[#D8B979] hover:bg-[#183C2D]/50 transition-colors text-xs tracking-[0.15em] whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#corporate" className="hover:text-[#D8B979] transition-colors py-1 whitespace-nowrap">
              Corporate Gifts
            </a>

            <a href="#story" className="hover:text-[#D8B979] transition-colors py-1 whitespace-nowrap">
              Our Story
            </a>

            <a href="#testimonials" className="hover:text-[#D8B979] transition-colors py-1 whitespace-nowrap">
              Reviews
            </a>

            <a href="#contact" className="hover:text-[#D8B979] transition-colors py-1 whitespace-nowrap">
              Contact
            </a>
          </nav>

          {/* Right Action Icons & Direct WhatsApp */}
          <div className="flex items-center gap-2.5 xl:gap-4 shrink-0">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#EFE9DC]/90 hover:text-[#D8B979] transition-colors cursor-pointer"
              aria-label="Search Catalog"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#EFE9DC]/90 hover:text-[#D8B979] transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 xl:w-5 xl:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#D8B979] text-[#0B1D15] rounded-sm text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Clickable Phone Number: full number on 2xl+, compact icon on md-xl to give WhatsApp Order full breathing room */}
            <a
              href={`tel:${cleanPhone}`}
              className="hidden 2xl:flex items-center gap-2 px-3 py-1.5 text-[#FCFBF8] hover:text-[#D8B979] text-xs transition-colors border border-[#C5A869]/40 hover:border-[#D8B979] rounded whitespace-nowrap group shrink-0"
              title={`Call Concierge: ${displayPhone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D8B979] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs font-semibold whitespace-nowrap">
                {displayPhone}
              </span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="hidden md:flex 2xl:hidden p-2 text-[#EFE9DC]/90 hover:text-[#D8B979] transition-colors border border-[#C5A869]/40 hover:border-[#D8B979] rounded shrink-0"
              title={`Call Concierge: ${displayPhone}`}
              aria-label="Call Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[#D8B979]" />
            </a>

            {/* Direct WhatsApp Ordering Button — fully visible on all viewports */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20The%20Kochi%20Atelier%2C%20I%20would%20like%20to%20order%20a%20luxury%20hamper.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 xl:gap-2 px-3.5 xl:px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs xl:text-sm font-bold uppercase tracking-wider rounded transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer shrink-0"
              title="Direct WhatsApp Order"
              aria-label="Order on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 xl:w-4.5 xl:h-4.5" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#EFE9DC] hover:text-[#D8B979] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Mobile Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D8B979]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Luxury Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1D15] border-t border-[#C5A869]/20 px-6 py-6 space-y-5 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          
          {/* Main Navigation links */}
          <div className="flex flex-col space-y-3.5 text-sm uppercase tracking-[0.16em] font-semibold text-[#FCFBF8]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Home
            </Link>

            <a
              href="#bestsellers"
              onClick={() => scrollToSection('bestsellers')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Shop All Hampers</span>
              <span className="text-xs text-[#D8B979]">View All &rarr;</span>
            </a>

            <a
              href="#occasions"
              onClick={() => scrollToSection('occasions')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Milestone Occasions</span>
              <span className="text-xs text-[#EFE9DC]/60">Curations</span>
            </a>

            <a
              href="#corporate"
              onClick={() => scrollToSection('corporate')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Corporate Gifting</span>
              <span className="text-xs text-[#EFE9DC]/60">Bulk Suites</span>
            </a>

            <a
              href="#story"
              onClick={() => scrollToSection('story')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Our Story & Heritage
            </a>

            <a
              href="#testimonials"
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Client Reviews (4.9 Rating)
            </a>

            <a
              href="#contact"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Contact & Studio
            </a>
          </div>

          {/* Direct Mobile Contact CTA Box */}
          <div className="pt-2 border-t border-[#C5A869]/15 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20The%20Kochi%20Atelier%2C%20I%20would%20like%20to%20order%20a%20luxury%20hamper.`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-md whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-white shrink-0" />
              <span className="whitespace-nowrap font-bold">Order on WhatsApp</span>
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-3 px-4 rounded bg-[#183C2D] border border-[#C5A869]/40 text-[#EFE9DC] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#23523E] transition-colors whitespace-nowrap shadow-md"
            >
              <Phone className="w-4 h-4 text-[#D8B979] shrink-0" />
              <span className="whitespace-nowrap font-mono font-semibold">Call: {displayPhone}</span>
            </a>
          </div>

          {/* Shipping badge */}
          <div className="text-xs tracking-[0.18em] uppercase text-[#D8B979] text-center pt-2 font-medium">
            Express Climate-Controlled Shipping Across India
          </div>
        </div>
      )}
    </header>
  );
}
