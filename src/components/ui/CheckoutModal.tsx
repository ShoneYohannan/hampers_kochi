'use client';

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useCms } from '@/context/CmsContext';

const INDIAN_STATES = [
  'Kerala',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Delhi NCR',
  'Telangana',
  'Andhra Pradesh',
  'Goa',
  'Gujarat',
  'West Bengal',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Odisha',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Uttarakhand',
  'Other State / UT'
];

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    discount,
    shippingFee,
    clearCart,
  } = useCart();

  const toast = useToast();
  const { addInquiry } = useCms();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Kerala');
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const finalTotal = subtotal - discount + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation checks
    if (!fullName.trim()) {
      setErrorMessage('Please provide your recipient or contact full name.');
      toast.error('Recipient name is required.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid 10-digit mobile number for dispatch coordination.');
      toast.error('Invalid phone number (minimum 10 digits required).');
      return;
    }

    if (!address.trim() || !city.trim()) {
      setErrorMessage('Please provide a complete street address and city.');
      toast.error('Complete street address & city are required.');
      return;
    }

    const cleanPin = pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit Indian Postal PIN code.');
      toast.error('PIN code must be exactly 6 digits.');
      return;
    }

    const generatedId = `TKA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A869', '#0B1D15', '#D8B979', '#183C2D']
      });
    } catch {
      // ignore
    }

    const itemsSummary = items
      .map((i) => `• ${i.product.name} (Qty: ${i.quantity}) - ₹${(i.product.price * i.quantity).toLocaleString('en-IN')}`)
      .join('\n');

    const msg = encodeURIComponent(
      `*NEW LUXURY ORDER - THE KOCHI ATELIER*\n` +
      `*Order ID:* ${generatedId}\n\n` +
      `*Customer & Delivery Details:*\n` +
      `• Name: ${fullName}\n` +
      `• Phone: ${phone}\n` +
      `• Email: ${email || 'N/A'}\n` +
      `• Delivery Address: ${address}, ${city}, ${state} - PIN: ${pincode}\n` +
      `• Preferred Delivery Date: ${deliveryDate || 'Earliest Pan-India Express'}\n\n` +
      `*Curated Hampers Ordered:*\n${itemsSummary}\n\n` +
      `*Total Estimated Amount:* ₹${finalTotal.toLocaleString('en-IN')}\n` +
      (giftNote ? `\n*Wax-Sealed Calligraphy Message:* "${giftNote}"\n` : '') +
      `\nPlease confirm order acceptance and dispatch timeline.`
    );

    window.open(`https://wa.me/919645556010?text=${msg}`, '_blank');

    addInquiry({
      id: generatedId,
      timestamp: new Date().toLocaleString('en-IN'),
      customerName: fullName,
      phone,
      email: email || undefined,
      city,
      state,
      pincode,
      totalAmount: finalTotal,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      giftNote: giftNote || undefined,
    });

    setOrderComplete(true);
    toast.success(`Order ${generatedId} transferred to WhatsApp Concierge!`);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-[#C5A869]/30 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0B1D15] text-[#FCFBF8] border-b border-[#C5A869]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D8B979]" />
            <h2 className="text-base sm:text-lg font-serif-luxury tracking-wider">
              {orderComplete ? 'Order Transmitted via WhatsApp' : 'Direct WhatsApp Order & Delivery Details'}
            </h2>
          </div>
          
          <button
            type="button"
            onClick={() => {
              setIsCheckoutOpen(false);
              setOrderComplete(false);
            }}
            className="p-1.5 rounded-full text-[#EFE9DC]/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#183C2D] border border-[#C5A869] text-[#D8B979] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A869] font-medium">
                WhatsApp Dispatch Initiated
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#0B1D15]">
                Thank You, {fullName || 'Valued Patron'}
              </h3>
              <p className="text-xs text-[#68756F]">
                Order Reference ID: <strong className="text-[#0B1D15] font-mono">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-lg bg-[#FCFBF8] border border-[#EFE9DC] text-xs text-[#38423D] max-w-md mx-auto space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-[#68756F]">Delivery Destination:</span>
                <span className="font-medium text-[#0B1D15]">{city}, {state} ({pincode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68756F]">WhatsApp Concierge:</span>
                <span className="font-medium text-[#183C2D]">+91 96455 56010</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#68756F]">Total Amount:</span>
                <span className="font-semibold text-[#0B1D15]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p className="text-xs text-[#68756F] max-w-md mx-auto leading-relaxed">
              Your order summary and delivery instructions have been forwarded to our Fort Kochi studio WhatsApp (+91 96455 56010). Our team will reply shortly to confirm dispatch.
            </p>

            <button
              type="button"
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderComplete(false);
              }}
              className="px-8 py-3.5 rounded bg-[#0B1D15] text-[#FCFBF8] hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-md cursor-pointer"
            >
              Return to Gallery
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePlaceOrder} className="p-4 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Notice bar */}
            <div className="p-3.5 rounded-lg bg-[#F7F4EC] border border-[#C5A869]/40 flex items-center gap-3 text-xs text-[#0B1D15]">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold block text-[#0B1D15]">Direct WhatsApp Ordering</span>
                <span className="text-[#68756F]">No payment gateway hassle. Your order and details are transmitted directly to WhatsApp (+91 96455 56010).</span>
              </div>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-[#291010] border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Delivery Details */}
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#0B1D15] mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A869]" />
                <span>1. Pan-India Delivery Destination</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Varma"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">WhatsApp / Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number (e.g. 9645556010)"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#68756F] mb-1 font-medium">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="patron@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#68756F] mb-1 font-medium">Street Address, Flat / Villa No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Apartment Name, Street, Landmark"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">City / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kochi, Bengaluru, Mumbai"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] bg-white focus:outline-none focus:border-[#C5A869]"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">Postal PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit PIN (e.g. 682001)"
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value.replace(/\D/g, ''));
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#68756F] mb-1 font-medium">Preferred Delivery Date (Optional)</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>
            </div>

            {/* Personalized Note */}
            <div className="pt-4 border-t border-[#EFE9DC]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#0B1D15] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A869]" />
                <span>Complimentary Wax-Sealed Calligraphy Message (Optional)</span>
              </label>
              <textarea
                rows={2}
                placeholder="Message to be hand-lettered on archival deckle-edge cotton paper..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full text-xs p-2.5 rounded border border-[#EFE9DC] focus:outline-none focus:border-[#C5A869]"
              />
            </div>

            {/* Order Items Preview */}
            <div className="pt-4 border-t border-[#EFE9DC] space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#0B1D15] block">
                Selected Hampers ({items.length})
              </span>
              <div className="space-y-1.5 text-xs text-[#38423D] bg-[#FCFBF8] p-3 rounded border border-[#EFE9DC]">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span className="font-semibold text-[#0B1D15]">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total & Submit */}
            <div className="pt-4 border-t border-[#EFE9DC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-xs text-[#68756F] block">Total Amount:</span>
                <span className="text-2xl font-serif-luxury text-[#0B1D15] font-semibold">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#25D366] block font-medium">
                  Free Pan-India Express Delivery
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 shadow-xl cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Confirm & Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
