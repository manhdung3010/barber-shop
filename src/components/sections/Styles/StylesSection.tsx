import React, { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';
import { stylesData } from '../../../data/styles.ts';
import { barberProfile } from '../../../data/barber.ts';
import StyleCard from './StyleCard.tsx';
import BeforeAfterSlider from '../../ui/BeforeAfterSlider.tsx';
import Lightbox from '../../ui/Lightbox.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function StylesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  // Measure scroll progress across the lookbook stacking container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveStyleIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="styles"
      ref={containerRef}
      className="relative py-24 sm:py-32 md:py-40 px-4 sm:px-8 md:px-12 bg-[#0B0B0A]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-16 sm:mb-20 md:mb-24">
          <p className="eyebrow mb-3">01 / SIGNATURE STYLES</p>
          <h2 className="display-heading max-w-4xl mx-auto mb-4">
            THE WORK SPEAKS FOR ITSELF.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Scroll through our seasonal lookbook of precision skin fades, textured crops, and bespoke styles created in the chair.
          </p>
        </FadeIn>

        {/* Interactive Before & After Transformation Slider Showcase */}
        {barberProfile.showBeforeAfter && barberProfile.beforeAfter && (
          <FadeIn delay={0.1} className="mb-24 sm:mb-32">
            <BeforeAfterSlider data={barberProfile.beforeAfter} />
          </FadeIn>
        )}

        {/* Sticky Stacking Editorial Lookbook Sequence */}
        <div className="flex flex-col w-full">
          {stylesData.map((item, index) => {
            const targetScale = 1 - (stylesData.length - index) * 0.03;
            const range: [number, number] = [
              index * (1 / stylesData.length),
              1,
            ];

            return (
              <StyleCard
                key={item.id}
                item={item}
                index={index}
                total={stylesData.length}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                onOpenLightbox={openLightbox}
              />
            );
          })}
        </div>
      </div>

      {/* Shared Accessible Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={stylesData.map((s) => ({
          id: s.id,
          title: s.title,
          alt: s.alt,
          image: s.image,
        }))}
        currentIndex={activeStyleIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveStyleIndex((prev) => (prev > 0 ? prev - 1 : stylesData.length - 1))}
        onNext={() => setActiveStyleIndex((prev) => (prev < stylesData.length - 1 ? prev + 1 : 0))}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}
