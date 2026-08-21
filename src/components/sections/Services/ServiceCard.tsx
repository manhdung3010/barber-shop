'use client';
import { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, Clock, Scissors, Layers, Flame, Waves, Droplets, Sparkles } from 'lucide-react';
import { Service } from '../../../types/index';
import { barberProfile } from '../../../data/barber';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import Button from '../../ui/Button';

interface ServiceCardProps {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function getServiceIcon(id: string) {
  switch (id) {
    case 'haircut':
      return <Scissors className="w-3.5 h-3.5 text-[#C7A66A]" />;
    case 'fade':
      return <Layers className="w-3.5 h-3.5 text-[#C7A66A]" />;
    case 'haircut-beard':
      return <Flame className="w-3.5 h-3.5 text-[#C7A66A]" />;
    case 'perm':
      return <Waves className="w-3.5 h-3.5 text-[#C7A66A]" />;
    case 'styling':
      return <Droplets className="w-3.5 h-3.5 text-[#C7A66A]" />;
    default:
      return <Sparkles className="w-3.5 h-3.5 text-[#C7A66A]" />;
  }
}

export default function ServiceCard({
  service,
  index,
  total,
  progress,
  range,
  targetScale,
}: ServiceCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // Dynamic scale as user scrolls through the stack
  const scale = useTransform(progress, range, [1, targetScale]);
  const formattedNumber = String(index + 1).padStart(2, '0');

  // Sticky top offset to create the editorial stacked tabs visual
  const topOffset = `calc(84px + ${index * 22}px)`;

  return (
    <div
      ref={containerRef}
      className="sticky top-0 w-full flex items-center justify-center mb-8 sm:mb-10 last:mb-0"
      style={{
        top: topOffset,
      }}
    >
      <motion.div
        style={{
          scale: isReduced ? 1 : scale,
          transformOrigin: 'top center',
        }}
        className="w-full min-h-0 sm:min-h-[48vh] md:min-h-[52vh] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] bg-[#141413] text-[#F4F0E8] border border-[rgba(244,240,232,0.14)] shadow-[0_-15px_50px_rgba(0,0,0,0.7)] p-5 sm:p-7 md:p-9 lg:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-[#C7A66A]/40 transition-colors duration-500"
      >
        {/* Card Header: Plate Number + Category + Duration */}
        <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-3 sm:pb-4 z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="plate-meta">
              {formattedNumber} // {String(total).padStart(2, '0')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#A7A39B]">
              QUY CHUẨN DỊCH VỤ
            </span>
          </div>

          {service.duration && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#C7A66A] bg-[#C7A66A]/10 px-3 py-1 rounded-full border border-[#C7A66A]/20">
              <Clock className="w-3.5 h-3.5 text-[#C7A66A]" />
              <span>{service.duration}</span>
            </div>
          )}
        </div>

        {/* Middle Editorial Showcase: Big Headline, Story, and Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-4 sm:my-6 flex-1 z-10">
          {/* Left Column: Typography & Description */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#C7A66A] mb-1.5">
              {getServiceIcon(service.id)}
              <span>{service.categoryLabel || 'DỊCH VỤ THIẾT KẾ'}</span>
            </div>

            <h3 className="section-item-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#F4F0E8] mb-3 sm:mb-4 leading-[1.08] group-hover:text-[#C7A66A] transition-colors">
              {service.name}
            </h3>

            <p className="text-sm sm:text-base md:text-lg font-light text-[#A7A39B] leading-relaxed max-w-xl mb-4">
              {service.description}
            </p>

            {service.features && service.features.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold uppercase tracking-wider text-[#A7A39B]">
                {service.features.map((feat, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                    {feat}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#A7A39B]">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                  Tư Vấn Tỉ Lệ Khuôn Mặt
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]" />
                  Cạo Chấn Viền Sắc Nét
                </span>
              </div>
            )}
          </div>

          {/* Right Column: High-End Stylized Graphic Card */}
          {service.image && (
            <div className="lg:col-span-5 hidden sm:flex justify-center lg:justify-end">
              <div className="w-full max-w-[280px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-[rgba(244,240,232,0.12)] bg-[#0B0B0A]">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Footer: Pricing & Action CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-[rgba(244,240,232,0.12)] z-10">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#A7A39B]">
              CHI PHÍ
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-[#C7A66A] tracking-tight">
              {service.price}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="md"
              className="w-full sm:w-auto font-bold shadow-md shadow-[#C7A66A]/15 group/btn"
            >
              <span>Đặt Gói Dịch Vụ Này</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        {/* Large Decorative Watermark Number in Card Corner */}
        <div
          className="absolute -right-4 -bottom-6 sm:-bottom-10 text-[18vw] sm:text-[14vw] md:text-[11vw] font-mono font-black text-white/[0.03] pointer-events-none select-none leading-none z-0"
          aria-hidden="true"
        >
          {formattedNumber}
        </div>
      </motion.div>
    </div>
  );
}

