'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Star, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Kochi Atelier, I am interested in ordering "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Could you please confirm delivery details?`
  );
  const whatsappUrl = `https://wa.me/919645556010?text=${whatsappMessage}`;

  return (
    <div
      className="group relative rounded-lg overflow-hidden bg-[#0B1D15] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#C5A869]/20 hover:border-[#C5A869]/60"
      onClick={() => onQuickView(product)}
    >
      {/* Portrait Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay — strong at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15] via-[#0B1D15]/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Subtle gold inner border on hover */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A869]/40 transition-colors duration-300 pointer-events-none rounded-lg" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#0B1D15]/90 backdrop-blur-sm text-[#D8B979] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#C5A869]/40 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8B979] animate-pulse" />
              Bestseller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-[#C5A869] text-[#0B1D15] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
              Rare Edition
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-md ${
            isFavorited
              ? 'bg-[#0B1D15] text-[#C5A869] border border-[#C5A869]'
              : 'bg-white/20 backdrop-blur-sm text-white hover:text-[#C5A869] hover:bg-white/30 border border-white/20'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C5A869]' : ''}`} />
        </button>

        {/* Rating pill — top center on hover */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#C5A869]/30">
            <Star className="w-3 h-3 text-[#D8B979] fill-[#D8B979]" />
            <span className="text-[10px] font-semibold text-white">{product.rating}</span>
            <span className="text-[10px] text-white/60">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Bottom overlay content — always visible */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">

          {/* Category label */}
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium mb-1">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-serif-luxury font-normal text-[#FCFBF8] leading-snug line-clamp-2 group-hover:text-[#D8B979] transition-colors duration-300">
            {product.name}
          </h3>

          {/* Subtitle — hidden initially, revealed on hover */}
          <p className="mt-1 text-xs text-[#EFE9DC]/70 line-clamp-1 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-10 overflow-hidden">
            {product.subtitle}
          </p>

          {/* Price & Actions row */}
          <div className="mt-3 pt-3 border-t border-[#C5A869]/20 flex items-center justify-between gap-2">
            {/* Pricing */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-serif-luxury text-[#D8B979] font-semibold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#EFE9DC]/50 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366]/20 border border-white/20 hover:border-[#25D366]/50 flex items-center justify-center text-white hover:text-[#25D366] transition-all duration-200 backdrop-blur-sm"
                title="Order via WhatsApp"
                aria-label="Order on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>

              {/* Add to Bag */}
              <button
                onClick={handleAdd}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm ${
                  isAdded
                    ? 'bg-[#183C2D] text-[#D8B979] border border-[#C5A869]'
                    : 'bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] border border-[#C5A869]'
                }`}
                title={isAdded ? 'Added to Bag' : 'Add to Bag'}
                aria-label={isAdded ? 'Added to Bag' : 'Add to Bag'}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>

              {/* Quick View */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
                title="Quick View"
                aria-label="Quick View"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
