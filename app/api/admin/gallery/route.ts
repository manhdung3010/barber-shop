import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { galleryData } from '@/data/gallery';

export async function GET() {
  try {
    const gallery = await prisma.galleryItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (gallery.length === 0) {
      return NextResponse.json({ gallery: galleryData });
    }
    return NextResponse.json({ gallery });
  } catch {
    return NextResponse.json({ gallery: galleryData });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const item = await prisma.galleryItem.create({
      data: {
        title: data.title,
        alt: data.alt || data.title,
        image: data.image || '/images/gallery/interior.jpg',
        layoutVariant: data.layoutVariant || 'standard',
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Lỗi khi thêm ảnh gallery' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: 'Missing gallery ID' }, { status: 400 });

    const item = await prisma.galleryItem.upsert({
      where: { id: data.id },
      update: {
        title: data.title,
        alt: data.alt,
        image: data.image,
        layoutVariant: data.layoutVariant,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
      create: {
        id: data.id,
        title: data.title,
        alt: data.alt || data.title,
        image: data.image || '/images/gallery/interior.jpg',
        layoutVariant: data.layoutVariant || 'standard',
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật ảnh gallery' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing gallery ID' }, { status: 400 });

    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa ảnh thành công' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa ảnh' }, { status: 500 });
  }
}
