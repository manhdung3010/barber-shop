'use client';
import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { BeforeAfterData } from '../../types/index';

interface BeforeAfterSliderProps {
  data?: BeforeAfterData;
  className?: string;
}

export default function BeforeAfterSlider({ data, className = '' }: BeforeAfterSliderProps) {
  if (!data || !data.beforeImage || !data.afterImage) {
    return null;
  }

  const [sliderPosition, setSliderPosition] = useState(50); // percentage from 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setHasInteracted(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Supplementary touch handler for ultra-smooth mobile tracking
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setHasInteracted(true);
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setHasInteracted(true);
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHasInteracted(true);
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHasInteracted(true);
      setSliderPosition(100);
    }
  };

  return (
    <div className={`flex flex-col gap-5 sm:gap-6 ${className}`}>
      {/* Visual transformation container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Thanh trượt so sánh kiểu tóc trước và sau khi cắt"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onTouchMove={handleTouchMove}
        style={{ touchAction: 'none' }}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] rounded-[24px] sm:rounded-[36px] overflow-hidden select-none cursor-ew-resize border border-[rgba(244,240,232,0.18)] shadow-2xl bg-[#0B0B0A] focus-visible:ring-2 focus-visible:ring-[#C7A66A] focus-visible:outline-none touch-none"
      >
        {/* After Image (Full width background) */}
        <img
          src={data.afterImage}
          alt={data.altAfter}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none touch-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={data.beforeImage}
            alt={data.altBefore}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* Floating Badges - Optimized for Mobile & Desktop */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 pointer-events-none select-none">
          <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-mono font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-[#0B0B0A]/85 text-[#A7A39B] border border-[rgba(244,240,232,0.18)] backdrop-blur-md shadow-md">
            TRƯỚC KHI CẮT
          </span>
        </div>

        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-none select-none">
          <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-mono font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.2em] bg-[#C7A66A] text-[#0B0B0A] font-bold shadow-lg backdrop-blur-md">
            SAU KHI CẮT
          </span>
        </div>

        {/* Draggable Divider Line & Enhanced Mobile Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none select-none flex items-center justify-center -translate-x-1/2 touch-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Golden Beam Line */}
          <div className={`w-[2px] sm:w-[3px] h-full bg-gradient-to-b from-transparent via-[#C7A66A] to-transparent shadow-[0_0_14px_rgba(199,166,106,0.9)] ${isDragging ? 'opacity-100 scale-x-125' : 'opacity-90'} transition-transform`} />

          {/* Center Circular Grip Handle with generous touch target */}
          <div
            className={`absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0B0B0A] border-2 border-[#C7A66A] shadow-[0_0_24px_rgba(0,0,0,0.85)] flex items-center justify-center text-[#C7A66A] backdrop-blur-md transition-all duration-200 ${
              isDragging ? 'scale-115 ring-4 ring-[#C7A66A]/30 border-[#F4F0E8] text-[#F4F0E8]' : 'hover:scale-105'
            }`}
          >
            <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* First-time Interaction Drag Cue for Mobile */}
        {!hasInteracted && !isDragging && (
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none animate-bounce">
            <span className="px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest bg-[#0B0B0A]/85 text-[#C7A66A] border border-[#C7A66A]/35 backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <span>⟵</span> KÉO ĐỂ SO SÁNH <span>⟶</span>
            </span>
          </div>
        )}
      </div>

      {/* Caption & Transformation Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 px-1 sm:px-2">
        <div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] block mb-1">
            {data.category}
          </span>
          <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#F4F0E8]">
            {data.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#A7A39B] max-w-md font-light leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}

