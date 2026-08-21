'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Scissors,
  Sparkles,
  Star,
  HelpCircle,
  Settings,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    servicesCount: 5,
    stylesCount: 7,
    testimonialsCount: 3,
    faqCount: 6,
  });

  useEffect(() => {
    // Fetch live counts
    Promise.all([
      fetch('/api/admin/services').then((r) => r.json()),
      fetch('/api/admin/styles').then((r) => r.json()),
      fetch('/api/admin/testimonials').then((r) => r.json()),
      fetch('/api/admin/faq').then((r) => r.json()),
    ])
      .then(([services, styles, testimonials, faq]) => {
        setStats({
          servicesCount: services.services?.length || 5,
          stylesCount: styles.styles?.length || 7,
          testimonialsCount: testimonials.testimonials?.length || 3,
          faqCount: faq.faqs?.length || 6,
        });
      })
      .catch((err) => console.log('Stats fetch error:', err));
  }, []);

  const CARDS = [
    {
      title: 'Dịch Vụ & Bảng Giá',
      desc: 'Quản lý các gói cắt, uốn, cạo râu và mức giá',
      count: `${stats.servicesCount} Gói Dịch Vụ`,
      href: '/admin/services',
      icon: Scissors,
      color: '#C7A66A',
    },
    {
      title: 'Bộ Sưu Tập Kiểu Tóc',
      desc: 'Cập nhật mẫu tóc Lookbook và ảnh chân dung 3:4',
      count: `${stats.stylesCount} Bản Mẫu Tóc`,
      href: '/admin/styles',
      icon: Sparkles,
      color: '#D8B87A',
    },

    {
      title: 'Đánh Giá Khách Hàng',
      desc: 'Cảm nhận khách hàng, số sao và ảnh đại diện',
      count: `${stats.testimonialsCount} Lời Đánh Giá`,
      href: '/admin/testimonials',
      icon: Star,
      color: '#C7A66A',
    },
    {
      title: 'Câu Hỏi Thường Gặp (FAQ)',
      desc: 'Bộ câu hỏi thường gặp tối ưu Google Rich Snippets',
      count: `${stats.faqCount} Câu Hỏi`,
      href: '/admin/faq',
      icon: HelpCircle,
      color: '#D8B87A',
    },
    {
      title: 'Thông Tin Tiệm & Giờ Mở Cửa',
      desc: 'Cập nhật địa chỉ, số hotline, link Zalo & SEO',
      count: 'Cấu Hình Trực Tiếp',
      href: '/admin/profile',
      icon: Settings,
      color: '#C7A66A',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-gradient-to-r from-[#171715] via-[#121211] to-[#171715] border border-[rgba(244,240,232,0.12)] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#C7A66A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A18] border border-[rgba(244,240,232,0.1)] text-[10px] font-mono uppercase tracking-widest text-[#C7A66A] mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>HỆ THỐNG ĐANG HOẠT ĐỘNG ỔN ĐỊNH</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#F4F0E8] mb-3">
            Chào mừng, Master Barber Nguyễn Sơn
          </h1>

          <p className="text-xs sm:text-sm text-[#A7A39B] leading-relaxed font-light mb-6">
            Bảng điều khiển quản trị toàn bộ nội dung website Sown Barbershop. Mọi thay đổi về bảng giá, kiểu tóc, hình ảnh sẽ được cập nhật ngay lập tức ra trang chủ.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/services"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#C7A66A] text-[#0B0B0A] hover:bg-[#D8B87A] transition-colors flex items-center gap-2"
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Chỉnh Sửa Dịch Vụ</span>
            </Link>

            <Link
              href="/admin/media"
              className="px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#1A1A18] text-[#F4F0E8] border border-[rgba(244,240,232,0.12)] hover:border-[#C7A66A] transition-colors flex items-center gap-2"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>Tải Ảnh Mới Lên</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Management Modules */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#F4F0E8] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#C7A66A]" />
            <span>Danh Mục Quản Lý Nội Dung</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group rounded-[24px] bg-[#121211] border border-[rgba(244,240,232,0.08)] hover:border-[#C7A66A]/50 p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#C7A66A]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#1A1A18] border border-[rgba(244,240,232,0.1)] text-[#C7A66A] flex items-center justify-center group-hover:bg-[#C7A66A] group-hover:text-[#0B0B0A] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#C7A66A] bg-[#C7A66A]/10 px-2.5 py-1 rounded-full">
                      {card.count}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors mb-1.5">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#A7A39B] font-light leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(244,240,232,0.06)] flex items-center justify-between text-xs font-mono text-[#A7A39B] group-hover:text-[#F4F0E8]">
                  <span>VÀO CHỈNH SỬA</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C7A66A]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
