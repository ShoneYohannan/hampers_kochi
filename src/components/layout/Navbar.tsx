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
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenBuilder: () => void;
}

export default function Navbar({ onOpenSearch, onOpenWishlist, onOpenBuilder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [occasionsDropdown, setOccasionsDropdown] = useState(false);

  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shopLinks = [
    { label: 'All Hampers', href: '#bestsellers' },
    { label: 'Bestsellers', href: '#bestsellers' },
    { label: 'New Arrivals', href: '#bestsellers' },
    { label: 'Limited Editions', href: '#bestsellers' },
  ];

  const occasionLinks = [
    { label: 'Birthday', href: '#bestsellers' },
    { label: 'Wedding & Bridal', href: '#bestsellers' },
    { label: 'Anniversary & Romance', href: '#bestsellers' },
    { label: 'Festive & Celebration', href: '#bestsellers' },
    { label: 'Corporate & Executive', href: '#bestsellers' },
    { label: 'Gourmet & Sweets', href: '#bestsellers' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D15]/98 backdrop-blur-md shadow-lg border-b border-[#C5A869]/20 py-3'
          : 'bg-[#0B1D15] border-b border-[#C5A869]/15 py-4'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6">

          {/* Logo / Wordmark */}
          <Link href="/" className="flex-shrink-0 group">
            <span className="font-serif-luxury text-[#EFE9DC] text-xl sm:text-2xl tracking-wide italic group-hover:text-[#C5A869] transition-colors">
              hampers<span className="text-[#C5A869] not-italic">_</span>kochi
            </span>
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-medium text-[#EFE9DC]/85">

            <a href="/" className="hover:text-[#C5A869] transition-colors py-1">
              Home
            </a>

            {/* Shop Hampers Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#C5A869] transition-colors py-1 cursor-pointer">
                <span>Shop Hampers</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${shopDropdown ? 'rotate-180 text-[#C5A869]' : ''}`} />
              </button>
              {shopDropdown && (
                <div className="absolute top-full -left-4 w-52 bg-[#0B1D15] border border-[#C5A869]/25 shadow-2xl py-2 rounded-sm animate-in fade-in slide-in-from-top-1 duration-150">
                  {shopLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setShopDropdown(false)}
                      className="block px-5 py-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] hover:bg-[#183C2D]/50 transition-colors text-[11px] tracking-[0.15em]"
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
              <button className="flex items-center gap-1 hover:text-[#C5A869] transition-colors py-1 cursor-pointer">
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
                      className="block px-5 py-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] hover:bg-[#183C2D]/50 transition-colors text-[11px] tracking-[0.15em]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#corporate" className="hover:text-[#C5A869] transition-colors py-1">
              Corporate Gifts
            </a>

            <a href="#story" className="hover:text-[#C5A869] transition-colors py-1">
              Our Story
            </a>

            <a href="#contact" className="hover:text-[#C5A869] transition-colors py-1">
              Contact
            </a>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Phone / WhatsApp */}
            <a
              href="https://wa.me/919645556010"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex p-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 px-3.5 py-2 border border-[#C5A869]/40 text-[#EFE9DC]/90 hover:border-[#C5A869] hover:text-[#C5A869] transition-all duration-200 text-[11px] tracking-[0.15em] uppercase"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C5A869] text-[#0B1D15] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#EFE9DC]/80 hover:text-[#C5A869] transition-colors ml-1"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1D15] border-t border-[#C5A869]/15 px-6 py-6 space-y-5 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-4 text-[12px] uppercase tracking-[0.2em] font-medium">
            <a href="#bestsellers" onClick={() => setMobileMenuOpen(false)} className="text-[#EFE9DC]/85 hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3">Shop Hampers</a>
            <a href="#occasions" onClick={() => setMobileMenuOpen(false)} className="text-[#EFE9DC]/85 hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3">Occasions</a>
            <button onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }} className="text-left text-[#C5A869] hover:text-[#D8B979] py-1 border-b border-[#C5A869]/10 pb-3">Create Your Own</button>
            <a href="#corporate" onClick={() => setMobileMenuOpen(false)} className="text-[#EFE9DC]/85 hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3">Corporate Gifts</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="text-[#EFE9DC]/85 hover:text-[#C5A869] py-1 border-b border-[#C5A869]/10 pb-3">Our Story</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#EFE9DC]/85 hover:text-[#C5A869] py-1">Contact</a>
          </div>

          <div className="pt-2 text-[10px] tracking-[0.2em] uppercase text-[#C5A869]/60">
            Pan-India Express · 28,000+ Pincodes
          </div>
        </div>
      )}
    </header>
  );
}
