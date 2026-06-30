import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'admin@cyberguardians.com';
const ADMIN_PASSWORD = 'CGS@Secure2024!';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({
        success: true,
        data: {
          admin: {
            id: 1,
            email: ADMIN_EMAIL,
            fullName: 'System Administrator',
            role: 'super_admin',
            permissions: [
              'manage_admins', 'manage_news', 'manage_threats',
              'manage_events', 'manage_courses', 'manage_members',
              'manage_settings', 'view_analytics', 'manage_comments',
            ],
          },
        },
        message: 'Login successful',
      });

      response.cookies.set('accessToken', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      response.cookies.set('refreshToken', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/api/auth',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
