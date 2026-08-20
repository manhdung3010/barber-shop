import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import FadeIn from '../../ui/FadeIn.tsx';

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReduced = useReducedMotion();

  // Scroll driver across the entire editorial composition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle Kinetic Typography Parallaxes
  const line1X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [24, -24]);
  const line2X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-24, 24]);
  const line3X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [16, -16]);

  // Floating Objects Parallaxes & Subtle Rotations
  const obj1Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [60, -60]);
  const obj1Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-4, 6]);

  const obj2Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [80, -50]);
  const obj2Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [3, -3]);

  const obj3Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-20, 70]);
  const obj3Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [6, -5]);

  const obj4Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [50, -80]);
  const obj4Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-6, 5]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-28 sm:py-36 md:py-44 px-5 sm:px-8 md:px-12 bg-[#0B0B0A] text-[#F4F0E8] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Background Architectural Grid Lines & Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-15" aria-hidden="true">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(244,240,232,0.1)] to-transparent hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(244,240,232,0.1)] to-transparent hidden sm:block" />
      </div>

      {/* Top Header Eyebrow & Technical Coordinates */}
      <div className="max-w-7xl mx-auto w-full relative z-20 mb-16 sm:mb-24">
        <FadeIn className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-6 gap-3">
          <div className="flex items-center gap-3">
            <span className="plate-meta">
              04 // CRAFT / SPACE · TAY NGHỀ & KHÔNG GIAN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#A7A39B]">
              BẰNG CHỨNG THỦ CÔNG
            </span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[#A7A39B]">
            <span>CHỈ MỤC: ARCHIVE.04</span>
            <span className="hidden sm:inline">TAY NGHỀ CHUẨN XÁC</span>
          </div>
        </FadeIn>
      </div>

      {/* ============================================================ */}
      {/* AUTHENTIC ARCHITECTURAL FLOATING BARBER OBJECTS (Background) */}
      {/* ============================================================ */}

      {/* Object 1: Japanese Offset Convex Shears (Top Right) */}
      <motion.div
        style={{ y: obj1Y, rotate: obj1Rot }}
        className="absolute top-[12%] right-[2%] sm:right-[8%] lg:right-[12%] pointer-events-none z-0 opacity-20 sm:opacity-40"
      >
        <div className="relative p-4">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 sm:w-36 sm:h-36 text-[#C7A66A]">
            <path d="M50 145 C45 130, 48 115, 60 100 L140 30 C143 28, 147 32, 145 35 L75 115 C70 120, 68 135, 60 145 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M95 140 C100 125, 96 112, 85 100 L145 40 C148 38, 144 34, 140 35 L68 108 C64 112, 60 125, 65 140 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="45" cy="150" rx="14" ry="18" stroke="currentColor" strokeWidth="1.4" transform="rotate(-20 45 150)" />
            <ellipse cx="98" cy="148" rx="14" ry="18" stroke="currentColor" strokeWidth="1.4" transform="rotate(20 98 148)" />
            <path d="M33 158 C26 162, 22 170, 24 175" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="80" cy="104" r="5" fill="#141413" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="80" cy="104" r="2" fill="currentColor" />
          </svg>
        </div>
      </motion.div>

      {/* Object 2: Vintage Hydraulic Barber Chair Blueprint (Mid Left) */}
      <motion.div
        style={{ y: obj2Y, rotate: obj2Rot }}
        className="absolute top-[38%] left-[2%] sm:left-[5%] pointer-events-none z-0 opacity-15 sm:opacity-30"
      >
        <div className="relative p-4">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 sm:w-40 sm:h-40 text-[#C7A66A]">
            <rect x="85" y="15" width="30" height="14" rx="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M100 29 L100 40" stroke="currentColor" strokeWidth="1.5" />
            <path d="M70 40 C65 40, 60 45, 62 75 L65 105 C65 110, 70 115, 80 115 L120 115 C130 115, 135 110, 135 105 L138 75 C140 45, 135 40, 130 40 Z" stroke="currentColor" strokeWidth="1.2" />
            <rect x="55" y="115" width="90" height="22" rx="6" stroke="currentColor" strokeWidth="1.4" />
            <rect x="94" y="137" width="12" height="35" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="100" cy="178" rx="55" ry="14" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </motion.div>

      {/* Object 3: Cordless Taper Clipper (Right) */}
      <motion.div
        style={{ y: obj3Y, rotate: obj3Rot }}
        className="absolute top-[62%] right-[2%] sm:right-[6%] pointer-events-none z-0 opacity-20 sm:opacity-35"
      >
        <div className="relative p-4">
          <svg width="170" height="190" viewBox="0 0 170 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-28 sm:w-32 sm:h-38 text-[#C7A66A]">
            <path d="M55 25 L115 25 L110 40 L60 40 Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M60 40 C55 60, 52 100, 58 145 C60 160, 68 170, 85 170 C102 170, 110 160, 112 145 C118 100, 115 60, 110 40 Z" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </motion.div>

      {/* Object 4: Japanese Straight Razor (Bottom Left) */}
      <motion.div
        style={{ y: obj4Y, rotate: obj4Rot }}
        className="absolute bottom-[8%] left-[2%] sm:left-[8%] pointer-events-none z-0 opacity-20 sm:opacity-35"
      >
        <div className="relative p-4">
          <svg width="190" height="150" viewBox="0 0 190 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-20 sm:w-36 sm:h-28 text-[#C7A66A]">
            <path d="M45 95 C65 110, 115 125, 165 120 C172 118, 175 112, 170 108 C125 102, 80 88, 55 78 Z" stroke="currentColor" strokeWidth="1.4" fill="#141413" />
            <path d="M45 80 L95 35 C115 18, 145 15, 160 22 L150 55 C135 50, 105 52, 58 88 Z" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* STRUCTURED 3-CHAPTER EDITORIAL TYPOGRAPHY WITH SAFE BOUNDS   */}
      {/* ============================================================ */}
      <div className="max-w-6xl mx-auto w-full relative z-20 flex flex-col gap-20 sm:gap-28 md:gap-36 my-auto py-8 sm:py-12">
        {/* Chapter 01: KHÔNG GIAN. */}
        <motion.div
          style={{ x: line1X }}
          className="flex flex-col items-start max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C7A66A]">
              01 // KHÔNG GIAN RIÊNG TƯ
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F0E8] leading-[1.08] hover:text-[#C7A66A] transition-colors duration-300 mb-3">
            KHÔNG GIAN.
          </h2>

          <p className="text-sm sm:text-base font-light text-[#A7A39B] leading-relaxed">
            Studio cá nhân 1-on-1 với ghế cắt thủy lực Takara, âm học tĩnh lặng và hệ thống ánh sáng chuyên dụng tôn vinh từng chi tiết tóc.
          </p>
        </motion.div>

        {/* Chapter 02: TAY NGHỀ. (Centered/Offset) */}
        <motion.div
          style={{ x: line2X }}
          className="flex flex-col items-start sm:items-center max-w-2xl sm:mx-auto text-left sm:text-center"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4 sm:self-center">
            <div className="hidden sm:block w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C7A66A]">
              02 // TAY NGHỀ ĐIÊU LUYỆN
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F0E8] leading-[1.08] hover:text-[#C7A66A] transition-colors duration-300 mb-3">
            TAY NGHỀ.
          </h2>

          <p className="text-sm sm:text-base font-light text-[#A7A39B] leading-relaxed">
            Kéo thép Hitachi Cobalt Nhật Bản và tông đơ từ tính đi chuẩn xác theo hướng mọc tự nhiên của sợi tóc, giữ phom bền bỉ sau nhiều tuần.
          </p>
        </motion.div>

        {/* Chapter 03: CHI TIẾT. (Right-aligned) */}
        <motion.div
          style={{ x: line3X }}
          className="flex flex-col items-start sm:items-end max-w-2xl sm:ml-auto text-left sm:text-right"
        >
          <div className="flex items-center gap-3 mb-3 sm:mb-4 sm:self-end">
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#C7A66A]">
              03 // CHI TIẾT HOÀN HẢO
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F4F0E8] leading-[1.08] hover:text-[#C7A66A] transition-colors duration-300 mb-3">
            CHI TIẾT.
          </h2>

          <p className="text-sm sm:text-base font-light text-[#A7A39B] leading-relaxed">
            Nghi thức khăn nóng thảo mộc, đường dao cạo mài vát bén ngọt và các sản phẩm dưỡng chuyên biệt hoàn thiện diện mạo phong độ đỉnh cao.
          </p>
        </motion.div>
      </div>

      {/* Bottom Technical Measurement Annotation Line */}
      <div className="max-w-7xl mx-auto w-full pt-8 mt-12 sm:mt-16 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[#A7A39B] relative z-20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C7A66A]" />
          <span>QUY CHUẨN // QUY TRÌNH CHĂM SÓC DIỆN MẠO ĐẶC QUYỀN</span>
        </div>
        <span>[CHUẨN XÁC // KỸ THUẬT // TẬN TÂM]</span>
        <span>CUỘN XUỐNG ĐỂ TIẾP TỤC ↓</span>
      </div>
    </section>
  );
}
