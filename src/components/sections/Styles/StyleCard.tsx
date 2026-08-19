import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
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
  const isInView = useInView(imageRef, { once: true, amount: 0.2 });
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
    isReduced ? [0, 0] : [-16, 16]
  );

  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto flex flex-col group"
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
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden border border-[rgba(244,240,232,0.14)] group-hover:border-[#C7A66A]/40 transition-colors duration-500 bg-[#121211] shadow-2xl cursor-pointer select-none"
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
              : isInView
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

      {/* 2. STAGGERED EDITORIAL TYPOGRAPHY REVEAL DIRECTLY BELOW IMAGE */}
      <div className="pt-6 sm:pt-8 md:pt-10 flex flex-col">
        {/* Category & Plate Number Eyebrow */}
        <motion.div
          initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={
            isReduced
              ? { opacity: 1, y: 0 }
              : isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-4 mb-4 sm:mb-6"
        >
          <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] text-[#C7A66A]">
            {formattedNumber} / {item.category.toUpperCase()}
          </span>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A7A39B] group-hover:text-[#C7A66A] transition-colors">
            <span>PLATE {formattedNumber} OF {String(total).padStart(2, '0')}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </motion.div>

        {/* Large Haircut Title with Subtle Scroll Parallax */}
        <motion.div
          style={{ y: titleParallax }}
          initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={
            isReduced
              ? { opacity: 1, y: 0 }
              : isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-3 sm:mb-4"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors leading-[0.98]">
            {item.title}
          </h3>
        </motion.div>

        {/* Haircut Description */}
        <motion.div
          initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={
            isReduced
              ? { opacity: 1, y: 0 }
              : isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{
            duration: 0.6,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="text-base sm:text-lg md:text-xl font-light text-[#A7A39B] leading-relaxed max-w-2xl">
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
