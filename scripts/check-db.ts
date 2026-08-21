import { prisma } from '../src/lib/prisma';

async function main() {
  const [users, profile, services, styles, gallery, testimonials, faqs] = await Promise.all([
    prisma.adminUser.count(),
    prisma.shopProfile.count(),
    prisma.serviceItem.count(),
    prisma.styleItem.count(),
    prisma.galleryItem.count(),
    prisma.testimonialItem.count(),
    prisma.fAQItem.count(),
  ]);

  console.log('\n========================================');
  console.log('✅ TRẠNG THÁI CƠ SỞ DỮ LIỆU POSTGRESQL:');
  console.log('========================================');
  console.log(`- Tài khoản Admin       : ${users} user (admin / sownbarber2026)`);
  console.log(`- Thông tin tiệm Profile : ${profile} bản ghi`);
  console.log(`- Dịch vụ & Bảng giá    : ${services} dịch vụ`);
  console.log(`- Mẫu tóc Lookbook      : ${styles} kiểu tóc`);
  console.log(`- Ảnh Không gian Gallery: ${gallery} bức ảnh`);
  console.log(`- Đánh giá khách hàng   : ${testimonials} đánh giá`);
  console.log(`- Câu hỏi FAQ           : ${faqs} câu hỏi`);
  console.log('========================================\n');
}

main().finally(() => prisma.$disconnect());
