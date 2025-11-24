import { NextResponse } from 'next/server';
import { getSheetsClient } from '@/lib/googleSheets';

export async function GET() {
  try {
    const client = await getSheetsClient();
    const areas = await client.readAreas();
    return NextResponse.json({ areas });
  } catch (error: any) {
    console.error('Error fetching areas:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch areas' },
      { status: 500 }
    );
  }
}

