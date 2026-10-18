'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ALL_PRODUCTS } from '@/data/products';
import { Product, OccasionCategory } from '@/types';
import ProductCard from '@/components/ui/ProductCard';

interface BestsellersProps {
  onQuickView: (product: Product) => void;
  selectedCategory: OccasionCategory;
  onSelectCategory: (category: OccasionCategory) => void;
}

const CATEGORIES: OccasionCategory[] = [
  'All',
  'Bestsellers',
  'Birthday',
  'Wedding & Bridal',
  'Anniversary & Romance',
  'Festive & Celebration',
  'Corporate & Executive',
  'Gourmet & Sweets',
  'Personalized & Keepsakes',
];

export default function Bestsellers({
  onQuickView,
  selectedCategory,
  onSelectCategory,
}: BestsellersProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS];

    if (selectedCategory === 'Bestsellers') {
      list = list.filter((p) => p.isBestseller);
    } else if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="bestsellers" className="py-16 md:py-24 bg-[#F7F4EC] border-b border-[#EFE9DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E1D6C2] gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1">
              Handcrafted Masterpieces
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-normal text-[#0B1D15]">
              The Hamper Collection
            </h2>
            <p className="mt-2 text-sm text-[#68756F] font-light max-w-xl">
              Discover 34 bespoke luxury curations featuring authentic single-estate delights and heirloom keepsakes.
              Express pan-India shipping available on every order.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-[#C5A869]" />
            <span className="text-xs uppercase tracking-wider text-[#38423D] font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#C5A869]/40 text-[#0B1D15] text-xs rounded py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#C5A869]"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider / Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                setVisibleCount(12);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B1D15] text-[#D8B979] border border-[#C5A869] shadow-md'
                  : 'bg-white text-[#38423D] hover:bg-[#EFE9DC] border border-[#E1D6C2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* No Results Fallback */}
        {displayedProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg border border-[#E1D6C2] p-8">
            <Sparkles className="w-8 h-8 text-[#C5A869] mx-auto mb-3" />
            <h3 className="text-xl font-serif-luxury text-[#0B1D15]">No hampers in this category</h3>
            <p className="text-xs text-[#68756F] mt-1 mb-4">Please explore another category or reset your filter.</p>
            <button
              onClick={() => onSelectCategory('All')}
              className="px-5 py-2 rounded bg-[#0B1D15] text-[#FCFBF8] text-xs uppercase tracking-wider"
            >
              View All 34 Hampers
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-8 py-3.5 rounded-sm bg-[#0B1D15] text-[#FCFBF8] hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md border border-[#C5A869]/30"
            >
              Load More Hampers ({filteredProducts.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
