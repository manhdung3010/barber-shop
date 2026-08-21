import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sown Barbershop — Tiệm Barber Nam Chuyên Nghiệp tại Tĩnh Gia, Thanh Hóa',
    short_name: 'Sown Barber',
    description:
      'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại Nghi Sơn, Thanh Hóa.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0A',
    theme_color: '#0B0B0A',
    icons: [
      {
        src: '/images/logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/images/logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
