'use client';
import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../../types/index';

interface LightboxProps {
  isOpen: boolean;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function Lightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  triggerRef,
}: LightboxProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const safeIndex = Math.max(0, Math.min(currentIndex, items.length - 1));
  const currentItem = items[safeIndex] || items[0];

  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus close button on open
    const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close Lightbox"]');
    closeBtn?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [isOpen, onClose, onPrev, onNext, triggerRef]);

  if (!isOpen || !currentItem || items.length === 0) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Haircut Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Top Bar with counter & close button */}
      <div
        className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-[#F4F0E8] z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[#C7A66A]">
          {currentIndex + 1} / {items.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2.5 rounded-full bg-[#1C1C1A] text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous Image"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1C1A]/80 text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer z-10"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next Image"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1C1C1A]/80 text-[#F4F0E8] hover:text-[#C7A66A] hover:bg-[#252522] transition-colors cursor-pointer z-10"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image}
          alt={currentItem.alt}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
        />
        <p className="mt-4 text-center text-sm font-medium uppercase tracking-wider text-[#F4F0E8]">
          {currentItem.title}
        </p>
      </div>
    </div>
  );
}

