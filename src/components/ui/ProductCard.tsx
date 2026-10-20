'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Star, MessageSquare, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    if (!isFavorited) {
      toast.success(`Saved "${product.name}" to your Wishlist`);
    } else {
      toast.info(`Removed "${product.name}" from your Wishlist`);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello The Kochi Atelier, I would like to order "${product.name}" (Price: ₹${product.price.toLocaleString('en-IN')}). Could you please share payment and delivery details?`
  );
  const whatsappUrl = `https://wa.me/919645556010?text=${whatsappMessage}`;

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-white border border-[#E8E1D4] hover:border-[#D8B979] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      {/* ── IMAGE CONTAINER (Unobscured & Clean) ── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F7F4EC]">
        <Image
          src={product.image}
          alt={`${product.name} - Luxury Handcrafted Gift Hamper by The Kochi Atelier`}
          fill
          quality={90}
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#0B1D15]/95 backdrop-blur-sm text-[#D8B979] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#D8B979]/40 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-[#D8B979]" />
              Bestseller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-[#D8B979] text-[#0B1D15] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
              Limited Edition
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200 z-10 shadow-md cursor-pointer ${
            isFavorited
              ? 'bg-[#0B1D15] text-[#D8B979] border border-[#D8B979]'
              : 'bg-white/80 hover:bg-white text-[#0B1D15] hover:text-[#D8B979] border border-black/5'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#D8B979] text-[#D8B979]' : ''}`} />
        </button>

        {/* Quick View Button on Image Hover */}
        <div className="absolute inset-x-0 bottom-3 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-[#0B1D15]/90 hover:bg-[#0B1D15] text-[#EFE9DC] hover:text-[#D8B979] text-xs font-semibold uppercase tracking-wider rounded backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View Details</span>
          </button>
        </div>
      </div>

      {/* ── PRODUCT DETAILS (Clean, Luxury & Readable) ── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#96742E] font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#505D56]">
              <Star className="w-3.5 h-3.5 text-[#D8B979] fill-[#D8B979]" />
              <span className="font-semibold text-[#0B1D15]">{product.rating}</span>
              <span className="text-[11px] text-[#78857F]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-lg sm:text-xl font-serif-luxury font-normal text-[#0B1D15] leading-snug line-clamp-1 group-hover:text-[#96742E] transition-colors duration-200">
            {product.name}
          </h3>

          {/* Subtitle / Contents Preview */}
          <p className="mt-1 text-xs sm:text-sm text-[#505D56] font-light line-clamp-2 leading-relaxed">
            {product.subtitle || product.description}
          </p>
        </div>

        {/* Pricing & Direct WhatsApp CTA */}
        <div className="mt-4 pt-3 border-t border-[#E8E1D4]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl sm:text-2xl font-serif-luxury text-[#0B1D15] font-semibold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-[#78857F] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Direct WhatsApp Ordering Button — Uncongested & Prominent */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 px-4 rounded bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md cursor-pointer"
            title="Order directly via WhatsApp"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            <MessageSquare className="w-4 h-4 text-white shrink-0" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
