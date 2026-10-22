import { ALL_PRODUCTS } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

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
  const product = ALL_PRODUCTS.find((p) => p.id === id || p.slug === id) || ALL_PRODUCTS[0];

  return <ProductDetailClient product={product} />;
}
