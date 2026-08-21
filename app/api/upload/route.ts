import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getAdminSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized: Vui lòng đăng nhập quản trị' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp tải lên' }, { status: 400 });
    }

    // Validate size (max 15MB)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Dung lượng tệp vượt quá giới hạn cho phép (15MB)' }, { status: 400 });
    }

    // Validate file extension
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
    const originalExt = path.extname(file.name).toLowerCase();
    if (!validExtensions.includes(originalExt)) {
      return NextResponse.json(
        { error: `Định dạng tệp không hợp lệ (${originalExt}). Vui lòng chọn JPG, PNG, WEBP hoặc SVG` },
        { status: 400 }
      );
    }

    // Sanitize base name
    const rawBaseName = path.basename(file.name, originalExt);
    const sanitizedBase = rawBaseName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 40);

    const timestamp = Date.now();
    const filename = `${sanitizedBase || 'image'}-${timestamp}${originalExt}`;

    // Target upload directory in public/images/[folder]
    const uploadDir = path.join(process.cwd(), 'public', 'images', folder);
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const publicUrl = `/images/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ khi lưu tệp ảnh' }, { status: 500 });
  }
}
