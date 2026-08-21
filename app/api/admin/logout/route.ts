import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/auth';

export async function POST() {
  await clearAdminCookie();
  return NextResponse.json({ success: true, message: 'Đã đăng xuất thành công' });
}

export async function GET() {
  await clearAdminCookie();
  return NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
