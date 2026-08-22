'use client';
import React from 'react';
import { Scissors, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import FadeIn from '../../ui/FadeIn';

export default function GallerySection() {
  const values = [
    {
      number: '01',
      badge: 'KHÔNG GIAN RIÊNG TƯ',
      title: 'Studio 1-On-1',
      icon: Sparkles,
      description:
        'Không gian studio cá nhân riêng tư, không ồn ào xô bồ. Trang bị ghế cắt Takara Belmont, âm nhạc acoustic và ánh sáng chuyên dụng tôn vinh từng góc cạnh.',
      highlights: [
        'Ghế cắt công thái học êm ái',
        'Âm nhạc thư giãn & riêng tư',
        'Trà thảo mộc & Nước chào đón',
      ],
    },
    {
      number: '02',
      badge: 'TAY NGHỀ ĐIÊU LUYỆN',
      title: 'Kỹ Thuật Thủ Công',
      icon: Scissors,
      description:
        'Kéo thép Hitachi Cobalt Nhật Bản và tông đơ từ tính đi chuẩn xác theo hướng mọc tự nhiên của sợi tóc, giữ phom dáng bền đẹp nhiều tuần.',
      highlights: [
        'Kéo cắt thủ công sắc ngọt',
        'Đường Fade mịn màng từng milimet',
        'Tư vấn phom tóc cá nhân hóa',
      ],
    },
    {
      number: '03',
      badge: 'CHI TIẾT HOÀN HẢO',
      title: 'Quy Chuẩn Đẳng Cấp',
      icon: ShieldCheck,
      description:
        'Nghi thức khăn nóng thảo mộc, đường dao cạo mài vát bén ngọt và các dòng sản phẩm dưỡng sáp mờ cao cấp hoàn thiện diện mạo phong độ quý ông.',
      highlights: [
        'Khăn nóng thảo mộc sảng khoái',
        'Cạo viền dao cạo êm ái',
        'Sáp & dầu dưỡng chính hãng',
      ],
    },
  ];

  return (
    <section
      id="gallery"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-[#0B0B0A] text-[#F4F0E8] select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-8 sm:mb-12 md:mb-14">
          <p className="plate-meta mb-2 sm:mb-3">04 // TAY NGHỀ & KHÔNG GIAN</p>
          <h2 className="text-[1.35rem] xs:text-[1.5rem] sm:text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#F4F0E8] max-w-2xl mx-auto mb-3 sm:mb-4">
            TAY NGHỀ THỦ CÔNG. KHÔNG GIAN ĐẲNG CẤP.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Tại Sown Barbershop, mỗi lần ghé tiệm là một trải nghiệm thư giãn trọn vẹn và làm mới phong độ quý ông chuẩn mực.
          </p>
        </FadeIn>

        {/* 3 Luxury Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.number}
                className="relative rounded-[22px] sm:rounded-[30px] bg-[#121211] border border-[rgba(244,240,232,0.12)] hover:border-[#C7A66A]/50 transition-all duration-300 shadow-xl p-6 sm:p-7 flex flex-col justify-between group overflow-hidden"
              >
                {/* Subtle Ambient Hover Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#C7A66A]/10 rounded-full blur-2xl group-hover:bg-[#C7A66A]/20 transition-all pointer-events-none" />

                <div>
                  {/* Card Header: Plate number + Icon badge */}
                  <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.1)] pb-4 mb-4">
                    <span className="font-mono text-xs font-bold text-[#C7A66A] tracking-widest uppercase">
                      {v.number} // {v.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1C1C1A] border border-[rgba(244,240,232,0.12)] flex items-center justify-center text-[#C7A66A] group-hover:bg-[#C7A66A] group-hover:text-[#0B0B0A] transition-all shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Story */}
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors mb-3">
                    {v.title}
                  </h3>
                  <p className="text-sm text-[#A7A39B] font-light leading-relaxed mb-6">
                    {v.description}
                  </p>
                </div>

                {/* Highlight Checkmarks List */}
                <div className="pt-4 border-t border-[rgba(244,240,232,0.08)] flex flex-col gap-2.5">
                  {v.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#D6D1C8] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C7A66A] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
