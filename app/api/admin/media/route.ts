import { NextResponse } from 'next/server';
import { readdir, stat, unlink } from 'fs/promises';
import path from 'path';
import { getAdminSession } from '@/lib/auth';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  folder: string;
  updatedAt: string;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const imagesRoot = path.join(process.cwd(), 'public', 'images');
    const mediaFiles: MediaFile[] = [];

    async function scanDir(currentDir: string, currentFolder: string) {
      try {
        const entries = await readdir(currentDir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          if (entry.isDirectory()) {
            await scanDir(fullPath, `${currentFolder ? currentFolder + '/' : ''}${entry.name}`);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'].includes(ext)) {
              const fileStat = await stat(fullPath);
              const relativeUrl = `/images/${currentFolder ? currentFolder + '/' : ''}${entry.name}`;
              mediaFiles.push({
                name: entry.name,
                url: relativeUrl,
                size: fileStat.size,
                folder: currentFolder || 'root',
                updatedAt: fileStat.mtime.toISOString(),
              });
            }
          }
        }
      } catch (err) {
        console.error('Error scanning folder:', currentDir, err);
      }
    }

    await scanDir(imagesRoot, '');

    // Sort newest first
    mediaFiles.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ media: mediaFiles });
  } catch (error) {
    console.error('Error reading media library:', error);
    return NextResponse.json({ error: 'Lỗi khi đọc thư viện ảnh' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'Thiếu đường dẫn ảnh' }, { status: 400 });
    }

    // Chỉ cho phép xóa ảnh trong thư mục /images/
    if (!url.startsWith('/images/')) {
      return NextResponse.json({ error: 'Đường dẫn ảnh không hợp lệ' }, { status: 400 });
    }

    const imagesRoot = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(process.cwd(), 'public', url);
    const absolutePath = path.resolve(filePath);

    // Bảo vệ chống Directory Traversal
    if (!absolutePath.startsWith(imagesRoot)) {
      return NextResponse.json({ error: 'Truy cập bị từ chối' }, { status: 400 });
    }

    try {
      await unlink(absolutePath);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return NextResponse.json({ error: 'Tập tin không tồn tại' }, { status: 404 });
      }
      throw err;
    }
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa tệp ảnh' }, { status: 500 });
  }
}
