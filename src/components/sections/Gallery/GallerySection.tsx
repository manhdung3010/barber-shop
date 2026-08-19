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
  const line1X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [60, -80]);
  const line2X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-60, 50]);
  const line3X = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-30, 100]);

  // Floating Objects Parallaxes & Rotations
  const obj1Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [80, -120]);
  const obj1Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-6, 8]);

  const obj2Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [140, -90]);
  const obj2Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [5, -5]);

  const obj3Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-40, 140]);
  const obj3Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [8, -7]);

  const obj4Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [100, -140]);
  const obj4Rot = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-10, 6]);

  const obj5Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [-20, 80]);
  const obj6Y = useTransform(scrollYProgress, [0, 1], isReduced ? [0, 0] : [60, -100]);

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
            <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#C7A66A]">
              04 / THE MANIFESTO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#A7A39B]">
              ARCHITECTURAL RITUAL
            </span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[#A7A39B]">
            <span>INDEX: ARCHIVE.04</span>
            <span className="hidden sm:inline">PRECISION CRAFT</span>
          </div>
        </FadeIn>
      </div>

      {/* ============================================================ */}
      {/* FLOATING BARBER VISUAL OBJECTS (Thin Warm-Gold Architectural Lines) */}
      {/* ============================================================ */}

      {/* Object 1: Japanese Honed Scissors (Top Right) */}
      <motion.div
        style={{ y: obj1Y, rotate: obj1Rot }}
        className="absolute top-[12%] right-[5%] sm:right-[12%] lg:right-[15%] pointer-events-none z-10 opacity-40 sm:opacity-75"
      >
        <div className="relative p-6 sm:p-8">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 sm:w-28 sm:h-28 text-[#C7A66A]">
            <circle cx="35" cy="95" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="85" cy="95" r="14" stroke="currentColor" strokeWidth="1.5" />
            <path d="M42 84 L75 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M78 84 L45 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="60" cy="55" r="3" fill="currentColor" />
          </svg>
          <span className="absolute -bottom-1 left-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]/80">
            [SCISSORS // 6.5" JAPANESE COBALT]
          </span>
        </div>
      </motion.div>

      {/* Object 2: Studio Barber Chair Silhouette (Mid Left) */}
      <motion.div
        style={{ y: obj2Y, rotate: obj2Rot }}
        className="absolute top-[28%] left-[2%] sm:left-[8%] lg:left-[10%] pointer-events-none z-10 opacity-30 sm:opacity-60"
      >
        <div className="relative p-6 sm:p-8">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 sm:w-36 sm:h-36 text-[#C7A66A]">
            <rect x="40" y="30" width="60" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M30 70 L110 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="45" y="70" width="50" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M70 95 L70 120" stroke="currentColor" strokeWidth="2" />
            <ellipse cx="70" cy="120" rx="35" ry="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="absolute -bottom-2 left-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#A7A39B]">
            [CHAIR // HYDRAULIC 360°]
          </span>
        </div>
      </motion.div>

      {/* Object 3: Precision Clipper & T-Blade (Center Right) */}
      <motion.div
        style={{ y: obj3Y, rotate: obj3Rot }}
        className="absolute top-[48%] right-[4%] sm:right-[10%] lg:right-[14%] pointer-events-none z-10 opacity-35 sm:opacity-70"
      >
        <div className="relative p-6">
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-22 h-22 sm:w-32 sm:h-32 text-[#C7A66A]">
            <rect x="45" y="40" width="40" height="70" rx="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M40 40 L90 40 L85 20 L45 20 Z" stroke="currentColor" strokeWidth="1.5" />
            <line x1="45" y1="20" x2="85" y2="20" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="65" y1="65" x2="65" y2="95" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="absolute -bottom-1 left-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]/80">
            [CLIPPER // 7200 RPM T-BLADE]
          </span>
        </div>
      </motion.div>

      {/* Object 4: Straight Razor (Bottom Left) */}
      <motion.div
        style={{ y: obj4Y, rotate: obj4Rot }}
        className="absolute bottom-[20%] left-[4%] sm:left-[12%] lg:left-[16%] pointer-events-none z-10 opacity-40 sm:opacity-75"
      >
        <div className="relative p-6">
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 sm:w-32 sm:h-32 text-[#C7A66A]">
            <path d="M25 80 Q65 60 105 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M30 75 L85 25 L95 35 L40 85 Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="35" cy="78" r="3" fill="currentColor" />
          </svg>
          <span className="absolute -bottom-1 left-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#C7A66A]/80">
            [RAZOR // CARBON STEEL EDGE]
          </span>
        </div>
      </motion.div>

      {/* Object 5: Precision Time Cadence Dial (Top Left) */}
      <motion.div
        style={{ y: obj5Y }}
        className="absolute top-[16%] left-[6%] sm:left-[18%] pointer-events-none z-10 opacity-25 sm:opacity-50 hidden sm:block"
      >
        <div className="relative p-4">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#F4F0E8]">
            <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="40" y1="40" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="40" y1="40" x2="55" y2="40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#A7A39B] mt-1 text-center">
            [45-MIN CADENCE]
          </span>
        </div>
      </motion.div>

      {/* Object 6: Grooming Elixir Vial (Bottom Right) */}
      <motion.div
        style={{ y: obj6Y }}
        className="absolute bottom-[14%] right-[8%] sm:right-[18%] pointer-events-none z-10 opacity-30 sm:opacity-60 hidden sm:block"
      >
        <div className="relative p-4">
          <svg width="70" height="90" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-18 text-[#C7A66A]">
            <rect x="25" y="10" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 35 L55 35 L50 85 L20 85 Z" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="55" x2="50" y2="55" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#A7A39B] mt-1 text-center">
            [ELIXIR TONIC]
          </span>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* MASSIVE KINETIC TYPOGRAPHY COMPOSITION (Floating in Space) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto w-full my-auto py-20 sm:py-28 relative z-20 flex flex-col justify-center gap-12 sm:gap-20 md:gap-28">
        {/* Line 01: THE SPACE. */}
        <motion.div
          style={{ x: line1X }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 01 // SANCTUARY
            </span>
            <div className="w-12 sm:w-24 h-[1px] bg-[#C7A66A]/40" />
          </div>
          <h2 className="text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            THE SPACE.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 max-w-sm">
            PRIVATE 1-ON-1 STUDIO ENVIRONMENT DESIGNED FOR TOTAL FOCUS.
          </p>
        </motion.div>

        {/* Line 02: THE CRAFT. (Offset Center-Right) */}
        <motion.div
          style={{ x: line2X }}
          className="flex flex-col items-start sm:items-center pl-6 sm:pl-0"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4 sm:self-center">
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 02 // DISCIPLINE
            </span>
            <div className="w-8 sm:w-16 h-[1px] bg-[#C7A66A]/40" />
          </div>
          <h2 className="text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            THE CRAFT.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 text-left sm:text-center max-w-sm">
            JAPANESE STEEL SHEARS AND MAGNETIC CLIPPERS TAILORED TO GRAIN.
          </p>
        </motion.div>

        {/* Line 03: THE DETAIL. (Offset Far-Right) */}
        <motion.div
          style={{ x: line3X }}
          className="flex flex-col items-start sm:items-end pr-0 sm:pr-6 md:pr-12"
        >
          <div className="flex items-center gap-4 mb-2 sm:mb-4 sm:self-end">
            <div className="w-12 sm:w-24 h-[1px] bg-[#C7A66A]/40" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] text-[#C7A66A]">
              PHASE 03 // EXECUTION
            </span>
          </div>
          <h2 className="text-[13vw] sm:text-[11vw] md:text-[9.5vw] font-black uppercase tracking-tight text-[#F4F0E8] leading-[0.88] hover:text-[#C7A66A] transition-colors duration-500">
            THE DETAIL.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#A7A39B] tracking-widest mt-2 text-left sm:text-right max-w-sm">
            HOT TOWEL ESSENTIALS AND RAZOR-SHARP FINISHES THAT ENDURE.
          </p>
        </motion.div>
      </div>

      {/* Bottom Technical Measurement Annotation Line */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-[rgba(244,240,232,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.25em] text-[#A7A39B] relative z-20">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C7A66A]" />
          <span>SPEC // BESPOKE GROOMING PROTOCOL</span>
        </div>
        <span>[PRECISION // TECHNIQUE // RITUAL]</span>
        <span>SCROLL TO PROCEED ↓</span>
      </div>
    </section>
  );
}
