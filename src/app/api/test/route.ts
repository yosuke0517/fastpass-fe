import { NextResponse } from 'next/server';

/**
 * test API
 */
export async function GET() {
  try {
    const data = { message: `Hello world` }; // 例として静的データを返す
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error handling GET request:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
