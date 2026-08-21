import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { barberProfile } from '@/data/barber';

export async function GET() {
  try {
    const profile = await prisma.shopProfile.findUnique({
      where: { id: 'default-profile' },
    });
    if (!profile) {
      return NextResponse.json({ profile: barberProfile });
    }

    return NextResponse.json({
      profile: {
        ...profile,
        bioParagraphs: JSON.parse(profile.bioParagraphs),
        openingHours: JSON.parse(profile.openingHours),
        stats: JSON.parse(profile.stats),
        socials: JSON.parse(profile.socials),
        booking: JSON.parse(profile.booking),
        beforeAfter: JSON.parse(profile.beforeAfter),
      },
    });
  } catch {
    return NextResponse.json({ profile: barberProfile });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();

    const profile = await prisma.shopProfile.upsert({
      where: { id: 'default-profile' },
      update: {
        shopName: data.shopName,
        name: data.name,
        logo: data.logo,
        tagline: data.tagline,
        heroHeadline: data.heroHeadline,
        heroSupportingText: data.heroSupportingText,
        heroImage: data.heroImage,
        heroImageAlt: data.heroImageAlt,
        barberImage: data.barberImage,
        barberImageAlt: data.barberImageAlt,
        bioHeadline: data.bioHeadline,
        bioParagraphs: typeof data.bioParagraphs === 'string' ? data.bioParagraphs : JSON.stringify(data.bioParagraphs || []),
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        establishedYear: data.establishedYear,
        openingHours: typeof data.openingHours === 'string' ? data.openingHours : JSON.stringify(data.openingHours || []),
        stats: typeof data.stats === 'string' ? data.stats : JSON.stringify(data.stats || []),
        socials: typeof data.socials === 'string' ? data.socials : JSON.stringify(data.socials || {}),
        booking: typeof data.booking === 'string' ? data.booking : JSON.stringify(data.booking || {}),
        beforeAfter: typeof data.beforeAfter === 'string' ? data.beforeAfter : JSON.stringify(data.beforeAfter || {}),
      },
      create: {
        id: 'default-profile',
        shopName: data.shopName || 'Sown Barbershop',
        name: data.name || 'Nguyễn Sơn',
        logo: data.logo || '/images/logo.jpg',
        tagline: data.tagline || 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
        heroHeadline: data.heroHeadline || 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
        heroSupportingText: data.heroSupportingText || '',
        heroImage: data.heroImage || '/images/hero/hero.jpg',
        heroImageAlt: data.heroImageAlt || 'Biểu tượng nhận diện Sown Barbershop',
        barberImage: data.barberImage || '/images/barber/barber.jpg',
        barberImageAlt: data.barberImageAlt || 'Chân dung Master Barber Nguyễn Sơn',
        bioHeadline: data.bioHeadline || 'TẬN TÂM TRÊN TỪNG ĐƯỜNG KÉO TẠI SOWN BARBER.',
        bioParagraphs: typeof data.bioParagraphs === 'string' ? data.bioParagraphs : JSON.stringify(data.bioParagraphs || []),
        phone: data.phone || '098 744 3091',
        address: data.address || '32 Đường Lương Chí, TDP 4, P. Hải Hòa (Tĩnh Gia)',
        city: data.city || 'TX. Nghi Sơn, Thanh Hóa',
        country: data.country || 'Việt Nam',
        establishedYear: data.establishedYear || '2018',
        openingHours: typeof data.openingHours === 'string' ? data.openingHours : JSON.stringify(data.openingHours || []),
        stats: typeof data.stats === 'string' ? data.stats : JSON.stringify(data.stats || []),
        socials: typeof data.socials === 'string' ? data.socials : JSON.stringify(data.socials || {}),
        booking: typeof data.booking === 'string' ? data.booking : JSON.stringify(data.booking || {}),
        beforeAfter: typeof data.beforeAfter === 'string' ? data.beforeAfter : JSON.stringify(data.beforeAfter || {}),
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error updating shop profile:', error);
    return NextResponse.json({ error: 'Lỗi khi cập nhật thông tin tiệm' }, { status: 500 });
  }
}
