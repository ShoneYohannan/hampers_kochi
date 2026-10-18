import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import { CmsProvider } from '@/context/CmsContext';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B1D15',
};

export const metadata: Metadata = {
  title: {
    default: 'hampers_kochi | Luxury Gift Hampers Delivered Across India',
    template: '%s | hampers_kochi • The Kochi Atelier',
  },
  description:
    'Handcrafted luxury gift hampers curated in Kochi, delivered across India. Artisanal delicacies, single-estate teas, heirloom brassware, and bespoke wax-sealed calligraphy.',
  keywords: [
    'luxury hampers kochi',
    'luxury gift hampers india',
    'kerala artisanal hampers',
    'corporate gifting kochi',
    'wedding hampers kerala',
    'luxury dry fruit hampers',
    'birthday gift hampers india',
    'the kochi atelier',
  ],
  authors: [{ name: 'The Kochi Atelier' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'hampers_kochi | Haute Gifting & Luxury Curations',
    description: 'Bespoke artisanal hampers handcrafted in Kochi. Express delivery all over India.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'hampers_kochi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'hampers_kochi | Luxury Gift Hampers Delivered Across India',
    description: 'Handcrafted luxury gift hampers curated in Kochi, delivered across India.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FCFBF8] text-[#141A17] font-sans-clean antialiased selection:bg-[#C5A869]/25 selection:text-[#0B1D15] flex flex-col overflow-x-hidden">
        <CmsProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <CartDrawer />
                <CheckoutModal />
                <WhatsAppConcierge />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </CmsProvider>
      </body>
    </html>
  );
}
