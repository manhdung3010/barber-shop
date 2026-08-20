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

  // Kinetic Typography Parallaxes (Each line moves independently at different speeds)
  const line1X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [50, -70]);
  const line2X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-50, 40]);
  const line3X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-25, 80]);

  // Floating Objects Parallaxes & Subtle Rotations
  const obj1Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [90, -110]);
  const obj1Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-4, 6]);

  const obj2Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [130, -80]);
  const obj2Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [3, -3]);

  const obj3Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-30, 120]);
  const obj3Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [6, -5]);

  const obj4Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [80, -130]);
  const obj4Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-6, 5]);

  const obj5Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-15, 70]);
  const obj6Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [50, -90]);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative min-h-[140vh] sm:min-h-[160vh] md:min-h-[190vh] py-28 sm:py-40 md:py-48 px-5 sm:px-8 md:px-12 bg-[#0B0B0A] text-[#F4F0E8] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Background Architectural Grid Lines & Crosshairs */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(244,240,232,0.15)] to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(244,240,232,0.1)] to-transparent hidden sm:block" />
        <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-[rgba(244,240,232,0.1)] to-transparent hidden sm:block" />
      </div>

      {/* Top Header Eyebrow & Technical Coordinates */}
      <div className="max-w-7xl mx-auto w-full relative z-20">
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
      {/* AUTHENTIC ARCHITECTURAL FLOATING BARBER OBJECTS */}
      {/* ============================================================ */}

      {/* Object 1: Japanese Offset Convex Shears (Top Right) */}
      <motion.div
        style={{ y: obj1Y, rotate: obj1Rot }}
        className="absolute top-[10%] right-[3%] sm:right-[10%] lg:right-[14%] pointer-events-none z-10 opacity-45 sm:opacity-85"
      >
        <div className="relative p-4 sm:p-6">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28 sm:w-40 sm:h-40 text-[#C7A66A]">
            <path d="M50 145 C45 130, 48 115, 60 100 L140 30 C143 28, 147 32, 145 35 L75 115 C70 120, 68 135, 60 145 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M95 140 C100 125, 96 112, 85 100 L145 40 C148 38, 144 34, 140 35 L68 108 C64 112, 60 125, 65 140 Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="45" cy="150" rx="14" ry="18" stroke="currentColor" strokeWidth="1.4" transform="rotate(-20 45 150)" />
            <ellipse cx="98" cy="148" rx="14" ry="18" stroke="currentColor" strokeWidth="1.4" transform="rotate(20 98 148)" />
            <path d="M33 158 C26 162, 22 170, 24 175" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="80" cy="104" r="5" fill="#141413" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="80" cy="104" r="2" fill="currentColor" />
            <line x1="105" y1="65" x2="110" y2="70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="115" y1="55" x2="120" y2="60" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="125" y1="45" x2="130" y2="50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
          <div className="absolute -bottom-2 left-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]">
            <span className="w-1 h-1 rounded-full bg-[#C7A66A]" />
            <span>[KÉO CẮT // 6.5" THÉP HITACHI COBALT]</span>
          </div>
        </div>
      </motion.div>

      {/* Object 2: Vintage Hydraulic Barber Chair Blueprint (Mid Left) */}
      <motion.div
        style={{ y: obj2Y, rotate: obj2Rot }}
        className="absolute top-[26%] left-[2%] sm:left-[6%] lg:left-[8%] pointer-events-none z-10 opacity-35 sm:opacity-70"
      >
        <div className="relative p-4 sm:p-6">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 sm:w-48 sm:h-48 text-[#C7A66A]">
            <rect x="85" y="15" width="30" height="14" rx="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M100 29 L100 40" stroke="currentColor" strokeWidth="1.5" />
            <path d="M70 40 C65 40, 60 45, 62 75 L65 105 C65 110, 70 115, 80 115 L120 115 C130 115, 135 110, 135 105 L138 75 C140 45, 135 40, 130 40 Z" stroke="currentColor" strokeWidth="1.2" />
            <line x1="75" y1="65" x2="125" y2="65" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="75" y1="90" x2="125" y2="90" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <rect x="55" y="115" width="90" height="22" rx="6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M50 85 C50 75, 60 75, 70 75 L70 115" stroke="currentColor" strokeWidth="1.4" />
            <path d="M150 85 C150 75, 140 75, 130 75 L130 115" stroke="currentColor" strokeWidth="1.4" />
            <path d="M142 122 L158 110" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="158" cy="110" r="2.5" fill="currentColor" />
            <rect x="94" y="137" width="12" height="35" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="100" cy="178" rx="55" ry="14" stroke="currentColor" strokeWidth="1.4" />
            <ellipse cx="100" cy="178" rx="42" ry="9" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M70 137 L50 170 L75 170" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <div className="absolute -bottom-2 left-4 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#A7A39B]">
            <span className="w-1 h-1 rounded-full bg-[#A7A39B]" />
            <span>[GHẾ CẮT // THỦY LỰC XOAY 360° CHUẨN TAKARA]</span>
          </div>
        </div>
      </motion.div>

      {/* Object 3: Cordless Taper Clipper & Precision Blade (Center Right) */}
      <motion.div
        style={{ y: obj3Y, rotate: obj3Rot }}
        className="absolute top-[46%] right-[2%] sm:right-[8%] lg:right-[12%] pointer-events-none z-10 opacity-40 sm:opacity-80"
      >
        <div className="relative p-4 sm:p-6">
          <svg width="170" height="190" viewBox="0 0 170 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-32 sm:w-36 sm:h-44 text-[#C7A66A]">
            <path d="M55 25 L115 25 L110 40 L60 40 Z" stroke="currentColor" strokeWidth="1.2" />
            <path d="M60 20 L60 25 M65 20 L65 25 M70 20 L70 25 M75 20 L75 25 M80 20 L80 25 M85 20 L85 25 M90 20 L90 25 M95 20 L95 25 M100 20 L100 25 M105 20 L105 25 M110 20 L110 25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M60 40 C55 60, 52 100, 58 145 C60 160, 68 170, 85 170 C102 170, 110 160, 112 145 C118 100, 115 60, 110 40 Z" stroke="currentColor" strokeWidth="1.4" />
            <line x1="62" y1="85" x2="108" y2="85" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="60" y1="105" x2="110" y2="105" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="59" y1="125" x2="111" y2="125" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M54 55 L42 62 L45 75 L55 70" stroke="currentColor" strokeWidth="1.4" fill="#141413" />
            <rect x="78" y="142" width="14" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
            <line x1="85" y1="146" x2="85" y2="154" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="absolute -bottom-2 left-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]">
            <span className="w-1 h-1 rounded-full bg-[#C7A66A]" />
            <span>[TÔNG ĐƠ // ĐỘNG CƠ TỪ TÍNH 7200 RPM]</span>
          </div>
        </div>
      </motion.div>

      {/* Object 4: Japanese Straight Razor / Folding Shavette (Bottom Left) */}
      <motion.div
        style={{ y: obj4Y, rotate: obj4Rot }}
        className="absolute bottom-[16%] left-[3%] sm:left-[10%] lg:left-[14%] pointer-events-none z-10 opacity-45 sm:opacity-85"
      >
        <div className="relative p-4 sm:p-6">
          <svg width="190" height="150" viewBox="0 0 190 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-24 sm:w-44 sm:h-36 text-[#C7A66A]">
            <path d="M45 95 C65 110, 115 125, 165 120 C172 118, 175 112, 170 108 C125 102, 80 88, 55 78 Z" stroke="currentColor" strokeWidth="1.4" fill="#141413" />
            <path d="M45 80 L95 35 C115 18, 145 15, 160 22 L150 55 C135 50, 105 52, 58 88 Z" stroke="currentColor" strokeWidth="1.4" />
            <path d="M98 38 C116 22, 142 20, 155 26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M68 76 C98 56, 125 45, 145 48" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" strokeOpacity="0.6" />
            <path d="M45 80 C35 88, 22 92, 15 85 C12 78, 20 72, 35 72 L45 80" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="48" cy="84" r="3.5" fill="#141413" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="48" cy="84" r="1.5" fill="currentColor" />
          </svg>
          <div className="absolute -bottom-2 left-2 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]">
            <span className="w-1 h-1 rounded-full bg-[#C7A66A]" />
            <span>[DAO CẠO // THÉP CARBON MÀI VÁT HOLLOW]</span>
          </div>
        </div>
      </motion.div>

      {/* Object 5: Precision Time Cadence Chronograph Dial (Top Left) */}
      <motion.div
        style={{ y: obj5Y }}
        className="absolute top-[14%] left-[4%] sm:left-[16%] pointer-events-none z-10 opacity-30 sm:opacity-65 hidden sm:block"
      >
        <div className="relative p-4">
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 sm:w-24 sm:h-24 text-[#F4F0E8]">
            <circle cx="55" cy="55" r="48" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
            <circle cx="55" cy="55" r="42" stroke="currentColor" strokeWidth="1.2" />
            <line x1="55" y1="17" x2="55" y2="23" stroke="#C7A66A" strokeWidth="2" />
            <line x1="55" y1="87" x2="55" y2="93" stroke="#C7A66A" strokeWidth="2" />
            <line x1="17" y1="55" x2="23" y2="55" stroke="#C7A66A" strokeWidth="2" />
            <line x1="87" y1="55" x2="93" y2="55" stroke="#C7A66A" strokeWidth="2" />
            <line x1="55" y1="55" x2="55" y2="28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="55" y1="55" x2="28" y2="55" stroke="#C7A66A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="55" cy="55" r="3" fill="#C7A66A" />
          </svg>
          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#A7A39B] mt-1 text-center">
            [NHỊP ĐỘ 45 PHÚT CHUYÊN SÂU]
          </span>
        </div>
      </motion.div>

      {/* Object 6: Classic Atomizer Bottle & Tonic Dispenser (Bottom Right) */}
      <motion.div
        style={{ y: obj6Y }}
        className="absolute bottom-[12%] right-[5%] sm:right-[15%] pointer-events-none z-10 opacity-35 sm:opacity-70 hidden sm:block"
      >
        <div className="relative p-4">
          <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-24 sm:w-28 sm:h-32 text-[#C7A66A]">
            <path d="M40 45 L80 45 L90 110 C90 115, 85 120, 80 120 L40 120 C35 120, 30 115, 30 110 Z" stroke="currentColor" strokeWidth="1.4" />
            <line x1="33" y1="75" x2="87" y2="75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.5" />
            <line x1="60" y1="45" x2="60" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" />
            <rect x="50" y="32" width="20" height="13" stroke="currentColor" strokeWidth="1.2" />
            <path d="M50 38 L30 38 L25 35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="98" cy="38" rx="14" ry="10" stroke="currentColor" strokeWidth="1.4" fill="#141413" />
            <path d="M70 38 L84 38" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#A7A39B] mt-1 text-center">
            [TINH DẦU &amp; TONIC BAY RUM]
          </span>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* MASSIVE KINETIC TYPOGRAPHY COMPOSITION (Floating in Space) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto w-full my-auto py-20 sm:py-28 relative z-20 flex flex-col justify-center gap-12 sm:gap-20 md:gap-28">
        {/* Line 01: KHÔNG GIAN. */}
        <motion.div
          style={{ x: line1X }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 01 // KHÔNG GIAN RIÊNG TƯ
            </span>
            <div className="w-12 sm:w-24 h-[1px] bg-[#C7A66A]/40" />
          </div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            KHÔNG GIAN.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 max-w-sm">
            STUDIO CÁ NHÂN 1-ON-1 TẬP TRUNG TỐI ĐA CHO DIỆN MẠO CỦA BẠN.
          </p>
        </motion.div>

        {/* Line 02: TAY NGHỀ. (Offset Center-Right) */}
        <motion.div
          style={{ x: line2X }}
          className="flex flex-col items-start sm:items-center pl-6 sm:pl-0"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4 sm:self-center">
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 02 // TAY NGHỀ ĐIÊU LUYỆN
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
          </div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            TAY NGHỀ.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 text-left sm:text-center max-w-sm">
            KÉO THÉP NHẬT VÀ TÔNG ĐƠ TỪ TÍNH ĐI ĐÚNG CHIỀU TÓC MỌC.
          </p>
        </motion.div>

        {/* Line 03: CHI TIẾT. (Offset Far-Right) */}
        <motion.div
          style={{ x: line3X }}
          className="flex flex-col items-start sm:items-end pr-0 sm:pr-6 md:pr-12"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4 sm:self-end">
            <div className="w-12 sm:w-24 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 03 // CHI TIẾT HOÀN HẢO
            </span>
          </div>
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            CHI TIẾT.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 text-left sm:text-right max-w-sm">
            KHĂN NÓNG TINH DẦU VÀ NHỮNG ĐƯỜNG CẠO CHẤN SẮC NÉT BỀN LÂU.
          </p>
        </motion.div>
      </div>

      {/* Bottom Technical Measurement Annotation Line */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[#A7A39B] relative z-20">
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
