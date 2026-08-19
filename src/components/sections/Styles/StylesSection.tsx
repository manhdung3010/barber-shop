import React, { useState, useRef } from 'react';
import { stylesData } from '../../../data/styles.ts';
import { barberProfile } from '../../../data/barber.ts';
import StyleCard from './StyleCard.tsx';
import BeforeAfterSlider from '../../ui/BeforeAfterSlider.tsx';
import Lightbox from '../../ui/Lightbox.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function StylesSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveStyleIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="styles"
      className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-12 bg-[#0B0B0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-16 sm:mb-24 md:mb-32">
          <p className="eyebrow mb-3">01 / BỘ SƯU TẬP KIỂU TÓC</p>
          <h2 className="display-heading max-w-4xl mx-auto mb-6">
            TÁC PHẨM THAY LỜI NÓI.
          </h2>
          <p className="body-editorial max-w-xl mx-auto">
            Khám phá lookbook các mẫu tóc fade sắc nét, tỉa layer texture và phom dáng thiết kế riêng tại ghế cắt.
          </p>
        </FadeIn>

        {/* Interactive Before & After Transformation Slider Showcase */}
        {barberProfile.showBeforeAfter && barberProfile.beforeAfter && (
          <FadeIn delay={0.1} className="mb-28 sm:mb-36 md:mb-48 max-w-5xl mx-auto">
            <BeforeAfterSlider data={barberProfile.beforeAfter} />
          </FadeIn>
        )}

        {/* Vertically Scrolling Editorial Portfolio Flow */}
        <div className="flex flex-col space-y-28 sm:space-y-36 md:space-y-48">
          {stylesData.map((item, index) => (
            <StyleCard
              key={item.id}
              item={item}
              index={index}
              total={stylesData.length}
              onOpenLightbox={openLightbox}
            />
          ))}
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
