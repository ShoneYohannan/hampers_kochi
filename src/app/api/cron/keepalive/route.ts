import { createPublicClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createPublicClient();
    // Lightweight 1-row check to register incoming API activity
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase keepalive ping successful',
      sampleId: data?.[0]?.id || null,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
