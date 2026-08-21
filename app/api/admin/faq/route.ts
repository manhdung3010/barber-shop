import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { faqData } from '@/data/faq';

export async function GET() {
  try {
    const faqs = await prisma.fAQItem.findMany({
      orderBy: { order: 'asc' },
    });
    if (faqs.length === 0) {
      return NextResponse.json({ faqs: faqData });
    }
    return NextResponse.json({ faqs });
  } catch {
    return NextResponse.json({ faqs: faqData });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    const item = await prisma.fAQItem.create({
      data: {
        question: data.question,
        answer: data.answer,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Lỗi khi thêm câu hỏi FAQ' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    if (!data.id) return NextResponse.json({ error: 'Missing FAQ ID' }, { status: 400 });

    const item = await prisma.fAQItem.upsert({
      where: { id: data.id },
      update: {
        question: data.question,
        answer: data.answer,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
      create: {
        id: data.id,
        question: data.question,
        answer: data.answer,
        order: data.order ?? 0,
        active: data.active ?? true,
      },
    });
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật câu hỏi FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing FAQ ID' }, { status: 400 });

    await prisma.fAQItem.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa câu hỏi FAQ thành công' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Lỗi khi xóa câu hỏi FAQ' }, { status: 500 });
  }
}
