'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
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
  Filter
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import { useToast } from '@/context/ToastContext';
import { Product, OccasionCategory } from '@/types';

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
  '/images/1001373001.jpg.jpeg',
  '/images/1001436447.jpg.jpeg',
  '/images/1001483615.jpg.jpeg',
  '/images/1001490450.jpg.jpeg',
  '/images/1001611483.jpg.jpeg',
  '/images/1001707222.jpg.jpeg',
  '/images/celebration-birthday-hamper.jpg',
  '/images/1001901798.jpg.jpeg',
  '/images/1002015334.jpg.jpeg',
  '/images/1002090346.jpg.jpeg',
];

export default function CmsPage() {
  const {
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
    deleteInquiry,
    clearInquiries,
  } = useCms();

  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'products' | 'announcements' | 'settings' | 'inquiries'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Editing Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states for Product Edit / Add
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

  // Announcement state for editing
  const [tempAnnouncements, setTempAnnouncements] = useState<string[]>(announcements);
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  // Settings state for editing
  const [tempSettings, setTempSettings] = useState(settings);

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
    setFormContentsText(
      'Artisanal Belgian Truffles (200g)\nNilgiri Golden Pekoe Tea in Brass Caddy (100g)\nSoy Wax Amber Candle in Matte Gold Tin\nPersonalized Wax-Sealed Calligraphy Note'
    );
    setFormBoxType('Handmade Emerald Velvet Rigid Trunk');
    setFormIsBestseller(true);
    setFormIsLimitedEdition(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      toast.error('Product title is required.');
      return;
    }

    const contentsArray = formContentsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isAddingNew) {
      const newProd: Product = {
        id: `hamper-custom-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subtitle: formSubtitle,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        rating: 5.0,
        reviewsCount: 1,
        image: formImage,
        galleryImages: [formImage],
        category: formCategory,
        tags: [formCategory, formIsBestseller ? 'Bestseller' : 'Curated'],
        description: formDescription || formSubtitle,
        detailedDescription: formDescription || formSubtitle,
        contents: contentsArray,
        boxType: formBoxType,
        dimensions: '34cm x 26cm x 14cm',
        weight: '2.2 kg',
        deliveryEstimate: 'Pre-Order Only | Kochi & All-India Delivery',
        isBestseller: formIsBestseller,
        isLimitedEdition: formIsLimitedEdition,
      };
      addProduct(newProd);
      toast.success(`Created new hamper: "${formName}"`);
    } else if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        subtitle: formSubtitle,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        category: formCategory,
        image: formImage,
        description: formDescription,
        detailedDescription: formDescription,
        contents: contentsArray,
        boxType: formBoxType,
        isBestseller: formIsBestseller,
        isLimitedEdition: formIsLimitedEdition,
      });
      toast.success(`Updated hamper: "${formName}"`);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the active store?`)) {
      deleteProduct(id);
      toast.info(`Removed "${name}" from store.`);
    }
  };

  const handleSaveAnnouncements = () => {
    updateAnnouncements(tempAnnouncements.filter((s) => s.trim().length > 0));
    toast.success('Announcement messages updated successfully!');
  };

  const handleSaveSettings = () => {
    updateSettings(tempSettings);
    toast.success('Store & Concierge settings updated successfully!');
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hampers_kochi_catalog_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Catalog exported as JSON backup.');
  };

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
                Atelier Client Portal
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
              title="Download backup of products"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup Catalog</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span>View Live Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-[#C5A869]/15 pt-3">
          {[
            { id: 'products', label: `Hampers Catalog (${products.length})`, icon: Package },
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

      {/* Main CMS Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8">

        {/* ─── TAB 1: PRODUCTS / HAMPERS ─── */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#10291E] p-4 sm:p-5 rounded-xl border border-[#C5A869]/30 shadow-lg">
              
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#C5A869] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search hamper title, category, or treats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#C5A869]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg px-3 py-2 text-xs text-[#D8B979] focus:outline-none focus:border-[#C5A869]"
                >
                  <option value="All">All Categories ({products.length})</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <button
                  onClick={openAddNewModal}
                  className="px-4 py-2 rounded-lg bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Hamper</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Reset all catalog edits to default atelier catalogue? This cannot be undone.')) {
                      resetProductsToDefault();
                      toast.info('Catalog reset to original default state.');
                    }
                  }}
                  className="p-2 rounded-lg bg-[#183C2D] border border-[#C5A869]/40 text-[#EFE9DC]/70 hover:text-white hover:border-red-400 transition-colors cursor-pointer shrink-0"
                  title="Reset to Factory Catalog"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#10291E] rounded-xl border border-[#C5A869]/25 overflow-hidden flex flex-col justify-between hover:border-[#C5A869]/60 transition-all duration-300 shadow-lg group"
                >
                  {/* Top Image & Badges */}
                  <div className="relative aspect-[4/3] w-full bg-[#0B1D15] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10291E] via-transparent to-transparent" />

                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-[#0B1D15]/90 text-[#D8B979] text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border border-[#C5A869]/40">
                        {p.category}
                      </span>
                      {p.isBestseller && (
                        <span className="bg-[#C5A869] text-[#0B1D15] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif-luxury text-white font-medium line-clamp-1">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-[#EFE9DC]/65 line-clamp-2 mt-1 font-light">
                        {p.subtitle || p.description}
                      </p>

                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-serif-luxury text-[#D8B979] font-semibold">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-[#EFE9DC]/40 line-through">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 text-[10px] text-[#EFE9DC]/60">
                        {p.contents?.length || 0} curated items inside
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-[#C5A869]/20 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="flex-1 py-1.5 px-3 rounded bg-[#183C2D] border border-[#C5A869]/40 hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Hamper</span>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className="p-1.5 rounded bg-red-900/40 border border-red-500/40 text-red-300 hover:bg-red-800 hover:text-white transition-colors cursor-pointer"
                        title="Delete Hamper"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center bg-[#10291E] rounded-xl border border-[#C5A869]/30">
                <Package className="w-8 h-8 text-[#C5A869] mx-auto mb-2 opacity-50" />
                <p className="text-sm text-[#EFE9DC]/70">No hampers match your filter criteria.</p>
              </div>
            )}

          </div>
        )}

        {/* ─── TAB 2: ANNOUNCEMENTS BAR ─── */}
        {activeTab === 'announcements' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-5 text-left">
              <div>
                <h2 className="text-xl font-serif-luxury text-white">Top Announcement Rotating Banners</h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  These messages rotate continuously at the very top of the website.
                </p>
              </div>

              {/* List of current announcements */}
              <div className="space-y-3">
                {tempAnnouncements.map((msg, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#C5A869] font-bold w-6">{idx + 1}.</span>
                    <input
                      type="text"
                      value={msg}
                      onChange={(e) => {
                        const updated = [...tempAnnouncements];
                        updated[idx] = e.target.value;
                        setTempAnnouncements(updated);
                      }}
                      className="flex-1 bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#C5A869]"
                    />
                    <button
                      onClick={() => setTempAnnouncements(tempAnnouncements.filter((_, i) => i !== idx))}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add announcement line */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Type new announcement banner message..."
                  value={newAnnouncementText}
                  onChange={(e) => setNewAnnouncementText(e.target.value)}
                  className="flex-1 bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A869]"
                />
                <button
                  onClick={() => {
                    if (newAnnouncementText.trim()) {
                      setTempAnnouncements([...tempAnnouncements, newAnnouncementText.trim()]);
                      setNewAnnouncementText('');
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg bg-[#183C2D] border border-[#C5A869]/40 text-[#D8B979] hover:bg-[#C5A869] hover:text-[#0B1D15] text-xs font-medium uppercase tracking-wider transition-colors shrink-0"
                >
                  Add Banner
                </button>
              </div>

              <div className="pt-4 border-t border-[#C5A869]/20 flex justify-end">
                <button
                  onClick={handleSaveAnnouncements}
                  className="px-6 py-3 rounded-lg bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Announcements</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: STORE & CONCIERGE SETTINGS ─── */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            <div className="bg-[#10291E] p-6 sm:p-8 rounded-xl border border-[#C5A869]/30 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-serif-luxury text-white">Store & WhatsApp Concierge Settings</h2>
                <p className="text-xs text-[#EFE9DC]/60 mt-0.5">
                  Update customer contact information, promo discount rates, and studio address.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Display Phone Number</label>
                  <input
                    type="text"
                    value={tempSettings.phone}
                    onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">WhatsApp Number (with Country Code)</label>
                  <input
                    type="text"
                    value={tempSettings.whatsapp}
                    onChange={(e) => setTempSettings({ ...tempSettings, whatsapp: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Concierge Email</label>
                  <input
                    type="email"
                    value={tempSettings.email}
                    onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Studio Operating Hours</label>
                  <input
                    type="text"
                    value={tempSettings.studioHours}
                    onChange={(e) => setTempSettings({ ...tempSettings, studioHours: e.target.value })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Physical Studio Address</label>
                  <textarea
                    rows={2}
                    value={tempSettings.address}
                    onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Privilege Promo Voucher Code</label>
                  <input
                    type="text"
                    value={tempSettings.promoCode}
                    onChange={(e) => setTempSettings({ ...tempSettings, promoCode: e.target.value.toUpperCase() })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white uppercase focus:outline-none focus:border-[#C5A869]"
                  />
                </div>

                <div>
                  <label className="block text-[#EFE9DC]/75 mb-1 font-medium">Promo Discount Percentage (%)</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={tempSettings.promoDiscountPercent}
                    onChange={(e) => setTempSettings({ ...tempSettings, promoDiscountPercent: Number(e.target.value) })}
                    className="w-full bg-[#0B1D15] border border-[#C5A869]/30 rounded-lg p-2.5 text-white focus:outline-none focus:border-[#C5A869]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#C5A869]/20 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 rounded-lg bg-[#C5A869] text-[#0B1D15] hover:bg-[#D8B979] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: WHATSAPP INQUIRIES & ORDERS LOG ─── */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif-luxury text-white">Direct WhatsApp Inquiries & Orders Log</h2>
                <p className="text-xs text-[#EFE9DC]/60">
                  Every order initiated through the website checkout is automatically archived here for client records.
                </p>
              </div>

              {inquiries.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear inquiry logs?')) {
                      clearInquiries();
                      toast.info('Inquiry log cleared.');
                    }
                  }}
                  className="px-3.5 py-1.5 rounded bg-red-900/40 border border-red-500/40 text-red-300 hover:bg-red-800 hover:text-white text-xs transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#10291E] rounded-xl border border-[#C5A869]/30">
                <ClipboardList className="w-8 h-8 text-[#C5A869] mx-auto mb-2 opacity-50" />
                <p className="text-sm text-[#EFE9DC]/70">No customer checkout inquiries logged yet.</p>
                <p className="text-xs text-[#EFE9DC]/50 mt-1">When customers place orders via WhatsApp on the website, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-xl bg-[#10291E] border border-[#C5A869]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#D8B979]">{inq.id}</span>
                        <span className="text-[10px] text-[#EFE9DC]/50">&bull; {inq.timestamp}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{inq.customerName}</h4>
                      <div className="text-xs text-[#EFE9DC]/75 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#C5A869]" /> {inq.phone}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#C5A869]" /> {inq.city}, {inq.state} ({inq.pincode})</span>
                      </div>
                      <div className="text-xs text-[#D8B979] pt-1">
                        Hampers: {inq.items.map((it) => `${it.name} (x${it.quantity})`).join(', ')}
                      </div>
                      {inq.giftNote && (
                        <p className="text-[11px] text-[#EFE9DC]/60 italic">Note: &ldquo;{inq.giftNote}&rdquo;</p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                      <div className="text-right">
                        <span className="text-xs text-[#EFE9DC]/60 block">Total</span>
                        <span className="text-lg font-serif-luxury text-[#D8B979] font-bold">
                          ₹{inq.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.customerName)},%20regarding%20your%20Atelier%20order%20${inq.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2 rounded bg-[#25D366] text-white hover:bg-[#128C7E] text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Reply on WhatsApp
                      </a>

                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2 text-red-400 hover:text-red-300"
                        title="Delete log entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ─── MODAL: PRODUCT EDIT / ADD ─── */}
      {(editingProduct || isAddingNew) && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div
            className="relative bg-[#10291E] border border-[#C5A869]/50 rounded-xl max-w-3xl w-full p-6 sm:p-8 text-left shadow-2xl space-y-5 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#C5A869]/20">
              <div className="flex items-center gap-2">
                <PackageOpen className="w-5 h-5 text-[#D8B979]" />
                <h3 className="text-xl font-serif-luxury text-white">
                  {isAddingNew ? 'Create New Atelier Hamper' : `Edit: ${formName}`}
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
              <div>
                <label className="block text-[#EFE9DC]/75 mb-1.5 font-medium">
                  Primary Hamper Image (Pick from Atelier Archive or Enter URL)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="flex-1 bg-[#0B1D15] border border-[#C5A869]/30 rounded p-2 text-white focus:outline-none focus:border-[#C5A869]"
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
                  placeholder="Single-Estate Golden Pekoe Tea in Brass Caddy (100g)&#10;Belgian Dark Chocolate Truffles (200g)&#10;Handmade Botanical Soap Bar"
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
        The Kochi Atelier &bull; Client Content Management Suite &bull; Changes sync live to website
      </footer>

    </div>
  );
}
