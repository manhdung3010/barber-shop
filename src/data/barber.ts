import { BarberProfile } from '../types/index.ts';

export const barberProfile: BarberProfile = {
  name: 'Nguyễn Sơn',
  shopName: 'Sown Barbershop',
  logo: '/images/logo.jpg',
  tagline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
  heroHeadline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
  heroSupportingText: 'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại Tĩnh Gia, Nghi Sơn, Thanh Hóa.',
  heroImage: {
    src: '/images/hero/hero.jpg',
    alt: 'Biểu tượng nhận diện Sown Barbershop và dụng cụ Master Barber thủ công cao cấp',
  },
  barberImage: {
    src: '/images/barber/barber.jpg',
    alt: 'Chân dung Master Barber Nguyễn Sơn (Sown Barber)',
  },
  bioHeadline: 'TẬN TÂM TRÊN TỪNG ĐƯỜNG KÉO TẠI SOWN BARBER.',
  bioParagraphs: [
    'Tôi là Nguyễn Sơn (Sown Barber), thợ cắt tóc cá nhân với hơn 7 năm kinh nghiệm gắn bó cùng nghề tạo mẫu tóc nam tại TX. Nghi Sơn, Thanh Hóa.',
    'Tại Sown Barbershop, mỗi vị khách khi bước lên ghế cắt đều được tư vấn kỹ lưỡng dựa trên cấu trúc xương đầu, chất tóc và phong cách sống riêng biệt.',
    'Mục tiêu lớn nhất là mang lại cho bạn một mái tóc sắc nét, dễ sấy tạo kiểu tại nhà và phong độ tự tin nhất khi bước ra khỏi tiệm.',
  ],
  stats: [
    { value: '7+', numericValue: 7, suffix: '+', label: 'NĂM KINH NGHIỆM' },
    { value: '6500+', numericValue: 6500, suffix: '+', label: 'LƯỢT KHÁCH HÀNG' },
    { value: '30+', numericValue: 30, suffix: '+', label: 'KIỂU TÓC THIẾT KẾ' },
    { value: '99%', numericValue: 99, suffix: '%', label: 'ĐỘ HÀI LÒNG' },
  ],
  city: 'Nghi Sơn, Thanh Hóa',
  country: 'Việt Nam',
  address: '32 Đường Lương Chí, TDP 4, P. Hải Hòa (Tĩnh Gia)',
  phone: '098 744 3091',
  openingHours: [
    { label: 'THỨ 2 — THỨ 7', value: '08:30 — 20:00' },
    { label: 'CHỦ NHẬT', value: '08:30 — 18:30' },
  ],
  booking: {
    primaryChannel: 'zalo',
    primaryUrl: 'https://zalo.me/0987443091',
    primaryLabel: 'ĐẶT LỊCH QUA ZALO',
    secondaryChannels: [
      { channel: 'zalo', label: 'Nhắn Zalo: 098 744 3091', url: 'https://zalo.me/0987443091' },
      { channel: 'messenger', label: 'Facebook / Messenger', url: 'https://www.facebook.com/nguyen.bellerin.1' },
      { channel: 'phone', label: 'Gọi hotline: 098 744 3091', url: 'tel:0987443091' },
    ],
  },
  socials: {
    facebook: 'https://www.facebook.com/nguyen.bellerin.1',
    zalo: 'https://zalo.me/0987443091',
    messenger: 'https://www.facebook.com/nguyen.bellerin.1',
    googleMaps: 'https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=32%20%C4%91%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20Ch%C3%AD%20-%20TDP%204%20-%20P.%20T%C4%A9nh%20Gia%20-%20Thanh%20Ho%C3%A1%2C%20Thanh%20H%C3%B3a%2C%20Vietnam',
  },
  establishedYear: '2018',
  showTestimonials: true,
  showBeforeAfter: true,
  beforeAfter: {
    id: 'transformation-01',
    title: 'Low Skin Taper Fade & Textured Crop',
    category: 'BIẾN HÌNH DIỆN MẠO',
    description: 'Từ mái tóc dài mất nếp thành kiểu tóc Low Taper Fade sắc sảo kết hợp tầng layer texture chuẩn phom hiện đại.',
    beforeImage: '/images/transformations/before.jpg',
    afterImage: '/images/transformations/after.jpg',
    altBefore: 'Trước khi cắt: tóc dài mất form và thiếu độ phồng',
    altAfter: 'Sau khi cắt: đường fade sắc nét kết hợp tỉa texture chuẩn form',
  },
};

