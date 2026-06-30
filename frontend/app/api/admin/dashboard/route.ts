import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');

  if (accessToken?.value === 'authenticated') {
    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalAdmins: 1,
          totalNews: 0,
          totalThreats: 0,
          totalEvents: 0,
        },
        recentActivity: [],
      },
    });
  }

  return NextResponse.json(
    { success: false, error: 'Not authenticated' },
    { status: 401 }
  );
}
