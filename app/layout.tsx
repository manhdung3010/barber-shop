import type { Metadata, Viewport } from 'next';
import './globals.css';
import { barberProfile } from '../src/data/barber';
import { generateBarberShopJsonLd } from '../src/utils/seo';

export const metadata: Metadata = {
  metadataBase: new URL('https://sownbarbershop.vn'),
  title: {
    default: 'Sown Barbershop — Tiệm Cắt Tóc Nam Đẹp & Fade Sắc Nét tại Tĩnh Gia, Thanh Hóa',
    template: '%s | Sown Barbershop',
  },
  description:
    'Sown Barbershop (32 Đường Lương Chí, TDP 4, P. Hải Hòa, TX. Nghi Sơn, Thanh Hóa) — Cắt tóc nam thiết kế, Fade sắc nét, uốn định hình và chăm sóc diện mạo quý ông chuẩn phong độ. Hotline đặt lịch: 098 744 3091.',
  applicationName: 'Sown Barbershop',
  keywords: [
    'Sown Barbershop',
    'Sown Barber',
    'tiệm cắt tóc nam Tĩnh Gia',
    'cắt tóc nam Nghi Sơn Thanh Hóa',
    'barbershop Thanh Hóa',
    'cắt tóc nam đẹp Tĩnh Gia',
    'fade tóc nam Thanh Hóa',
    'uốn tóc nam Nghi Sơn',
    'Nguyễn Sơn Barber',
    'tiệm tóc nam gần đây',
    'barber shop Nghi Sơn',
    'cạo mặt khăn nóng Thanh Hóa',
    'cắt tóc tạo kiểu nam',
  ],
  authors: [{ name: 'Nguyễn Sơn (Sown Barber)', url: 'https://www.facebook.com/nguyen.bellerin.1' }],
  creator: 'Nguyễn Sơn',
  publisher: 'Sown Barbershop',
  category: 'beauty & grooming',
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: 'https://sownbarbershop.vn',
  },
  icons: {
    icon: [
      { url: '/images/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/images/logo.jpg', sizes: '192x192', type: 'image/jpeg' },
    ],
    shortcut: '/images/logo.jpg',
    apple: [
      { url: '/images/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Sown Barbershop — Tiệm Cắt Tóc Nam Đẹp & Fade Sắc Nét tại Tĩnh Gia, Thanh Hóa',
    description:
      'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại TX. Nghi Sơn, Thanh Hóa. Trải nghiệm ghế cắt 1-on-1 tận tâm.',
    url: 'https://sownbarbershop.vn',
    siteName: 'Sown Barbershop',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/images/hero/hero-mobile.jpg',
        width: 1200,
        height: 675,
        alt: 'Sown Barbershop — Định Hình Phong Cách, Khẳng Định Bản Sắc',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sown Barbershop — Tiệm Cắt Tóc Nam Đẹp & Fade Sắc Nét tại Tĩnh Gia, Thanh Hóa',
    description:
      'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại TX. Nghi Sơn, Thanh Hóa.',
    images: ['/images/hero/hero-mobile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'VN-38',
    'geo.placename': 'Thị xã Nghi Sơn, Thanh Hóa',
    'geo.position': '19.3364;105.7869',
    'ICBM': '19.3364, 105.7869',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
