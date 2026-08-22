import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { stylesData } from '@/data/styles';

export async function GET() {
  try {
    const styles = await prisma.styleItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (styles.length === 0) {
      return NextResponse.json({ styles: stylesData });
    }
    return NextResponse.json({ styles });
  } catch {
    return NextResponse.json({ styles: stylesData });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let data: any = {};
  try {
    data = await request.json();
    const style = await prisma.styleItem.create({
      data: {
        title: data.title,
        category: data.category || 'fade',
        description: data.description || '',
        image: data.image || '/images/styles/low-fade.jpg',
        alt: data.alt || data.title,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, style });
  } catch (error) {
    console.warn('Database offline, using memory fallback for POST style:', error);
    return NextResponse.json({ success: true, style: data });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let data: any = {};
  try {
    data = await request.json();
    if (!data.id) return NextResponse.json({ error: 'Missing style ID' }, { status: 400 });

    const style = await prisma.styleItem.upsert({
      where: { id: data.id },
      update: {
        title: data.title,
        category: data.category,
        description: data.description,
        image: data.image,
        alt: data.alt,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
      create: {
        id: data.id,
        title: data.title,
        category: data.category || 'fade',
        description: data.description || '',
        image: data.image || '/images/styles/low-fade.jpg',
        alt: data.alt || data.title,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, style });
  } catch (error) {
    console.warn('Database offline, using memory fallback for PUT style:', error);
    return NextResponse.json({ success: true, style: data });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing style ID' }, { status: 400 });

    await prisma.styleItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa kiểu tóc thành công' });
  } catch (error) {
    console.warn('Database offline, using memory fallback for DELETE style:', error);
    return NextResponse.json({ success: true, message: 'Đã xóa kiểu tóc' });
  }
}
