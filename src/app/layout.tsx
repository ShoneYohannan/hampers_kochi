import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import CartDrawer from '@/components/ui/CartDrawer';
import CheckoutModal from '@/components/ui/CheckoutModal';
import WhatsAppConcierge from '@/components/ui/WhatsAppConcierge';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THE KOCHI ATELIER | Luxury Hampers & Haute Gifting Curations',
  description:
    'Handcrafted luxury gift hampers curated in Kochi, delivered across India. Artisanal treats, single-estate teas, heirloom brassware, and bespoke wax-sealed calligraphy.',
  keywords: [
    'luxury hampers kochi',
    'luxury gift hampers india',
    'kerala artisanal hampers',
    'corporate gifting kochi',
    'wedding hampers kerala',
    'luxury dry fruit hampers',
    'birthday gift hampers india',
  ],
  openGraph: {
    title: 'THE KOCHI ATELIER | Haute Gifting & Luxury Curations',
    description: 'Bespoke artisanal hampers handcrafted in Kochi. Express delivery all over India.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FCFBF8] text-[#141A17] font-sans-clean antialiased selection:bg-[#C5A869]/25 selection:text-[#0B1D15] flex flex-col">
        <CartProvider>
          <WishlistProvider>
            {children}
            <CartDrawer />
            <CheckoutModal />
            <WhatsAppConcierge />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
