import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, data: { total: 0, items: [] } });
}

export async function POST() {
  return NextResponse.json({ success: true, data: null });
}

export async function PUT() {
  return NextResponse.json({ success: true, data: null });
}

export async function DELETE() {
  return NextResponse.json({ success: true, data: null });
}
