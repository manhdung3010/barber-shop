import React, { useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Eye, ArrowUpRight } from 'lucide-react';
import { StyleItem } from '../../../types/index.ts';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../../hooks/useMediaQuery.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';

interface StyleCardProps {
  item: StyleItem;
  index: number;
  onOpenLightbox: (index: number, e: React.MouseEvent<HTMLElement>) => void;
}

export default function StyleCard({ item, index, onOpenLightbox }: StyleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  const [isHovered, setIsHovered] = useState(false);

  // Subtle spring-dampened cursor follow for the "◯ VIEW" indicator
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isReduced || !isFinePointer) return;
    const rect = cardRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const spanClass = {
    featured: 'col-span-12 lg:col-span-8',
    wide: 'col-span-12 md:col-span-8',
    tall: 'col-span-12 md:col-span-6 lg:col-span-4',
    standard: 'col-span-12 md:col-span-6 lg:col-span-4',
  }[item.layoutVariant || 'standard'];

  const isFeatured = item.layoutVariant === 'featured' || item.layoutVariant === 'wide';
  const formattedNumber = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group flex flex-col cursor-pointer ${spanClass}`}
    >
      {/* 1. LARGE HAIRCUT IMAGE CONTAINER WITH CINEMATIC CLIP-PATH REVEAL */}
      <div className="relative w-full rounded-[22px] sm:rounded-[32px] overflow-hidden border border-[rgba(244,240,232,0.12)] group-hover:border-[#C7A66A]/40 transition-colors duration-500 bg-[#121211] shadow-xl">
        <motion.div
          initial={isReduced ? { opacity: 1, scale: 1 } : { clipPath: 'inset(0 0 100% 0)', opacity: 0, scale: 1.04 }}
          animate={
            isReduced
              ? { opacity: 1, scale: 1 }
              : isInView
              ? { clipPath: 'inset(0 0 0% 0)', opacity: 1, scale: 1 }
              : { clipPath: 'inset(0 0 100% 0)', opacity: 0, scale: 1.04 }
          }
          transition={{
            duration: 0.85,
            delay: (index % 3) * 0.1,
            ease: [0.16, 1, 0.3, 1], // luxury editorial easing
          }}
          className="w-full h-full"
        >
          <EditorialImage
            src={item.image}
            alt={item.alt}
            aspectRatio={isFeatured ? '16/9' : '4/5'}
            watermarkLabel={item.category}
            imageClassName="group-hover:scale-104 transition-transform duration-700 ease-out"
          />
        </motion.div>

        {/* Subtle Dark Gradient Scrim on Image Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

        {/* 2. Desktop Subtle "◯ VIEW" Indicator Following Pointer */}
        {!isReduced && isFinePointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              left: cursorX,
              top: cursorY,
              x: '-50%',
              y: '-50%',
            }}
            className="pointer-events-none absolute z-20 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C7A66A]/70 text-[#F4F0E8] shadow-2xl"
          >
            <Eye className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F4F0E8]">
              VIEW
            </span>
          </motion.div>
        )}
      </div>

      {/* 3. EDITORIAL METADATA DIRECTLY BELOW IMAGE */}
      <motion.div
        initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={isReduced ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: 0.6,
          delay: (index % 3) * 0.1 + 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="pt-4 sm:pt-5 px-1 flex flex-col"
      >
        {/* Category & Number Row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#C7A66A]">
            {formattedNumber} / {item.category.toUpperCase()}
          </span>
          <div className="p-1 rounded-full text-[#A7A39B] group-hover:text-[#C7A66A] transition-colors">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Title */}
        <h3 className={`font-bold uppercase tracking-tight text-[#F4F0E8] group-hover:text-[#C7A66A] transition-colors mb-1 ${isFeatured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-base sm:text-lg md:text-xl'}`}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#A7A39B] font-light leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
