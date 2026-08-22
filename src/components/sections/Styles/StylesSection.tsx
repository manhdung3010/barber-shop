'use client';
import React, { useState, useRef } from 'react';
import { stylesData } from '../../../data/styles';
import StyleCard from './StyleCard';
import Lightbox from '../../ui/Lightbox';
import FadeIn from '../../ui/FadeIn';

import { StyleItem } from '../../../types/index';

interface StylesSectionProps {
  data?: StyleItem[];
}

export default function StylesSection({ data }: StylesSectionProps) {
  const list = data && data.length > 0 ? data : stylesData;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeStyleIndex, setActiveStyleIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const INITIAL_LIMIT = 3;

  const openLightbox = (index: number, e: React.MouseEvent<HTMLElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveStyleIndex(index);
    setLightboxOpen(true);
  };

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setShowAll(false);
  };

  const categories = [
    { id: 'all', label: 'Tất Cả', count: list.length },
    { id: 'fade', label: 'Fade Sắc Nét', count: list.filter((s) => s.category === 'fade').length },
    { id: 'textured', label: 'Texture / Layer', count: list.filter((s) => s.category === 'textured').length },
    { id: 'classic', label: 'Classic Quý Ông', count: list.filter((s) => s.category === 'classic').length },
    { id: 'long_beard', label: 'Layer Dài & Râu', count: list.filter((s) => s.category === 'long' || s.category === 'beard').length },
  ];

  const filteredStyles = list.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'long_beard') return item.category === 'long' || item.category === 'beard';
    return item.category === activeCategory;
  });

  const displayedStyles = showAll ? filteredStyles : filteredStyles.slice(0, INITIAL_LIMIT);
  const hasMore = filteredStyles.length > INITIAL_LIMIT;

  return (
    <section
      id="styles"
      className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 md:px-8 lg:px-10 bg-[#0B0B0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-6 sm:mb-10">
          <p className="plate-meta mb-2 sm:mb-3">01 // BỘ SƯU TẬP KIỂU TÓC</p>
          <h2 className="text-[1.35rem] sm:text-2xl md:text-3xl lg:text-4xl font-display font-black uppercase tracking-tight text-[#F4F0E8] max-w-2xl mx-auto mb-3 sm:mb-4 leading-tight">
            TÁC PHẨM THAY LỜI NÓI.
          </h2>
          <p className="body-editorial max-w-lg mx-auto">
            Khám phá lookbook các mẫu tóc fade sắc nét, tỉa layer texture và phom dáng thiết kế riêng tại ghế cắt.
          </p>
        </FadeIn>

        {/* Category Filter Horizontal Swipe Bar on Mobile / Centered Pills on Tablet & Desktop */}
        <FadeIn delay={0.15} className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-2 px-1 sm:px-0 sm:justify-center sm:flex-wrap touch-pan-x snap-x">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`shrink-0 snap-start px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#C7A66A] text-[#0B0B0A] shadow-lg shadow-[#C7A66A]/25 scale-105 ring-1 ring-[#C7A66A]'
                      : 'bg-[#141413] text-[#A7A39B] border border-[rgba(244,240,232,0.14)] hover:border-[#C7A66A]/50 hover:text-[#F4F0E8]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-2 text-[10px] font-semibold opacity-80 ${isActive ? 'text-[#0B0B0A]' : 'text-[#C7A66A]'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Single Column Editorial Lookbook Stack */}
        <div className="flex flex-col space-y-8 sm:space-y-10 lg:space-y-12 max-w-5xl mx-auto w-full">
          {displayedStyles.map((item) => (
            <StyleCard
              key={item.id}
              item={item}
              index={stylesData.findIndex((s) => s.id === item.id)}
              total={stylesData.length}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {/* Load More / Expand Button (Prevents Homepage from becoming overly long) */}
        {hasMore && (
          <FadeIn className="text-center pt-8 sm:pt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-7 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#141413] hover:bg-[#C7A66A] text-[#F4F0E8] hover:text-[#0B0B0A] border border-[rgba(244,240,232,0.18)] hover:border-[#C7A66A] transition-all duration-300 shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              <span>{showAll ? 'Thu Gọn Danh Sách ↑' : `Xem Thêm (${filteredStyles.length - INITIAL_LIMIT} Kiểu Tóc Khác) ↓`}</span>
            </button>
          </FadeIn>
        )}
      </div>

      {/* Shared Accessible Fullscreen Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        items={list.map((s) => ({
          id: s.id,
          title: s.title,
          alt: s.alt,
          image: s.image,
        }))}
        currentIndex={activeStyleIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveStyleIndex((prev) => (prev > 0 ? prev - 1 : list.length - 1))}
        onNext={() => setActiveStyleIndex((prev) => (prev < list.length - 1 ? prev + 1 : 0))}
        triggerRef={lastTriggerRef}
      />
    </section>
  );
}

