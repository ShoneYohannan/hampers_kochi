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
  Sparkles
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
  const { addToCart } = useCart();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedBox, setSelectedBox] = useState(BUILDER_ITEMS.boxes[0]);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('All');
  
  // Real items extracted from actual hamper photos (Front.jpeg, 1001436447, 1001707222, 1001981345, 1002015334)
  const [selectedGoodies, setSelectedGoodies] = useState<string[]>([
    'item-kasavu-saree',
    'item-atelier-perfume',
    'item-soy-candle',
    'item-ghee-halwa',
  ]);
  
  const [ribbonColor, setRibbonColor] = useState('Champagne Gold Double Satin');
  const [waxSealColor, setWaxSealColor] = useState('Antique Metallic Gold');
  const [recipientName, setRecipientName] = useState('');
  const [calligraphyMessage, setCalligraphyMessage] = useState('');

  if (!isOpen) return null;

  const allGoodieOptions = [
    ...BUILDER_ITEMS.handlooms,
    ...BUILDER_ITEMS.fragranceAndBeauty,
    ...BUILDER_ITEMS.keepsakesAndJewelry,
    ...BUILDER_ITEMS.gourmetAndTeas,
  ];

  const categories = [
    'All',
    'Handlooms & Wearables',
    'Fragrance & Self-Care',
    'Jewelry & Adornments',
    'Personalized Keepsakes',
    'Gourmet & Delicacies',
  ];

  const displayedGoodies = selectedCategoryTab === 'All'
    ? allGoodieOptions
    : allGoodieOptions.filter((item) => item.category === selectedCategoryTab);

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
      `*Bespoke Hamper Atelier Inquiry - Hampers Kochi*`,
      ``,
      `*Selected Presentation Box:*`,
      `• ${selectedBox.name}`,
      ``,
      `*Curated Authentic Items (${selectedGoodieNames.length} items):*`,
      ...selectedGoodieNames.map((name) => `• ${name}`),
      ``,
      `*Presentation & Finishing:*`,
      `• Ribbon: ${ribbonColor}`,
      `• Wax Seal: ${waxSealColor} Hand-Pressed Hot Wax Seal`,
      recipientName ? `• Recipient Name: ${recipientName}` : null,
      calligraphyMessage ? `• Personalized Calligraphy: "${calligraphyMessage}"` : null,
      ``,
      `Hello! Please share the price quotation, packaging timeframe, and delivery options for this tailored curation.`
    ].filter(Boolean);

    const messageText = lines.join('\n');
    window.open(`https://wa.me/919645556010?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  const handleAddCustomHamper = () => {
    const selectedGoodieNames = getSelectedNames();

    const customProduct: Product = {
      id: `custom-hamper-${Date.now()}`,
      name: `Bespoke Hamper in ${selectedBox.name}`,
      slug: `bespoke-hamper-${Date.now()}`,
      subtitle: `Hand-Curated with ${selectedGoodieNames.length} artisanal selections`,
      price: 0,
      rating: 5.0,
      reviewsCount: 1,
      image: selectedBox.image,
      galleryImages: [selectedBox.image],
      category: 'Personalized & Keepsakes',
      tags: ['Bespoke', 'Hand-Curated', 'Wax-Sealed'],
      description: `Custom curated luxury hamper presented in a ${selectedBox.name}.`,
      detailedDescription: `Bespoke curation assembled in our Fort Kochi atelier. Finished with ${ribbonColor} ribbon and ${waxSealColor} wax seal.`,
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
    toast.success(`Bespoke Hamper in "${selectedBox.name}" added to Bag!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-[#C5A869]/30 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#D8B979]" />
            <div>
              <h2 className="text-lg font-serif-luxury tracking-wider">The Bespoke Hamper Atelier</h2>
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
        <div className="bg-[#F7F4EC] border-b border-[#EFE9DC] px-6 py-3 flex items-center justify-between overflow-x-auto gap-2">
          {[
            { step: 1, label: '1. Luxury Box' },
            { step: 2, label: `2. Treats & Keepsakes (${selectedGoodies.length})` },
            { step: 3, label: '3. Ribbons & Seals' },
            { step: 4, label: '4. Calligraphy Note' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setCurrentStep(item.step as any)}
              className={`px-3 py-1.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-colors shrink-0 ${
                currentStep === item.step
                  ? 'bg-[#0B1D15] text-[#D8B979] font-semibold shadow-sm'
                  : 'text-[#68756F] hover:text-[#0B1D15]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          
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
                        ? 'border-[#C5A869] bg-[#F7F4EC]/60 shadow-md'
                        : 'border-[#EFE9DC] hover:border-[#C5A869]/50 bg-white'
                    }`}
                  >
                    <div className="relative w-20 h-20 rounded overflow-hidden bg-[#0B1D15] shrink-0 border border-[#EFE9DC]">
                      <Image
                        src={box.image}
                        alt={box.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-serif-luxury font-medium text-[#0B1D15]">{box.name}</h4>
                        {selectedBox.id === box.id && (
                          <span className="w-5 h-5 rounded-sm bg-[#183C2D] text-[#D8B979] flex items-center justify-center text-xs">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#68756F] line-clamp-2 mt-0.5">{box.description}</p>
                      <div className="text-xs font-semibold text-[#0B1D15] mt-2">Bespoke Casket Choice</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Goodies */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Select Artisanal Treats & Keepsakes</h3>
                  <p className="text-xs text-[#68756F]">Choose as many items as you wish. Our atelier stylists will arrange them with elegance.</p>
                </div>
                <div className="text-xs text-[#A88B4D] font-medium bg-[#F7F4EC] px-3 py-1 rounded border border-[#EFE9DC] self-start sm:self-auto">
                  {selectedGoodies.length} items chosen
                </div>
              </div>

              {/* Sub-category pill filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryTab(cat)}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategoryTab === cat
                        ? 'bg-[#183C2D] text-[#D8B979] font-medium'
                        : 'bg-[#F7F4EC] text-[#68756F] hover:text-[#0B1D15] border border-[#EFE9DC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
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
                          ? 'border-[#C5A869] bg-[#F7F4EC] shadow-sm'
                          : 'border-[#EFE9DC] hover:border-[#C5A869]/50 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-[#0B1D15] leading-snug">{goodie.name}</h4>
                          <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                            isChecked ? 'bg-[#183C2D] text-[#D8B979] border-[#183C2D]' : 'border-[#C5A869]/50'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#68756F] mt-1 line-clamp-2">{goodie.description}</p>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-medium text-[#183C2D] mt-3 pt-2 border-t border-[#EFE9DC]">
                        <span>Atelier Curation Item</span>
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
                  Select Double-Faced Satin Ribbon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Champagne Gold Double Satin', color: '#D8B979' },
                    { name: 'Royal Emerald Green Velvet', color: '#10291E' },
                    { name: 'Ivory Cream Silk Ribbon', color: '#F7F4EC' },
                  ].map((r) => (
                    <button
                      key={r.name}
                      onClick={() => setRibbonColor(r.name)}
                      className={`p-3 rounded border text-left flex items-center gap-3 transition-all ${
                        ribbonColor === r.name ? 'border-[#C5A869] bg-[#F7F4EC]' : 'border-[#EFE9DC]'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/20" style={{ backgroundColor: r.color }} />
                      <span className="text-xs font-medium text-[#0B1D15]">{r.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wax Seal Colors */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#0B1D15] mb-2">
                  Select Hot Wax Seal Impression
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Antique Metallic Gold', color: '#C5A869' },
                    { name: 'Botanical Emerald Green', color: '#183C2D' },
                    { name: 'Imperial Maroon Lacquer', color: '#681B26' },
                  ].map((w) => (
                    <button
                      key={w.name}
                      onClick={() => setWaxSealColor(w.name)}
                      className={`p-3 rounded border text-left flex items-center gap-3 transition-all ${
                        waxSealColor === w.name ? 'border-[#C5A869] bg-[#F7F4EC]' : 'border-[#EFE9DC]'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-black/20" style={{ backgroundColor: w.color }} />
                      <span className="text-xs font-medium text-[#0B1D15]">{w.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Calligraphy Note */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-serif-luxury text-[#0B1D15]">Bespoke Calligraphy & Recipient</h3>
                <p className="text-xs text-[#68756F]">Written with dip pen and permanent ink on handmade cotton paper.</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#38423D] mb-1">
                    Recipient Full Name (or Family Name)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. & Mrs. Nair"
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
                    rows={4}
                    maxLength={50}
                    placeholder="Wishing you joyous celebrations filled with love..."
                    value={calligraphyMessage}
                    onChange={(e) => setCalligraphyMessage(e.target.value.slice(0, 50))}
                    className="w-full text-xs p-3 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                  <p className="text-[11px] text-[#68756F] mt-1">
                    Maximum 50 letters limit for hand-lettered gold calligraphy parchment.
                  </p>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#C5A869]/40 text-center space-y-2">
                <div className="text-[10px] uppercase tracking-widest text-[#C5A869] font-semibold flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Live Parchment Calligraphy Preview
                </div>
                <div className="font-serif-luxury italic text-base text-[#0B1D15] min-h-[40px]">
                  &ldquo;{calligraphyMessage || 'Your bespoke message will be penned here...'}&rdquo;
                </div>
                <div className="text-[11px] text-[#68756F]">
                  Sealed with {waxSealColor} hot wax seal
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Summary & Step Navigation */}
        <div className="p-5 bg-[#FCFBF8] border-t border-[#EFE9DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-[#68756F]">Bespoke Atelier Proposal:</div>
            <div className="text-lg font-serif-luxury font-semibold text-[#0B1D15]">
              Contact on WhatsApp for Price
              <span className="text-[11px] text-[#183C2D] font-normal ml-2 font-sans block sm:inline">
                (Tailored Pan-India Shipping)
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
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded bg-[#183C2D] text-[#D8B979] hover:bg-[#204E3B] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </button>
                <button
                  onClick={handleAddCustomHamper}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow"
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
