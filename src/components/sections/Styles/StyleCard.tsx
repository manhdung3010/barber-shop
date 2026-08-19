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
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
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

  return (
    <motion.div
      layout
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
      className={`group relative rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[rgba(244,240,232,0.12)] hover:border-[rgba(199,166,106,0.4)] transition-colors duration-500 cursor-pointer bg-[#0E0E0D] ${spanClass}`}
    >
      {/* 1. Image Clip-Path Reveal (Primary Cinematic Effect) */}
      <div className="relative w-full h-full overflow-hidden">
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
            delay: (index % 3) * 0.12,
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
            className="pointer-events-none absolute z-20 hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B0B0A]/85 backdrop-blur-md border border-[#C7A66A]/60 text-[#F4F0E8] shadow-xl"
          >
            <Eye className="w-3.5 h-3.5 text-[#C7A66A]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F4F0E8]">
              VIEW
            </span>
          </motion.div>
        )}

        {/* 3. Dark Editorial Overlay with Metadata Scroll Reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-95 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-between p-6 sm:p-8 z-10">
          {/* Top Tag Row */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#C7A66A] bg-[#0B0B0A]/70 backdrop-blur-md px-3 py-1 rounded-full border border-[rgba(244,240,232,0.1)]">
              {String(index + 1).padStart(2, '0')} / {item.category.toUpperCase()}
            </span>
            <div className="p-2 rounded-full bg-[#0B0B0A]/70 text-[#C7A66A] border border-[rgba(244,240,232,0.1)]">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Title & Description Reveal */}
          <motion.div
            initial={isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={isReduced ? { opacity: 1, y: 0 } : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{
              duration: 0.6,
              delay: (index % 3) * 0.12 + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h3 className={`font-extrabold uppercase tracking-tight text-[#F4F0E8] mb-1.5 ${isFeatured ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-lg sm:text-xl'}`}>
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#A7A39B] line-clamp-2 max-w-lg font-light leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
