import { createClient } from '@supabase/supabase-js';
import { ALL_PRODUCTS } from '../src/data/products';
import * as fs from 'fs';
import * as path from 'path';

// Read .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = value;
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log(`Starting to seed ${ALL_PRODUCTS.length} products to Supabase...`);

  // Prepare products for upsert
  const records = ALL_PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    subtitle: p.subtitle,
    price: p.price,
    originalPrice: p.originalPrice || null,
    rating: p.rating || 4.9,
    reviewsCount: p.reviewsCount || 1,
    image: p.image,
    galleryImages: p.galleryImages || [p.image],
    category: p.category,
    tags: p.tags || [],
    description: p.description || '',
    detailedDescription: p.detailedDescription || '',
    contents: p.contents || [],
    boxType: p.boxType || '',
    dimensions: p.dimensions || '',
    weight: p.weight || '',
    deliveryEstimate: p.deliveryEstimate || '',
    isBestseller: !!p.isBestseller,
    isNewArrival: !!p.isNewArrival,
    isLimitedEdition: !!p.isLimitedEdition,
  }));

  const { data, error } = await supabase
    .from('products')
    .upsert(records, { onConflict: 'id' })
    .select('id, name');

  if (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }

  console.log(`Successfully seeded ${data?.length || records.length} products into Supabase!`);
}

seed();
