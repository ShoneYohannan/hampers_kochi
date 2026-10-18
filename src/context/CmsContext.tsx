'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings, OrderInquiry } from '@/types';
import { ALL_PRODUCTS } from '@/data/products';

interface CmsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  
  announcements: string[];
  updateAnnouncements: (list: string[]) => void;
  
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  inquiries: OrderInquiry[];
  addInquiry: (inquiry: OrderInquiry) => void;
  deleteInquiry: (id: string) => void;
  clearInquiries: () => void;

  isLoaded: boolean;
}

const DEFAULT_ANNOUNCEMENTS = [
  'HAND-TIED IN OUR KOCHI ATELIER · DELIVERED ACROSS INDIA WITHIN 48 HOURS',
  'COMPLIMENTARY CALLIGRAPHY NOTE WITH EVERY ORDER · CODE: ROYAL10 FOR 10% OFF',
  'SAME-DAY DELIVERY IN KOCHI · EXPRESS PAN-INDIA ACROSS 28,000+ PINCODES',
];

const DEFAULT_SETTINGS: StoreSettings = {
  phone: '+91 96455 56010',
  whatsapp: '919645556010',
  email: 'concierge@thekochiatelier.com',
  address: 'Atelier House, 4th Cross Road, Panampilly Nagar & Bastion Street, Fort Kochi, Kerala 682001',
  studioHours: 'Monday – Saturday, 9:30 AM – 8:00 PM IST',
  promoCode: 'ROYAL10',
  promoDiscountPercent: 10,
  freeShippingThreshold: 2999,
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [announcements, setAnnouncements] = useState<string[]>(DEFAULT_ANNOUNCEMENTS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [inquiries, setInquiries] = useState<OrderInquiry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage safely on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('atelier_products');
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }

      const storedAnnouncements = localStorage.getItem('atelier_announcements');
      if (storedAnnouncements) {
        const parsedAnnounce = JSON.parse(storedAnnouncements);
        if (Array.isArray(parsedAnnounce) && parsedAnnounce.length > 0) {
          setAnnouncements(parsedAnnounce);
        }
      }

      const storedSettings = localStorage.getItem('atelier_settings');
      if (storedSettings) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(storedSettings) }));
      }

      const storedInquiries = localStorage.getItem('atelier_inquiries');
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save products
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const resetProductsToDefault = () => {
    setProducts(ALL_PRODUCTS);
    try {
      localStorage.removeItem('atelier_products');
    } catch (err) {
      console.error(err);
    }
  };

  // Save announcements
  const updateAnnouncements = (list: string[]) => {
    setAnnouncements(list);
    try {
      localStorage.setItem('atelier_announcements', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }
  };

  // Save settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('atelier_settings', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Save inquiries
  const addInquiry = (inquiry: OrderInquiry) => {
    setInquiries((prev) => {
      const updated = [inquiry, ...prev];
      try {
        localStorage.setItem('atelier_inquiries', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem('atelier_inquiries', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  const clearInquiries = () => {
    setInquiries([]);
    try {
      localStorage.removeItem('atelier_inquiries');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CmsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        announcements,
        updateAnnouncements,
        settings,
        updateSettings,
        inquiries,
        addInquiry,
        deleteInquiry,
        clearInquiries,
        isLoaded,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
}
