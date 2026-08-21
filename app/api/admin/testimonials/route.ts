import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { testimonialsData } from '@/data/testimonials';

export async function GET() {
  try {
    const testimonials = await prisma.testimonialItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (testimonials.length === 0) {
      return NextResponse.json({ testimonials: testimonialsData });
    }
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ testimonials: testimonialsData });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const item = await prisma.testimonialItem.create({
      data: {
        quote: data.quote,
        clientName: data.clientName,
        avatar: data.avatar || null,
        rating: data.rating ?? 5,
        service: data.service || null,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Lỗi khi thêm đánh giá' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });

    const item = await prisma.testimonialItem.upsert({
      where: { id: data.id },
      update: {
        quote: data.quote,
        clientName: data.clientName,
        avatar: data.avatar,
        rating: data.rating ?? 5,
        service: data.service,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
      create: {
        id: data.id,
        quote: data.quote,
        clientName: data.clientName,
        avatar: data.avatar || null,
        rating: data.rating ?? 5,
        service: data.service || null,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật đánh giá' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });

    await prisma.testimonialItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa đánh giá thành công' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa đánh giá' }, { status: 500 });
  }
}
