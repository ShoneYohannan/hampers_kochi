'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Star,
  ShoppingBag,
  Truck,
  Check,
  ShieldCheck,
  Heart,
  MessageSquare,
  Maximize2
} from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const toast = useToast();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [giftNote, setGiftNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, giftNote, recipient);
    setAdded(true);
    toast.success(`Added ${quantity}x "${product.name}" to Bag!`);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello HamPers Kochi, I would like to order "${product.name}" (Qty: ${quantity}, Total: ₹${(product.price * quantity).toLocaleString('en-IN')}). Recipient: ${recipient || 'Not specified'}.${giftNote ? ` Gift Note: "${giftNote}"` : ''}`
  );
  const whatsappUrl = `https://wa.me/919846002241?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-[#C5A869]/30 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-sm bg-white/90 hover:bg-[#0B1D15] hover:text-white border border-[#EFE9DC] flex items-center justify-center text-[#141A17] transition-colors shadow-md"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[85vh] overflow-y-auto">

          {/* Left Column: Image Gallery (5 cols) */}
          <div className="md:col-span-5 bg-[#F7F4EC] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EFE9DC]">
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white shadow-md border border-[#EFE9DC]">
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute top-3 left-3 bg-[#0B1D15] text-[#D8B979] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#C5A869]/40">
                {product.category}
              </div>
            </div>

            {/* Thumbnails - only show if there are multiple genuine photos of this exact hamper */}
            {product.galleryImages && product.galleryImages.filter((img) => img === product.image).length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.galleryImages.filter((img) => img === product.image).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 rounded border-2 overflow-hidden shrink-0 transition-all ${currentImage === img
                        ? 'border-[#C5A869] shadow-sm scale-105'
                        : 'border-[#EFE9DC] hover:border-[#C5A869]/50'
                      }`}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Delivery Reassurance Note */}
            <div className="mt-4 pt-3 border-t border-[#EFE9DC] flex items-center justify-between text-xs text-[#68756F]">
              <span className="flex items-center gap-1.5 text-[#183C2D] font-medium">
                <Truck className="w-3.5 h-3.5 text-[#C5A869]" /> All-India Delivery
              </span>
              <span className="text-[11px] text-[#A88B4D] font-medium">Bespoke Handcrafted Luxury</span>
            </div>
          </div>

          {/* Right Column: Product Details & Customization (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Meta & Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#96742E] font-semibold">
                  {product.category} &bull; Handcrafted
                </span>

                <button
                  type="button"
                  onClick={() => {
                    toggleWishlist(product);
                    if (!isFavorited) {
                      toast.success(`Saved "${product.name}" to your Wishlist`);
                    } else {
                      toast.info(`Removed "${product.name}" from your Wishlist`);
                    }
                  }}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition-colors cursor-pointer ${isFavorited
                      ? 'border-[#C5A869] text-[#C5A869] bg-[#C5A869]/10'
                      : 'border-[#EFE9DC] text-[#68756F] hover:text-[#0B1D15]'
                    }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-[#C5A869]' : ''}`} />
                  <span>{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-normal text-[#0B1D15] mt-2">
                {product.name}
              </h2>
              <p className="text-xs text-[#68756F] mt-1 font-light">
                {product.subtitle}
              </p>

              {/* Price: Contact on WhatsApp for Prices */}
              <div className="mt-3">
                <span className="text-xl sm:text-2xl font-serif-luxury text-[#0B1D15] font-semibold">
                  Contact on WhatsApp for Prices
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-[#38423D] font-light leading-relaxed">
                {product.detailedDescription || product.description}
              </p>

              {/* Personalization Inputs */}
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-medium text-[#38423D] mb-1">
                    Recipient Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aditi & Rahul"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] uppercase tracking-wider font-medium text-[#38423D]">
                      Complimentary Wax-Sealed Gift Note (Max 50 Letters)
                    </label>
                    <span className="text-[10px] text-[#A88B4D] font-mono">
                      {giftNote.length}/50
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    maxLength={50}
                    placeholder="Write a heartfelt gift message (up to 50 letters)..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value.slice(0, 50))}
                    className="w-full text-xs p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

            </div>

            {/* Bottom Add Actions */}
            <div className="pt-4 border-t border-[#EFE9DC]">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EFE9DC] rounded bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-sm text-[#0B1D15] hover:bg-[#F7F4EC]"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#0B1D15]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-sm text-[#0B1D15] hover:bg-[#F7F4EC]"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Direct WhatsApp Order CTA */}
                <a
                  href={`https://wa.me/919846002241?text=${encodeURIComponent(
                    `Hello Hampers Kochi, I would like to inquire about the price and order details for "${product.name}" (Quantity: ${quantity}).${giftNote ? ` Personalized Note: "${giftNote}"` : ''} Please share pricing and dispatch details.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded text-xs font-semibold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 shadow-md bg-[#25D366] hover:bg-[#128C7E] text-white cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact WhatsApp for Price</span>
                </a>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#68756F]">
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#C5A869]" /> Express Delivery Across India</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3 text-[#C5A869]" /> 100% Damage-Free Guarantee</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
