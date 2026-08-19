import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { servicesData } from '../../../data/services.ts';
import { Service } from '../../../types/index.ts';
import { useReducedMotion } from '../../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../../hooks/useMediaQuery.ts';
import ServiceItem from './ServiceItem.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Smooth springs for cursor follow
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || isReduced || !isFinePointer) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <div className="px-3 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
      <section
        id="services"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="bg-[#F4F0E8] text-[#0B0B0A] rounded-[32px] sm:rounded-[44px] md:rounded-[56px] py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-10 lg:px-12 my-8 sm:my-16 relative z-10 overflow-hidden shadow-2xl"
      >
        {/* Floating Pointer-Following Image Preview Card (Desktop Fine Pointer Only) */}
        {!isReduced && isFinePointer && (
          <AnimatePresence>
            {activeService && activeService.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  left: cursorX,
                  top: cursorY,
                  x: '-50%',
                  y: '-120%',
                }}
                className="pointer-events-none absolute z-30 w-52 sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C7A66A] bg-[#0B0B0A]"
              >
                <img
                  src={activeService.image}
                  alt={activeService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4F0E8] block">
                    {activeService.name}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#6E5A37] mb-3">
              02 / SERVICES & PRICING
            </p>
            <h2 className="display-heading text-[#0B0B0A]">
              CUT. STYLE. REFINE.
            </h2>
          </FadeIn>

          {/* Dynamic Services List with Hover Triggers */}
          <div className="flex flex-col">
            {servicesData.map((service, index) => (
              <FadeIn key={service.id} delay={index * 0.08}>
                <ServiceItem
                  service={service}
                  index={index}
                  onHoverStart={() => setActiveService(service)}
                  onHoverEnd={() => setActiveService(null)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
