'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, ArrowUpRight, Scissors, CheckCircle2 } from 'lucide-react';
import { StyleItem } from '../../../types/index';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { barberProfile } from '../../../data/barber';
import EditorialImage from '../../ui/EditorialImage';
import Button from '../../ui/Button';

interface StyleCardProps {
  item: StyleItem;
  index: number;
  total: number;
  onOpenLightbox: (index: number, e: React.MouseEvent<HTMLElement>) => void;
}

export default function StyleCard({
  item,
  index,
  total,
  onOpenLightbox,
}: StyleCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const isReduced = useReducedMotion();
  const formattedNumber = String(index + 1).padStart(2, '0');

  // Custom highlights based on category
  const highlights = item.category === 'fade'
    ? ['Đường Fade chuyển tiếp mịn màng', 'Chấn viền sắc nét từng góc cạnh', 'Tạo kiểu sáp mờ chuẩn phom']
    : item.category === 'textured'
    ? ['Tỉa layer tạo texture bồng bềnh', 'Mái ngang che khuyết điểm trán', 'Dễ sấy tạo kiểu tại nhà']
    : item.category === 'classic'
    ? ['Rẽ ngôi quý ông lịch lãm', 'Độ bóng pomade sang trọng', 'Trau chuốt kéo từng nếp tóc']
    : ['Tỉa tầng bay bổng tự nhiên', 'Dưỡng ẩm sợi tóc mềm mượt', 'Chấn viền dao cạo sắc bén'];

  return (
    <motion.div
      ref={containerRef}
      initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      animate={isReduced || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full rounded-[28px] sm:rounded-[36px] bg-[#121211] border border-[rgba(244,240,232,0.1)] hover:border-[#C7A66A]/50 transition-all duration-500 shadow-2xl p-5 sm:p-7 md:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-10 group select-none"
    >
      {/* 1. PORTRAIT IMAGE (3/4 Aspect Ratio: 100% uncropped full hairstyle) */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Xem ảnh lớn kiểu tóc: ${item.title}`}
        onClick={(e) => onOpenLightbox(index, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenLightbox(index, e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
        className="relative w-full md:w-[300px] lg:w-[340px] xl:w-[380px] aspect-[3/4] shrink-0 rounded-[20px] sm:rounded-[26px] overflow-hidden border border-[rgba(244,240,232,0.12)] group-hover:border-[#C7A66A]/60 transition-all duration-500 bg-[#0B0B0A] shadow-xl cursor-pointer"
      >
        <EditorialImage
          src={item.image}
          alt={item.alt}
          aspectRatio="3/4"
          watermarkLabel={item.category}
          imageClassName="group-hover:scale-105 transition-transform duration-700 ease-out object-cover object-top"
        />

        {/* Subtle Dark Gradient Overlay at Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

        {/* Quick View Floating Pill Badge */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C7A66A]/60 text-[#F4F0E8] shadow-lg group-hover:bg-[#C7A66A] group-hover:text-[#0B0B0A] transition-all duration-300">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            XEM ẢNH ↗
          </span>
        </div>

        {/* Top Tag Plate */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md border border-[rgba(244,240,232,0.15)] text-[10px] font-mono uppercase tracking-widest text-[#C7A66A]">
          <span>{formattedNumber}</span>
          <span className="w-1 h-1 rounded-full bg-[#C7A66A]" />
          <span>{item.category}</span>
        </div>
      </div>

      {/* 2. CARD EDITORIAL DETAILS & ACTIONS */}
      <div className="flex-1 flex flex-col justify-between w-full text-left py-1">
        {/* Top Subtitle Row */}
        <div className="flex items-center justify-between text-xs text-[#A7A39B] font-mono uppercase tracking-wider mb-2.5">
          <span className="text-[#C7A66A] font-bold inline-flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5" /> 01.{formattedNumber} // BỘ SƯU TẬP
          </span>
          <div className="flex items-center gap-1 text-[#A7A39B]">
            <span>BẢN MẪU {formattedNumber} / {String(total).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Hairstyle Title */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors duration-300 mb-3 leading-tight">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#D6D1C8] font-light leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Highlights Bullet List */}
        <div className="space-y-2 mb-6 pt-3 border-t border-[rgba(244,240,232,0.08)]">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A7A39B]">
              <CheckCircle2 className="w-4 h-4 text-[#C7A66A] shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(244,240,232,0.1)]">
          <Button
            href={barberProfile.booking.primaryUrl}
            variant="primary"
            size="sm"
            className="px-5 py-2.5 text-xs font-bold"
          >
            Đặt Lịch Cắt Kiểu Này
          </Button>

          <button
            onClick={(e) => onOpenLightbox(index, e)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-[#F4F0E8] bg-[rgba(244,240,232,0.06)] hover:bg-[rgba(244,240,232,0.12)] border border-[rgba(244,240,232,0.15)] hover:border-[#C7A66A] hover:text-[#C7A66A] transition-all cursor-pointer"
          >
            <span>Phóng To Toàn Màn Hình</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

