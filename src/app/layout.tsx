import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import { CmsProvider } from '@/context/CmsContext';
import WhatsAppConcierge from '@/components/ui/WhatsAppConcierge';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B1D15',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hamperskochi.com'),
  title: {
    default: 'Hampers  Kochi | Luxury Gift Hampers Delivered Across India',
    template: '%s | Hampers  Kochi',
  },
  description:
    'Handcrafted luxury gift hampers curated in Kochi, Kerala. Heirloom brass keepsakes, Kasavu silks, single-estate teas, Belgian chocolates & wax-sealed calligraphy with express all-India delivery.',
  keywords: [
    'luxury hampers kochi',
    'luxury gift hampers india',
    'kerala artisanal hampers',
    'corporate gifting kochi',
    'wedding hampers kerala',
    'luxury dry fruit hampers',
    'birthday gift hampers india',
    'hampers_kochi',
    'hampers kochi',
    'bespoke hampers ernakulam',
    'kasavu silk hampers',
    'brass vilakku hampers',
  ],
  authors: [{ name: 'HamPers Kochi Curators', url: 'https://hamperskochi.com/#curator' }],
  creator: 'HamPers Kochi',
  publisher: 'HamPers Kochi',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-hampers-kochi-official',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'HamPers Kochi | Haute Gifting & Luxury Curations',
    description:
      'Handcrafted luxury gift hampers curated in Kochi, Kerala. Heirloom brass keepsakes, single-estate teas, artisanal chocolates & wax-sealed calligraphy.',
    url: 'https://hamperskochi.com',
    siteName: 'HamPers Kochi',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/front.jpg',
        width: 1200,
        height: 630,
        alt: 'HamPers Kochi - Handcrafted Luxury Gift Hampers in Kerala',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HamPers Kochi | Luxury Gift Hampers Delivered Across India',
    description:
      'Bespoke artisanal gift hampers handcrafted in Kochi, Kerala. Express climate-protected delivery across India.',
    images: ['/images/front.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#FCFBF8] text-[#141A17] font-sans-clean antialiased selection:bg-[#C5A869]/25 selection:text-[#0B1D15] flex flex-col overflow-x-hidden">
        <CmsProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <WhatsAppConcierge />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </CmsProvider>
      </body>
    </html>
  );
}
