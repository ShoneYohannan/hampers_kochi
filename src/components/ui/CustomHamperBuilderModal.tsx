'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Gift, 
  Check, 
  ShoppingBag, 
  MessageSquare,
  ArrowRight,
  Sparkles,
  Search,
  Package,
  Layers,
  Ribbon,
  Feather
} from 'lucide-react';
import { BUILDER_ITEMS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { Product } from '@/types';

interface CustomHamperBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomHamperBuilderModal({ isOpen, onClose }: CustomHamperBuilderModalProps) {
  const { addToCart, setIsCartOpen } = useCart();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBox, setSelectedBox] = useState(BUILDER_ITEMS.boxes[0]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real items extracted from actual hamper photos
  const [selectedGoodies, setSelectedGoodies] = useState<string[]>([
    'item-kasavu-saree',
    'item-chocolate',
    'item-perfume',
    'item-traditional-sweets',
  ]);
  
  const [ribbonColor, setRibbonColor] = useState('Gold');
  const [waxSealColor, setWaxSealColor] = useState('Gold');
  const [recipientName, setRecipientName] = useState('');
  const [calligraphyMessage, setCalligraphyMessage] = useState('');

  if (!isOpen) return null;

  const allGoodieOptions = BUILDER_ITEMS.items;

  const categories = [
    'All',
    'Handlooms & Wearables',
    'Fragrance & Self-Care',
    'Jewelry & Keepsakes',
    'Gourmet & Delicacies',
    'Decor & Flowers',
    'Keepsakes & Decor',
  ];

  const filteredByCategory = selectedCategoryTab === 'All'
    ? allGoodieOptions
    : allGoodieOptions.filter((item) => item.category === selectedCategoryTab);

  const displayedGoodies = searchQuery.trim()
    ? filteredByCategory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByCategory;

  const toggleGoodie = (id: string) => {
    setSelectedGoodies((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getSelectedNames = () => {
    return selectedGoodies
      .map((id) => allGoodieOptions.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
  };

  const handleWhatsAppInquiry = () => {
    const selectedGoodieNames = getSelectedNames();
    const lines = [
      `*LUXURY HAMPER INQUIRY - HAMPERS KOCHI*`,
      ``,
      `*Selected Presentation Box:*`,
      `• ${selectedBox.name}`,
      ``,
      `*Curated Treats & Keepsakes (${selectedGoodieNames.length} items):*`,
      ...selectedGoodieNames.map((name) => `• ${name}`),
      ``,
      `*Packaging & Finishing:*`,
      `• Ribbon: ${ribbonColor}`,
      `• Wax Seal: ${waxSealColor} Hand-Pressed Hot Wax Seal`,
      recipientName ? `• For Recipient: ${recipientName}` : null,
      calligraphyMessage ? `• Wax-Sealed Calligraphy Note (max 50 letters): "${calligraphyMessage}"` : null,
      ``,
      `Hello! Please share the price quotation, packaging timeframe, and delivery options for this tailored curation.`
    ].filter(Boolean);

    const messageText = lines.join('\n');
    window.open(`https://wa.me/919846002241?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  const handleAddCustomHamper = () => {
    const selectedGoodieNames = getSelectedNames();

    const customProduct: Product = {
      id: `custom-hamper-${Date.now()}`,
      name: `Hamper in ${selectedBox.name}`,
      slug: `hamper-${Date.now()}`,
      subtitle: `Hand-Curated with ${selectedGoodieNames.length} artisanal selections`,
      price: 0,
      rating: 5.0,
      reviewsCount: 1,
      image: selectedBox.image,
      galleryImages: [selectedBox.image],
      category: 'Personalized & Keepsakes',
      tags: ['Custom', 'Hand-Curated', 'Wax-Sealed'],
      description: `Custom curated luxury hamper presented in a ${selectedBox.name}.`,
      detailedDescription: `Handcrafted curation assembled in our Hampers Kochi store. Finished with ${ribbonColor} ribbon and ${waxSealColor} wax seal.`,
      contents: [
        `Base Box: ${selectedBox.name}`,
        ...selectedGoodieNames,
        `Ribbon: ${ribbonColor}`,
        `Seal: ${waxSealColor} Hand-Pressed Hot Wax Seal`,
      ],
      boxType: selectedBox.name,
      dimensions: '34cm x 26cm x 13cm',
      weight: 'Custom Weight',
      deliveryEstimate: 'Pre-Order Only | Kochi & All-India Delivery',
    };

    addToCart(customProduct, 1, calligraphyMessage, recipientName);
    toast.success(`Hamper in "${selectedBox.name}" added to Bag!`);
    setIsCartOpen(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-[#C5A869]/30 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#183C2D] border border-[#C5A869]/50 flex items-center justify-center text-[#D8B979]">
              <Gift className="w-4 h-4 text-[#D8B979]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif-luxury tracking-wider">Hampers Kochi</h2>
              <span className="text-[11px] text-[#EFE9DC]/70">Step {currentStep} of 4 &bull; Tailored to Perfection</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#EFE9DC]/75 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Tabs Navigation */}
        <div className="bg-[#F7F4EC] border-b border-[#EFE9DC] px-4 sm:px-6 py-2.5 flex items-center justify-between overflow-x-auto gap-2">
          {[
            { step: 1, label: '1. Presentation Box', icon: Package },
            { step: 2, label: `2. Treats & Keepsakes (${selectedGoodies.length})`, icon: Layers },
            { step: 3, label: '3. Ribbons & Seals', icon: Ribbon },
            { step: 4, label: '4. Calligraphy & Review', icon: Feather },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.step}
                onClick={() => setCurrentStep(item.step as any)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5 ${
                  currentStep === item.step
                    ? 'bg-[#0B1D15] text-[#D8B979] font-semibold shadow-sm'
                    : 'text-[#68756F] hover:text-[#0B1D15]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          
          {/* Step 1: Select Box */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Select Your Presentation Box</h3>
                <p className="text-xs text-[#68756F]">Handmade with reinforced framing, heritage handlooms, and signature brass fittings.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BUILDER_ITEMS.boxes.map((box) => (
                  <div
                    key={box.id}
                    onClick={() => setSelectedBox(box)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex gap-3.5 items-center ${
                      selectedBox.id === box.id
                        ? 'border-[#C5A869] bg-[#F7F4EC]/60 shadow-md ring-1 ring-[#C5A869]'
                        : 'border-[#EFE9DC] hover:border-[#C5A869]/50 bg-white'
                    }`}
                  >
                    <div className="relative w-24 h-24 rounded overflow-hidden bg-white shrink-0 border border-[#EFE9DC]">
                      <Image
                        src={box.image}
                        alt={box.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-serif-luxury font-medium text-[#0B1D15]">{box.name}</h4>
                        {selectedBox.id === box.id && (
                          <span className="w-5 h-5 rounded-sm bg-[#183C2D] text-[#D8B979] flex items-center justify-center text-xs shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#68756F] line-clamp-2 mt-1">{box.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Goodies */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Select Artisanal Treats & Keepsakes</h3>
                  <p className="text-xs text-[#68756F]">Choose as many items as you wish. Our atelier stylists will arrange them with elegance.</p>
                </div>
                <div className="text-xs text-[#183C2D] font-semibold bg-[#F7F4EC] px-3 py-1.5 rounded-full border border-[#C5A869]/40 self-start sm:self-auto flex items-center gap-1.5 shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#C5A869]" />
                  <span>{selectedGoodies.length} items chosen</span>
                </div>
              </div>

              {/* Search & Sub-category filters */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#68756F] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search treats, handlooms, fragrances & keepsakes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-[#EFE9DC] bg-white focus:outline-none focus:border-[#C5A869]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2 text-xs text-[#68756F] hover:text-[#0B1D15]"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategoryTab(cat)}
                      className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategoryTab === cat
                          ? 'bg-[#183C2D] text-[#D8B979] font-medium shadow-sm'
                          : 'bg-[#F7F4EC] text-[#68756F] hover:text-[#0B1D15] border border-[#EFE9DC]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {displayedGoodies.map((goodie) => {
                  const isChecked = selectedGoodies.includes(goodie.id);
                  return (
                    <div
                      key={goodie.id}
                      onClick={() => toggleGoodie(goodie.id)}
                      className={`p-3.5 rounded-lg border cursor-pointer transition-all flex flex-col justify-between ${
                        isChecked
                          ? 'border-[#C5A869] bg-[#F7F4EC] shadow-md ring-1 ring-[#C5A869]'
                          : 'border-[#EFE9DC] hover:border-[#C5A869]/50 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-[#0B1D15] leading-snug">{goodie.name}</h4>
                          <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${
                            isChecked ? 'bg-[#183C2D] text-[#D8B979] border-[#183C2D]' : 'border-[#C5A869]/50 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#68756F] mt-1.5 line-clamp-2 leading-relaxed">{goodie.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-medium text-[#183C2D] mt-3 pt-2 border-t border-[#EFE9DC]">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C5A869]" />
                          <span>{isChecked ? 'Selected for Hamper' : 'Curated Selection'}</span>
                        </span>
                        <span className="text-[10px] text-[#A88B4D] font-normal">{goodie.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Ribbons & Seals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Tailor Presentation Ribbons & Hot Wax Seals</h3>
                <p className="text-xs text-[#68756F]">Hand-tied French satin bows and hand-pressed wax seal crests.</p>
              </div>

              {/* Ribbon Colors */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0B1D15] mb-2">
                  Select Satin Ribbon ({15} options)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                  {[
                    { name: 'Gold', color: '#D4AF37' },
                    { name: 'Silver', color: '#C0C0C0' },
                    { name: 'Cream', color: '#FFFDD0' },
                    { name: 'Black', color: '#1A1A1A' },
                    { name: 'Grey', color: '#808080' },
                    { name: 'Ash', color: '#B2BEB5' },
                    { name: 'White', color: '#FFFFFF' },
                    { name: 'Off white', color: '#FAF9F6' },
                    { name: 'Green', color: '#183C2D' },
                    { name: 'Red', color: '#C41E3A' },
                    { name: 'Yellow', color: '#FFD700' },
                    { name: 'Orange', color: '#FFA500' },
                    { name: 'Lavender', color: '#E6E6FA' },
                    { name: 'Purple', color: '#800080' },
                    { name: 'Blue', color: '#1E3F66' },
                  ].map((r) => (
                    <button
                      key={r.name}
                      onClick={() => setRibbonColor(r.name)}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                        ribbonColor === r.name ? 'border-[#C5A869] bg-[#F7F4EC] ring-1 ring-[#C5A869]' : 'border-[#EFE9DC] bg-white hover:border-[#C5A869]/50'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-black/20 shrink-0 shadow-sm" style={{ backgroundColor: r.color }} />
                      <span className="text-xs font-medium text-[#0B1D15] truncate">{r.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wax Seal Colors */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0B1D15] mb-2">
                  Select Hot Wax Seal Impression
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { name: 'Gold', color: '#D4AF37', desc: 'Radiant metallic gold wax crest' },
                    { name: 'Silver', color: '#C0C0C0', desc: 'Polished metallic silver seal' },
                    { name: 'Black', color: '#1A1A1A', desc: 'Understated matte noir seal' },
                    { name: 'Red', color: '#8B0000', desc: 'Classic royal red wax seal' },
                  ].map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setWaxSealColor(w.name)}
                      className={`p-3 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                        waxSealColor === w.name ? 'border-[#C5A869] bg-[#F7F4EC] ring-1 ring-[#C5A869]' : 'border-[#EFE9DC] bg-white hover:border-[#C5A869]/50'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/20 shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: w.color }} />
                      <div>
                        <span className="text-xs font-semibold text-[#0B1D15] block">{w.name}</span>
                        <span className="text-[10px] text-[#68756F] leading-tight block mt-0.5">{w.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Calligraphy Note & Live Review */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Calligraphy & Full Curation Review</h3>
                <p className="text-xs text-[#68756F]">Review your personalized selections and hand-penned parchment note before ordering.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#38423D] mb-1">
                      Recipient Full Name (or Family Name)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mr. & Mrs. Nair / John"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs uppercase tracking-wider font-medium text-[#38423D]">
                        Your Personalized Calligraphy Message
                      </label>
                      <span className="text-[11px] text-[#A88B4D] font-mono font-medium">
                        {calligraphyMessage.length}/50 letters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={50}
                      placeholder="Wishing you joyous celebrations filled with love..."
                      value={calligraphyMessage}
                      onChange={(e) => setCalligraphyMessage(e.target.value.slice(0, 50))}
                      className="w-full text-xs p-3 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                    />
                    <p className="text-[10px] text-[#68756F] mt-1">
                      Maximum 50 letters limit for hand-lettered gold calligraphy parchment.
                    </p>
                  </div>

                  {/* Live Parchment Preview */}
                  <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#C5A869]/40 text-center space-y-1.5 shadow-sm">
                    <div className="text-[10px] uppercase tracking-widest text-[#C5A869] font-semibold flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Live Parchment Calligraphy Preview
                    </div>
                    <div className="font-serif-luxury italic text-sm text-[#0B1D15] min-h-[32px] flex items-center justify-center">
                      &ldquo;{calligraphyMessage || 'Your message will be penned here...'}&rdquo;
                    </div>
                    <div className="text-[10px] text-[#68756F]">
                      Sealed with {waxSealColor} hot wax seal {recipientName ? `• For: ${recipientName}` : ''}
                    </div>
                  </div>
                </div>

                {/* Full Curation Breakdown Card */}
                <div className="p-4 rounded-lg bg-[#F7F4EC] border border-[#C5A869]/40 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-[#EFE9DC]">
                      <span className="text-xs font-serif-luxury font-bold text-[#0B1D15] uppercase tracking-wider">
                        Curation Breakdown
                      </span>
                      <span className="text-[10px] bg-[#183C2D] text-[#D8B979] px-2 py-0.5 rounded font-medium">
                        {selectedGoodies.length} Items Selected
                      </span>
                    </div>

                    {/* Box preview */}
                    <div className="flex items-center gap-2.5 mt-2.5 p-2 bg-white rounded border border-[#EFE9DC]">
                      <div className="relative w-12 h-12 rounded overflow-hidden shrink-0 border border-[#EFE9DC] bg-white">
                        <Image src={selectedBox.image} alt={selectedBox.name} fill className="object-contain p-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[#A88B4D] uppercase tracking-wider font-semibold">Presentation Box</div>
                        <div className="text-xs font-semibold text-[#0B1D15] truncate">{selectedBox.name}</div>
                      </div>
                    </div>

                    {/* Curated list */}
                    <div className="mt-2.5">
                      <div className="text-[10px] text-[#68756F] uppercase tracking-wider font-semibold mb-1">
                        Curated Treats & Keepsakes:
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
                        {getSelectedNames().map((name, i) => (
                          <div key={i} className="text-[11px] text-[#38423D] flex items-start gap-1.5 leading-snug">
                            <span className="text-[#C5A869]">•</span>
                            <span>{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ribbon & seal info */}
                    <div className="mt-2.5 pt-2 border-t border-[#EFE9DC] text-[10px] text-[#68756F] flex items-center justify-between">
                      <span>Ribbon: <strong>{ribbonColor}</strong></span>
                      <span>Seal: <strong>{waxSealColor}</strong></span>
                    </div>
                  </div>

                  <div className="text-[10px] text-[#183C2D] font-medium bg-white p-2 rounded border border-[#EFE9DC] text-center">
                    All items are carefully coordinated and arranged with fresh satin by our Hampers Kochi stylists.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Summary & Step Navigation */}
        <div className="p-4 sm:p-5 bg-[#FCFBF8] border-t border-[#EFE9DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#68756F]">Hampers Kochi Proposal:</div>
            <div className="text-base sm:text-lg font-serif-luxury font-semibold text-[#0B1D15]">
              Contact on WhatsApp for Price
              <span className="text-[11px] text-[#183C2D] font-normal ml-2 font-sans block sm:inline">
                (All-India Delivery)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded border border-[#EFE9DC] text-xs uppercase tracking-wider font-medium hover:bg-[#F7F4EC] transition-colors"
              >
                Back
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep((s) => (s + 1) as any)}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded bg-[#0B1D15] text-[#FCFBF8] hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Continue Step {currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded bg-[#25D366] text-white hover:bg-[#128C7E] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>Order on WhatsApp</span>
                </button>
                <button
                  onClick={handleAddCustomHamper}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded bg-[#0B1D15] text-[#D8B979] hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow border border-[#C5A869]/50"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
