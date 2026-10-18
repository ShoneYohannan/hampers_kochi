'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function WishlistModal({ isOpen, onClose, onSelectProduct }: WishlistModalProps) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-[#C5A869]/30 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D8B979] fill-[#D8B979]" />
            <h2 className="text-lg font-serif-luxury tracking-wider">Your Saved Curations</h2>
            <span className="text-xs bg-[#183C2D] text-[#D8B979] px-2 py-0.5 rounded-full border border-[#C5A869]/30">
              {wishlist.length}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#EFE9DC]/75 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F7F4EC] border border-[#EFE9DC] flex items-center justify-center text-[#C5A869] mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif-luxury text-[#0B1D15]">No Saved Hampers</h3>
              <p className="text-xs text-[#68756F]">
                Click the heart icon on any curation to save it for upcoming birthdays, weddings, or anniversaries.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-[#EFE9DC] bg-[#FCFBF8] hover:border-[#C5A869]/50 transition-colors"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className="relative w-14 h-20 rounded overflow-hidden bg-[#0B1D15] border border-[#C5A869]/20 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15]/60 to-transparent" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif-luxury text-[#0B1D15] font-medium line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#0B1D15]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <div className="text-[10px] text-[#C5A869] uppercase tracking-wider">
                      {product.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="p-2 rounded bg-[#0B1D15] text-[#FCFBF8] hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
                    title="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="p-2 text-[#68756F] hover:text-red-700 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F4EC] border-t border-[#EFE9DC] text-center text-xs text-[#68756F]">
          Express delivery across all 28 Indian states with complimentary personalized gift note.
        </div>
      </div>
    </div>
  );
}
