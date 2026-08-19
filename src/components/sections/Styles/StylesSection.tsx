import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stylesData } from '../../../data/styles.ts';
import { barberProfile } from '../../../data/barber.ts';
import { StyleCategory, StyleFilter, StyleItem } from '../../../types/index.ts';
import StyleCard from './StyleCard.tsx';
import BeforeAfterSlider from '../../ui/BeforeAfterSlider.tsx';
import Lightbox from '../../ui/Lightbox.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

const FILTER_TABS: { label: string; value: StyleFilter }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'FADE', value: 'fade' },
  { label: 'TEXTURED', value: 'textured' },
  { label: 'CLASSIC', value: 'classic' },
  { label: 'LONG', value: 'long' },
  { label: 'BEARD', value: 'beard' },
];

export default function StylesSection() {
  const [activeFilter, setActiveFilter] = useState<StyleFilter>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const filteredStyles: StyleItem[] = activeFilter === 'all'
    ? stylesData
    : stylesData.filter((s) => s.category === (activeFilter as StyleCategory));

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveStyleIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="styles" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <p className="eyebrow mb-3">01 / SIGNATURE STYLES</p>
          <h2 className="display-heading max-w-4xl mb-6">
            THE WORK SPEAKS FOR ITSELF.
          </h2>
          <p className="body-editorial max-w-xl mb-12 sm:mb-16">
            A curated portfolio of precision skin fades, bespoke textured crops, and crafted silhouettes created 1-on-1 in the chair.
          </p>
        </FadeIn>

        {/* Interactive Before & After Transformation Slider Showcase */}
        {barberProfile.showBeforeAfter && barberProfile.beforeAfter && (
          <FadeIn delay={0.1} className="mb-20 sm:mb-28">
            <BeforeAfterSlider data={barberProfile.beforeAfter} />
          </FadeIn>
        )}

        {/* Horizontal Editorial Category Navigation with Animated Layout Indicator */}
        <FadeIn delay={0.15}>
          <div className="border-b border-[rgba(244,240,232,0.12)] pb-4 mb-12 sm:mb-16">
            <div className="flex items-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar py-2">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
                    className={`relative pb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors cursor-pointer shrink-0 ${
                      isActive ? 'text-[#F4F0E8]' : 'text-[#A7A39B] hover:text-[#F4F0E8]'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C7A66A]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Animated Portfolio Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-12 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredStyles.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={
                  item.layoutVariant === 'featured' || item.layoutVariant === 'wide'
                    ? 'col-span-12 lg:col-span-8'
                    : 'col-span-12 md:col-span-6 lg:col-span-4'
                }
              >
                <StyleCard
                  item={item}
                  index={index}
                  onOpenLightbox={openLightbox}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Shared Accessible Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={filteredStyles.map((s) => ({
          id: s.id,
          title: s.title,
          alt: s.alt,
          image: s.image,
        }))}
        currentIndex={activeStyleIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveStyleIndex((prev) => (prev > 0 ? prev - 1 : filteredStyles.length - 1))}
        onNext={() => setActiveStyleIndex((prev) => (prev < filteredStyles.length - 1 ? prev + 1 : 0))}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}
