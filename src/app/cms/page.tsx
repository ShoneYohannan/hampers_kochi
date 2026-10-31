'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Lock,
  KeyRound,
  Plus,
  Edit3,
  Trash2,
  Save,
  RotateCcw,
  Search,
  ArrowLeft,
  PackageOpen,
  Download,
  Upload,
  CheckCircle2,
  Bell,
  Settings,
  ClipboardList,
  Phone,
  Mail,
  MapPin,
  Clock,
  Tag,
  Star,
  ExternalLink,
  X,
  Filter,
  Layers,
  Layout,
  ArrowUpRight,
  UploadCloud,
  Image as ImageIcon
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import { useToast } from '@/context/ToastContext';
import { Product, OccasionCategory, OccasionItem, HeroSlideImage } from '@/types';

const CATEGORIES: OccasionCategory[] = [
  'Bestsellers',
  'Birthday',
  'Wedding & Bridal',
  'Anniversary & Romance',
  'Festive & Celebration',
  'Corporate & Executive',
  'Gourmet & Sweets',
  'Personalized & Keepsakes',
];

const PRESET_IMAGES = [
  '/images/front.jpg',
  '/images/1001373001.jpg.jpeg',
  '/images/1001436447.jpg.jpeg',
  '/images/1001483615.jpg.jpeg',
  '/images/1001490450.jpg.jpeg',
  '/images/1001551239.jpg.jpeg',
  '/images/1001551007.jpg.jpeg',
  '/images/1001629822.jpg.jpeg',
  '/images/1001611483.jpg.jpeg',
  '/images/1001707222.jpg.jpeg',
  '/images/1001726475.jpg.jpeg',
  '/images/1001981345.jpg.jpeg',
  '/images/celebration-birthday-hamper.jpg',
  '/images/1001901798.jpg.jpeg',
  '/images/1002015334.jpg.jpeg',
  '/images/1002090346.jpg.jpeg',
];

/**
 * Browser-side image downscaler & compressor.
 * Reads camera/device photos, resizes to maxDimension (e.g. 1000px) on HTML5 canvas,
 * and encodes to compact JPEG data URL for instant cloud persistence & fast page loading.
 */
function compressImageFile(file: File, maxDimension = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select an image file (JPG, PNG, WEBP)'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Could not parse image'));
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function CmsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    occasions,
    updateOccasion,
    resetOccasionsToDefault,
    hero,
    updateHero,
    resetHeroToDefault,
    announcements,
    updateAnnouncements,
    settings,
    updateSettings,
    inquiries,
    deleteInquiry,
    clearInquiries,
  } = useCms();

  const toast = useToast();

  // Authentication PIN protection (8606)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('hk_cms_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === '8606') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('hk_cms_authenticated', 'true');
      toast.success('Access granted. Welcome to Hampers Kochi CMS.');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
      toast.error('Incorrect passcode. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscodeInput('');
    sessionStorage.removeItem('hk_cms_authenticated');
    toast.info('CMS Dashboard locked.');
  };

  const [activeTab, setActiveTab] = useState<'products' | 'hero' | 'occasions' | 'announcements' | 'settings' | 'inquiries'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [formName, setFormName] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formPrice, setFormPrice] = useState<number>(3999);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(4999);
  const [formCategory, setFormCategory] = useState<OccasionCategory>('Bestsellers');
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0]);
  const [formDescription, setFormDescription] = useState('');
  const [formContentsText, setFormContentsText] = useState('');
  const [formBoxType, setFormBoxType] = useState('Handcrafted Emerald Velvet Rigid Trunk');
  const [formIsBestseller, setFormIsBestseller] = useState(false);
  const [formIsLimitedEdition, setFormIsLimitedEdition] = useState(false);

  // Hero Section Form State
  const [heroTagline, setHeroTagline] = useState(hero?.tagline || 'HamPers Kochi');
  const [heroTitle1, setHeroTitle1] = useState(hero?.titleLine1 || 'From Milestones to');
  const [heroTitle2, setHeroTitle2] = useState(hero?.titleLine2 || '“Thinking of You” Moments');
  const [heroDesc, setHeroDesc] = useState(hero?.description || '');
  const [heroImages, setHeroImages] = useState<HeroSlideImage[]>(hero?.images || []);
  const [newHeroImgUrl, setNewHeroImgUrl] = useState('');
  const [newHeroImgAlt, setNewHeroImgAlt] = useState('');

  // Occasions Section Form State
  const [editingOccasionIndex, setEditingOccasionIndex] = useState<number | null>(null);
  const [formOccasionTitle, setFormOccasionTitle] = useState('');
  const [formOccasionCategory, setFormOccasionCategory] = useState<OccasionCategory>('Birthday');
  const [formOccasionDescription, setFormOccasionDescription] = useState('');
  const [formOccasionImage, setFormOccasionImage] = useState(PRESET_IMAGES[0]);
  const [formOccasionItemCount, setFormOccasionItemCount] = useState('6 Curations');

  // Image Upload Processing States
  const [isProcessingOccasionImage, setIsProcessingOccasionImage] = useState(false);
  const [isProcessingHeroImage, setIsProcessingHeroImage] = useState(false);
  const [isProcessingProductImage, setIsProcessingProductImage] = useState(false);

  // Announcement state for editing
  const [tempAnnouncements, setTempAnnouncements] = useState<string[]>(announcements);
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  // Settings state for editing
  const [tempSettings, setTempSettings] = useState(settings);

  useEffect(() => {
    if (hero) {
      setHeroTagline(hero.tagline || 'HamPers Kochi');
      setHeroTitle1(hero.titleLine1 || 'From Milestones to');
      setHeroTitle2(hero.titleLine2 || '“Thinking of You” Moments');
      setHeroDesc(hero.description || '');
      setHeroImages(hero.images || []);
    }
  }, [hero]);

  useEffect(() => {
    setTempAnnouncements(announcements);
  }, [announcements]);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'All' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setIsAddingNew(false);
    setFormName(p.name);
    setFormSubtitle(p.subtitle);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || Math.round(p.price * 1.25));
    setFormCategory(p.category);
    setFormImage(p.image);
    setFormDescription(p.description);
    setFormContentsText(p.contents.join('\n'));
    setFormBoxType(p.boxType || 'Handmade Velvet Rigid Trunk');
    setFormIsBestseller(!!p.isBestseller);
    setFormIsLimitedEdition(!!p.isLimitedEdition);
  };

  const openAddNewModal = () => {
    setEditingProduct(null);
    setIsAddingNew(true);
    setFormName('');
    setFormSubtitle('');
    setFormPrice(4499);
    setFormOriginalPrice(5499);
    setFormCategory('Bestsellers');
    setFormImage(PRESET_IMAGES[0]);
    setFormDescription('');
    setFormContentsText('Handcrafted Keepsake item\nArtisanal Delicacy Treat\nCustom Ribbon & Box');
    setFormBoxType('Handmade Emerald Velvet Rigid Trunk');
    setFormIsBestseller(false);
    setFormIsLimitedEdition(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error('Product title is required');
      return;
    }

    const contentsArray = formContentsText
      .split('\n')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (isAddingNew) {
      const newId = 'hamper-' + Date.now();
      const slug = formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newProd: Product = {
        id: newId,
        name: formName.trim(),
        slug,
        subtitle: formSubtitle.trim(),
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        rating: 5.0,
        reviewsCount: 1,
        image: formImage.trim() || PRESET_IMAGES[0],
        galleryImages: [formImage.trim() || PRESET_IMAGES[0]],
        category: formCategory,
        tags: [formCategory, 'All-India Delivery'],
        description: formDescription.trim(),
        detailedDescription: formDescription.trim(),
        contents: contentsArray,
        boxType: formBoxType.trim(),
        dimensions: "12\" x 10\" x 5\"",
        weight: '2.5 kg',
        deliveryEstimate: 'Pre-Order Only | Kochi & All-India Delivery',
        isBestseller: formIsBestseller,
        isNewArrival: true,
        isLimitedEdition: formIsLimitedEdition,
      };

      addProduct(newProd);
      toast.success('New luxury hamper added and published!');
    } else if (editingProduct) {
      const updatedFields: Partial<Product> = {
        name: formName.trim(),
        subtitle: formSubtitle.trim(),
        price: Number(formPrice),
        originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
        category: formCategory,
        image: formImage.trim() || editingProduct.image,
        description: formDescription.trim(),
        detailedDescription: formDescription.trim(),
        contents: contentsArray,
        boxType: formBoxType.trim(),
        isBestseller: formIsBestseller,
        isLimitedEdition: formIsLimitedEdition,
      };

      updateProduct(editingProduct.id, updatedFields);
      toast.success('Hamper details updated!');
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDeleteProduct = (p: Product) => {
    if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
      deleteProduct(p.id);
      toast.success('Hamper removed.');
    }
  };

  // Hero Section Handlers
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero({
      tagline: heroTagline.trim(),
      titleLine1: heroTitle1.trim(),
      titleLine2: heroTitle2.trim(),
      description: heroDesc.trim(),
      images: heroImages,
    });
    toast.success('Hero section text & images updated on Homepage!');
  };

  const handleAddHeroImage = () => {
    if (!newHeroImgUrl.trim()) {
      toast.error('Please enter or select an image');
      return;
    }
    const newSlide: HeroSlideImage = {
      src: newHeroImgUrl.trim(),
      alt: newHeroImgAlt.trim() || 'Hampers Kochi Luxury Hamper Visual',
      pos: 'center 40%',
    };
    const updated = [...heroImages, newSlide];
    setHeroImages(updated);
    updateHero({ images: updated });
    setNewHeroImgUrl('');
    setNewHeroImgAlt('');
    toast.success('New hero slider image added!');
  };

  const handleDeleteHeroImage = (index: number) => {
    if (heroImages.length <= 1) {
      toast.error('You must keep at least 1 image for the hero banner.');
      return;
    }
    const updated = heroImages.filter((_, i) => i !== index);
    setHeroImages(updated);
    updateHero({ images: updated });
    toast.info('Hero image removed.');
  };

  // Image Upload Handlers for Device Photos
  const handleOccasionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingOccasionImage(true);
      const dataUrl = await compressImageFile(file, 1000, 0.82);
      setFormOccasionImage(dataUrl);
      toast.success('Photo uploaded from device! Preview updated below.');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload photo');
    } finally {
      setIsProcessingOccasionImage(false);
      e.target.value = '';
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingHeroImage(true);
      const dataUrl = await compressImageFile(file, 1200, 0.82);
      setNewHeroImgUrl(dataUrl);
      toast.success('Hero photo loaded from device! Click "Add Image Slide" to insert.');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload photo');
    } finally {
      setIsProcessingHeroImage(false);
      e.target.value = '';
    }
  };

  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsProcessingProductImage(true);
      const dataUrl = await compressImageFile(file, 1000, 0.82);
      setFormImage(dataUrl);
      toast.success('Hamper photo uploaded from device!');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload photo');
    } finally {
      setIsProcessingProductImage(false);
      e.target.value = '';
    }
  };

  // Occasions Section Handlers
  const openEditOccasionModal = (index: number) => {
    const item = occasions[index];
    if (!item) return;
    setEditingOccasionIndex(index);
    setFormOccasionTitle(item.title);
    setFormOccasionCategory(item.category);
    setFormOccasionDescription(item.description);
    setFormOccasionImage(item.image);
    setFormOccasionItemCount(item.itemCount);
  };

  const handleSaveOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOccasionIndex === null) return;
    if (!formOccasionTitle.trim()) {
      toast.error('Occasion title is required');
      return;
    }

    const updatedItem: OccasionItem = {
      title: formOccasionTitle.trim(),
      category: formOccasionCategory,
      description: formOccasionDescription.trim(),
      image: formOccasionImage.trim() || PRESET_IMAGES[0],
      itemCount: formOccasionItemCount.trim() || '5 Curations',
    };

    updateOccasion(editingOccasionIndex, updatedItem);
    setEditingOccasionIndex(null);
    toast.success(`Occasion "${updatedItem.title}" updated!`);
  };

  // Announcements Handlers
  const handleAddAnnouncement = () => {
    if (!newAnnouncementText.trim()) return;
    const updated = [...tempAnnouncements, newAnnouncementText.trim()];
    setTempAnnouncements(updated);
    updateAnnouncements(updated);
    setNewAnnouncementText('');
    toast.success('New announcement added.');
  };

  const handleDeleteAnnouncement = (index: number) => {
    const updated = tempAnnouncements.filter((_, i) => i !== index);
    setTempAnnouncements(updated);
    updateAnnouncements(updated);
    toast.info('Announcement removed.');
  };

  // Settings Handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(tempSettings);
    toast.success('Store & Concierge settings updated successfully.');
  };

  // Export / Backup JSON
  const handleExportJson = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      products,
      hero,
      occasions,
      announcements,
      settings,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hampers-kochi-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Backup downloaded.');
  };

  // Lock Screen Check
  if (!hasMounted) {
    return <div className="min-h-screen bg-[#0B1D15]" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B1D15] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#10291E] border border-[#C5A869]/30 rounded-2xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#183C2D] border border-[#C5A869]/40 flex items-center justify-center text-[#D8B979] shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#C5A869] font-medium mb-1">
              Protected Administrator Area
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury text-[#FCFBF8]">
              Hampers Kochi CMS
            </h1>
            <p className="text-xs text-[#EFE9DC]/70 mt-2 font-light">
              Enter your secure 4-digit PIN to access front-page editors, occasions, and catalog.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                autoFocus
                placeholder="Enter PIN (e.g. 8606)"
                value={passcodeInput}
                onChange={(e) => {
                  setPasscodeInput(e.target.value);
                  setAuthError('');
                }}
                className="w-full text-center text-xl tracking-[0.3em] py-3.5 px-4 rounded-lg bg-[#0B1D15] border border-[#C5A869]/40 text-[#FCFBF8] focus:outline-none focus:border-[#D8B979] placeholder:text-[#EFE9DC]/30 placeholder:tracking-normal placeholder:text-sm font-mono"
              />
              {authError && (
                <p className="text-xs text-red-400 mt-2 font-medium">
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-lg bg-[#C5A869] hover:bg-[#D8B979] text-[#0B1D15] font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Unlock Dashboard</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#C5A869]/15">
            <Link
              href="/"
              className="text-xs text-[#EFE9DC]/60 hover:text-[#D8B979] transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1D15] text-[#FCFBF8] font-sans-clean flex flex-col">
      {/* Top CMS Header */}
      <header className="sticky top-0 z-40 bg-[#0B1D15]/98 backdrop-blur-md border-b border-[#C5A869]/30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-sm bg-[#183C2D] border border-[#C5A869]/40 hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors"
              title="Return to Live Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#C5A869] font-medium">
                Hampers Kochi CMS Portal
              </div>
              <h1 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                Content Management System
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 rounded bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] hover:text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded bg-red-950/70 border border-red-500/40 text-red-300 hover:bg-red-900 hover:text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lock Admin Dashboard"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-[#C5A869]/15 pt-3">
          {[
            { id: 'products', label: `Hampers Catalog (${products.length})`, icon: Package },
            { id: 'hero', label: 'Front Page: Hero Banner', icon: Layout },
            { id: 'occasions', label: `Front Page: Occasions (${occasions.length})`, icon: Layers },
            { id: 'announcements', label: 'Announcements Bar', icon: Bell },
            { id: 'settings', label: 'Store & Concierge', icon: Settings },
            { id: 'inquiries', label: `WhatsApp Inquiries (${inquiries.length})`, icon: ClipboardList },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-sm text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C5A869] text-[#0B1D15] font-semibold shadow-md'
                    : 'bg-[#183C2D]/60 text-[#EFE9DC]/75 hover:bg-[#183C2D] hover:text-[#C5A869]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main CMS Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">

        {/* ─── TAB 1: PRODUCTS / HAMPERS ─── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Luxury Hampers Catalog ({products.length})
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  Manage product pricing, images, descriptions, tags, and bestsellers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetProductsToDefault}
                  className="px-3.5 py-2.5 rounded bg-[#183C2D] border border-[#C5A869]/30 text-xs text-[#EFE9DC]/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset all hampers to master data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <button
                  onClick={openAddNewModal}
                  className="px-5 py-2.5 rounded bg-[#C5A869] hover:bg-[#D8B979] text-[#0B1D15] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hamper</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#10291E] p-3 rounded-lg border border-[#C5A869]/20">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C5A869]" />
                <input
                  type="text"
                  placeholder="Search by hamper title or ingredient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs text-[#EFE9DC]/60 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {['All', ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded text-xs shrink-0 cursor-pointer transition-colors ${
                      selectedCategoryFilter === cat
                        ? 'bg-[#C5A869] text-[#0B1D15] font-semibold'
                        : 'bg-[#183C2D] text-[#EFE9DC]/70 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#10291E] rounded-xl border border-[#C5A869]/30 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#EFE9DC]">
                  <thead className="bg-[#0B1D15] border-b border-[#C5A869]/30 text-[11px] uppercase tracking-wider text-[#C5A869]">
                    <tr>
                      <th className="py-3 px-4">Hamper Image & Title</th>
                      <th className="py-3 px-4">Occasion Category</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Badges</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C5A869]/10">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#183C2D]/50 transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded overflow-hidden bg-[#0B1D15] shrink-0 border border-[#C5A869]/20">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              unoptimized={typeof p.image === 'string' && (p.image.startsWith('data:') || p.image.startsWith('http'))}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-serif-luxury text-sm sm:text-base text-white font-medium">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-[#EFE9DC]/60 line-clamp-1 max-w-sm">
                              {p.subtitle || p.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded bg-[#183C2D] text-[#C5A869] border border-[#C5A869]/30">
                            {p.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap font-medium text-white">
                          ₹{p.price.toLocaleString('en-IN')}
                          {p.originalPrice && (
                            <span className="ml-1.5 text-[#EFE9DC]/40 line-through text-[10px]">
                              ₹{p.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {p.isBestseller && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/40">
                                Bestseller
                              </span>
                            )}
                            {p.isLimitedEdition && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/40">
                                Rare
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-1.5 rounded bg-[#183C2D] text-[#C5A869] hover:bg-[#C5A869] hover:text-[#0B1D15] transition-colors cursor-pointer"
                              title="Edit Hamper"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p)}
                              className="p-1.5 rounded bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white transition-colors cursor-pointer"
                              title="Delete Hamper"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: HERO BANNER (FRONT PAGE) ─── */}
        {activeTab === 'hero' && (
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1 flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" />
                  Homepage Top Section
                </div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Front Page: Hero Banner &amp; Slideshow
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  Customize the main headline text, brand tagline, description, and slider images.
                </p>
              </div>

              <button
                onClick={resetHeroToDefault}
                className="px-3.5 py-2.5 rounded bg-[#183C2D] border border-[#C5A869]/30 text-xs text-[#EFE9DC]/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                title="Reset hero banner to initial default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>
            </div>

            {/* Hero Text Form */}
            <form onSubmit={handleSaveHero} className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-5">
              <h3 className="text-base font-serif-luxury text-[#D8B979] border-b border-[#C5A869]/20 pb-2">
                1. Hero Text &amp; Headings
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Hero Top Tagline</label>
                  <input
                    type="text"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Headline Line 1 (Regular)</label>
                    <input
                      type="text"
                      value={heroTitle1}
                      onChange={(e) => setHeroTitle1(e.target.value)}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Headline Line 2 (Italic Accent)</label>
                    <input
                      type="text"
                      value={heroTitle2}
                      onChange={(e) => setHeroTitle2(e.target.value)}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Hero Description Paragraph</label>
                  <textarea
                    rows={4}
                    value={heroDesc}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869] leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded bg-[#C5A869] hover:bg-[#D8B979] text-[#0B1D15] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Hero Text</span>
                </button>
              </div>
            </form>

            {/* Hero Images Management */}
            <div className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-6">
              <div>
                <h3 className="text-base font-serif-luxury text-[#D8B979]">
                  2. Hero Left Slideshow Images ({heroImages.length})
                </h3>
                <p className="text-xs text-[#EFE9DC]/60 mt-1">
                  Add, swap, or remove the luxury visuals rotating on the left side of the front page.
                </p>
              </div>

              {/* Add New Slide Form */}
              <div className="p-4 rounded-lg bg-[#0B1D15] border border-[#C5A869]/30 space-y-3 text-xs">
                <div className="font-medium text-white flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-[#C5A869]" />
                    <span>Add New Image to Slideshow</span>
                  </div>
                  {newHeroImgUrl.startsWith('data:') && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ Device photo loaded
                    </span>
                  )}
                </div>

                {/* Device Photo Upload Button */}
                <div className="flex flex-wrap items-center gap-2">
                  <label className={`px-3.5 py-2 rounded bg-[#183C2D] hover:bg-[#23523E] border border-[#C5A869]/50 text-white flex items-center gap-2 cursor-pointer transition-all shadow-sm ${isProcessingHeroImage ? 'opacity-50 pointer-events-none' : ''}`}>
                    <UploadCloud className="w-4 h-4 text-[#C5A869]" />
                    <span className="font-semibold text-xs text-[#EFE9DC]">
                      {isProcessingHeroImage ? 'Optimizing Photo...' : 'Upload Photo from Device (Phone/PC)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isProcessingHeroImage}
                      onChange={handleHeroImageUpload}
                    />
                  </label>
                  <span className="text-[11px] text-[#EFE9DC]/50">or select preset / URL below:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#EFE9DC]/70 mb-1">Image URL or Source</label>
                    <input
                      type="text"
                      placeholder="e.g. /images/front.jpg or external https://..."
                      value={newHeroImgUrl.startsWith('data:') ? 'Custom Photo Uploaded from Device' : newHeroImgUrl}
                      onChange={(e) => setNewHeroImgUrl(e.target.value)}
                      className="w-full bg-[#10291E] border border-[#C5A869]/30 rounded p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#EFE9DC]/70 mb-1">Image Description (Alt Text)</label>
                    <input
                      type="text"
                      placeholder="e.g. Kerala Kasavu Silk Handloom & Chocolate Hamper"
                      value={newHeroImgAlt}
                      onChange={(e) => setNewHeroImgAlt(e.target.value)}
                      className="w-full bg-[#10291E] border border-[#C5A869]/30 rounded p-2 text-white"
                    />
                  </div>
                </div>

                {/* Preset image picker */}
                <div>
                  <label className="block text-[#EFE9DC]/60 text-[11px] mb-1.5">
                    Quick-pick from Hamper Archive:
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewHeroImgUrl(img)}
                        className={`relative w-12 h-12 rounded overflow-hidden shrink-0 border-2 transition-all ${
                          newHeroImgUrl === img ? 'border-[#C5A869] scale-105' : 'border-[#183C2D] opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt="Thumbnail" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddHeroImage}
                    className="px-4 py-2 bg-[#C5A869] hover:bg-[#D8B979] text-[#0B1D15] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image Slide</span>
                  </button>
                </div>
              </div>

              {/* Existing Slides List */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#C5A869] block font-medium">
                  Current Slides in Active Rotation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {heroImages.map((slide, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#0B1D15] border border-[#C5A869]/20 group"
                    >
                      <div className="relative w-16 h-16 rounded overflow-hidden shrink-0 bg-[#10291E] border border-[#C5A869]/30">
                        <Image
                          src={slide.src}
                          alt={slide.alt || 'Slide'}
                          fill
                          unoptimized={typeof slide.src === 'string' && (slide.src.startsWith('data:') || slide.src.startsWith('http'))}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="text-[10px] uppercase tracking-wider text-[#C5A869] font-medium">
                          Slide #{idx + 1}
                        </div>
                        <div className="text-[#EFE9DC]/90 truncate font-mono text-[11px] mt-0.5">
                          {slide.src}
                        </div>
                        <div className="text-[#EFE9DC]/50 truncate text-[10px] mt-0.5">
                          {slide.alt || 'No description'}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteHeroImage(idx)}
                        className="p-2 rounded bg-red-950/60 text-red-400 hover:bg-red-900 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Remove slide"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── TAB 3: OCCASIONS (FRONT PAGE 6 CARDS) ─── */}
        {activeTab === 'occasions' && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-medium mb-1 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Homepage 6-Card Grid Section
                </div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Front Page: Curations by Occasion ({occasions.length} Cards)
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  Click &ldquo;Edit Card&rdquo; on any occasion to change its photo, title, description, or curations badge.
                </p>
              </div>

              <button
                onClick={resetOccasionsToDefault}
                className="px-3.5 py-2.5 rounded bg-[#183C2D] border border-[#C5A869]/30 text-xs text-[#EFE9DC]/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                title="Reset occasion cards to initial factory presets"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Occasion Cards Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {occasions.map((occ, idx) => (
                <div
                  key={`${occ.title}-${idx}`}
                  className="bg-[#10291E] rounded-xl border border-[#C5A869]/30 overflow-hidden shadow-xl flex flex-col group hover:border-[#C5A869] transition-all"
                >
                  {/* Card Image Preview with overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B1D15]">
                    <Image
                      src={occ.image || PRESET_IMAGES[0]}
                      alt={occ.title}
                      fill
                      unoptimized={typeof occ.image === 'string' && (occ.image.startsWith('data:') || occ.image.startsWith('http'))}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15] via-[#0B1D15]/40 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-[#0B1D15]/80 backdrop-blur-sm border border-[#C5A869]/40 text-[#C5A869] text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded">
                      {occ.itemCount}
                    </div>

                    <div className="absolute top-3 right-3 bg-[#0B1D15]/80 backdrop-blur-sm border border-[#C5A869]/40 text-[#D8B979] text-[10px] font-medium px-2 py-0.5 rounded">
                      {occ.category}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-serif-luxury text-white">
                        {occ.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description & Action Bar */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-[#EFE9DC]/75 line-clamp-3 leading-relaxed">
                      {occ.description}
                    </p>

                    <div className="pt-3 border-t border-[#C5A869]/15 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A869]">
                        Card #{idx + 1}
                      </span>

                      <button
                        onClick={() => openEditOccasionModal(idx)}
                        className="px-4 py-1.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Card</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 4: ANNOUNCEMENTS BAR ─── */}
        {activeTab === 'announcements' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-5 text-left">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Top Announcement Ticker Bar
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-1">
                  These promotional messages cycle continuously at the top of every page.
                </p>
              </div>

              {/* Add Announcement */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. COMPLIMENTARY PERSONALIZED CALLIGRAPHY NOTE WITH EVERY ORDER"
                  value={newAnnouncementText}
                  onChange={(e) => setNewAnnouncementText(e.target.value)}
                  className="flex-1 bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A869]"
                />
                <button
                  type="button"
                  onClick={handleAddAnnouncement}
                  className="px-4 py-2.5 bg-[#C5A869] hover:bg-[#D8B979] text-[#0B1D15] rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Announcements List */}
              <div className="space-y-2 pt-2">
                {tempAnnouncements.map((msg, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded bg-[#0B1D15] border border-[#C5A869]/20 text-xs"
                  >
                    <span className="text-[#EFE9DC]/90 font-medium tracking-wide flex-1 mr-3">
                      {msg}
                    </span>
                    <button
                      onClick={() => handleDeleteAnnouncement(index)}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: STORE & CONCIERGE SETTINGS ─── */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <div className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Store &amp; Concierge Settings
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-1">
                  Global contact phone numbers, WhatsApp, physical store address, and operating hours.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#EFE9DC]/75 mb-1 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Concierge Phone Number</span>
                    </label>
                    <input
                      type="text"
                      value={tempSettings.phone}
                      onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EFE9DC]/75 mb-1 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Number (digits only, e.g. 919846002241)</span>
                    </label>
                    <input
                      type="text"
                      value={tempSettings.whatsapp}
                      onChange={(e) => setTempSettings({ ...tempSettings, whatsapp: e.target.value })}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EFE9DC]/75 mb-1 flex items-center gap-1.5 font-medium">
                      <Mail className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Inquiry Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={tempSettings.email}
                      onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#EFE9DC]/75 mb-1 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Store &amp; Workshop Hours</span>
                    </label>
                    <input
                      type="text"
                      value={tempSettings.studioHours}
                      onChange={(e) => setTempSettings({ ...tempSettings, studioHours: e.target.value })}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[#EFE9DC]/75 mb-1 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A869]" />
                      <span>Kochi Workshop &amp; Studio Address</span>
                    </label>
                    <input
                      type="text"
                      value={tempSettings.address}
                      onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                      className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Store Settings</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── TAB 6: WHATSAPP INQUIRIES & ORDERS LOG ─── */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif-luxury text-[#FCFBF8]">
                  Customer Inquiries &amp; Orders Log ({inquiries.length})
                </h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  Logs of checkout inquiries dispatched directly to your WhatsApp concierge.
                </p>
              </div>

              {inquiries.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all inquiry history?')) {
                      clearInquiries();
                      toast.info('Inquiries log cleared.');
                    }
                  }}
                  className="px-3.5 py-2 rounded bg-red-950/60 text-red-300 hover:bg-red-900 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Log</span>
                </button>
              )}
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#10291E] p-12 rounded-xl border border-[#C5A869]/20 text-center space-y-3">
                <PackageOpen className="w-10 h-10 text-[#C5A869]/40 mx-auto" />
                <p className="text-sm text-[#EFE9DC]/75 font-serif-luxury">No inquiries logged yet</p>
                <p className="text-xs text-[#EFE9DC]/50 max-w-sm mx-auto">
                  When visitors place custom hamper orders or pre-orders via WhatsApp, their customer details will appear here.
                </p>
              </div>
            ) : (
              <div className="bg-[#10291E] rounded-xl border border-[#C5A869]/30 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#EFE9DC]">
                    <thead className="bg-[#0B1D15] border-b border-[#C5A869]/30 text-[11px] uppercase tracking-wider text-[#C5A869]">
                      <tr>
                        <th className="py-3 px-4">Date &amp; Time</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Delivery Location</th>
                        <th className="py-3 px-4">Ordered Items</th>
                        <th className="py-3 px-4">Total Amount</th>
                        <th className="py-3 px-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C5A869]/10">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-[#183C2D]/50 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap text-[#EFE9DC]/60 font-mono text-[11px]">
                            {new Date(inq.timestamp).toLocaleString('en-IN', {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-white">{inq.customerName}</div>
                            <div className="text-[11px] text-[#C5A869] font-mono">{inq.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{inq.city}, {inq.state}</div>
                            <div className="text-[10px] text-[#EFE9DC]/50">PIN: {inq.pincode}</div>
                          </td>
                          <td className="py-3 px-4">
                            <ul className="space-y-0.5">
                              {inq.items.map((it, idx) => (
                                <li key={idx} className="line-clamp-1">
                                  {it.quantity}x {it.name}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3 px-4 font-semibold text-[#D8B979] whitespace-nowrap">
                            ₹{inq.totalAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ─── MODAL 1: EDIT OCCASION CARD ─── */}
      {editingOccasionIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#10291E] border border-[#C5A869]/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A869]/20 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-medium">
                  Front Page Occasions Editor
                </span>
                <h3 className="text-xl font-serif-luxury text-white">
                  Edit Card #{editingOccasionIndex + 1}: {formOccasionTitle || 'Occasion Card'}
                </h3>
              </div>
              <button
                onClick={() => setEditingOccasionIndex(null)}
                className="p-1.5 rounded text-[#EFE9DC]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOccasion} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Occasion Card Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Birthday Hampers, Wedding & Bridal"
                    value={formOccasionTitle}
                    onChange={(e) => setFormOccasionTitle(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Category Filter Link *</label>
                  <select
                    value={formOccasionCategory}
                    onChange={(e) => setFormOccasionCategory(e.target.value as any)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Item Count Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. 6 Curations"
                    value={formOccasionItemCount}
                    onChange={(e) => setFormOccasionItemCount(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#EFE9DC]/80 mb-1 font-medium">Card Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Celebrate another glorious year with gourmet treats, celebration candles, and joy."
                  value={formOccasionDescription}
                  onChange={(e) => setFormOccasionDescription(e.target.value)}
                  className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              {/* Image Picker with Direct Device Upload */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[#EFE9DC]/80 font-medium">
                    Card Cover Photo *
                  </label>
                  {formOccasionImage.startsWith('data:') && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ Device photo attached
                    </span>
                  )}
                </div>

                {/* Upload Button from Device */}
                <div className="flex flex-wrap items-center gap-2">
                  <label className={`px-4 py-2.5 rounded bg-[#183C2D] hover:bg-[#23523E] border border-[#C5A869]/50 text-white flex items-center gap-2 cursor-pointer transition-all shadow-sm ${isProcessingOccasionImage ? 'opacity-50 pointer-events-none' : ''}`}>
                    <UploadCloud className="w-4 h-4 text-[#C5A869]" />
                    <span className="font-semibold text-xs text-[#EFE9DC]">
                      {isProcessingOccasionImage ? 'Optimizing Photo...' : 'Upload Photo from Device (Phone/PC)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isProcessingOccasionImage}
                      onChange={handleOccasionImageUpload}
                    />
                  </label>
                  <span className="text-[11px] text-[#EFE9DC]/50">or select from catalog presets:</span>
                </div>

                {/* Preset image thumbnails */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                  {PRESET_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormOccasionImage(img)}
                      className={`relative w-14 h-14 rounded overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        formOccasionImage === img ? 'border-[#C5A869] ring-2 ring-[#C5A869]/40 scale-105' : 'border-[#183C2D] opacity-60 hover:opacity-100'
                      }`}
                      title={`Select preset ${i + 1}`}
                    >
                      <Image src={img} alt="Preset thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>

                {/* Direct URL input */}
                <div className="pt-1">
                  <input
                    type="text"
                    placeholder="Or enter image URL (/images/... or https://...)"
                    value={formOccasionImage.startsWith('data:') ? 'Custom Photo Uploaded from Device (Ready to Save)' : formOccasionImage}
                    onChange={(e) => setFormOccasionImage(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/20 rounded p-2 text-xs text-[#EFE9DC]/80 focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

              {/* Live Card Preview */}
              <div className="pt-2">
                <label className="block text-[#C5A869] mb-1 font-medium uppercase tracking-wider text-[10px]">
                  Live Website Card Preview
                </label>
                <div className="relative aspect-[16/9] w-full max-w-sm rounded-md overflow-hidden bg-[#0B1D15] border border-[#C5A869]/30 shadow-lg">
                  <Image
                    src={formOccasionImage || PRESET_IMAGES[0]}
                    alt="Preview"
                    fill
                    unoptimized={typeof formOccasionImage === 'string' && (formOccasionImage.startsWith('data:') || formOccasionImage.startsWith('http'))}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D15] via-[#0B1D15]/40 to-transparent opacity-85" />
                  <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                        {formOccasionItemCount || '5 Curations'}
                      </span>
                      <div className="w-6 h-6 rounded-sm bg-[#183C2D] border border-[#C5A869]/40 flex items-center justify-center text-[#D8B979]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-base font-serif-luxury text-white">
                      {formOccasionTitle || 'Occasion Title'}
                    </h4>
                    <p className="text-[10px] text-[#EFE9DC]/75 line-clamp-1 mt-0.5">
                      {formOccasionDescription || 'Occasion description preview...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-[#C5A869]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingOccasionIndex(null)}
                  className="px-5 py-2.5 rounded bg-[#183C2D] text-[#EFE9DC] hover:bg-[#23523E] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Occasion Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: EDIT / ADD HAMPER PRODUCT ─── */}
      {(editingProduct !== null || isAddingNew) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#10291E] border border-[#C5A869]/40 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#C5A869]/20 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A869] font-medium">
                  {isAddingNew ? 'Catalog Addition' : 'Hamper Modification'}
                </span>
                <h3 className="text-xl font-serif-luxury text-white">
                  {isAddingNew ? 'Create New Luxury Hamper' : editingProduct?.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAddingNew(false);
                }}
                className="p-1.5 rounded-sm text-[#EFE9DC]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Hamper Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Imperial Malabar Casket"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Subtitle / Highlights</label>
                  <input
                    type="text"
                    placeholder="e.g. Single-Estate Coffee, Cardamom Truffles & Hand-Cast Brass Diya"
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Store Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min={499}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Original / Strikethrough Price (₹)</label>
                  <input
                    type="number"
                    min={499}
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Occasion Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Box / Packaging Type</label>
                  <input
                    type="text"
                    value={formBoxType}
                    onChange={(e) => setFormBoxType(e.target.value)}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

              {/* Badges toggles */}
              <div className="flex items-center gap-6 p-3 rounded bg-[#0B1D15] border border-[#C5A869]/20">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={formIsBestseller}
                    onChange={(e) => setFormIsBestseller(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C5A869]"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={formIsLimitedEdition}
                    onChange={(e) => setFormIsLimitedEdition(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C5A869]"
                  />
                  <span>Mark as Rare Edition</span>
                </label>
              </div>

              {/* Image Picker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[#EFE9DC]/75 font-medium">
                    Primary Hamper Image *
                  </label>
                  {formImage.startsWith('data:') && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      ✓ Device photo loaded
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className={`px-3.5 py-2 rounded bg-[#183C2D] hover:bg-[#23523E] border border-[#C5A869]/50 text-white flex items-center gap-2 cursor-pointer transition-all shadow-sm ${isProcessingProductImage ? 'opacity-50 pointer-events-none' : ''}`}>
                    <UploadCloud className="w-4 h-4 text-[#C5A869]" />
                    <span className="font-semibold text-xs text-[#EFE9DC]">
                      {isProcessingProductImage ? 'Optimizing Photo...' : 'Upload Photo from Device (Phone/PC)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isProcessingProductImage}
                      onChange={handleProductImageUpload}
                    />
                  </label>
                  <span className="text-[11px] text-[#EFE9DC]/50">or select preset / enter path:</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImage.startsWith('data:') ? 'Custom Photo Uploaded from Device' : formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2 text-xs text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {PRESET_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormImage(img)}
                      className={`relative w-14 h-14 rounded overflow-hidden shrink-0 border-2 transition-all ${
                        formImage === img ? 'border-[#C5A869] scale-105' : 'border-[#183C2D] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              {/* Contents (one per line) */}
              <div>
                <label className="block text-[#EFE9DC]/75 mb-1 font-medium">
                  Box Contents (Enter each item on a new line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Single-Estate Golden Pekoe Tea in Brass Caddy (100g)\nBelgian Dark Chocolate Truffles (200g)\nHandmade Botanical Soap Bar"
                  value={formContentsText}
                  onChange={(e) => setFormContentsText(e.target.value)}
                  className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#C5A869]/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingNew(false);
                  }}
                  className="px-5 py-2.5 rounded bg-[#183C2D] text-[#EFE9DC] hover:bg-[#23523E] text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAddingNew ? 'Create & Publish' : 'Save Changes'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="p-6 border-t border-[#C5A869]/20 text-center text-xs text-[#EFE9DC]/50 bg-[#0B1D15]">
        HamPers Kochi &bull; Client Content Management Suite &bull; Changes sync live to website
      </footer>

    </div>
  );
}
