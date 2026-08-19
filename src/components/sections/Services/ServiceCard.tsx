import { useRef } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { Service } from '../../../types/index.ts';
import { barberProfile } from '../../../data/barber.ts';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import Button from '../../ui/Button.tsx';

interface ServiceCardProps {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
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

  // Calculate dynamic scale transformation as user scrolls through the stack
  const scale = useTransform(progress, range, [1, targetScale]);
  const formattedNumber = String(index + 1).padStart(2, '0');

  // Sticky top offset to create the editorial stacked tabs visual
  const topOffset = `calc(88px + ${index * 20}px)`;

  return (
    <div
      ref={containerRef}
      className="sticky top-0 w-full flex items-center justify-center mb-12 sm:mb-16 last:mb-0"
      style={{
        top: topOffset,
      }}
    >
      <motion.div
        style={{
          scale: isReduced ? 1 : scale,
          transformOrigin: 'top center',
        }}
        className="w-full min-h-[65vh] sm:min-h-[70vh] md:min-h-[72vh] rounded-[28px] sm:rounded-[40px] md:rounded-[52px] bg-[#F4F0E8] text-[#0B0B0A] border border-[rgba(11,11,10,0.12)] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between relative overflow-hidden"
      >
        {/* Ambient Subtle Paper Texture / Card Header */}
        <div className="flex items-center justify-between border-b border-[rgba(11,11,10,0.12)] pb-4 sm:pb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#6E5A37] bg-[#6E5A37]/10 px-3 py-1 rounded-full">
              {formattedNumber} / {String(total).padStart(2, '0')}
            </span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#0B0B0A]/60">
              SERVICE SPECIFICATION
            </span>
          </div>

          {service.duration && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#6E5A37] bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[rgba(11,11,10,0.08)]">
              <Clock className="w-3.5 h-3.5 text-[#6E5A37]" />
              <span>{service.duration}</span>
            </div>
          )}
        </div>

        {/* Middle Editorial Showcase: Big Headline, Story, and Visual Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 sm:my-8 flex-1">
          {/* Left Column: Typography & Description */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#6E5A37] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BESPOKE CUT</span>
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#0B0B0A] mb-4 sm:mb-6 leading-[0.98]">
              {service.name}
            </h3>

            <p className="text-sm sm:text-base md:text-lg font-light text-[#0B0B0A]/75 leading-relaxed max-w-xl mb-6">
              {service.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-[#0B0B0A]/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E5A37]" />
                Precision Consultation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6E5A37]" />
                Straight-Razor Detailing
              </span>
            </div>
          </div>

          {/* Right Column: High-End Stylized Graphic Card */}
          {service.image && (
            <div className="lg:col-span-5 hidden sm:flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[rgba(11,11,10,0.1)] bg-[#0B0B0A]">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Card Footer: Pricing, Action CTA & Watermark Number */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 sm:pt-6 border-t border-[rgba(11,11,10,0.12)]">
          <div className="flex items-baseline gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6E5A37]">
              FEE
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0B0B0A] tracking-tight">
              {service.price}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              href={barberProfile.booking.primaryUrl}
              variant="primary"
              size="md"
              className="w-full sm:w-auto bg-[#0B0B0A] text-[#F4F0E8] hover:bg-[#C7A66A] hover:text-[#0B0B0A] shadow-md group"
            >
              <span>Book This Service</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>

        {/* Large Decorative Watermark Number in Card Corner */}
        <div
          className="absolute -right-4 -bottom-6 sm:-bottom-10 text-[18vw] sm:text-[14vw] md:text-[11vw] font-black text-[#0B0B0A]/[0.04] pointer-events-none select-none leading-none z-0"
          aria-hidden="true"
        >
          {formattedNumber}
        </div>
      </motion.div>
    </div>
  );
}
