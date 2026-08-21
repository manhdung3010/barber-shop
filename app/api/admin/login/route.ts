import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, createAdminToken, setAdminCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Vui lòng nhập đầy đủ tài khoản và mật khẩu' },
        { status: 400 }
      );
    }

    // Try finding admin in DB
    let admin = null;
    try {
      admin = await prisma.adminUser.findUnique({
        where: { username: username.trim().toLowerCase() },
      });
    } catch {
      // DB might not be connected yet; allow fallback default admin
    }

    let isValid = false;
    let adminPayload = { id: 'default-admin-id', username: 'admin' };

    if (admin) {
      isValid = await comparePassword(password, admin.passwordHash);
      adminPayload = { id: admin.id, username: admin.username };
    } else {
      // Fallback default admin credentials if DB is initializing
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'sownbarber2026';
      if (username.trim().toLowerCase() === 'admin' && password === defaultPassword) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Tên đăng nhập hoặc mật khẩu không chính xác' },
        { status: 401 }
      );
    }

    // Sign JWT token
    const token = await createAdminToken(adminPayload);
    await setAdminCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        username: adminPayload.username,
        name: admin?.name || 'Nguyễn Sơn',
      },
    });
  } catch (error) {
    console.error('Error logging in admin:', error);
    return NextResponse.json({ error: 'Lỗi xác thực máy chủ' }, { status: 500 });
  }
}
