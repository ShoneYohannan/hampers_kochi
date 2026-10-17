'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Star, MessageSquare } from 'lucide-react';
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
    `Hello The Kochi Atelier, I am interested in ordering "${product.name}" (Dummy Price: ₹${product.price.toLocaleString('en-IN')}). Could you please confirm delivery details?`
  );
  const whatsappUrl = `https://wa.me/919645556010?text=${whatsappMessage}`;

  return (
    <div className="group relative bg-[#FFFFFF] rounded-md overflow-hidden border border-[#EFE9DC] hover:border-[#C5A869]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Container */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F4EC] cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#0B1D15] text-[#D8B979] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#C5A869]/40 shadow-sm">
              Bestseller
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-[#C5A869] text-[#0B1D15] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
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
              : 'bg-white/90 backdrop-blur-sm text-[#141A17] hover:text-[#C5A869] hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C5A869]' : ''}`} />
        </button>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-[#0B1D15]/90 hover:bg-[#0B1D15] text-[#FCFBF8] text-xs font-medium uppercase tracking-wider rounded border border-[#C5A869]/40 flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-[#D8B979]" />
            <span>Quick View & Details</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#38423D] text-[11px]">
              <Star className="w-3 h-3 text-[#D8B979] fill-[#D8B979]" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-[#68756F]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base sm:text-lg font-serif-luxury font-normal text-[#0B1D15] group-hover:text-[#23523E] transition-colors leading-snug line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Highlights */}
          <p className="mt-1 text-xs text-[#68756F] line-clamp-1 font-light">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-[#EFE9DC]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-lg font-serif-luxury text-[#0B1D15] font-semibold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#68756F] line-through ml-2">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#23523E] font-medium tracking-wide bg-[#10291E]/5 px-2 py-0.5 rounded">
              Pan-India Express
            </span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-5 gap-2">
            <button
              onClick={handleAdd}
              className={`col-span-4 py-2.5 px-3 rounded text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm ${
                isAdded
                  ? 'bg-[#183C2D] text-[#FCFBF8]'
                  : 'bg-[#0B1D15] text-[#FCFBF8] hover:bg-[#C5A869] hover:text-[#0B1D15]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAdded ? 'Added to Bag ✓' : 'Add to Bag'}</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="col-span-1 py-2.5 px-2 rounded bg-[#EFE9DC]/60 hover:bg-[#25D366]/15 hover:border-[#25D366]/40 border border-[#EFE9DC] text-[#0B1D15] hover:text-[#128C7E] flex items-center justify-center transition-colors shadow-sm"
              title="Order / Inquire via WhatsApp"
              aria-label="Order on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
