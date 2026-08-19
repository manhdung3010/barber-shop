import { useState, useRef } from 'react';
import { galleryData } from '../../../data/gallery.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';
import Lightbox from '../../ui/Lightbox.tsx';
import FadeIn from '../../ui/FadeIn.tsx';

export default function GallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 lg:px-12 bg-[#0B0B0A]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="eyebrow mb-3">04 / INSIDE THE STUDIO</p>
          <h2 className="display-heading max-w-4xl mb-12 sm:mb-16">
            THE SPACE. THE CRAFT. THE DETAIL.
          </h2>
        </FadeIn>

        {/* 12-Column Studio Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {galleryData.map((item, index) => {
            const spanClass = {
              featured: 'col-span-12 md:col-span-7',
              wide: 'col-span-12 md:col-span-8',
              tall: 'col-span-12 md:col-span-5',
              standard: 'col-span-12 md:col-span-5 lg:col-span-4',
            }[item.layoutVariant || 'standard'];

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={(e) => openLightbox(index, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index, e as unknown as React.MouseEvent<HTMLElement>);
                  }
                }}
                className={`group relative rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer ${spanClass}`}
                aria-label={`View photo: ${item.title}`}
              >
                <EditorialImage
                  src={item.image}
                  alt={item.alt}
                  aspectRatio={item.layoutVariant === 'featured' || item.layoutVariant === 'wide' ? '16/9' : '4/5'}
                  watermarkLabel="STUDIO"
                  imageClassName="group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F4F0E8]">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Accessible Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={galleryData}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryData.length - 1))}
        onNext={() => setActivePhotoIndex((prev) => (prev < galleryData.length - 1 ? prev + 1 : 0))}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}
