import { NextResponse } from 'next/server';
import { getSheetsClient } from '@/lib/googleSheets';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const client = await getSheetsClient();
    const users = await client.readUsers();
    return NextResponse.json({ users });
  } catch (error: any) {
    // Silently return default users if there's an error
    // The readUsers function already handles errors gracefully
    return NextResponse.json({
      users: [
        { name: 'Admin' },
        { name: 'Broker 1' },
        { name: 'Broker 2' },
      ],
    });
  }
}

