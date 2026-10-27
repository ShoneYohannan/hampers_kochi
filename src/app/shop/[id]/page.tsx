import { ALL_PRODUCTS } from '@/data/products';
import { createPublicClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { Product } from '@/types';

export function generateStaticParams() {
  const ids = ALL_PRODUCTS.map((p) => ({ id: p.id }));
  const slugs = ALL_PRODUCTS.map((p) => ({ id: p.slug }));
  return [...ids, ...slugs];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product | null = null;

  // 1. Try fetching from Supabase
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from('products')
      .select('*')
      .or(`id.eq."${id}",slug.eq."${id}"`)
      .maybeSingle();

    if (data) {
      product = {
        id: data.id,
        name: data.name,
        slug: data.slug,
        subtitle: data.subtitle || '',
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        rating: data.rating ? Number(data.rating) : 4.9,
        reviewsCount: data.reviewsCount ? Number(data.reviewsCount) : 1,
        image: data.image,
        galleryImages: data.galleryImages && data.galleryImages.length > 0 ? data.galleryImages : [data.image],
        category: data.category,
        tags: data.tags || [],
        description: data.description || '',
        detailedDescription: data.detailedDescription || data.description || '',
        contents: data.contents || [],
        boxType: data.boxType || '',
        dimensions: data.dimensions || '',
        weight: data.weight || '',
        deliveryEstimate: data.deliveryEstimate || '',
        isBestseller: !!data.isBestseller,
        isNewArrival: !!data.isNewArrival,
        isLimitedEdition: !!data.isLimitedEdition,
      };
    }
  } catch (err) {
    console.warn('Supabase product query error:', err);
  }

  // 2. Fallback to static products list if not in Supabase
  if (!product) {
    product = ALL_PRODUCTS.find((p) => p.id === id || p.slug === id) || null;
  }

  // 3. If neither found, render 404
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

