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

export interface HeroSlideImage {
  src: string;
  alt: string;
  pos?: string;
}

export interface HeroData {
  tagline: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  images: HeroSlideImage[];
}
