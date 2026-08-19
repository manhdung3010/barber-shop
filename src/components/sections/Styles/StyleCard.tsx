import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Eye, ArrowUpRight, Sparkles } from 'lucide-react';
import { StyleItem } from '../../../types/index.ts';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../../hooks/useMediaQuery.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';

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
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isImageInView = useInView(imageRef, { once: true, amount: 0.2 });
  const isTextInView = useInView(textRef, { once: true, amount: 0.2 });

  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Subtle typography parallax (title moves slightly slower than image)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const titleParallax = useTransform(
    scrollYProgress,
    [0, 1],
    isReduced ? [0, 0] : [-14, 14]
  );

  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto flex flex-col group select-none"
    >
      {/* 1. LARGE DOMINANT IMAGE COMPOSITION WITH EDITORIAL MASK REVEAL */}
      <div
        ref={imageRef}
        role="button"
        tabIndex={0}
        aria-label={`View haircut style: ${item.title}`}
        onClick={(e) => onOpenLightbox(index, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenLightbox(index, e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-[rgba(244,240,232,0.14)] group-hover:border-[#C7A66A]/50 transition-all duration-700 bg-[#121211] shadow-2xl cursor-pointer"
      >
        <motion.div
          initial={
            isReduced
              ? { opacity: 1, scale: 1 }
              : { clipPath: 'inset(0 0 100% 0)', opacity: 0, scale: 1.06 }
          }
          animate={
            isReduced
              ? { opacity: 1, scale: 1 }
              : isImageInView
              ? { clipPath: 'inset(0 0 0% 0)', opacity: 1, scale: 1 }
              : { clipPath: 'inset(0 0 100% 0)', opacity: 0, scale: 1.06 }
          }
          transition={{
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1], // luxury editorial easing
          }}
          className="w-full h-full"
        >
          <EditorialImage
            src={item.image}
            alt={item.alt}
            aspectRatio="16/9"
            watermarkLabel={item.category}
            imageClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </motion.div>

        {/* Subtle Dark Gradient Scrim on Image Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        {/* Desktop Subtle "VIEW ↗" Badge */}
        {!isReduced && isFinePointer && (
          <div className="pointer-events-none absolute bottom-5 right-5 z-20 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C7A66A]/70 text-[#F4F0E8] shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
            <Eye className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F4F0E8]">
              VIEW ↗
            </span>
          </div>
        )}
      </div>

      {/* 2. ENHANCED EDITORIAL METADATA & TYPOGRAPHY WITH LUXURY MOTION */}
      <div ref={textRef} className="relative pt-6 sm:pt-8 md:pt-10 flex flex-col">
        {/* Large Decorative Watermark Plate Number in Background */}
        <div
          className="absolute right-0 top-2 font-mono font-black text-7xl sm:text-8xl md:text-9xl text-white/[0.03] pointer-events-none select-none tracking-tighter"
          aria-hidden="true"
        >
          {formattedNumber}
        </div>

        {/* Category & Plate Number Eyebrow with Animated Expanding Hairline Divider */}
        <div className="flex flex-col mb-4 sm:mb-6">
          <motion.div
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={
              isReduced
                ? { opacity: 1, y: 0 }
                : isTextInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex items-center justify-between pb-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#C7A66A]">
                {formattedNumber} / {item.category.toUpperCase()}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C7A66A]/60" />
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A7A39B]">
                SIGNATURE CRAFT
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A7A39B] group-hover:text-[#C7A66A] transition-colors">
              <span>PLATE {formattedNumber} OF {String(total).padStart(2, '0')}</span>
              <div className="p-1 rounded-full border border-transparent group-hover:border-[#C7A66A]/40 group-hover:bg-[#C7A66A]/10 transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.div>

          {/* Animated Gold Hairline Divider */}
          <motion.div
            initial={isReduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={
              isReduced
                ? { scaleX: 1 }
                : isTextInView
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{
              duration: 0.85,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: 'left' }}
            className="h-[1px] bg-gradient-to-r from-[#C7A66A]/60 via-[rgba(244,240,232,0.18)] to-transparent w-full"
          />
        </div>

        {/* Masked Title Reveal with Kinetic Hover Shift & Scroll Parallax */}
        <motion.div
          style={{ y: titleParallax }}
          className="overflow-hidden mb-3 sm:mb-4"
        >
          <motion.div
            initial={isReduced ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            animate={
              isReduced
                ? { y: 0, opacity: 1 }
                : isTextInView
                ? { y: 0, opacity: 1 }
                : { y: '100%', opacity: 0 }
            }
            transition={{
              duration: 0.75,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F4F0E8] group-hover:text-[#C7A66A] group-hover:translate-x-2 transition-all duration-300 leading-[0.98]">
              {item.title}
            </h3>
          </motion.div>
        </motion.div>

        {/* Description & Editorial Feature Badges */}
        <motion.div
          initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={
            isReduced
              ? { opacity: 1, y: 0 }
              : isTextInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: 0.6,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <p className="text-base sm:text-lg md:text-xl font-light text-[#A7A39B] leading-relaxed max-w-2xl">
            {item.description}
          </p>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#C7A66A] bg-[#141413] border border-[#C7A66A]/20 px-3.5 py-1.5 rounded-full shrink-0 self-start sm:self-auto">
            <Sparkles className="w-3 h-3 text-[#C7A66A]" />
            <span>BESPOKE FINISH</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
