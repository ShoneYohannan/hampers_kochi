export type OccasionCategory = 
  | 'All'
  | 'Bestsellers'
  | 'Birthday'
  | 'Wedding & Bridal'
  | 'Anniversary & Romance'
  | 'Festive & Celebration'
  | 'Corporate & Executive'
  | 'Gourmet & Sweets'
  | 'Personalized & Keepsakes';

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  category: OccasionCategory;
  tags: string[];
  description: string;
  detailedDescription: string;
  contents: string[];
  boxType: string;
  dimensions: string;
  weight: string;
  deliveryEstimate: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isLimitedEdition?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedGiftCard?: string;
  giftMessage?: string;
  recipientName?: string;
}

export interface BuilderItem {
  id: string;
  name: string;
  category: 'box' | 'treats' | 'beverages' | 'keepsakes' | 'finishing';
  price: number;
  image?: string;
  description: string;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryDate?: string;
  giftMessage?: string;
  paymentMethod?: 'whatsapp';
}

export interface StoreSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  studioHours: string;
  promoCode: string;
  promoDiscountPercent: number;
  freeShippingThreshold: number;
}

export interface OrderInquiry {
  id: string;
  timestamp: string;
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  state: string;
  pincode: string;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
  giftNote?: string;
}

export interface OccasionItem {
  title: string;
  category: OccasionCategory;
  description: string;
  image: string;
  itemCount: string;
}

export interface SiteContent {
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  story: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    callout1: string;
    p3: string;
    callout2: string;
    p4: string;
    p5: string;
  };
  faqs: {
    category: string;
    question: string;
    answer: string;
  }[];
}

