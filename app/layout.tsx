import type { Metadata, Viewport } from 'next';
import './globals.css';
import { barberProfile } from '../src/data/barber';
import { generateBarberShopJsonLd } from '../src/utils/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://sownbarbershop.vn'),
  title: 'Sown Barbershop — Tiệm Barber Nam Chuyên Nghiệp tại Tĩnh Gia, Thanh Hóa',
  description:
    'Sown Barbershop (32 Đường Lương Chí, TDP 4, P. Hải Hòa, TX. Nghi Sơn, Thanh Hóa) — Cắt tóc thiết kế, fade sắc nét, uốn định hình chuẩn phong độ phái mạnh. Hotline: 098 744 3091.',
  keywords: [
    'Sown Barbershop',
    'Barbershop Tĩnh Gia',
    'Cắt tóc nam Nghi Sơn',
    'Barber Thanh Hóa',
    'Cắt tóc nam đẹp Tĩnh Gia',
    'Fade tóc nam Thanh Hóa',
    'Uốn tóc nam Nghi Sơn',
    'Nguyễn Sơn Barber',
  ],
  authors: [{ name: 'Nguyễn Sơn', url: 'https://www.facebook.com/nguyen.bellerin.1' }],
  creator: 'Nguyễn Sơn (Sown Barber)',
  publisher: 'Sown Barbershop',
  formatDetection: {
    telephone: true,
    address: true,
  },
  icons: {
    icon: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
  openGraph: {
    title: 'Sown Barbershop — Tiệm Barber Nam Chuyên Nghiệp tại Tĩnh Gia, Thanh Hóa',
    description:
      'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại TX. Nghi Sơn, Thanh Hóa.',
    url: 'https://sownbarbershop.vn',
    siteName: 'Sown Barbershop',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Sown Barbershop - Tiệm Barber Nam Chuyên Nghiệp tại Thanh Hóa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sown Barbershop — Tiệm Barber Nam Chuyên Nghiệp tại Tĩnh Gia, Thanh Hóa',
    description:
      'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại TX. Nghi Sơn, Thanh Hóa.',
    images: ['/images/hero/hero.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generateBarberShopJsonLd(barberProfile);

  return (
    <html lang="vi" className="dark scroll-smooth">
      <head>
        <script
          id="barbershop-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </head>
      <body className="bg-[#0B0B0A] text-[#F4F0E8] font-sans antialiased selection:bg-[#C7A66A] selection:text-[#0B0B0A]">
        {children}
      </body>
    </html>
  );
}
