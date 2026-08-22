'use client';
import React from 'react';

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ImageReveal({
  children,
  className = '',
}: ImageRevealProps) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}
