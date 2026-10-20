'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Search, X, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  'Wedding & Bridal',
  'Monsoon Coffee',
  'Belgian Truffles',
  'Heirloom Brass',
  'Birthday',
  'Corporate',
  'Kerala Spices',
];

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const { products } = useCms();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.contents.some((c) => c.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-[#C5A869]/40 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-[#0B1D15] text-white flex items-center gap-3 border-b border-[#C5A869]/30">
          <Search className="w-5 h-5 text-[#D8B979] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search curations by name, confections, spices, brassware..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/60 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-white/10 text-[#EFE9DC]/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-6 space-y-4">
            <div className="text-[11px] uppercase tracking-wider text-[#C5A869] font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-sm bg-[#F7F4EC] text-[#38423D] hover:bg-[#0B1D15] hover:text-[#D8B979] text-xs font-medium border border-[#EFE9DC] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EFE9DC] text-xs text-[#68756F]">
              Search through our 34 handcrafted curations with pan-India express courier.
            </div>
          </div>
        )}

        {/* Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 divide-y divide-[#EFE9DC]">
            {results.length === 0 ? (
              <div className="text-center py-10 text-xs text-[#68756F]">
                No luxury hampers found matching &ldquo;{query}&rdquo;.
              </div>
            ) : (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#F7F4EC] rounded-lg transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-[#0B1D15] border border-[#C5A869]/20 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15]/50 to-transparent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-serif-luxury text-[#0B1D15] group-hover:text-[#23523E] font-medium leading-snug">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#68756F] line-clamp-1">{product.subtitle}</p>
                      <span className="text-[10px] text-[#C5A869] uppercase tracking-wider font-semibold">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-sm font-serif-luxury font-semibold text-[#0B1D15]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#25D366] font-medium">Pan-India Express</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
