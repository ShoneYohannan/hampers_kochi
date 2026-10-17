'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Gift, 
  Briefcase, 
  Clock, 
  Compass,
  Phone
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
  const [occasionsDropdown, setOccasionsDropdown] = useState(false);

  const { totalItems, setIsCartOpen, subtotal } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const occasions = [
    { title: 'Birthday Hampers', href: '#bestsellers?cat=Birthday', desc: 'Joyous confections & celebrations' },
    { title: 'Wedding & Bridal', href: '#bestsellers?cat=Wedding+%26+Bridal', desc: 'Heirloom brass & silk luxury' },
    { title: 'Anniversary & Romance', href: '#bestsellers?cat=Anniversary+%26+Romance', desc: 'Midnight flutes & dark cocoa' },
    { title: 'Festive & Diwali', href: '#bestsellers?cat=Festive+%26+Celebration', desc: 'Sacred diyas & gourmet sweets' },
    { title: 'Corporate & Executive', href: '#bestsellers?cat=Corporate+%26+Executive', desc: 'Branded leather & single-origin roast' },
    { title: 'Gourmet & Delicacies', href: '#bestsellers?cat=Gourmet+%26+Sweets', desc: 'Malabar spices & French pralines' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D15]/95 backdrop-blur-md shadow-lg border-b border-[#C5A869]/25 py-3'
          : 'bg-[#0B1D15] border-b border-[#C5A869]/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#EFE9DC] hover:text-[#D8B979] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-[#EFE9DC]/90">
            <a href="#bestsellers" className="hover:text-[#D8B979] transition-colors py-1">
              Shop Hampers
            </a>

            {/* Occasions with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setOccasionsDropdown(true)}
              onMouseLeave={() => setOccasionsDropdown(false)}
            >
              <button 
                className="flex items-center gap-1.5 hover:text-[#D8B979] transition-colors py-1"
                onClick={() => setOccasionsDropdown(!occasionsDropdown)}
              >
                <span>Occasions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${occasionsDropdown ? 'rotate-180 text-[#D8B979]' : ''}`} />
              </button>

              {occasionsDropdown && (
                <div className="absolute top-full -left-6 w-80 bg-[#0B1D15] border border-[#C5A869]/30 rounded-b-lg shadow-2xl p-4 grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A869] font-semibold pb-1 border-b border-[#C5A869]/20">
                    Curated By Moment
                  </div>
                  {occasions.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setOccasionsDropdown(false)}
                      className="group p-2 rounded hover:bg-[#183C2D]/50 transition-colors flex flex-col"
                    >
                      <span className="text-sm font-serif-luxury tracking-wide text-white group-hover:text-[#D8B979]">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-[#EFE9DC]/60 font-sans tracking-normal">
                        {item.desc}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenBuilder}
              className="flex items-center gap-1.5 text-[#D8B979] hover:text-[#FDFBF8] transition-colors py-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8B979]" />
              <span>Create Your Own</span>
            </button>

            <a href="#corporate" className="hover:text-[#D8B979] transition-colors py-1">
              Corporate Gifts
            </a>

            <a href="#story" className="hover:text-[#D8B979] transition-colors py-1">
              Our Story
            </a>
          </nav>

          {/* Center Brand Identity */}
          <div className="flex-1 lg:flex-initial text-center lg:px-6">
            <Link href="/" className="inline-flex flex-col items-center group">
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#C5A869]/60 hidden sm:inline-block"></span>
                <span className="text-[10px] tracking-[0.35em] text-[#C5A869] font-medium uppercase">
                  Haute Gifting Atelier
                </span>
                <span className="w-4 h-[1px] bg-[#C5A869]/60 hidden sm:inline-block"></span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury tracking-[0.18em] text-[#FCFBF8] font-normal group-hover:text-[#D8B979] transition-colors">
                THE KOCHI ATELIER
              </h1>
              <div className="text-[9px] tracking-[0.25em] text-[#EFE9DC]/60 uppercase">
                Fort Kochi &bull; Pan-India Delivery
              </div>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#EFE9DC] hover:text-[#D8B979] transition-colors relative"
              aria-label="Search hampers"
              title="Search hampers"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#EFE9DC] hover:text-[#D8B979] transition-colors relative"
              aria-label="View Wishlist"
              title="Saved Hampers"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A869] text-[#0B1D15] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#183C2D]/80 border border-[#C5A869]/40 text-[#EFE9DC] hover:bg-[#C5A869] hover:text-[#0B1D15] transition-all duration-200 group"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D8B979] group-hover:text-[#0B1D15] transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-[#C5A869] text-[#0B1D15] rounded-full text-[10px] font-bold flex items-center justify-center border border-[#0B1D15]">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-xs font-medium tracking-wider">
                {totalItems === 0 ? 'Bag' : `₹${subtotal.toLocaleString('en-IN')}`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1D15] border-t border-[#C5A869]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#C5A869]/20">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBuilder();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#C5A869]/20 text-[#D8B979] border border-[#C5A869]/40 text-xs font-medium"
            >
              <Sparkles className="w-4 h-4" />
              Custom Hamper
            </button>
            <a
              href="https://wa.me/919645556010"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-2.5 rounded bg-[#183C2D] text-[#EFE9DC] text-xs font-medium"
            >
              <Phone className="w-4 h-4 text-[#C5A869]" />
              WhatsApp Help
            </a>
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-[#EFE9DC]">
            <a
              href="#bestsellers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Shop All Hampers
            </a>
            <a
              href="#occasions"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Browse by Occasion
            </a>
            <a
              href="#corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Corporate & VIP Gifting
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Our Artisanal Story
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Client Reviews
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#D8B979]"
            >
              Studio & Contact
            </a>
          </div>

          <div className="pt-4 border-t border-[#C5A869]/20 text-xs text-[#EFE9DC]/70 space-y-1">
            <p>Pan-India Express Delivery Across 28,000+ Pincodes</p>
            <p className="text-[#D8B979]">Same-Day & Next-Day Delivery across Kochi</p>
          </div>
        </div>
      )}
    </header>
  );
}
