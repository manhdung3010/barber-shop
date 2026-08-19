import React, { useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion.ts';
import { useMediaQuery } from '../../hooks/useMediaQuery.ts';

interface MagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function Magnet({ children, className = '', strength = 12 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isReduced = useReducedMotion();
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)');

  if (isReduced || !isFinePointer) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) / (width / 2);
    const deltaY = (e.clientY - centerY) / (height / 2);
    setPosition({ x: deltaX * strength, y: deltaY * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
