import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Sown Barbershop...');

  // 1. Create Default Admin User
  const passwordHash = await bcrypt.hash('sownbarber2026', 10);
  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { passwordHash },
    create: {
      username: 'admin',
      name: 'Nguyễn Sơn',
      passwordHash,
    },
  });
  console.log('✅ Admin user created: admin / sownbarber2026');

  // 2. Create Shop Profile
  await prisma.shopProfile.upsert({
    where: { id: 'default-profile' },
    update: {},
    create: {
      id: 'default-profile',
      shopName: 'Sown Barbershop',
      name: 'Nguyễn Sơn',
      logo: '/images/logo.jpg',
      tagline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
      heroHeadline: 'ĐỊNH HÌNH PHONG CÁCH. KHẲNG ĐỊNH BẢN SẮC.',
      heroSupportingText:
        'Cắt tóc thiết kế cá nhân hóa, fade sắc nét, uốn định hình và chăm sóc diện mạo phái mạnh chuẩn gu tại Tĩnh Gia, Nghi Sơn, Thanh Hóa.',
      heroImage: '/images/hero/hero.jpg',
      heroImageAlt: 'Biểu tượng nhận diện Sown Barbershop và dụng cụ Master Barber thủ công cao cấp',
      barberImage: '/images/barber/barber.jpg',
      barberImageAlt: 'Chân dung Master Barber Nguyễn Sơn (Sown Barber)',
      bioHeadline: 'TẬN TÂM TRÊN TỪNG ĐƯỜNG KÉO TẠI SOWN BARBER.',
      bioParagraphs: JSON.stringify([
        'Tôi là Nguyễn Sơn (Sown Barber), thợ cắt tóc cá nhân với hơn 7 năm kinh nghiệm gắn bó cùng nghề tạo mẫu tóc nam tại TX. Nghi Sơn, Thanh Hóa.',
        'Tại Sown Barbershop, mỗi vị khách khi bước lên ghế cắt đều được tư vấn kỹ lưỡng dựa trên cấu trúc xương đầu, chất tóc và phong cách sống riêng biệt.',
        'Mục tiêu lớn nhất là mang lại cho bạn một mái tóc sắc nét, dễ sấy tạo kiểu tại nhà và phong độ tự tin nhất khi bước ra khỏi tiệm.',
      ]),
      phone: '098 744 3091',
      address: '32 Đường Lương Chí, TDP 4, P. Hải Hòa (Tĩnh Gia)',
      city: 'TX. Nghi Sơn, Thanh Hóa',
      country: 'Việt Nam',
      establishedYear: '2018',
      openingHours: JSON.stringify([
        { label: 'THỨ 2 — THỨ 7', value: '08:30 — 20:00' },
        { label: 'CHỦ NHẬT', value: '08:30 — 18:30' },
      ]),
      stats: JSON.stringify([
        { value: '7+', numericValue: 7, suffix: '+', label: 'NĂM KINH NGHIỆM' },
        { value: '6500+', numericValue: 6500, suffix: '+', label: 'LƯỢT KHÁCH HÀNG' },
        { value: '30+', numericValue: 30, suffix: '+', label: 'KIỂU TÓC THIẾT KẾ' },
        { value: '99%', numericValue: 99, suffix: '%', label: 'ĐỘ HÀI LÒNG' },
      ]),
      socials: JSON.stringify({
        facebook: 'https://www.facebook.com/nguyen.bellerin.1',
        zalo: 'https://zalo.me/0987443091',
        messenger: 'https://www.facebook.com/nguyen.bellerin.1',
        googleMaps:
          'https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=32%20%C4%91%C6%B0%E1%BB%9Dng%20L%C6%B0%C6%A1ng%20Ch%C3%AD%20-%20TDP%204%20-%20P.%20T%C4%A9nh%20Gia%20-%20Thanh%20Ho%C3%A1%2C%20Thanh%20H%C3%B3a%2C%20Vietnam',
      }),
      booking: JSON.stringify({
        primaryChannel: 'zalo',
        primaryUrl: 'https://zalo.me/0987443091',
        primaryLabel: 'ĐẶT LỊCH QUA ZALO',
      }),
      beforeAfter: JSON.stringify({
        beforeImage: '/images/transformations/before.jpg',
        afterImage: '/images/transformations/after.jpg',
        title: 'Low Skin Taper Fade & Textured Crop',
        category: 'BIẾN HÌNH DIỆN MẠO',
        description:
          'Từ mái tóc dài mất nếp thành kiểu tóc Low Taper Fade sắc sảo kết hợp tầng layer texture chuẩn phom hiện đại.',
      }),
    },
  });
  console.log('✅ Shop profile seeded');

  // 3. Create Services
  const services = [
    {
      id: 'svc-haircut',
      name: 'Cắt Tóc Thiết Kế & Gội',
      categoryLabel: 'CẮT TÓC THỦ CÔNG',
      description:
        'Tư vấn dáng tóc theo tỷ lệ khuôn mặt, cắt tỉa kéo tỉ mỉ, chấn viền sắc nét, gội sạch và sấy vuốt tạo kiểu.',
      price: '80.000đ',
      duration: '40 PHÚT',
      image: '/images/services/haircut.jpg',
      features: JSON.stringify(['Tư Vấn Tỉ Lệ Khuôn Mặt', 'Cắt Tỉa Kéo Sắc Nét', 'Gội Xả & Sấy Tạo Kiểu']),
      order: 1,
    },
    {
      id: 'svc-fade',
      name: 'Cắt Fade Chuyên Sâu',
      categoryLabel: 'KỸ THUẬT FADE SẮC BÉN',
      description:
        'Kỹ thuật Low, Mid hoặc High Skin Fade siêu mịn với đường cạo chấn viền sắc bén từng milimet.',
      price: '100.000đ',
      duration: '45 PHÚT',
      image: '/images/services/fade.jpg',
      features: JSON.stringify(['Low / Mid / High Skin Fade', 'Chấn Viền Sắc Sảo', 'Chuyển Tông Mịn Liền Mạch']),
      order: 2,
    },
    {
      id: 'svc-combo',
      name: 'Combo Cắt Tóc & Cạo Khăn Nóng',
      categoryLabel: 'Ủ KHĂN NÓNG & CẠO RÂU',
      description:
        'Cắt tóc thiết kế trọn gói kết hợp ủ khăn nóng thảo mộc thư giãn, cạo râu êm ái và dưỡng ẩm da mặt.',
      price: '120.000đ',
      duration: '55 PHÚT',
      image: '/images/services/haircut-beard.jpg',
      features: JSON.stringify(['Cắt Tóc Thiết Kế Trọn Gói', 'Ủ Khăn Nóng Thảo Mộc', 'Cạo Râu & Dưỡng Ẩm Da']),
      order: 3,
    },
    {
      id: 'svc-perm',
      name: 'Uốn Texture / Phồng Chân Tóc',
      categoryLabel: 'UỐN ĐỊNH HÌNH PHOM TÓC',
      description:
        'Uốn định hình texture layer hoặc uốn phồng chân tóc tự nhiên, giúp tóc luôn vào nếp bồng bềnh và dễ sấy.',
      price: '250.000đ',
      duration: '75 PHÚT',
      image: '/images/services/perm.jpg',
      features: JSON.stringify(['Uốn Phồng Chân Tóc', 'Sóng Texture Layer Tự Nhiên', 'Dễ Tự Sấy Nếp Tại Nhà']),
      order: 4,
    },
    {
      id: 'svc-styling',
      name: 'Gội Đầu Dưỡng Sinh & Tạo Kiểu',
      categoryLabel: 'GỘI ĐẦU & MASSAGE THƯ GIÃN',
      description:
        'Gội đầu thư giãn, massage bấm huyệt vùng đầu cổ vai gáy, sấy phồng và vuốt sáp/pomade cao cấp.',
      price: '50.000đ',
      duration: '25 PHÚT',
      image: '/images/services/styling.jpg',
      features: JSON.stringify(['Gội Massage Bấm Huyệt', 'Sấy Phồng Chuẩn Phom', 'Vuốt Sáp / Pomade Cao Cấp']),
      order: 5,
    },
  ];

  for (const svc of services) {
    await prisma.serviceItem.upsert({
      where: { id: svc.id },
      update: svc,
      create: svc,
    });
  }
  console.log(`✅ Seeded ${services.length} services`);

  // 4. Create Styles Lookbook
  const styles = [
    {
      id: 'style-1',
      title: 'Low Fade / Textured Crop',
      category: 'fade',
      description:
        'Đường fade thấp mịn màng kết hợp tỉa layer tầng tự nhiên, chấn viền sắc sảo tôn đường nét xương hàm.',
      image: '/images/styles/low-fade.jpg',
      alt: 'Kiểu tóc Low Taper Fade kết hợp Textured Crop nam tính sắc nét',
      order: 1,
    },
    {
      id: 'style-2',
      title: 'Mid Fade / Modern Quiff',
      category: 'fade',
      description:
        'Fade lửng cân đối cùng phần mái Quiff vuốt phồng năng động, phù hợp quý ông công sở hiện đại.',
      image: '/images/styles/mid-fade.jpg',
      alt: 'Kiểu tóc Mid Fade Quiff hiện đại trẻ trung',
      order: 2,
    },
    {
      id: 'style-3',
      title: 'Textured Fringe French Crop',
      category: 'textured',
      description:
        'Mái ngang tỉa so le phá cách, che khuyết điểm trán và dễ dàng tạo kiểu nếp tự nhiên hàng ngày.',
      image: '/images/styles/textured-crop.jpg',
      alt: 'Kiểu tóc Textured French Crop trẻ trung phong cách Hàn Quốc',
      order: 3,
    },
    {
      id: 'style-4',
      title: 'High Skin Fade / Buzz Cut',
      category: 'fade',
      description:
        'Đường cạo sát trắng chân tóc sắc nét đến từng milimet, phong cách quân đội góc cạnh và khỏe khoắn.',
      image: '/images/styles/high-fade.jpg',
      alt: 'Kiểu tóc High Skin Fade Buzz Cut nam tính mạnh mẽ',
      order: 4,
    },
    {
      id: 'style-5',
      title: 'Classic Side Part Gentleman',
      category: 'classic',
      description:
        'Rẽ ngôi lịch lãm phong cách quý ông cổ điển, trau chuốt từng đường kéo mang lại vẻ ngoài thành đạt.',
      image: '/images/styles/classic.jpg',
      alt: 'Kiểu tóc Classic Side Part rẽ ngôi quý ông lịch lãm',
      order: 5,
    },
    {
      id: 'style-6',
      title: 'Long Layer Flow / Middle Part',
      category: 'long',
      description:
        'Tỉa tầng bay bổng giữ độ dài tự nhiên, tạo độ phồng lãng tử chuẩn phong cách nghệ sĩ hiện đại.',
      image: '/images/styles/long-hair.jpg',
      alt: 'Kiểu tóc Long Layer Flow rẽ ngôi giữa lãng tử phong trần',
      order: 6,
    },
    {
      id: 'style-7',
      title: 'Beard Sculpting & Razor Edge',
      category: 'beard',
      description:
        'Tỉa gọn và chấn viền râu sắc lẹm bằng dao cạo chuyên dụng, hoàn thiện phong độ nam tính đỉnh cao.',
      image: '/images/styles/beard.jpg',
      alt: 'Tạo kiểu râu và chấn viền dao cạo sắc nét nam tính',
      order: 7,
    },
  ];

  for (const st of styles) {
    await prisma.styleItem.upsert({
      where: { id: st.id },
      update: st,
      create: st,
    });
  }
  console.log(`✅ Seeded ${styles.length} styles`);

  // 5. Create Gallery Items
  const gallery = [
    {
      id: 'gal-chair',
      title: 'The Vintage Recline Chair',
      alt: 'Custom premium leather barber chair under warm studio spotlight',
      image: '/images/gallery/chair.jpg',
      layoutVariant: 'featured',
      order: 1,
    },
    {
      id: 'gal-tools',
      title: 'Master Clippers & Shears',
      alt: 'Japanese steel shears and precision magnetic clippers on leather tray',
      image: '/images/gallery/tools.jpg',
      layoutVariant: 'standard',
      order: 2,
    },
    {
      id: 'gal-interior',
      title: 'The Studio Space',
      alt: 'Dark minimalist barber studio with warm architectural lighting',
      image: '/images/gallery/interior.jpg',
      layoutVariant: 'standard',
      order: 3,
    },
    {
      id: 'gal-barber-working',
      title: 'The Craft in Action',
      alt: 'Barber focused on detailing a clean hairline with shears',
      image: '/images/gallery/barber-working.jpg',
      layoutVariant: 'wide',
      order: 4,
    },
    {
      id: 'gal-detail',
      title: 'Razor Lineup Detailing',
      alt: 'Close-up precision razor detailing on a fresh fade',
      image: '/images/gallery/detail.jpg',
      layoutVariant: 'standard',
      order: 5,
    },
    {
      id: 'gal-products',
      title: 'Curated Grooming Essentials',
      alt: 'Selected matte clays, tonics, and conditioning oils on oak shelf',
      image: '/images/gallery/products.jpg',
      layoutVariant: 'standard',
      order: 6,
    },
  ];

  for (const g of gallery) {
    await prisma.galleryItem.upsert({
      where: { id: g.id },
      update: g,
      create: g,
    });
  }
  console.log(`✅ Seeded ${gallery.length} gallery items`);

  // 6. Create Testimonials
  const testimonials = [
    {
      id: 'test-1',
      quote:
        'Cắt ở Sown Barbershop từ những ngày đầu. Đường fade của anh Sơn cực kỳ mịn và đều, tư vấn kiểu tóc rất hợp với khuôn mặt mình.',
      clientName: 'Anh Tuấn Anh (TX. Nghi Sơn)',
      avatar: '/images/testimonials/client1.jpg',
      rating: 5,
      service: 'Cắt Fade Chuyên Sâu',
      order: 1,
    },
    {
      id: 'test-2',
      quote:
        'Thợ cắt rất có tâm và tỉ mỉ từng sợi tóc. Tóc uốn texture ở đây về nhà tự gội sấy cực kỳ dễ vào nếp, phom giữ được lâu.',
      clientName: 'Anh Minh Đức (Tĩnh Gia)',
      avatar: '/images/testimonials/client2.jpg',
      rating: 5,
      service: 'Uốn Texture / Phồng Chân Tóc',
      order: 2,
    },
    {
      id: 'test-3',
      quote:
        'Không gian tiệm thân thiện, dịch vụ cạo mặt khăn nóng rất phê và thư giãn. Giá cả cực kỳ hợp lý so với chất lượng đường kéo.',
      clientName: 'Anh Hoàng Nam (P. Hải Hòa)',
      avatar: '/images/testimonials/client3.jpg',
      rating: 5,
      service: 'Combo Cắt & Khăn Nóng',
      order: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonialItem.upsert({
      where: { id: t.id },
      update: t,
      create: t,
    });
  }
  console.log(`✅ Seeded ${testimonials.length} testimonials`);

  // 7. Create FAQs
  const faqs = [
    {
      id: 'faq-1',
      question: 'Giá cắt tóc và dịch vụ tại Sown Barbershop là bao nhiêu?',
      answer:
        'Bảng giá dịch vụ tại Sown Barbershop được niêm yết minh bạch: Cắt tóc thiết kế cơ bản là 80.000đ, Cắt Fade chuyên sâu 100.000đ, Combo Cắt & Ủ khăn nóng cạo râu 120.000đ, Gội đầu dưỡng sinh & sấy vuốt 50.000đ và Uốn tóc Texture định hình 250.000đ. Cam kết không phụ thu phát sinh.',
      order: 1,
    },
    {
      id: 'faq-2',
      question: 'Tiệm có tư vấn kiểu tóc phù hợp với khuôn mặt và chất tóc không?',
      answer:
        'Có. Tại Sown Barbershop, mỗi khách hàng khi bước lên ghế cắt đều được Master Barber Nguyễn Sơn trực tiếp tư vấn dựa trên cấu trúc xương đầu, chất tóc (mỏng, dày, cứng, chỉa) và phong cách làm việc hàng ngày để bạn sở hữu mái tóc vừa sắc nét, vừa dễ tự sấy tạo kiểu tại nhà.',
      order: 2,
    },
    {
      id: 'faq-3',
      question: 'Tôi có cần phải đặt lịch hẹn trước khi đến tiệm không?',
      answer:
        'Để đảm bảo chất lượng phục vụ chu đáo nhất và không mất thời gian chờ đợi, bạn nên đặt trước qua Zalo hoặc Hotline 098 744 3091. Tiệm luôn ưu tiên phục vụ đúng giờ cho khách hàng có lịch hẹn trước.',
      order: 3,
    },
    {
      id: 'faq-4',
      question: 'Địa chỉ tiệm Sown Barbershop ở đâu tại TX. Nghi Sơn, Thanh Hóa?',
      answer:
        'Tiệm tọa lạc tại số 32 Đường Lương Chí, TDP 4, Phường Hải Hòa (Khu vực Tĩnh Gia cũ), Thị xã Nghi Sơn, Tỉnh Thanh Hóa. Vị trí trung tâm thuận tiện, có biển hiệu Barber Shop phong cách cổ điển dễ nhận biết.',
      order: 4,
    },
    {
      id: 'faq-5',
      question: 'Sown Barbershop mở cửa vào những khung giờ nào trong tuần?',
      answer:
        'Tiệm mở cửa phục vụ từ Thứ 2 đến Thứ 7 trong khung giờ 08:30 — 20:00, và Chủ Nhật trong khung giờ 08:30 — 18:30. Khách hàng có thể linh hoạt đặt lịch vào các buổi sáng, chiều hoặc tối sau giờ làm.',
      order: 5,
    },
    {
      id: 'faq-6',
      question: 'Tiệm có chỗ đỗ xe máy và ô tô thuận tiện không?',
      answer:
        'Có. Sown Barbershop sở hữu mặt tiền thoáng đãng với vỉa hè rộng rãi, có chỗ đỗ xe máy và ô tô an toàn, hoàn toàn miễn phí ngay trước cửa tiệm.',
      order: 6,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQItem.upsert({
      where: { id: f.id },
      update: f,
      create: f,
    });
  }
  console.log(`✅ Seeded ${faqs.length} FAQs`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
