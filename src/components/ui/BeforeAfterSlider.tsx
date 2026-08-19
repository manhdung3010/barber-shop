import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { BeforeAfterData } from '../../types/index.ts';

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
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Visual transformation container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after haircut comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[580px] rounded-[28px] sm:rounded-[36px] overflow-hidden select-none cursor-ew-resize border border-[rgba(244,240,232,0.18)] shadow-2xl bg-[#0B0B0A] focus-visible:ring-2 focus-visible:ring-[#C7A66A] focus-visible:outline-none"
      >
        {/* After Image (Full width background) */}
        <img
          src={data.afterImage}
          alt={data.altAfter}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={data.beforeImage}
            alt={data.altBefore}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-5 left-5 z-20 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] bg-[#0B0B0A]/85 text-[#A7A39B] border border-[rgba(244,240,232,0.15)] backdrop-blur-md">
            BEFORE
          </span>
        </div>

        <div className="absolute top-5 right-5 z-20 pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] bg-[#C7A66A]/90 text-[#0B0B0A] font-semibold shadow-lg backdrop-blur-md">
            AFTER
          </span>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Golden Beam Line */}
          <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-[#C7A66A] to-transparent shadow-[0_0_12px_rgba(199,166,106,0.8)]" />

          {/* Center Circular Grip Handle */}
          <div className="absolute w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0B0B0A] border-2 border-[#C7A66A] shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center text-[#C7A66A] backdrop-blur-md">
            <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-[#A7A39B] bg-[#0B0B0A]/75 backdrop-blur-sm border border-[rgba(244,240,232,0.1)]">
            <Sparkles className="w-3 h-3 text-[#C7A66A]" /> Drag to compare craft
          </span>
        </div>
      </div>

      {/* Caption & Transformation Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
        <div>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] block mb-1">
            {data.category}
          </span>
          <h3 className="text-base sm:text-xl font-bold uppercase tracking-wider text-[#F4F0E8]">
            {data.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#A7A39B] max-w-md font-light">
          {data.description}
        </p>
      </div>
    </div>
  );
}
