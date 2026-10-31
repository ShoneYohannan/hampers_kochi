'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, StoreSettings, OrderInquiry, OccasionItem, HeroData } from '@/types';
import { ALL_PRODUCTS, OCCASIONS_DATA, DEFAULT_HERO_DATA } from '@/data/products';
import { createClient } from '@/lib/supabase/client';

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

  occasions: OccasionItem[];
  updateOccasion: (index: number, updated: Partial<OccasionItem>) => void;
  updateOccasions: (list: OccasionItem[]) => void;
  resetOccasionsToDefault: () => void;

  hero: HeroData;
  updateHero: (updated: Partial<HeroData>) => void;
  resetHeroToDefault: () => void;

  inquiries: OrderInquiry[];
  addInquiry: (inquiry: OrderInquiry) => void;
  deleteInquiry: (id: string) => void;
  clearInquiries: () => void;

  isLoaded: boolean;
}

const DEFAULT_ANNOUNCEMENTS = [
  'HAND-TIED BY HAMPERS KOCHI · ALL-INDIA DELIVERY',
  'COMPLIMENTARY PERSONALIZED CALLIGRAPHY NOTE WITH EVERY ORDER',
  'PRE-ORDER ONLY · LUXURY HANDCRAFTED HAMPERS · ALL-INDIA DELIVERY',
];

const DEFAULT_SETTINGS: StoreSettings = {
  phone: '+91 98460 02241',
  whatsapp: '919846002241',
  email: 'HampersKochi@gmail.com',
  address: "Seethy's tower, vallathol jn, Kakkanad.",
  studioHours: 'Mon to Sun: 9:30 AM – 7:30 PM',
  promoCode: '',
  promoDiscountPercent: 0,
  freeShippingThreshold: 2999,
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(ALL_PRODUCTS);
  const [announcements, setAnnouncements] = useState<string[]>(DEFAULT_ANNOUNCEMENTS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [occasions, setOccasions] = useState<OccasionItem[]>(OCCASIONS_DATA);
  const [hero, setHero] = useState<HeroData>(DEFAULT_HERO_DATA);
  const [inquiries, setInquiries] = useState<OrderInquiry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from Supabase and cache in localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('atelier_products');
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed.filter((p: any) => !p.id?.startsWith('site-')));
        }
      }

      const storedAnnouncements = localStorage.getItem('atelier_announcements');
      if (storedAnnouncements) {
        const parsedAnnounce = JSON.parse(storedAnnouncements);
        if (Array.isArray(parsedAnnounce) && parsedAnnounce.length > 0) {
          const cleaned = parsedAnnounce
            .map((msg: string) =>
              typeof msg === 'string'
                ? msg
                    .replace(/\s*·\s*CODE:\s*ROYAL10\s*FOR\s*10%\s*OFF/gi, '')
                    .replace(/CODE:\s*ROYAL10\s*FOR\s*10%\s*OFF/gi, '')
                    .replace(/·?\s*DELIVERED\s*ACROSS\s*INDIA\s*WITHIN\s*48\s*HOURS/gi, '· ALL-INDIA DELIVERY')
                    .replace(/\s*WITHIN\s*48\s*HOURS/gi, '')
                    .replace(/IN OUR KOCHI ATELIER/gi, 'BY HAMPERS KOCHI')
                    .trim()
                : ''
            )
            .filter((msg: string) => msg.length > 0);
          setAnnouncements(cleaned.length > 0 ? cleaned : DEFAULT_ANNOUNCEMENTS);
        }
      }

      const storedSettings = localStorage.getItem('atelier_settings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        if (parsedSettings.phone === '+91 96455 56010' || parsedSettings.phone?.includes('96455')) {
          parsedSettings.phone = '+91 98460 02241';
        }
        if (parsedSettings.whatsapp === '919645556010') {
          parsedSettings.whatsapp = '919846002241';
        }
        if (parsedSettings.email === 'concierge@thekochiatelier.com' || parsedSettings.email?.includes('thekochiatelier') || parsedSettings.email === 'concierge@hamperskochi.com') {
          parsedSettings.email = 'HampersKochi@gmail.com';
        }
        if (parsedSettings.address?.includes('Panampilly') || parsedSettings.address?.includes('Fort Kochi') || parsedSettings.address?.includes('vallathol')) {
          parsedSettings.address = "Seethy's tower, vallathol jn, Kakkanad.";
        }
        if (!parsedSettings.studioHours || parsedSettings.studioHours.includes('Monday – Saturday') || parsedSettings.studioHours.includes('8:00') || parsedSettings.studioHours.includes('Appointment')) {
          parsedSettings.studioHours = 'Mon to Sun: 9:30 AM – 7:30 PM';
        }
        setSettings((prev) => ({ ...prev, ...parsedSettings }));
      }

      // Load Occasions from localStorage
      const storedOccasions = localStorage.getItem('hk_occasions');
      if (storedOccasions) {
        try {
          const parsed = JSON.parse(storedOccasions);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setOccasions(parsed);
          }
        } catch {}
      }

      // Load Hero from localStorage
      const storedHero = localStorage.getItem('hk_hero_data');
      if (storedHero) {
        try {
          const parsed = JSON.parse(storedHero);
          if (parsed && typeof parsed === 'object') {
            setHero((prev) => ({
              ...prev,
              ...parsed,
              images: Array.isArray(parsed.images) && parsed.images.length > 0 ? parsed.images : prev.images,
            }));
          }
        } catch {}
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

    // Fetch live products AND site configs from Supabase
    const fetchSupabaseData = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // 1. Process custom configs (occasions & hero)
          data.forEach((item: any) => {
            if (item.id === 'site-occasions' && item.description) {
              try {
                const parsed = JSON.parse(item.description);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  setOccasions(parsed);
                  localStorage.setItem('hk_occasions', JSON.stringify(parsed));
                }
              } catch (e) {}
            }
            if (item.id === 'site-hero' && item.description) {
              try {
                const parsed = JSON.parse(item.description);
                if (parsed && typeof parsed === 'object') {
                  setHero((prev) => ({
                    ...prev,
                    ...parsed,
                    images: Array.isArray(parsed.images) && parsed.images.length > 0 ? parsed.images : prev.images,
                  }));
                  localStorage.setItem('hk_hero_data', JSON.stringify(parsed));
                }
              } catch (e) {}
            }
          });

          // 2. Process real products (excluding internal config rows)
          const realProducts = data.filter((item: any) => !item.id?.startsWith('site-'));
          if (realProducts.length > 0) {
            const formatted: Product[] = realProducts.map((item: any) => ({
              id: item.id,
              name: item.name,
              slug: item.slug,
              subtitle: item.subtitle || '',
              price: Number(item.price),
              originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
              rating: item.rating ? Number(item.rating) : 4.9,
              reviewsCount: item.reviewsCount ? Number(item.reviewsCount) : 1,
              image: item.image,
              galleryImages: item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.image],
              category: item.category,
              tags: item.tags || [],
              description: item.description || '',
              detailedDescription: item.detailedDescription || item.description || '',
              contents: item.contents || [],
              boxType: item.boxType || '',
              dimensions: item.dimensions || '',
              weight: item.weight || '',
              deliveryEstimate: item.deliveryEstimate || '',
              isBestseller: !!item.isBestseller,
              isNewArrival: !!item.isNewArrival,
              isLimitedEdition: !!item.isLimitedEdition,
            }));

            setProducts(formatted);
            try {
              localStorage.setItem('atelier_products', JSON.stringify(formatted));
            } catch {}
          }
        }
      } catch (err) {
        console.warn('Supabase fetch fallback:', err);
      }
    };

    fetchSupabaseData();
    // Background lightweight ping to keep Supabase awake
    try {
      fetch('/api/cron/keepalive').catch(() => {});
    } catch {}
  }, []);

  // Save products with Supabase persistence
  const addProduct = async (newProduct: Product) => {
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase.from('products').insert([
        {
          id: newProduct.id,
          name: newProduct.name,
          slug: newProduct.slug,
          subtitle: newProduct.subtitle,
          price: newProduct.price,
          originalPrice: newProduct.originalPrice || null,
          rating: newProduct.rating || 5.0,
          reviewsCount: newProduct.reviewsCount || 1,
          image: newProduct.image,
          galleryImages: newProduct.galleryImages || [newProduct.image],
          category: newProduct.category,
          tags: newProduct.tags || [],
          description: newProduct.description,
          detailedDescription: newProduct.detailedDescription || newProduct.description,
          contents: newProduct.contents || [],
          boxType: newProduct.boxType,
          dimensions: newProduct.dimensions,
          weight: newProduct.weight,
          deliveryEstimate: newProduct.deliveryEstimate,
          isBestseller: !!newProduct.isBestseller,
          isNewArrival: !!newProduct.isNewArrival,
          isLimitedEdition: !!newProduct.isLimitedEdition,
        },
      ]);
      if (error) console.error('Supabase addProduct error:', error);
    } catch (err) {
      console.error('Supabase addProduct exception:', err);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .update(updatedFields)
        .eq('id', id);
      if (error) console.error('Supabase updateProduct error:', error);
    } catch (err) {
      console.error('Supabase updateProduct exception:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('atelier_products', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) console.error('Supabase deleteProduct error:', error);
    } catch (err) {
      console.error('Supabase deleteProduct exception:', err);
    }
  };

  const resetProductsToDefault = async () => {
    setProducts(ALL_PRODUCTS);
    try {
      localStorage.removeItem('atelier_products');
      const supabase = createClient();
      await supabase.from('products').upsert(ALL_PRODUCTS, { onConflict: 'id' });
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

  // Save Occasions with Supabase Cloud Sync
  const updateOccasion = async (index: number, updated: Partial<OccasionItem>) => {
    let nextList: OccasionItem[] = [];
    setOccasions((prev) => {
      const next = [...prev];
      if (index >= 0 && index < next.length) {
        next[index] = { ...next[index], ...updated };
      }
      nextList = next;
      try {
        localStorage.setItem('hk_occasions', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });

    try {
      const supabase = createClient();
      await supabase.from('products').upsert({
        id: 'site-occasions',
        name: '__SITE_OCCASIONS__',
        slug: 'site-occasions',
        subtitle: 'Occasions Configuration',
        price: 0,
        category: 'All',
        image: '',
        galleryImages: [],
        tags: ['__INTERNAL__'],
        description: JSON.stringify(nextList),
        detailedDescription: '',
        contents: [],
        boxType: '',
        dimensions: '',
        weight: '',
        deliveryEstimate: '',
      });
    } catch (err) {
      console.error('Supabase updateOccasion sync error:', err);
    }
  };

  const updateOccasions = async (list: OccasionItem[]) => {
    setOccasions(list);
    try {
      localStorage.setItem('hk_occasions', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    try {
      const supabase = createClient();
      await supabase.from('products').upsert({
        id: 'site-occasions',
        name: '__SITE_OCCASIONS__',
        slug: 'site-occasions',
        subtitle: 'Occasions Configuration',
        price: 0,
        category: 'All',
        image: '',
        galleryImages: [],
        tags: ['__INTERNAL__'],
        description: JSON.stringify(list),
        detailedDescription: '',
        contents: [],
        boxType: '',
        dimensions: '',
        weight: '',
        deliveryEstimate: '',
      });
    } catch (err) {
      console.error('Supabase updateOccasions sync error:', err);
    }
  };

  const resetOccasionsToDefault = async () => {
    setOccasions(OCCASIONS_DATA);
    try {
      localStorage.removeItem('hk_occasions');
      const supabase = createClient();
      await supabase.from('products').delete().eq('id', 'site-occasions');
    } catch (err) {
      console.error(err);
    }
  };

  // Save Hero Data with Supabase Cloud Sync
  const updateHero = async (updated: Partial<HeroData>) => {
    let nextHero: HeroData = DEFAULT_HERO_DATA;
    setHero((prev) => {
      const next = { ...prev, ...updated };
      nextHero = next;
      try {
        localStorage.setItem('hk_hero_data', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });

    try {
      const supabase = createClient();
      await supabase.from('products').upsert({
        id: 'site-hero',
        name: '__SITE_HERO__',
        slug: 'site-hero',
        subtitle: 'Hero Banner Configuration',
        price: 0,
        category: 'All',
        image: '',
        galleryImages: [],
        tags: ['__INTERNAL__'],
        description: JSON.stringify(nextHero),
        detailedDescription: '',
        contents: [],
        boxType: '',
        dimensions: '',
        weight: '',
        deliveryEstimate: '',
      });
    } catch (err) {
      console.error('Supabase updateHero sync error:', err);
    }
  };

  const resetHeroToDefault = async () => {
    setHero(DEFAULT_HERO_DATA);
    try {
      localStorage.removeItem('hk_hero_data');
      const supabase = createClient();
      await supabase.from('products').delete().eq('id', 'site-hero');
    } catch (err) {
      console.error(err);
    }
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
        occasions,
        updateOccasion,
        updateOccasions,
        resetOccasionsToDefault,
        hero,
        updateHero,
        resetHeroToDefault,
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
