import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { servicesData } from '@/data/services';

export async function GET() {
  try {
    const services = await prisma.serviceItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (services.length === 0) {
      return NextResponse.json({ services: servicesData });
    }
    return NextResponse.json({ services });
  } catch {
    return NextResponse.json({ services: servicesData });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const service = await prisma.serviceItem.create({
      data: {
        name: data.name,
        categoryLabel: data.categoryLabel || null,
        description: data.description || '',
        price: data.price || '0đ',
        duration: data.duration || '30 PHÚT',
        image: data.image || '/images/services/haircut.jpg',
        features: JSON.stringify(data.features || []),
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Lỗi khi tạo dịch vụ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });

    const service = await prisma.serviceItem.upsert({
      where: { id: data.id },
      update: {
        name: data.name,
        categoryLabel: data.categoryLabel,
        description: data.description,
        price: data.price,
        duration: data.duration,
        image: data.image,
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
        order: data.order ?? 0,
        active: data.active ?? true,
      },
      create: {
        id: data.id,
        name: data.name,
        categoryLabel: data.categoryLabel,
        description: data.description || '',
        price: data.price || '0đ',
        duration: data.duration || '30 PHÚT',
        image: data.image || '/images/services/haircut.jpg',
        features: typeof data.features === 'string' ? data.features : JSON.stringify(data.features || []),
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, service });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật dịch vụ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });

    await prisma.serviceItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa dịch vụ thành công' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa dịch vụ' }, { status: 500 });
  }
}
