import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
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
