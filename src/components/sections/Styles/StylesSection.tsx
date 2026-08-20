import React, { useState, useRef } from 'react';
import { stylesData } from '../../../data/styles.ts';
import StyleCard from './StyleCard.tsx';
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
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-[#0B0B0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-8 sm:mb-12 md:mb-14">
          <p className="plate-meta mb-2.5 sm:mb-3">01 // BỘ SƯU TẬP KIỂU TÓC</p>
          <h2 className="display-heading max-w-3xl mx-auto mb-4 sm:mb-5">
            TÁC PHẨM THAY LỜI NÓI.
          </h2>
          <p className="body-editorial max-w-lg mx-auto">
            Khám phá lookbook các mẫu tóc fade sắc nét, tỉa layer texture và phom dáng thiết kế riêng tại ghế cắt.
          </p>
        </FadeIn>

        {/* Vertically Scrolling Editorial Portfolio Flow */}
        <div className="flex flex-col space-y-12 sm:space-y-16 md:space-y-20">
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
