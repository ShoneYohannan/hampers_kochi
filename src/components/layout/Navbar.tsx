'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  Sparkles,
  Heart,
  SlidersHorizontal,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCms } from '@/context/CmsContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenBuilder: () => void;
  onSelectOccasion?: (occasion: string) => void;
}

export default function Navbar({ onOpenSearch, onOpenWishlist, onOpenBuilder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [occasionsDropdown, setOccasionsDropdown] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();
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

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D15]/98 backdrop-blur-md shadow-lg border-b border-[#C5A869]/20 py-2.5 sm:py-3'
          : 'bg-[#0B1D15] border-b border-[#C5A869]/15 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3">

          {/* Logo / Wordmark - Clickable to top */}
          <Link
            href="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-shrink-0 group flex items-center gap-2"
          >
            <span className="font-serif-luxury text-[#EFE9DC] text-xl sm:text-2xl tracking-wide italic group-hover:text-[#C5A869] transition-colors whitespace-nowrap">
              hampers<span className="text-[#C5A869] not-italic">_</span>kochi
            </span>
          </Link>

          {/* Desktop Navigation — Centered */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[11px] uppercase tracking-[0.2em] font-medium text-[#EFE9DC]/85">

            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-[#C5A869] transition-colors py-1 whitespace-nowrap"
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
                className="flex items-center gap-1 hover:text-[#C5A869] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                <span>Shop Hampers</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${shopDropdown ? 'rotate-180 text-[#C5A869]' : ''}`} />
              </button>
              {shopDropdown && (
                <div className="absolute top-full -left-4 w-56 bg-[#0B1D15] border border-[#C5A869]/25 shadow-2xl py-2 rounded-sm animate-in fade-in slide-in-from-top-1 duration-150">
                  {shopLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setShopDropdown(false)}
                      className="block px-5 py-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] hover:bg-[#183C2D]/50 transition-colors text-[11px] tracking-[0.15em] whitespace-nowrap"
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
                className="flex items-center gap-1 hover:text-[#C5A869] transition-colors py-1 cursor-pointer whitespace-nowrap"
              >
                <span>Occasions</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${occasionsDropdown ? 'rotate-180 text-[#C5A869]' : ''}`} />
              </button>
              {occasionsDropdown && (
                <div className="absolute top-full -left-4 w-64 bg-[#0B1D15] border border-[#C5A869]/25 shadow-2xl py-2 rounded-sm animate-in fade-in slide-in-from-top-1 duration-150">
                  {occasionLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOccasionsDropdown(false)}
                      className="block px-5 py-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] hover:bg-[#183C2D]/50 transition-colors text-[11px] tracking-[0.15em] whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Builder Promo trigger */}
            <button
              onClick={onOpenBuilder}
              className="hover:text-[#C5A869] text-[#D8B979] transition-colors py-1 flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              <span>Create Hamper</span>
            </button>

            <a href="#corporate" className="hover:text-[#C5A869] transition-colors py-1 whitespace-nowrap">
              Corporate Gifts
            </a>

            <a href="#story" className="hover:text-[#C5A869] transition-colors py-1 whitespace-nowrap">
              Our Story
            </a>

            <a href="#contact" className="hover:text-[#C5A869] transition-colors py-1 whitespace-nowrap">
              Contact
            </a>

            {/* Client CMS Link Button in Navbar */}
            <Link
              href="/cms"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#0B1D15] bg-[#D8B979] hover:bg-[#C5A869] font-semibold transition-all shadow-sm whitespace-nowrap"
              title="Open Client Content Management System"
            >
              <SlidersHorizontal className="w-3 h-3 text-[#0B1D15]" />
              <span>CMS</span>
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors cursor-pointer"
              aria-label="Search Catalog"
              title="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 sm:p-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors cursor-pointer"
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-[#C5A869] text-[#0B1D15] rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Clickable Phone Number — ONE LINE & Mobile Touch-Friendly */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 text-[#EFE9DC]/90 hover:text-[#C5A869] text-xs transition-colors border border-transparent hover:border-[#C5A869]/30 rounded whitespace-nowrap shrink-0 group"
              title={`Call Concierge: ${displayPhone}`}
              aria-label={`Call Concierge: ${displayPhone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A869] shrink-0 group-hover:scale-110 transition-transform" />
              {/* Strictly single-line display */}
              <span className="hidden xl:inline font-mono text-[11px] font-medium whitespace-nowrap tracking-tight">
                {displayPhone}
              </span>
            </a>

            {/* WhatsApp direct chat link */}
            <a
              href={`https://wa.me/${settings?.whatsapp || '919645556010'}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-2.5 text-[#EFE9DC]/80 hover:text-[#25D366] transition-colors"
              aria-label="Chat on WhatsApp"
              title="WhatsApp Concierge"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 sm:py-2 border border-[#C5A869]/40 text-[#EFE9DC]/90 hover:border-[#C5A869] hover:text-[#C5A869] transition-all duration-200 text-[11px] tracking-[0.15em] uppercase cursor-pointer whitespace-nowrap"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A869]" />
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C5A869] text-[#0B1D15] rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors ml-0.5 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Mobile Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A869]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Luxury Mobile Drawer / Slide-Out Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1D15] border-t border-[#C5A869]/20 px-6 py-6 space-y-6 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          
          {/* Main Navigation links */}
          <div className="flex flex-col space-y-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#EFE9DC]/90">
            
            <a
              href="#bestsellers"
              onClick={() => scrollToSection('bestsellers')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Shop All Hampers</span>
              <span className="text-[10px] text-[#C5A869]">Explore &rarr;</span>
            </a>

            <a
              href="#occasions"
              onClick={() => scrollToSection('occasions')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Curated Occasions</span>
              <span className="text-[10px] text-[#C5A869]">Weddings, Birthdays &bull;</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuilder();
              }}
              className="text-left text-[#D8B979] hover:text-white py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                Create Your Own Hamper
              </span>
              <span className="text-[9px] bg-[#C5A869]/20 text-[#D8B979] px-2 py-0.5 rounded uppercase">Custom</span>
            </button>

            <a
              href="#corporate"
              onClick={() => scrollToSection('corporate')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3 flex items-center justify-between"
            >
              <span>Corporate Gifting</span>
              <span className="text-[10px] text-[#EFE9DC]/50">Bulk Suites</span>
            </a>

            <a
              href="#story"
              onClick={() => scrollToSection('story')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Our Story & Heritage
            </a>

            <a
              href="#delivery"
              onClick={() => scrollToSection('delivery')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Pan-India Express Delivery
            </a>

            <a
              href="#testimonials"
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Client Reviews
            </a>

            <a
              href="#contact"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3"
            >
              Contact & Studio
            </a>
          </div>

          {/* Direct Mobile Contact CTA Box */}
          <div className="pt-2 border-t border-[#C5A869]/15 flex flex-col gap-2.5">
            {/* Phone call button - one line guaranteed */}
            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-3.5 px-4 rounded bg-[#183C2D] border border-[#C5A869]/40 text-[#EFE9DC] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#23523E] transition-colors whitespace-nowrap shadow-md"
            >
              <Phone className="w-4 h-4 text-[#D8B979] shrink-0" />
              <span className="whitespace-nowrap font-mono">Call: {displayPhone}</span>
            </a>

            <a
              href={`https://wa.me/${settings?.whatsapp || '919645556010'}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-md whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-white shrink-0" />
              <span className="whitespace-nowrap">WhatsApp Direct Chat</span>
            </a>

            {/* Mobile CMS link button */}
            <Link
              href="/cms"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-md whitespace-nowrap mt-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0B1D15]" />
              <span>Atelier CMS &bull; Edit Store</span>
            </Link>
          </div>

          {/* Shipping badge */}
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#C5A869]/70 text-center">
            Express Climate-Controlled Shipping Across 28,000+ Pincodes
          </div>
        </div>
      )}
    </header>
  );
}
