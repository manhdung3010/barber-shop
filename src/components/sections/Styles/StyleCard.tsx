import React, { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { StyleItem } from '../../../types/index.ts';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../../hooks/useMediaQuery.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';

interface StyleCardProps {
  item: StyleItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpenLightbox: (index: number, e: React.MouseEvent<HTMLElement>) => void;
}

export default function StyleCard({
  item,
  index,
  total,
  progress,
  range,
  targetScale,
  onOpenLightbox,
}: StyleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Dynamic scale transformation as subsequent cards stack over
  const scale = useTransform(progress, range, [1, targetScale]);
  const formattedNumber = String(index + 1).padStart(2, '0');

  // Sticky top offset creating physical lookbook tabs
  const topOffset = `calc(88px + ${index * 18}px)`;

  return (
    <div
      ref={cardRef}
      className="sticky top-0 w-full flex items-center justify-center mb-16 sm:mb-24 last:mb-0"
      style={{
        top: topOffset,
      }}
    >
      <motion.div
        style={{
          scale: isReduced ? 1 : scale,
          transformOrigin: 'top center',
        }}
        role="button"
        tabIndex={0}
        aria-label={`View haircut style in lookbook: ${item.title}`}
        onClick={(e) => onOpenLightbox(index, e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenLightbox(index, e as unknown as React.MouseEvent<HTMLElement>);
          }
        }}
        className="group w-full rounded-[28px] sm:rounded-[44px] md:rounded-[52px] bg-[#121211] text-[#F4F0E8] border border-[rgba(244,240,232,0.14)] hover:border-[#C7A66A]/40 shadow-[0_-12px_45px_rgba(0,0,0,0.5)] p-5 sm:p-8 md:p-12 flex flex-col justify-between cursor-pointer transition-colors duration-500 overflow-hidden select-none"
      >
        {/* Top Lookbook Header Tag */}
        <div className="flex items-center justify-between border-b border-[rgba(244,240,232,0.12)] pb-4 sm:pb-5 mb-5 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-[#C7A66A]">
              {formattedNumber} / {item.category.toUpperCase()}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C7A66A]/50" />
            <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A7A39B]">
              LOOKBOOK SPECIFICATION
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A7A39B] group-hover:text-[#C7A66A] transition-colors">
            <span>FULLSCREEN</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Dominant Visual Haircut Image Frame */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] rounded-[20px] sm:rounded-[32px] overflow-hidden border border-[rgba(244,240,232,0.1)] bg-[#0B0B0A] shadow-2xl mb-6 sm:mb-8">
          <EditorialImage
            src={item.image}
            alt={item.alt}
            aspectRatio="16/9"
            watermarkLabel={item.category}
            imageClassName="group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />

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

        {/* Bottom Editorial Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors mb-2 leading-[0.98]">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base md:text-lg font-light text-[#A7A39B] leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A7A39B]">
              PLATE {formattedNumber} OF {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
