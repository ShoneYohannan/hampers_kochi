import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yhfvvpobhbokmjspfvoo.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZnZ2cG9iaGJva21qc3Bmdm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMzYxNzEsImV4cCI6MjEwNzkxMjE3MX0.DPL-kC4DxncTXCWXQQMZAJY20d2tgJUKK37iyMrFrcU';

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
