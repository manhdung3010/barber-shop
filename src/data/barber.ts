import { BarberProfile } from '../types/index.ts';

export const barberProfile: BarberProfile = {
  name: '[BARBER_NAME]',
  shopName: '[BARBERSHOP_NAME]',
  tagline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
  heroHeadline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
  heroSupportingText: 'Cắt tóc chuẩn xác, fade sắc nét và trải nghiệm chăm sóc diện mạo cá nhân hóa chuẩn gu riêng bạn.',
  heroImage: {
    src: '/images/hero/hero.svg',
    alt: 'Master Barber tỉ mỉ tạo kiểu tóc chuẩn xác',
  },
  barberImage: {
    src: '/images/barber/barber.svg',
    alt: 'Chân dung Master Barber [BARBER_NAME]',
  },
  bioHeadline: 'NGƯỜI ĐỒNG HÀNH CÙNG DIỆN MẠO CỦA BẠN.',
  bioParagraphs: [
    'Tôi là [BARBER_NAME], một thợ cắt tóc cá nhân tập trung vào những đường cắt sắc nét, kỹ thuật fade hiện đại và kiểu tóc thực sự phù hợp với từng khuôn mặt.',
    'Mỗi buổi hẹn đều bắt đầu từ việc thấu hiểu cấu trúc xương đầu, chất tóc, phong cách sống và hình ảnh bạn muốn thể hiện.',
    'Mục tiêu không chỉ là mang đến một mái tóc đẹp, mà là giúp bạn tìm thấy phiên bản tự tin và chuẩn chất nhất của chính mình.',
  ],
  stats: [
    { value: '8+', numericValue: 8, suffix: '+', label: 'NĂM KINH NGHIỆM' },
    { value: '4500+', numericValue: 4500, suffix: '+', label: 'LƯỢT KHÁCH HÀNG' },
    { value: '25+', numericValue: 25, suffix: '+', label: 'KIỂU TÓC ĐẶC TRƯNG' },
    { value: '99%', numericValue: 99, suffix: '%', label: 'ĐỘ HÀI LÒNG' },
  ],
  city: '[CITY]',
  country: '[COUNTRY]',
  address: '[ADDRESS]',
  phone: '[PHONE]',
  openingHours: [
    { label: 'THỨ 2 — THỨ 7', value: '09:00 — 20:00' },
    { label: 'CHỦ NHẬT', value: '10:00 — 18:00' },
  ],
  booking: {
    primaryChannel: 'zalo',
    primaryUrl: '[ZALO_URL]',
    primaryLabel: 'ĐẶT LỊCH HẸN NGAY',
    secondaryChannels: [
      { channel: 'zalo', label: 'Nhắn Zalo', url: '[ZALO_URL]' },
      { channel: 'messenger', label: 'Messenger', url: '[MESSENGER_URL]' },
      { channel: 'instagram', label: 'Instagram', url: '[INSTAGRAM_URL]' },
      { channel: 'phone', label: 'Gọi hotline [PHONE]', url: 'tel:[PHONE]' },
    ],
  },
  socials: {
    instagram: '[INSTAGRAM_URL]',
    zalo: '[ZALO_URL]',
    messenger: '[MESSENGER_URL]',
    googleMaps: '[GOOGLE_MAPS_URL]',
  },
  establishedYear: '[YEAR]',
  showTestimonials: true,
  showBeforeAfter: true,
  beforeAfter: {
    id: 'transformation-01',
    title: 'Low Skin Taper Fade & Textured Crop',
    category: 'BIẾN HÌNH DIỆN MẠO',
    description: 'Từ mái tóc dài mất nếp thành kiểu tóc Low Taper Fade sắc sảo kết hợp tầng layer texture chuẩn phom hiện đại.',
    beforeImage: '/images/transformations/before.svg?v=2',
    afterImage: '/images/transformations/after.svg?v=2',
    altBefore: 'Trước khi cắt: tóc dài mất form và thiếu độ phồng',
    altAfter: 'Sau khi cắt: đường fade sắc nét kết hợp tỉa texture chuẩn form',
  },
};
